# Analytics Audit

## Existing Events

`src/services/analytics.ts` defines:

- `track(event, properties)`
- `pageView(page, properties)`

The service currently stores events in memory and logs in development. Production provider wiring is stubbed.

## Missing Events

- Route/page view tracking is not wired globally.
- Prompt generation start/success/failure.
- Signup/login form submit and failure.
- Lead capture submit/success/failure.
- Course lesson started/completed.
- Pricing CTA clicks.
- Upgrade modal opened.
- 404 page view.

## Recommendations

- Add a route listener component that calls `analytics.pageView`.
- Define a central event-name enum or union type.
- Add event payload interfaces for prompt generation, course progress, lead capture, and CTAs.
- Keep Stripe/Supabase conversion events as future integration work per sprint constraints.
