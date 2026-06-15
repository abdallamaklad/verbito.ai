import { existsSync, readFileSync } from 'node:fs';

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

const required = ['VITE_SITE_URL', 'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missing = required.filter((key) => !env[key]);
if (missing.length) {
  console.error(`Missing env: ${missing.join(', ')}`);
  process.exit(1);
}

const siteUrl = env.VITE_SITE_URL.replace(/\/$/, '');
const supabaseUrl = env.VITE_SUPABASE_URL.replace(/\/$/, '');
const anonKey = env.VITE_SUPABASE_ANON_KEY;
const results = [];

function record(status, name, detail = '') {
  results.push({ status, name, detail });
}

async function step(name, fn) {
  try {
    const detail = await fn();
    record('PASS', name, detail);
  } catch (error) {
    record('FAIL', name, error instanceof Error ? error.message : String(error));
  }
}

function block(name, detail) {
  record('BLOCKED', name, detail);
}

async function invokeFunction(name, body, accessToken, headers = {}) {
  const response = await fetch(`${supabaseUrl}/functions/v1/${name}`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken || anonKey}`,
      Origin: siteUrl,
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${data?.error || text.slice(0, 160)}`);
  }
  return data;
}

async function authRequest(path, body) {
  const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${data?.msg || data?.error_description || data?.error || text.slice(0, 160)}`);
  }
  return data;
}

async function restRequest(table, { method = 'GET', body, accessToken, query = '', prefer } = {}) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}${query}`, {
    method,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken || anonKey}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${data?.message || data?.hint || text.slice(0, 160)}`);
  }
  return data;
}

const stamp = Date.now();
const emailDomain = env.QA_EMAIL_DOMAIN || 'verbito.ai';
const reuseQaUser = Boolean(env.QA_EMAIL && env.QA_PASSWORD);
const email = env.QA_EMAIL || `verbito-qa-${stamp}@${emailDomain}`;
const password = env.QA_PASSWORD || `VerbitoQA-${stamp}-Aa1!`;
const fullName = 'Verbito QA';
let session = null;
let userId = null;

await step('Supabase auth settings reachable', async () => {
  const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return 'auth settings endpoint responded';
});

if (reuseQaUser) {
  record('PASS', 'Auth QA user supplied', 'using reusable confirmed QA account');
} else {
  await step('Auth signup creates QA user', async () => {
    const data = await authRequest('signup', {
      email,
      password,
      data: { full_name: fullName },
    });
    userId = data.user?.id || data.id || null;
    session = data.session || (data.access_token ? data : null);
    return session ? 'signup returned active session' : 'signup accepted; email confirmation required before login';
  });
}

if (env.SKIP_PASSWORD_RESET === '1') {
  block('Password reset request accepted', 'Skipped to avoid Supabase email rate limits during repeated QA runs.');
} else {
  await step('Password reset request accepted', async () => {
    await authRequest('recover', {
      email,
      redirectTo: `${siteUrl}/account`,
    });
    return 'reset email request accepted';
  });
}

if (!session) {
  await step('Auth login with QA user', async () => {
    const data = await authRequest('token?grant_type=password', { email, password });
    session = data.session || (data.access_token ? data : null);
    userId = data.user?.id || userId;
    return session ? 'login returned active session' : 'login accepted without session';
  });
}

await step('Lead capture insert', async () => {
  await restRequest('leads', {
    method: 'POST',
    prefer: 'return=minimal',
    body: {
    email,
    source: 'live-e2e-qa',
    lead_magnet: 'launch-check',
    },
  });
  return 'lead row inserted';
});

await step('Contact form production table insert', async () => {
  await restRequest('contact_messages', {
    method: 'POST',
    prefer: 'return=minimal',
    body: {
    name: fullName,
    email,
    subject: 'Live QA',
    message: 'Testing the production contact form table before launch.',
    },
  });
  return 'contact_messages row inserted';
});

await step('Anonymous OpenAI prompt generation', async () => {
  const data = await invokeFunction(
    'generate-prompt',
    {
      goal: 'Create a concise launch announcement for a prompt engineering app.',
      category: 'Marketing',
      outputType: 'copy',
      targetModel: 'gpt-4.1-mini',
      language: 'English',
      context: 'Public launch QA smoke test.',
    },
    null,
    { 'x-anonymous-id': `qa-${stamp}` }
  );
  if (!data.finalPrompt || typeof data.promptScore !== 'number') {
    throw new Error('Prompt generation response is missing expected fields.');
  }
  return `generated prompt with score ${data.promptScore}`;
});

if (!session?.access_token || !userId) {
  block('Authenticated profile update', 'No active auth session; likely email confirmation is required.');
  block('Saved prompts CRUD', 'No active auth session; likely email confirmation is required.');
  block('Subscription checkout session', 'No active auth session; likely email confirmation is required.');
  block('Course checkout session', 'No active auth session; likely email confirmation is required.');
  block('Customer portal session', 'No active auth session; likely email confirmation is required.');
} else {
  await step('Profile row exists after signup trigger', async () => {
    const data = await restRequest('profiles', {
      accessToken: session.access_token,
      query: `?select=id,email,full_name,plan_type&id=eq.${userId}`,
    });
    if (!Array.isArray(data) || data.length !== 1) throw new Error('Profile row was not readable.');
    if (data[0].email !== email) throw new Error('Profile email did not match QA user.');
    return `profile plan ${data[0].plan_type}`;
  });

  await step('Authenticated profile update', async () => {
    await restRequest('profiles', {
      method: 'PATCH',
      accessToken: session.access_token,
      query: `?id=eq.${userId}`,
      prefer: 'return=minimal',
      body: { full_name: 'Verbito QA Updated' },
    });
    return 'profile update accepted';
  });

  await step('Saved prompts CRUD', async () => {
    const insertedRows = await restRequest('saved_prompts', {
      method: 'POST',
      accessToken: session.access_token,
      prefer: 'return=representation',
      body: {
        user_id: userId,
        title: 'Live QA Prompt',
        category: 'QA',
        prompt_text: 'Write a launch checklist.',
        notes: 'Created by live QA script.',
      },
    });
    const inserted = Array.isArray(insertedRows) ? insertedRows[0] : insertedRows;
    if (!inserted?.id) throw new Error('Saved prompt insert did not return an id.');

    await restRequest('saved_prompts', {
      accessToken: session.access_token,
      query: `?select=id&id=eq.${inserted.id}`,
    });

    await restRequest('saved_prompts', {
      method: 'DELETE',
      accessToken: session.access_token,
      query: `?id=eq.${inserted.id}`,
      prefer: 'return=minimal',
    });
    return 'insert/read/delete accepted';
  });

  await step('Subscription checkout session', async () => {
    const data = await invokeFunction('create-checkout-session', {
      planId: 'starter',
      billingPeriod: 'monthly',
      successUrl: `${siteUrl}/billing?checkout=success`,
      cancelUrl: `${siteUrl}/pricing?checkout=cancelled`,
    }, session.access_token);
    const url = new URL(data.url);
    if (!url.hostname.endsWith('stripe.com')) throw new Error('Checkout URL was not a Stripe URL.');
    return `Stripe checkout session created on ${url.hostname}`;
  });

  await step('Course checkout session', async () => {
    const data = await invokeFunction('create-checkout-session', {
      productType: 'course',
      courseSlug: 'master-prompt-engineering',
      successUrl: `${siteUrl}/course/dashboard?checkout=success`,
      cancelUrl: `${siteUrl}/course/master-prompt-engineering?checkout=cancelled`,
    }, session.access_token);
    const url = new URL(data.url);
    if (!url.hostname.endsWith('stripe.com')) throw new Error('Course checkout URL was not a Stripe URL.');
    return `Stripe course checkout session created on ${url.hostname}`;
  });

  await step('Customer portal session', async () => {
    const data = await invokeFunction('create-portal-session', {
      returnUrl: `${siteUrl}/billing`,
    }, session.access_token);
    const url = new URL(data.url);
    if (!url.hostname.endsWith('stripe.com')) throw new Error('Portal URL was not a Stripe URL.');
    return `Stripe portal session created on ${url.hostname}`;
  });
}

block('Checkout completion and webhook DB update', 'Not completed in QA because this would require charging a live payment method.');

const counts = results.reduce((acc, item) => {
  acc[item.status] = (acc[item.status] || 0) + 1;
  return acc;
}, {});

for (const item of results) {
  const suffix = item.detail ? ` - ${item.detail}` : '';
  console.log(`${item.status}: ${item.name}${suffix}`);
}

console.log(`SUMMARY: ${counts.PASS || 0} passed, ${counts.FAIL || 0} failed, ${counts.BLOCKED || 0} blocked`);

if (counts.FAIL) process.exit(1);
