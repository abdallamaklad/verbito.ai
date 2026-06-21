import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const sourceDir = path.resolve('src');
const failures = [];

const read = (file) => readFile(file, 'utf8');
const capture = (html, pattern) => html.match(pattern)?.[1]?.trim();
const routeFile = (pathname) => pathname === '/'
  ? path.join(distDir, 'index.html')
  : path.join(distDir, `${pathname.slice(1)}.html`);

const sitemap = await read(path.join(distDir, 'sitemap.xml'));
const publicRoutes = [...sitemap.matchAll(/<loc>https:\/\/verbito\.ai([^<]*)<\/loc>/g)]
  .map((match) => match[1] || '/');
const titles = new Map();
const canonicals = new Map();

for (const pathname of publicRoutes) {
  const file = routeFile(pathname);
  let html;
  try {
    html = await read(file);
  } catch {
    failures.push(`${pathname}: missing prerendered HTML`);
    continue;
  }

  const title = capture(html, /<title>([\s\S]*?)<\/title>/i);
  const description = capture(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonical = capture(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const robots = capture(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const expectedCanonical = `https://verbito.ai${pathname === '/' ? '/' : pathname}`;

  if (!title) failures.push(`${pathname}: missing title`);
  if (!description) failures.push(`${pathname}: missing meta description`);
  if (canonical !== expectedCanonical) failures.push(`${pathname}: canonical is ${canonical || 'missing'}`);
  if (robots?.includes('noindex')) failures.push(`${pathname}: sitemap route is noindex`);
  if (h1Count !== 1) failures.push(`${pathname}: expected one prerendered H1, found ${h1Count}`);

  if (title) {
    if (titles.has(title)) failures.push(`${pathname}: duplicate title also used by ${titles.get(title)}`);
    titles.set(title, pathname);
  }
  if (canonical) {
    if (canonicals.has(canonical)) failures.push(`${pathname}: duplicate canonical also used by ${canonicals.get(canonical)}`);
    canonicals.set(canonical, pathname);
  }
}

const privateRoutes = [
  '/login', '/signup', '/forgot-password', '/dashboard', '/account', '/admin', '/billing',
  '/collections', '/saved-prompts', '/course/dashboard', '/course/certificate',
];

for (const pathname of privateRoutes) {
  const html = await read(routeFile(pathname));
  const robots = capture(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
  if (!robots?.includes('noindex')) failures.push(`${pathname}: private route must be noindex`);
}

for (const asset of ['favicon.svg', 'favicon.png', 'apple-touch-icon.png']) {
  try {
    await access(path.join(distDir, asset));
  } catch {
    failures.push(`missing icon asset: ${asset}`);
  }
}

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  }))).flat();
};

for (const file of await walk(sourceDir)) {
  if (!file.endsWith('.tsx') || file.endsWith('OptimizedImage.tsx')) continue;
  if (/<img(?:\s|>)/.test(await read(file))) {
    failures.push(`${path.relative(process.cwd(), file)}: use OptimizedImage instead of a direct img element`);
  }
}

if (failures.length > 0) {
  console.error(`SEO checks failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`SEO checks passed for ${publicRoutes.length} public routes and ${privateRoutes.length} private routes.`);
