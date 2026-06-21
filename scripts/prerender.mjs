import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://verbito.ai';
const distDir = path.resolve('dist');
const shell = await readFile(path.join(distDir, 'index.html'), 'utf8');
const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
const articleSource = await readFile(path.resolve('src/lib/data/articles.ts'), 'utf8');

const page = (pathname, title, description, heading = title, image = '/og-default.jpg') => ({
  pathname, title, description, heading, image,
});

const articlePages = [
  page('/knowledge/glm-5-2-vs-claude-fable-5', 'GLM 5.2 vs Claude Fable 5: The Most Important AI Battle of 2026', 'Compare GLM 5.2 and Claude Fable 5 on availability, pricing, context, openness, coding workflows, safeguards, and the best use cases in 2026 for teams.', undefined, '/glm-5-2-vs-claude-fable-5.jpg'),
  page('/knowledge/what-is-prompt-engineering-beginners-guide', "What Is Prompt Engineering? A Complete Beginner's Guide for 2026", 'Learn what prompt engineering is, why it matters, and how to get better results from ChatGPT, Claude, and other AI tools.', undefined, '/blog-featured-1.jpg'),
  page('/knowledge/chatgpt-vs-claude-vs-gemini-2026', 'ChatGPT vs Claude vs Gemini: Which AI Model Should You Use in 2026?', 'Compare the strengths, weaknesses, and best use cases of ChatGPT, Claude, and Gemini.', undefined, '/blog-featured-2.jpg'),
  page('/knowledge/10-prompt-engineering-techniques-that-actually-work', '10 Prompt Engineering Techniques That Actually Work', 'Use practical prompt engineering techniques to improve AI output quality and consistency.', undefined, '/blog-featured-3.jpg'),
  page('/knowledge/how-to-write-ai-prompts-for-marketing', 'How to Write AI Prompts for Marketing That Convert', 'Learn how to create AI prompts for marketing copy, campaigns, and content strategy.', undefined, '/blog-featured-1.jpg'),
  page('/knowledge/ai-prompts-for-developers-coding-guide', 'AI Prompts for Developers: Write Better Code Faster', 'Use AI prompts for coding, debugging, code review, testing, and architecture decisions.', undefined, '/blog-featured-2.jpg'),
  page('/knowledge/midjourney-prompts-master-guide', 'The Master Guide to Midjourney Prompts in 2026', 'Create more controllable AI images with practical Midjourney prompt techniques and examples.', undefined, '/blog-featured-3.jpg'),
  page('/knowledge/prompt-engineering-for-business-owners', 'Prompt Engineering for Business Owners: A Practical Guide', 'Use AI prompts to streamline operations, improve customer service, and support business growth.', undefined, '/blog-featured-1.jpg'),
  page('/knowledge/ai-prompts-for-students-research', 'AI Prompts for Students: Study Smarter, Not Harder', 'Use AI responsibly to support research, revision, writing, and understanding complex subjects.', undefined, '/blog-featured-2.jpg'),
  page('/knowledge/advanced-prompt-chaining-techniques', 'Advanced Prompt Chaining: Build Complex AI Workflows', 'Learn how to connect prompts into repeatable AI workflows for complex tasks.', undefined, '/blog-featured-3.jpg'),
  page('/knowledge/seo-optimization-with-ai-prompts', 'SEO Optimization with AI Prompts: Rank Higher in 2026', 'Use AI prompts to support keyword research, content planning, and search optimization.', undefined, '/blog-featured-1.jpg'),
  page('/knowledge/email-writing-ai-prompts-that-work', 'Email Writing AI Prompts That Get Responses', 'Create better AI prompts for outreach, follow-ups, newsletters, and sales emails.', undefined, '/blog-featured-2.jpg'),
  page('/knowledge/creating-ai-personas-for-better-outputs', 'Creating AI Personas for Better Outputs', 'Design useful AI personas that improve the relevance, tone, and consistency of generated content.', undefined, '/blog-featured-3.jpg'),
  page('/knowledge/ai-for-content-creation-workflow', 'Building an AI-Powered Content Creation Workflow', 'Build a practical content workflow supported by structured AI prompts.', undefined, '/blog-featured-1.jpg'),
  page('/knowledge/automating-tasks-with-ai-prompts', 'Automating Repetitive Tasks with AI Prompts', 'Use AI prompts to make routine business tasks faster and more repeatable.', undefined, '/blog-featured-2.jpg'),
  page('/knowledge/the-future-of-prompt-engineering', 'The Future of Prompt Engineering: 2026 and Beyond', 'Explore the trends shaping how people structure instructions and work with AI systems.', undefined, '/blog-featured-3.jpg'),
];

