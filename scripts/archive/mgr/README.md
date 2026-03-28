# Archived: More Good Reviews integration

This folder holds the former MGR (Beacon API) pipeline, removed in favor of **DataForSEO** as the single source for on-site Google reviews.

- `fetch-mgr-reviews.js` — previously ran before Astro build.
- `test-mgr-review-payload.js` — API debugging helper.
- `manual-matches.json` — mgrReviewId → project image filenames overrides.
- `reviews.json.snapshot` — last exported `src/data/reviews.json` from MGR (reference only).

**Current flow:** `npm run build` runs `scripts/sync-reviews.js` (DataForSEO) then `astro build`. Curated video testimonial: `src/data/curated-video-reviews.json`.
