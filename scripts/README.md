# DataForSEO Google Reviews sync

Sync Google Reviews by **business name** (keyword). Multi-client ready.

## Setup

1. **Credentials** — In project root, create `.env` (see `.env.example`):
   - `DATAFORSEO_LOGIN` — your DataForSEO login
   - `DATAFORSEO_PASSWORD` — your API password

2. **Client config** — Edit `scripts/reviews-clients.json`:
   - `defaultSlug` — client used when you run the script with no argument
   - `clients[]` — one object per business

## Running

```bash
# Sync default client (e.g. Deck Masters)
npm run sync-reviews

# Sync a specific client by slug
node scripts/sync-reviews.js deck-masters
```

`npm run build` runs this script automatically before `astro build` (set `DATAFORSEO_*` in Cloudflare Pages build env).

## Adding another client

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

## Flow

1. **task_post** — Creates a task with keyword + location + language.
2. **Poll task_get** — Waits until the task is done (polling every few seconds).
3. **Download avatars** — Saves profile images under `outputAvatarsDir` (filename = review id).
4. **Download review project images** — For reviews that include photos, downloads up to 6 per review to `outputReviewImagesDir` (default `src/assets/review-images`).
5. **Map & write** — Maps DataForSEO fields to `rawReviews` (including **month + year** in `date` for card footers) and writes `outputJson`.

`ReviewsSection.astro` reads `src/data/google-reviews.json` (plus `curated-video-reviews.json`). Use a per-client `outputJson` if you maintain multiple businesses.

**More Good Reviews** — Deprecated; see `scripts/archive/mgr/`.

**Reference data** — `scripts/reference/` holds sample API responses (e.g. DataForSEO my_business_info for Deck Masters). See `scripts/reference/README.md`.
