# Dead Code Report

## Summary

The app contains many unused imports and unused local variables. ESLint currently reports 158 errors, with most being dead-code style issues.

## High-Signal Findings

- `src/App.tsx` previously made nearly all page components unreachable by only registering `/`.
- Many page modules import icons or helpers that are not used.
- Several dashboard/admin variables are computed but unused.
- `src/lib/seo.ts` contains an unused parameter.
- Shadcn-style UI files export helper constants alongside components, which triggers Fast Refresh lint rules.

## Fixed

- Restored routes for existing page components, reducing effective dead UI surface.
- Removed unused `react-helmet-async` dependency.
- Removed direct platform-native dependencies that were not appropriate as app dependencies.

## Remaining Work

Run `npm run lint` and clear unused imports/variables page by page. Do not suppress the React compiler findings until the underlying purity/hook issues are reviewed.
