# Scripts

| Script | npm | Purpose |
|--------|-----|---------|
| `sync-reviews.js` | `npm run sync-reviews` | Google Reviews via DataForSEO (see below) |
| `media-upload-r2.mjs` | `npm run media:upload` | Upload `media/raw/` → R2 with flat keys + kebab basenames |
| `r2-migrate-flat.mjs` | `npm run media:migrate-flat` | One-time: rewrite legacy paths (`projects/`, `videos/`, etc.) inside R2 |
| `r2-backfill-site-prefix.mjs` | `npm run media:backfill-site-prefix` | Copy bucket-root `projects/<client>/…` → `<R2_SITE_SLUG>/<client>/…` |
| `lib/r2-naming.mjs` | (imported) | Shared kebab-case helpers for upload |

**Full R2 SOP:** **`docs/media-management.md`**.

---

## DataForSEO Google Reviews sync

Sync Google Reviews by **business name** (keyword). Multi-client ready.

### Setup

1. **Credentials** — In project root, create `.env` (see `.env.example`):
   - `DATAFORSEO_LOGIN` — your DataForSEO login
   - `DATAFORSEO_PASSWORD` — your API password

2. **Client config** — Edit `scripts/reviews-clients.json`:
   - `defaultSlug` — client used when you run the script with no argument
   - `clients[]` — one object per business

### Running

```bash
# Sync default client (e.g. Deck Masters)
npm run sync-reviews

# Sync a specific client by slug
node scripts/sync-reviews.js deck-masters
```

`npm run build` runs this script automatically before `astro build` (set `DATAFORSEO_*` in Cloudflare Pages build env).

### Adding another client

Add an entry to `clients` in `reviews-clients.json`:

```json
{
  "slug": "acme-contracting",
  "name": "Acme Contracting",
  "keyword": "acme contracting denver",
  "location_code": 2114,
  "language_code": "en",
  "depth": 20,
  "sort_by": "highest_rating",
  "outputJson": "src/data/acme-google-reviews.json",
  "outputAvatarsDir": "src/assets/avatars/acme"
}
```

- **keyword** — Business name as people search (e.g. "deck masters ak", "acme contracting denver").
- **location_code** — DataForSEO location code (e.g. `2840` = Anchorage). Get codes from [DataForSEO Locations](https://docs.dataforseo.com/v3/business_data-google-locations/). You can use **location_name** instead, e.g. `"location_name": "Anchorage,Alaska,United States"`.
- **outputJson** / **outputAvatarsDir** — Where to write reviews and avatars for this client (use different paths per client to avoid overwriting).

Then run:

```bash
node --env-file=.env scripts/sync-reviews.js acme-contracting
```

### Flow

1. **task_post** — Creates a task with keyword + location + language.
2. **Poll task_get** — Waits until the task is done (polling every few seconds).
3. **Download avatars** — Saves profile images under `outputAvatarsDir` (filename = review id).
4. **Download review project images** — For reviews that include photos, downloads up to 6 per review to `outputReviewImagesDir` (default `src/assets/review-images`).
5. **Map & write** — Maps DataForSEO fields to `rawReviews` (including **month + year** in `date` for card footers) and writes `outputJson`.

`ReviewsSection.astro` reads `src/data/google-reviews.json` (plus `curated-video-reviews.json`). Use a per-client `outputJson` if you maintain multiple businesses.

**Reference data** — `scripts/reference/` holds sample API responses (e.g. DataForSEO my_business_info for Deck Masters). See `scripts/reference/README.md`.

---

## R2 media pipeline (upload → optional migration)

1. **Stage files** under `media/raw/<clientSlug>/` (or legacy `media/raw/projects/<clientSlug>/`). The upload script flattens nested folders to **kebab-case basenames** only in the object key.
2. **Optional local AVIF** — There is no `media:optimize` script in this repo. If you pre-encode to `media/dist/`, mirror basenames you expect on R2; otherwise upload originals and let **`astro build`** fetch and optimize remotes.
3. **Upload:** `npm run media:upload -- --dry-run` then `npm run media:upload` (needs `R2_*` in `.env`). Use `--only <clientSlug>` for one folder.
4. **One-time bucket fixes** (run from a machine with `.env`, not from Cloudflare’s build):
   - **`media:migrate-flat`** — Strips `projects/` / rewrites `videos/` *inside* keys already under your site prefix (e.g. `deckmasters/projects/...` → `deckmasters/...`).
   - **`media:backfill-site-prefix`** — If files only existed at **`projects/<client>/...`** at the bucket root, copies them to **`<R2_SITE_SLUG>/<client>/...`** so Astro’s URLs resolve. Optional **`--execute --delete-source`** after you verify.

**Resolved URLs** are implemented in **`src/utils/media.ts`** (see **`docs/media-management.md`**).
