# Media management (R2 + Astro) — SOP

This document describes how **Deck Masters AK** (and sibling Stoke Leads sites using the same pattern) store, name, upload, and reference project imagery. Follow it so every deployment stays predictable and multi-tenant buckets stay organized.

---

## Goals

- **One shared R2 bucket** can serve many client sites; each site uses a **site slug** prefix so object keys never collide.
- **Markdown stays portable**: front matter stores **relative object keys** (not full URLs). The build prepends `R2_PUBLIC_BASE_URL` (and optional `R2_SITE_SLUG`).
- **Large binaries do not live in Git**: local staging under `media/raw/` is gitignored; **R2 is the system of record** for shipped project photos.
- **Astro `<Image />`** can optimize remote files from an **allowlisted host** (`astro.config.mjs` → `image.domains`).

---

## Concepts

| Term | Meaning |
|------|--------|
| **Bucket** | Cloudflare R2 bucket (e.g. `media`). S3-compatible API. |
| **Object key** | Path inside the bucket, e.g. `deckmastersak/projects/keller/001-aerial-wraparound.webp`. |
| **Public URL** | `R2_PUBLIC_BASE_URL` + `/` + object key (custom domain or `r2.dev`). |
| **Site slug** | Short id for *this* deployed site in a shared bucket (`R2_SITE_SLUG`), e.g. `deckmastersak`. Aligns with domain branding, not necessarily the Pages project name. |
| **Client slug** | Folder under `projects/`, e.g. `keller`, `derek-clark`, `matt-blakeslee`. |

---

## Object key layout (canonical)

With **`R2_SITE_SLUG` set** (recommended for multi-site buckets):

```text
<siteSlug>/projects/<clientSlug>/<filename>
```

Example:

```text
deckmastersak/projects/derek-clark/composite-stairs-angle.jpg
```

With **`R2_SITE_SLUG` empty** (single-site or legacy):

```text
projects/<clientSlug>/<filename>
```

The R2 dashboard shows “folders” by splitting keys on `/`; that is normal—R2 has flat keys with `/` in the name.

---

## Local folder layout (before upload)

**Source of truth for upload:** `media/raw/`

Mirror the **object key** under `media/raw/`, without the site slug (the upload script adds the slug):

```text
media/raw/projects/<clientSlug>/<filename>
```

Example on disk:

```text
media/raw/projects/keller/001-aerial-wraparound.webp
media/raw/projects/derek-clark/composite-stairs-angle.jpg
```

**Do not commit `media/raw/`** — it is gitignored to keep the repo small. Keep a backup copy elsewhere if needed (Drive, R2 versioning, etc.).

Optional: keep **smaller** copies or working files under `src/assets/projects/` for local reference; production URLs still come from R2 keys in content.

---

## Environment variables

Copy from **`.env.example`** into **`.env`** locally (never commit `.env`).

| Variable | Required | Purpose |
|----------|----------|---------|
| `R2_ACCOUNT_ID` | Yes (upload + build loader) | Cloudflare account id for S3 endpoint. |
| `R2_ACCESS_KEY_ID` | Yes | S3 API access key id (short id, not the endpoint URL). |
| `R2_SECRET_ACCESS_KEY` | Yes | S3 API secret. |
| `R2_BUCKET_NAME` | Yes | Target bucket name. |
| `R2_PUBLIC_BASE_URL` | Yes | Public origin, e.g. `https://media.stokeleads.com` (no trailing slash). Must match `image.domains` in Astro for `<Image />`. |
| `R2_SITE_SLUG` | No | e.g. `deckmastersak`. If set, keys and URLs use `<siteSlug>/projects/...`. |

