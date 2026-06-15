import { readFileSync, existsSync } from 'node:fs';

function readEnvFile(path) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const index = line.indexOf('=');
        return [line.slice(0, index), line.slice(index + 1).replace(/^["']|["']$/g, '')];
      })
  );
}

const env = {
  ...readEnvFile('.env'),
  ...readEnvFile('.env.local'),
  ...readEnvFile('.env.production'),
  ...process.env,
};

const requiredPublic = [
  'VITE_SITE_URL',
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_STRIPE_PUBLISHABLE_KEY',
];

const functions = [
  'generate-prompt',
  'create-checkout-session',
  'create-portal-session',
  'stripe-webhook',
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function checkFetch(label, url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`${label} failed: ${response.status} ${response.statusText}${text ? ` - ${text.slice(0, 160)}` : ''}`);
  }
  return response;
}

async function main() {
  const missing = requiredPublic.filter((key) => !env[key]);
  assert(missing.length === 0, `Missing public env: ${missing.join(', ')}`);
  assert(/^https:\/\/.+\.supabase\.co\/?$/.test(env.VITE_SUPABASE_URL), 'VITE_SUPABASE_URL must look like https://<project>.supabase.co');
  assert(/^pk_(live|test)_/.test(env.VITE_STRIPE_PUBLISHABLE_KEY), 'VITE_STRIPE_PUBLISHABLE_KEY must start with pk_live_ or pk_test_');

  const supabaseUrl = env.VITE_SUPABASE_URL.replace(/\/$/, '');
  await checkFetch('Supabase auth settings', `${supabaseUrl}/auth/v1/settings`, {
    headers: {
      apikey: env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}`,
    },
  });

  for (const fn of functions) {
    await checkFetch(`Edge Function CORS ${fn}`, `${supabaseUrl}/functions/v1/${fn}`, {
      method: 'OPTIONS',
      headers: {
        Origin: env.VITE_SITE_URL,
        'Access-Control-Request-Method': 'POST',
      },
    });
  }

  console.log('Production public connectivity checks passed.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
