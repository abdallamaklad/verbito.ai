# Verbito Launch Notes

Verbito is a Vite/React static frontend backed by Supabase Auth, Supabase Postgres, Supabase Edge Functions, Stripe, and OpenAI.

## Runtime

- Node: `22.12.0` or newer
- npm: `10.8.0` or newer
- Frontend build output: `dist/`

Use `.nvmrc` locally and configure the static host build image to Node `22.12+`.

## Local Commands

```bash
npm install
npm run lint
npm run build
npm audit --audit-level=moderate
```

## Static Host Public Environment

Only public values belong on the static host:

```bash
VITE_SITE_URL=https://verbito.ai
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

If Supabase public config is missing in production, the app fails closed instead of using localStorage mocks.

## Supabase Edge Function Secrets

Set these with `supabase secrets set` or in the Supabase dashboard:

```bash
SITE_URL=https://verbito.ai
ALLOWED_ORIGINS=https://verbito.ai
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=sk-...
OPENAI_PROMPT_MODEL=gpt-4.1-mini
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_MONTHLY_PRICE_ID=price_...
STRIPE_STARTER_YEARLY_PRICE_ID=price_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_YEARLY_PRICE_ID=price_...
STRIPE_UNLIMITED_MONTHLY_PRICE_ID=price_...
STRIPE_UNLIMITED_YEARLY_PRICE_ID=price_...
STRIPE_COURSE_PRICE_ID=price_...
```

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, or webhook secrets in `VITE_*` env.

## Backend Deployment

1. Apply migrations in order from `supabase/migrations`.
2. Deploy Edge Functions:

```bash
supabase functions deploy generate-prompt
supabase functions deploy create-checkout-session
supabase functions deploy create-portal-session
supabase functions deploy stripe-webhook
```

3. Configure Stripe webhook endpoint:

```text
https://your-project.supabase.co/functions/v1/stripe-webhook
```

Recommended events:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## Static Host Deployment

1. Run `npm run build`.
2. Upload `dist/` to the static host.
3. Configure SPA fallback so all deep links serve `index.html`.
4. Preserve cache headers from `public/_headers` where supported:
   - hashed assets: `Cache-Control: public, max-age=31536000, immutable`
   - `index.html`: `Cache-Control: no-cache`

## Launch Gate

- `npm run lint` passes.
- `npm run build` passes on Node `22.12+`.
- `npm audit --audit-level=moderate` has no unresolved high vulnerabilities or a documented exception.
- Supabase auth/profile/usage/saved prompts/leads/course purchases pass against the live project.
- OpenAI generation works through `generate-prompt`.
- Stripe checkout, portal, and webhook pass with live Stripe.
- Mobile, accessibility, SEO, and deep-link smoke tests pass.