const articleDates = new Map(
  [...articleSource.matchAll(/slug: '([^']+)'[\s\S]*?date: '([^']+)'/g)]
    .map(([, slug, date]) => [`/knowledge/${slug}`, new Date(`${date} 12:00:00 UTC`).toISOString().slice(0, 10)]),
);

const privatePages = [
  page('/login', 'Log In | Verbito', 'Log in to your Verbito account.', 'Log In'),
  page('/signup', 'Create an Account | Verbito', 'Create your Verbito account.', 'Create an Account'),
  page('/forgot-password', 'Reset Password | Verbito', 'Reset your Verbito account password.', 'Reset Password'),
  page('/dashboard', 'Dashboard | Verbito', 'Manage your Verbito workspace.', 'Dashboard'),
  page('/account', 'Account | Verbito', 'Manage your Verbito account.', 'Account'),
  page('/admin', 'Admin | Verbito', 'Verbito administration.', 'Admin'),
  page('/billing', 'Billing | Verbito', 'Manage your Verbito subscription and billing.', 'Billing'),
  page('/collections', 'Collections | Verbito', 'Manage your private prompt collections.', 'Collections'),
  page('/saved-prompts', 'Saved Prompts | Verbito', 'Manage your saved prompts.', 'Saved Prompts'),
  page('/course/dashboard', 'Course Dashboard | Verbito', 'View your private course progress.', 'Course Dashboard'),
  page('/course/certificate', 'Course Certificate | Verbito', 'View your Verbito course certificate.', 'Course Certificate'),
].map((entry) => ({ ...entry, noIndex: true }));

const homeFaqs = [
  ['What is Verbito.ai?', 'Verbito.ai turns rough ideas into structured prompts for ChatGPT, Claude, Gemini, Midjourney, and other AI tools.'],
  ['How many free prompts do I get?', 'Free accounts can generate up to 2 prompts per day without a credit card.'],
  ['Do I need to know prompt engineering?', 'No. Describe what you need in plain language and Verbito structures the prompt for you.'],
  ['Which AI models does Verbito support?', 'Verbito supports prompts for ChatGPT, Claude, Gemini, Midjourney, DALL-E, Stable Diffusion, and general-purpose AI models.'],
  ['Can I save and organize my prompts?', 'Paid plans include prompt saving, history, and collections.'],
  ['Is there a prompt engineering course?', 'Yes. Master Prompt Engineering includes 10 modules and 50 lessons.'],
  ['What is the Prompt Score?', 'Prompt quality feedback covers clarity, context, specificity, constraints, output format, and reusability.'],
  ['How do I cancel my subscription?', 'Subscriptions can be canceled from account settings and remain active through the current billing period.'],
];

