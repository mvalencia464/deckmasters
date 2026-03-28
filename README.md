# Deck Masters AK

Static marketing site for a cold-climate deck builder and general contractor. **Astro 6**, **Tailwind CSS v4** (CSS-first architecture), **Cloudflare Pages** (static + Functions).

**Performance-first:** The site is built for high Lighthouse scores—zero client-side JS where possible, server-rendered HTML, optimized images (including `astro:assets` for review avatars and project photos), and minimal third-party requests.

---

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Build to `./dist` |
| `npm run preview` | Preview production build |
| `npm run sync-reviews` | Sync Google Reviews from DataForSEO (see below) |

---

## Google Reviews (DataForSEO)

Reviews come from the **DataForSEO Business Data API** and power the homepage / wall-of-love masonry. **Build runs `scripts/sync-reviews.js` first** (requires `DATAFORSEO_*` in the environment—locally via `.env`, on Cloudflare Pages in build variables). Avatars and project photos are stored under `src/assets/` and optimized at build time.

**Flow:**

1. **Config** — `scripts/reviews-clients.json` (keyword, location, `depth`, `sort_by`, language).
2. **Credentials** — `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD` (see `.env.example`).
3. **Manual sync** — `npm run sync-reviews` or `node scripts/sync-reviews.js <slug>`.
4. **`npm run build`** — Always runs sync, then `astro build`, and writes `src/data/google-reviews.json` plus downloaded media.
5. **Curated video** — `src/data/curated-video-reviews.json` (e.g. Erica testimonial) is merged in `ReviewsSection.astro`.

**Auto-redeploy:** A GitHub Action (`.github/workflows/scheduled-pages-deploy.yml`) POSTs your Cloudflare **deploy hook** once per day so Pages rebuilds and runs `sync-reviews.js` again. Add the hook URL as repo secret `CLOUDFLARE_PAGES_DEPLOY_HOOK_URL`.

Full details (adding clients, location codes, output paths): **`scripts/README.md`**.

---

## Project structure

- `src/data/site.json` — Business info, services, neighborhoods.
- `src/data/google-reviews.json` — Google reviews from DataForSEO (written each build by `sync-reviews`).
- `src/data/curated-video-reviews.json` — Site-hosted video testimonials merged into the reviews section.
- `src/pages/` — index, services, about, contact.
- `src/components/` — Hero, TrustBar, GoogleReviewCard, ReviewsSection, QuoteForm, etc.
- `src/styles/global.css` — **Tailwind 4 configuration** and site-wide styles.
- `scripts/sync-reviews.js` — DataForSEO Google Reviews sync (task_post → task_get → avatars → JSON).
- `scripts/reviews-clients.json` — Client config (keyword, location, output paths).
- `functions/api/submit-quote.js` — POST /api/submit-quote; creates a GHL contact with image R2 upload and custom field support.

---

## Hero image

`public/newhero.avif` and `public/newhero.png` are loaded **only on desktop** (via `<picture>` + `media="(min-width: 1024px)"` in `Hero.astro`); mobile uses a gradient so LCP stays fast. Prefer AVIF as primary; PNG as fallback.

---

## Deploy (Cloudflare Pages)

Connect the repo in [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Pages → Connect to Git.

- **Build command:** `npm run build`
- **Build output directory:** `dist`

Cloudflare builds and deploys automatically on push. Set **`DATAFORSEO_LOGIN`** and **`DATAFORSEO_PASSWORD`** on the Pages project so `npm run build` can run `sync-reviews.js`. Ensure `wrangler.toml` has `name` and `pages_build_output_dir = "dist"` so the `functions/` API is used.

---

Form submits to **POST /api/submit-quote**. The Function processes image uploads to Cloudflare R2 and creates a contact in GHL.

### GoHighLevel Features
- **Contact Info**: Name, email, phone, source "Website Quote Form".
- **Tags**: Service type, neighborhood, `quote`, `website`.
- **Image Integration**: Uploads photos to R2 (`media.stokeleads.com`) and saves the URL to a GHL custom field.
- **Project Description**: Saves text and image link to a custom description field.

### Configuration (`wrangler.toml`)
Non-sensitive variables are managed in `wrangler.toml` under `[vars]`. Sensitive tokens (like `HIGHLEVEL_TOKEN`) are managed as **Secrets** in the Cloudflare Dashboard.

| Variable Name | Description | Source |
|---------------|-------------|--------|
| `HIGHLEVEL_TOKEN` | GHL API Key (Bearer Token) | Pages Secrets |
| `HIGHLEVEL_LOCATION_ID` | Your GHL Location ID | `wrangler.toml` |
| `HIGHLEVEL_CUSTOM_FIELD_QUOTE_IMAGE` | The "Quote Image" Field ID | `wrangler.toml` |
| `HIGHLEVEL_CUSTOM_FIELD_PROJECT_DESCRIPTION` | The "Project Description" Field ID | `wrangler.toml` |
| `IMG_BUCKET` | Cloudflare R2 Bucket Binding | `wrangler.toml` |

**Troubleshooting:** 
- "Server configuration error" (500) = Missing environment variables in `wrangler.toml` or missing Secrets in dashboard.
- Styles not updating = Tailwind 4 uses `@theme` in `global.css`; ensure no legacy `tailwind.config.mjs` is present.
- Build error "Return statement is not allowed" = Use standard `if/else` blocks in Astro scripts.

---

## Technical Documentation
For a detailed snapshot of the Astro 6 upgrade, custom field IDs, and maintenance notes, see **[docs/MAINTENANCE.md](file:///Users/mauriciovalencia/Desktop/current/deckmasters/docs/MAINTENANCE.md)**.
