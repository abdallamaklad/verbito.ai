# Deployment Readiness

## Build

- `npm run build` passes and now includes `tsc -b`.
- Vite emits a production `dist/` directory.

## Blockers

- `npm run lint` fails with 158 errors.
- Node version should be upgraded from `20.18.1` to `20.19+` or `22.12+` for Vite 7 compatibility.
- Large chunks remain and may hurt mobile performance.

## Warnings

- Browserslist data is stale.
- `npm audit --audit-level=moderate` reports 11 vulnerabilities: 3 moderate and 8 high. A fix is available via `npm audit fix`, but it was not applied in this pass to avoid unplanned dependency churn.
- Runtime environment variables for Supabase/OpenAI are read from `VITE_*`; production values were not verified.

## Recommendations

- Pin deployment runtime to Node `22.12+`.
- Add CI steps: `npm ci`, `npm run lint`, `npm run build`.
- Re-run `npm audit` in a network-enabled CI environment.
- Add SPA fallback using existing `public/_redirects` on Netlify or equivalent host rewrite.
- Smoke-test deep links for every restored route after deployment.
