# Performance Report

## Implemented

- Added route-level lazy loading for the app shell.
- Production build now emits separate chunks for pages and tool routes.

## Build Output Notes

- `dist` size: 4.3 MB.
- Largest minified chunks:
  - `courseContent-DKsmizv3.js`: 528.46 kB
  - `Admin-UW8VEgPP.js`: 471.86 kB
  - `index-DbP6aUOD.js`: 463.45 kB
- Vite still warns that some chunks exceed 500 kB.

## Remaining Work

- Split course content by module or lesson instead of loading the full course content bundle.
- Lazy-load chart/admin-heavy dependencies only inside admin views.
- Add Rollup `manualChunks` for stable vendor chunking.
- Run Lighthouse after lint and runtime QA are clean.

## Status

Improved, but not Lighthouse-ready. A 390px mobile smoke sample did not show horizontal overflow on the tested routes.
