# Deck Masters AK

Static marketing site for a cold-climate deck builder and general contractor. **Astro 6**, **Tailwind CSS v4** (CSS-first), **Cloudflare Pages** (static assets + **Pages Functions** for the quote API).

**Performance:** Pre-rendered HTML, minimal client JS, images optimized at build time (`astro:assets` + Sharp for locals/remotes), and minimal third-party requests.

---

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server |
| `npm run build` | Sync reviews → `astro build` → `./dist` |
| `npm run preview` | Preview production build |
| `npm run sync-reviews` | Google Reviews via DataForSEO only (no full build) |
| `npm run media:upload` | Upload `media/raw/` → R2 (flat keys; see **`docs/media-management.md`**) |
| `npm run media:migrate-flat` | One-time R2 key rewrite (`projects/` / `videos/` → flat); dry-run by default |
| `npm run media:backfill-site-prefix` | Copy `projects/<client>/…` → `<R2_SITE_SLUG>/<client>/…` when using a site prefix |

---

## Documentation

| Doc | Purpose |
|-----|---------|
| **`docs/README.md`** | Index of everything under `docs/` |
| **`docs/media-management.md`** | R2 flat keys, upload, migration/backfill, `R2_SITE_SLUG`, Pages env |
| **`docs/MAINTENANCE.md`** | Stack snapshot, Tailwind 4, GHL quote function, Node 22+ |
| **`scripts/README.md`** | DataForSEO sync, `reviews-clients.json`, adding clients |
| **`docs/MIGRATION-SEO-ADS-PLAYBOOK.md`** | SEO/ads migration notes (legacy WP → Astro) |
| **`docs/site-architecture-prompt-0.md`** | Site hierarchy / internal linking (content planning reference) |

---

## Project media (Cloudflare R2)

Project photos use **flat keys** in Markdown (`<clientSlug>/<file>`). Public URLs are `R2_PUBLIC_BASE_URL` + optional **`R2_SITE_SLUG`** + key. **`R2_SITE_SLUG`** in Pages must match object paths in the bucket (e.g. `deckmasters/keller/…`). **`R2_LEGACY_PREPEND_PROJECTS`** should stay **`false`** once objects live at flat paths (no long-term `projects/` segment in URLs).

Details: **`docs/media-management.md`** · **`scripts/README.md`** (R2 section).

---

## Google Reviews (DataForSEO)

Reviews power the homepage and wall-of-love. **`npm run build`** runs **`scripts/sync-reviews.js` first** (needs **`DATAFORSEO_LOGIN`** and **`DATAFORSEO_PASSWORD`** locally and on Cloudflare Pages).

Avatars and review images sync into **`src/assets/`**; project hero/gallery URLs point at **R2** (see media doc).

**Auto-redeploy:** `.github/workflows/scheduled-pages-deploy.yml` hits a Cloudflare **deploy hook** daily. Set repo secret **`CLOUDFLARE_PAGES_DEPLOY_HOOK_URL`**.

Details: **`scripts/README.md`**.

---

## Project structure (high level)

- `src/data/` — `site.json`, `google-reviews.json`, curated video reviews, copy modules
- `src/content/` — blog and project Markdown (content layer)
- `src/components/`, `src/pages/`, `src/layouts/`
- `src/styles/global.css` — Tailwind 4 `@theme` and globals
- `functions/api/submit-quote.js` — **POST /api/submit-quote** (GHL + R2 image upload)

---

## Deploy (Cloudflare Pages)

Connect the repo: **Workers & Pages → Pages → Connect to Git**.

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Build output directory | **`dist`** (pure static output; no Astro Cloudflare adapter) |

**Build-time env (Pages → Settings → Environment variables):** at minimum **`DATAFORSEO_*`**, **`PUBLIC_GOOGLE_MAPS_API_KEY`**, and **R2 vars** as in **`.env.example`** (`R2_PUBLIC_BASE_URL`, **`R2_SITE_SLUG`** if you use a site prefix, **`R2_LEGACY_PREPEND_PROJECTS=false`** after migration).

**Functions / secrets:** **`HIGHLEVEL_*`** and **`HIGHLEVEL_TOKEN`** (encrypted) for `functions/api/submit-quote.js` — set in the same Pages project (not committed). **`wrangler.toml`** in this repo names the Pages project, `pages_build_output_dir`, and the **`IMG_BUCKET`** R2 binding for Functions; it does **not** store API tokens.

**`R2_SITE_SLUG`:** Must match the prefix of keys in R2 (e.g. `deckmasters/...`). A mismatch causes **404** during image optimization.

---

## Quote form → GHL

Browser posts to **POST /api/submit-quote**. The Function can upload photos to R2 and create/update a **GoHighLevel** contact (tags, custom fields). Configure IDs and token via Pages (see **`docs/MAINTENANCE.md`**).

---

## Troubleshooting

- **500** on quote submit — Missing **`HIGHLEVEL_*`** or R2 binding / secrets in Pages.
- **404 on remote images during build** — Object missing at the URL Astro builds (check **`R2_SITE_SLUG`** vs keys, run **`media:backfill-site-prefix`** if files still sit under bucket-root `projects/`). See **`docs/media-management.md`**.
- **Styles look wrong** — Tailwind 4 uses **`@theme`** in `global.css`; do not add a legacy `tailwind.config` for v3-style setup.
