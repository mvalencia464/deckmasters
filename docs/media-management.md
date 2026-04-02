# Media management (R2 + Astro) — SOP

How **Deck Masters AK** (and sibling Stoke Leads sites using the same pattern) store, upload, and reference project imagery. Follow this so deploys stay predictable and shared buckets stay organized.

---

## Goals

- **One R2 bucket** can serve multiple contractor sites; optional **`R2_SITE_SLUG`** prefixes keys so tenants do not collide.
- **Markdown stays portable**: project front matter uses **relative keys** (`projects/...`). The build turns them into public URLs using **`R2_PUBLIC_BASE_URL`** and optional **`R2_SITE_SLUG`**.
- **Large binaries stay out of Git**: local staging under **`media/raw/`** is gitignored; **R2 is the system of record** for shipped project photos.
- **Build-time images**: this site uses **static output** (no `@astrojs/cloudflare` adapter). Astro **`Image`** + **`image.domains`** fetch remotes during **`astro build`** (Node) and emit optimized assets into **`dist/`**.

---

## Concepts

| Term | Meaning |
|------|---------|
| **Bucket** | Cloudflare R2 bucket (e.g. `media`). S3-compatible API. |
| **Object key** | Full path in the bucket, e.g. `projects/keller/005-aerial-wide.webp` or `deckmastersak/projects/keller/005-aerial-wide.webp` if using a site prefix. |
| **Public URL** | `R2_PUBLIC_BASE_URL` + `/` + object key (custom domain or `r2.dev`). |
| **Site slug** | Optional top-level prefix (`R2_SITE_SLUG`) for multi-tenant buckets. Must match where objects **actually** live. |
| **Client slug** | Folder under `projects/` in keys, e.g. `keller`, `matt-blakeslee`. |

---

## Production today (Deck Masters AK)

Objects are stored at:

`https://<R2_PUBLIC_HOST>/projects/<clientSlug>/<file>`

So **`R2_SITE_SLUG` must be omitted** from `.env` and **Cloudflare Pages** build variables until every object is copied or uploaded under a prefixed path such as `deckmastersak/projects/...`. If the slug is set but keys are only under `projects/...`, **`astro build` will 404** when optimizing remote images.

---

## Object key layout

**With `R2_SITE_SLUG` set** (multi-site / new uploads under a prefix):

```text
<siteSlug>/projects/<clientSlug>/<filename>
```

**With `R2_SITE_SLUG` unset** (legacy single-prefix layout):

```text
projects/<clientSlug>/<filename>
```

R2’s UI shows “folders” by splitting keys on `/`; keys are still flat strings.

---

## Local folder layout (before upload)

**Staging for uploads:** `media/raw/`

Mirror the key **without** the site slug (the upload script adds it when `R2_SITE_SLUG` is set):

```text
media/raw/projects/<clientSlug>/<filename>
```

**Do not commit `media/raw/`** — gitignored. Optional small reference copies under `src/assets/projects/` are fine; production URLs still come from R2 keys in content.

---

## Environment variables

Copy **`.env.example`** → **`.env`** locally (never commit `.env`).

| Variable | Required | Purpose |
|----------|----------|---------|
| `R2_ACCOUNT_ID` | Yes (upload + r2-loader) | S3 endpoint account id. |
| `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | Yes | S3 API credentials (short access key id, not the endpoint URL). |
| `R2_BUCKET_NAME` | Yes | Bucket name. |
| `R2_PUBLIC_BASE_URL` | Yes | Public origin, e.g. `https://media.stokeleads.com` (no trailing path). Hostname must appear in **`astro.config.mjs` → `image.domains`**. |
| `R2_SITE_SLUG` | No | Only if objects live under `<slug>/projects/...`. Omit entirely for legacy `projects/...` keys. |

**Cloudflare Pages:** set the same build variables for **Production** (and **Preview** if previews must match production media). See [Pages env](https://developers.cloudflare.com/pages/configuration/build-configuration/).

---

## Upload procedure

1. Place files under `media/raw/projects/<clientSlug>/` with stable, descriptive names (lowercase, hyphens).
2. Ensure `.env` has correct `R2_*` and optional `R2_SITE_SLUG` (only if uploading to a prefixed layout).
3. Optional: `npm run media:upload -- --dry-run`
4. `npm run media:upload`

Script: **`scripts/media-upload-r2.mjs`** (prefixes keys with `R2_SITE_SLUG` when set).

---

## Content (Markdown)

In **`src/content/projects/*.md`**, use **keys**, not full URLs:

```yaml
featuredImage: "projects/keller/005-aerial-wide.webp"
galleryImages:
  - "projects/keller/003-aerial-detail.webp"
```

**`src/content.config.ts`** resolves to:

- `https://<R2_PUBLIC_BASE_URL>/<key>` when `R2_SITE_SLUG` is unset.
- `https://<R2_PUBLIC_BASE_URL>/<R2_SITE_SLUG>/<key>` when set (and key is not already prefixed).

Absolute `https://...` URLs are passed through unchanged.

---

## Astro / build behavior

- **Output:** static HTML in **`dist/`** — no `@astrojs/cloudflare` worker bundle (avoids Pages + generated `wrangler.json` issues).
- **Projects collection** — Zod transform resolves keys to URLs.
- **`projectImages` collection** — **`src/loaders/r2-loader.ts`** lists objects under `projects/` or `<slug>/projects/` for the content layer.
- **`astro.config.mjs`** — `env.schema` for `R2_*` / `R2_SITE_SLUG`; **`image.domains`** for remote optimization.

---

## Multi-site / shared bucket

For **multiple contractor sites** on one bucket and hostname, set a distinct **`R2_SITE_SLUG`** per **Cloudflare Pages** project and upload keys under that prefix. Align slug, R2 keys, and Markdown before enabling the slug in env.

---

## What not to commit

- **`.env`**, **`.dev.vars`**
- **`media/raw/`**, optional **`media/dist/`**

---

## Troubleshooting

| Symptom | Check |
|--------|--------|
| **404** on remote image during `astro build` | **`R2_SITE_SLUG`** must match R2 keys. For `projects/...` only, **omit** the variable (here and on Pages). After changing slug, clean: `rm -rf .astro dist`. |
| r2-loader loaded **0** images | Prefix in bucket must match `(<slug>/)projects/` for your env. |
| **403** on images | Host in `image.domains`. |
| Wrong objects in R2 | Wrong `--root` on upload; default should mirror `projects/...` under `media/raw/`. |

---

## Related files

| File | Role |
|------|------|
| `scripts/media-upload-r2.mjs` | Upload `media/raw` → R2. |
| `src/content.config.ts` | Key → URL; `projectImages` loader prefix. |
| `src/loaders/r2-loader.ts` | List R2 objects for content layer. |
| `astro.config.mjs` | Env schema, `image.domains`. |
| `.env.example` | Variable names and notes. |
| `wrangler.toml` | Pages project name, `pages_build_output_dir`, R2 binding for **Functions** (not Astro build). |

---

## Changing `R2_SITE_SLUG` after upload

If you add a slug later, existing **`projects/...`** keys will not match new URLs under **`<slug>/projects/...`**. Copy or re-upload objects to the new prefix, then rebuild.
