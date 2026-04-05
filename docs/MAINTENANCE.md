# Maintenance & stack snapshot

Operational notes for **Deck Masters AK** — Astro build, Tailwind 4, Cloudflare Pages, and the quote **Pages Function**.

## Stack

| Item | Version / notes |
|------|-----------------|
| Framework | Astro 6.x |
| CSS | Tailwind CSS 4 via `@tailwindcss/vite` — theme in `src/styles/global.css` (`@theme`) |
| Deploy | Cloudflare Pages — static **`dist/`** + **`functions/`** |
| Node | **22+** for local build and CI |

## Tailwind 4

- No `@astrojs/tailwind`; use the Vite plugin and **`global.css`**.
- Legacy root `tailwind.config.mjs` removed in favor of `@theme`.

## Quote API (`functions/api/submit-quote.js`)

- **POST /api/submit-quote** — optional image upload to R2, GoHighLevel contact create/update.
- **`HIGHLEVEL_TOKEN`** — Cloudflare Pages **secret** (never commit).
- **`HIGHLEVEL_LOCATION_ID`**, **`HIGHLEVEL_CUSTOM_FIELD_*`** — set as Pages **environment variables** (or `.dev.vars` for local Wrangler). Same names as **`.env.example`**.
- **`IMG_BUCKET`** — R2 binding name; bucket declared in **`wrangler.toml`** (`[[r2_buckets]]`). Production values are configured in the **Cloudflare dashboard**, not by committing secrets into the repo.

## R2 media (build)

Build-time **`R2_*`**, **`R2_SITE_SLUG`** (if used), and **`R2_LEGACY_PREPEND_PROJECTS`** must match real object keys and URL expectations. **`docs/media-management.md`** · **`scripts/README.md`** (R2 section).

## Optional housekeeping

- **LCP:** Hero imagery uses responsive `Image` / formats as implemented in components.
- **Node:** Use v22+ everywhere the app is built.
