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

### Where configuration lives (Pages vs Workers)

This route is a **Cloudflare Pages Function** (`functions/` next to the static build). At runtime it only sees what you configure on **the same Pages project**: **Settings → Environment variables** (and **Bindings** for R2). It does **not** get GoHighLevel credentials from a separate **Workers** deployment or from `wrangler.toml` by magic—if you assumed “Workers handle CRM secrets elsewhere,” the quote form would still fail until **token and location ID** are set on **Pages**.

### Required vs optional

| Variable | Required for GHL? | Notes |
|----------|---------------------|--------|
| **`HIGHLEVEL_TOKEN`** | **Yes** | Pages **secret** (encrypt). Private integration token for LeadConnector/GHL API. |
| **`HIGHLEVEL_LOCATION_ID`** | **Yes** | Plain env var. The **sub-account (location)** UUID leads should be created under—typically from the HighLevel URL (`…/location/<id>/…`) or location settings. Omitting it causes a **500** “Server configuration error” before any API call. |
| **`HIGHLEVEL_CUSTOM_FIELD_*`** | No | Optional custom field IDs for project description / quote image. |
| **`IMG_BUCKET`** | No (for GHL) | R2 binding from **`wrangler.toml`**; only needed for optional photo upload. |

Local Wrangler: use **`.dev.vars`** with the same names as **`.env.example`**.

## R2 media (build)

Build-time **`R2_*`**, **`R2_SITE_SLUG`** (if used), and **`R2_LEGACY_PREPEND_PROJECTS`** must match real object keys and URL expectations. **`docs/media-management.md`** · **`scripts/README.md`** (R2 section).

## Optional housekeeping

- **LCP:** Hero imagery uses responsive `Image` / formats as implemented in components.
- **Node:** Use v22+ everywhere the app is built.