const pages = [
  page('/', 'Verbito - Free AI Prompt Generator for ChatGPT, Claude & More', 'Create expert AI prompts for ChatGPT, Claude, Gemini and Midjourney in seconds. Get 2 free prompt generations daily. No credit card required.', 'Turn Rough Ideas Into Expert-Level AI Prompts'),
  page('/about', 'About Verbito and Quantara LLC', 'Learn why Quantara LLC built Verbito, how the platform approaches prompt engineering, and how to contact the team.', 'About Verbito'),
  page('/consulting', 'AI Prompt Consulting | Verbito', 'Get practical prompt engineering and AI workflow consulting for teams and organizations.', 'AI Prompt Consulting'),
  page('/contact', 'Contact Verbito', 'Contact the Verbito team at Quantara LLC for product, billing, support, or partnership enquiries.', 'Contact Verbito'),
  page('/enterprise', 'Verbito for Enterprise', 'Bring structured AI prompting, team enablement, and practical prompt workflows to your organization.', 'Verbito for Enterprise'),
  page('/pricing', 'Verbito Pricing', 'Compare Free, Starter, Pro, and Unlimited Verbito plans for AI prompt generation.', 'Simple Pricing for Better AI Prompts'),
  page('/course/master-prompt-engineering', 'Master Prompt Engineering Course | Verbito', 'Build practical prompt engineering skills through a structured course with 50 lessons across 10 modules.', 'Master Prompt Engineering', '/og-course.jpg'),
  page('/knowledge', 'Prompt Engineering Knowledge Hub | Verbito', 'Read practical prompt engineering guides for ChatGPT, Claude, Gemini, Midjourney, and business workflows.', 'Prompt Engineering Guides and Tutorials', '/og-blog.jpg'),
  page('/prompts', 'AI Prompt Library | Verbito', 'Browse reusable AI prompt templates for business, marketing, coding, education, research, and more.', 'Explore the AI Prompt Library'),
  page('/prompt-generator', 'AI Prompt Generator | Verbito', 'Create a structured, model-ready AI prompt from a rough idea with Verbito.', 'AI Prompt Generator'),
  page('/tools/free-ai-prompt-generator', 'Free AI Prompt Generator | Verbito', 'Generate a structured AI prompt free without creating an account.', 'Free AI Prompt Generator'),
  page('/tools/business-prompt-generator', 'Business Prompt Generator | Verbito', 'Create AI prompts for business strategy, operations, planning, and decision-making.', 'Business Prompt Generator'),
  page('/tools/chatgpt-prompt-generator', 'ChatGPT Prompt Generator | Verbito', 'Create clearer, structured prompts designed for ChatGPT.', 'ChatGPT Prompt Generator'),
  page('/tools/coding-prompt-generator', 'Coding Prompt Generator | Verbito', 'Create AI prompts for coding, debugging, architecture, testing, and code review.', 'Coding Prompt Generator'),
  page('/tools/email-prompt-generator', 'Email Prompt Generator | Verbito', 'Create AI prompts for outreach, newsletters, follow-ups, and professional email writing.', 'Email Prompt Generator'),
  page('/tools/image-prompt-generator', 'AI Image Prompt Generator | Verbito', 'Create detailed image prompts with subject, composition, lighting, mood, and style guidance.', 'AI Image Prompt Generator'),
  page('/tools/marketing-prompt-generator', 'Marketing Prompt Generator | Verbito', 'Create AI prompts for campaigns, content strategy, advertising, and customer research.', 'Marketing Prompt Generator'),
  page('/tools/midjourney-prompt-generator', 'Midjourney Prompt Generator | Verbito', 'Build detailed Midjourney prompts for distinctive, controllable AI imagery.', 'Midjourney Prompt Generator'),
  page('/tools/prompt-doctor', 'AI Prompt Doctor | Verbito', 'Review and improve an existing AI prompt for clarity, context, constraints, and output quality.', 'AI Prompt Doctor'),
  page('/tools/research-prompt-generator', 'Research Prompt Generator | Verbito', 'Create AI prompts for literature reviews, analysis, synthesis, and research planning.', 'Research Prompt Generator'),
  page('/tools/seo-prompt-generator', 'SEO Prompt Generator | Verbito', 'Create AI prompts for keyword research, content briefs, optimization, and SEO strategy.', 'SEO Prompt Generator'),
  page('/tools/student-prompt-generator', 'Student Prompt Generator | Verbito', 'Create responsible AI prompts for studying, research, revision, and concept explanations.', 'Student Prompt Generator'),
  page('/tools/video-prompt-generator', 'AI Video Prompt Generator | Verbito', 'Create detailed prompts for AI video concepts, shots, scenes, movement, and visual direction.', 'AI Video Prompt Generator'),
  page('/privacy', 'Privacy Policy | Verbito', 'Read how Verbito and Quantara LLC collect, use, protect, and retain personal information.', 'Privacy Policy'),
  page('/terms', 'Terms of Service | Verbito', 'Read the terms governing use of the Verbito website, services, subscriptions, and content.', 'Terms of Service'),
  page('/refund-policy', 'Refund Policy | Verbito', 'Review the Verbito refund policy for subscriptions, courses, and eligible purchases.', 'Refund Policy'),
  page('/cookies', 'Cookie Policy | Verbito', 'Learn how Verbito uses essential, analytics, and preference cookies.', 'Cookie Policy'),
  page('/disclaimer', 'Disclaimer | Verbito', 'Read the limitations and responsibilities that apply to Verbito AI-generated content and educational material.', 'Disclaimer'),
  page('/affiliate-disclosure', 'Affiliate Disclosure | Verbito', 'Learn how Verbito discloses affiliate relationships and sponsored recommendations.', 'Affiliate Disclosure'),
  ...articlePages,
  ...privatePages,
];

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const setMeta = (html, attribute, key, content) => {
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"[\\s\\S]*?\\/>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
};