**Cloudflare Pages:** set the same variables for **Production** (and **Preview** if previews must match). Build-time vars must be present when `npm run build` runs. Secrets stay encrypted in the dashboard; see team policy for Wrangler vs dashboard ([Cloudflare: Wrangler as source of truth](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#source-of-truth)).

---

## Upload procedure

1. Place or copy files into `media/raw/projects/<clientSlug>/` with **stable, descriptive filenames** (lowercase, hyphens).
2. Confirm `.env` has correct `R2_*` and optional `R2_SITE_SLUG`.
3. Dry run (optional):

   ```bash
   npm run media:upload -- --dry-run
   ```

4. Upload:

   ```bash
   npm run media:upload
   ```

The script (`scripts/media-upload-r2.mjs`) walks `media/raw/`, computes keys as paths relative to `media/raw/`, then prefixes with `R2_SITE_SLUG` when set. It skips re-upload when remote size matches unless `--force`.

**Custom root** (advanced):

```bash
npm run media:upload -- --root /path/to/folder
```

Keys are still **relative to that root**; prefer the default so keys stay `projects/...` before the slug prefix.

---

## Content (Markdown) — what editors put in front matter

In `src/content/projects/*.md`, use **keys only**, not full URLs:

```yaml
featuredImage: "projects/keller/001-aerial-wraparound.webp"
galleryImages:
  - "projects/keller/002-aerial-view-new.webp"
```

At build time, `src/content.config.ts` turns those into:

`https://<R2_PUBLIC_BASE_URL>/<R2_SITE_SLUG>/projects/...` when `R2_SITE_SLUG` is set.

You may still use a full `https://...` URL in an emergency; the schema leaves absolute URLs unchanged.

---

## Astro / build behavior (reference)

- **Projects collection** — Zod transform resolves relative keys to public URLs.
- **`projectImages` collection** — `src/loaders/r2-loader.ts` lists objects under the prefix `(<siteSlug>/)projects/` for tooling; optional for pages.
- **`astro.config.mjs`** — `env.schema` includes `R2_*` and optional `R2_SITE_SLUG`; `image.domains` must include the hostname of `R2_PUBLIC_BASE_URL`.

---

## Multi-site / shared bucket (why `R2_SITE_SLUG` exists)

Stoke Leads may host **multiple** contractor sites that share one R2 bucket and one public hostname (e.g. `media.stokeleads.com`). Prefixing by `R2_SITE_SLUG`:

- Keeps each site’s objects under its own top-level “folder” in the dashboard.
- Avoids key collisions between clients on different sites.
- Lets each Pages project set a different slug while reusing the same bucket and upload script.

---

## What not to commit

- **`.env`**, **`.dev.vars`** — secrets and local overrides.
- **`media/raw/`** — large local staging; objects belong in R2.
- **`media/dist/`** — optional generated outputs; gitignored.

Use **`.env.example`** as the checklist for variable *names* only.

---

## Troubleshooting

| Symptom | Check |
|--------|--------|
| `Failed to load remote image` / **404** during `astro build` (image optimization) | **`R2_SITE_SLUG` mismatch.** If the bucket has `projects/...` keys, **omit** `R2_SITE_SLUG` from `.env` and Pages (not the same as setting `R2_SITE_SLUG=`). If the slug is set, public URLs become `<base>/<slug>/projects/...` — that path must exist in R2. After changing slug, run a clean build (`rm -rf .astro dist`) so cached content URLs are not reused. |
| Build says r2-loader loaded `0` images | Keys in bucket must start with `<siteSlug>/projects/` when slug is set; verify with R2 dashboard or `npm run media:upload -- --dry-run`. |
| Images 403 in dev/build | Host must be in `astro.config.mjs` → `image.domains`. |
| Wrong folder in R2 | Upload used wrong `--root`; default should be `media/raw` so relative paths start with `projects/`. |
| Full URL in Markdown works but keys don’t | Typo in key vs actual object name; slug prefix mismatch (`R2_SITE_SLUG` changed after upload). |

---

## Related files

| File | Role |
|------|------|
| `scripts/media-upload-r2.mjs` | Sync `media/raw` → R2. |
| `src/content.config.ts` | Key → URL transform; `projectImages` loader prefix. |
| `src/loaders/r2-loader.ts` | Lists R2 objects for the content layer. |
| `astro.config.mjs` | `env.schema`, `image.domains`. |
| `.env.example` | Variable template. |
| `wrangler.toml` | Pages deploy / bindings (not for storing API secrets). |

---

## Versioning note

If you **change** `R2_SITE_SLUG` after objects were uploaded without it, existing keys under `projects/...` will not match new URLs under `<siteSlug>/projects/...`. Re-upload to the new prefix or copy objects in R2, then rebuild.