const renderPage = (entry) => {
  const canonical = `${siteUrl}${entry.pathname === '/' ? '/' : entry.pathname}`;
  const image = entry.image.startsWith('http') ? entry.image : `${siteUrl}${entry.image}`;
  const schemaType = entry.pathname.includes('/course/')
    ? 'Course'
    : entry.pathname.startsWith('/knowledge/') ? 'Article' : 'WebPage';
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: entry.heading,
    ...(schemaType === 'Article' ? {
      headline: entry.heading,
      image,
      author: { '@type': 'Organization', name: 'Quantara Editorial Team', url: `${siteUrl}/about` },
      datePublished: articleDates.get(entry.pathname),
    } : {}),
    ...(schemaType === 'Course' ? {
      provider: { '@type': 'Organization', name: 'Quantara LLC', url: siteUrl },
    } : {}),
    description: entry.description,
    url: canonical,
    publisher: {
      '@type': 'Organization',
      name: 'Quantara LLC',
      url: siteUrl,
      email: 'verbito.ai@wearequantara.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sharjah',
        addressCountry: 'AE',
      },
    },
  };

  let schema = entry.pathname === '/' ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'Verbito - Free AI Prompt Generator',
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Quantara LLC',
        alternateName: 'Verbito',
        url: `${siteUrl}/`,
        email: 'verbito.ai@wearequantara.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Sharjah Media City',
          addressLocality: 'Sharjah',
          addressCountry: 'AE',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#product`,
        name: 'Verbito AI Prompt Generator',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Web',
        description: entry.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: [
          'Structured expert prompts',
          'Model-specific prompt optimization',
          'Prompt quality feedback',
          'Reusable prompt library',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: homeFaqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  } : pageSchema;

  if (entry.pathname === '/pricing') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Verbito AI Prompt Generator',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web',
      url: canonical,
      offers: [
        { '@type': 'Offer', name: 'Free plan', price: '0', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Starter plan', price: '12', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Pro plan', price: '29', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Unlimited plan', price: '79', priceCurrency: 'USD' },
      ],
    };
  }

  if (entry.pathname === '/course/master-prompt-engineering') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: entry.heading,
      description: entry.description,
      url: canonical,
      provider: { '@type': 'Organization', name: 'Quantara LLC', url: siteUrl },
      offers: { '@type': 'Offer', price: '197', priceCurrency: 'USD', url: canonical },
      hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT8H30M' },
    };
  }

  const fallbackAction = entry.noIndex
    ? '<p><a href="/">Return to Verbito</a>.</p>'
    : '<p><a href="/prompt-generator">Create a prompt</a> or <a href="/contact">contact Verbito</a>.</p>';
  const fallback = `<div id="root"><header><a href="/">Verbito</a><nav aria-label="Primary"><a href="/prompt-generator">Prompt Generator</a> <a href="/prompts">Prompts</a> <a href="/knowledge">Knowledge</a> <a href="/pricing">Pricing</a></nav></header><main><h1>${escapeHtml(entry.heading)}</h1><p>${escapeHtml(entry.description)}</p>${fallbackAction}</main><footer><p>Verbito is operated by Quantara LLC, Sharjah Media City, Sharjah, UAE.</p></footer></div>`;

  let html = shell.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(entry.title)}</title>`);
  html = setMeta(html, 'name', 'description', entry.description);
  html = setMeta(html, 'name', 'robots', entry.noIndex
    ? 'noindex, nofollow, noarchive'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  html = setMeta(html, 'property', 'og:title', entry.title);
  html = setMeta(html, 'property', 'og:description', entry.description);
  html = setMeta(html, 'property', 'og:type', schemaType === 'Article' ? 'article' : 'website');
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'og:image:alt', entry.heading);
  html = setMeta(html, 'name', 'twitter:title', entry.title);
  html = setMeta(html, 'name', 'twitter:description', entry.description);
  html = setMeta(html, 'name', 'twitter:url', canonical);
  html = setMeta(html, 'name', 'twitter:image', image);
  html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`);
  return html.replace('<div id="root"></div>', fallback);
};

const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/verbito\.ai([^<]*)<\/loc>/g)]
  .map((match) => match[1] || '/');
const configuredPaths = new Set(pages.map(({ pathname }) => pathname));
const missingPages = sitemapPaths.filter((pathname) => !configuredPaths.has(pathname));

if (missingPages.length > 0) {
  throw new Error(`Missing prerender metadata for sitemap routes: ${missingPages.join(', ')}`);
}

for (const entry of pages) {
  const output = entry.pathname === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, `${entry.pathname.slice(1)}.html`);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, renderPage(entry));
}

console.log(`Prerendered ${pages.length} routes.`);
