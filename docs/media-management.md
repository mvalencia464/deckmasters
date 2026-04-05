# Media management (R2 + Astro) — SOP

How **Deck Masters AK** (and sibling Stoke Leads sites using the same pattern) store, upload, and reference project imagery. Follow this so deploys stay predictable and shared buckets stay organized.

---

## Goals

- **One R2 bucket** can serve multiple contractor sites; optional **`R2_SITE_SLUG`** prefixes keys so tenants do not collide.
- **Markdown stays portable**: project front matter uses **relative keys** (`<clientSlug>/<filename>`). The build turns them into public URLs using **`R2_PUBLIC_BASE_URL`** and optional **`R2_SITE_SLUG`**. A legacy `projects/` prefix in keys is still accepted at resolve time but should not be used for new content.
- **Large binaries stay out of Git**: local staging under **`media/raw/`** is gitignored; **R2 is the system of record** for shipped project photos.
- **Build-time images**: this site uses **static output** (no `@astrojs/cloudflare` adapter). Astro **`Image`** + **`image.domains`** fetch remotes during **`astro build`** (Node) and emit optimized assets into **`dist/`**.

---

## Concepts

| Term | Meaning |
|------|---------|
| **Bucket** | Cloudflare R2 bucket (e.g. `media`). S3-compatible API. |
| **Object key** | Full path in the bucket, e.g. `keller/005-aerial-wide.webp` or `deckmasters/keller/005-aerial-wide.webp` if using a site prefix. |
| **Public URL** | `R2_PUBLIC_BASE_URL` + `/` + object key (custom domain or `r2.dev`). |
| **Site slug** | Optional top-level prefix (`R2_SITE_SLUG`) for multi-tenant buckets. Must match where objects **actually** live. |
| **Client slug** | First path segment under the site prefix (or at bucket root), e.g. `keller`, `matt-blakeslee`. |

---

## Production today (Deck Masters AK)

Objects are stored at:

`https://<R2_PUBLIC_HOST>/[<siteSlug>/]<clientSlug>/<file>`

If **`R2_SITE_SLUG`** is set in `.env` / **Cloudflare Pages**, every object key must include that prefix (e.g. `deckmasters/keller/...`). If the slug is set but keys omit it, **`astro build` will 404** when optimizing remote images.

---

## Object key layout

**With `R2_SITE_SLUG` set** (multi-site):

```text
<siteSlug>/<clientSlug>/<filename>
```

**With `R2_SITE_SLUG` unset**:

```text
<clientSlug>/<filename>
```

There are no `projects/`, `images/`, or `videos/` segments in keys—only client + file (flat under the optional site prefix). R2’s UI still shows “folders” by splitting keys on `/`.

---

## Local folder layout (before upload)

**Staging for uploads:** `media/raw/`

Mirror **client** folders without the site slug (the upload script adds `R2_SITE_SLUG` when set). You may keep a legacy **`projects/<clientSlug>/`** tree locally; uploads flatten to `<clientSlug>/<kebab-filename>` in R2.

```text
media/raw/<clientSlug>/<any nested dirs>/<file>
# or legacy:
media/raw/projects/<clientSlug>/<file>
```

Nested folders under a client (e.g. `images/`, `videos/`) are **not** copied into the object key—only the **sanitized basename** is used. **Do not commit `media/raw/`** — gitignored.

---

## Environment variables

Copy **`.env.example`** → **`.env`** locally (never commit `.env`).

| Variable | Required | Purpose |
|----------|----------|---------|
| `R2_ACCOUNT_ID` | Yes (upload + r2-loader) | S3 endpoint account id. |
| `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | Yes | S3 API credentials (short access key id, not the endpoint URL). |
| `R2_BUCKET_NAME` | Yes | Bucket name. |
| `R2_PUBLIC_BASE_URL` | Yes | Public origin, e.g. `https://media.stokeleads.com` (no trailing path). Hostname must appear in **`astro.config.mjs` → `image.domains`**. |
| `R2_SITE_SLUG` | No | Set when objects live under `<slug>/...` at the bucket root. |
| `R2_LEGACY_PREPEND_PROJECTS` | No | `true` only as a **temporary bridge** while URLs must hit bucket-root `projects/<client>/…`. Set **`false`** once objects exist at `<siteSlug>/<client>/…` (after **backfill** / upload). Not a substitute for copying objects into the site prefix. |

**Cloudflare Pages:** set the same build variables for **Production** (and **Preview** if previews must match production media). See [Pages env](https://developers.cloudflare.com/pages/configuration/build-configuration/).

---

## Upload procedure

1. Place files under `media/raw/<clientSlug>/` (or legacy `media/raw/projects/<clientSlug>/`). Filenames are lowercased and kebab-cased on upload.
2. Ensure `.env` has correct `R2_*` and optional `R2_SITE_SLUG`.
3. Optional: `npm run media:upload -- --dry-run`
4. `npm run media:upload`

Optional: `npm run media:upload -- --only keller` to sync one client folder only.

Script: **`scripts/media-upload-r2.mjs`**.

---

## Migrating legacy keys in R2

If you still have `projects/`, `images/`, or `videos/` in stored keys, run a **dry run** first, then test **one object**, then execute:

```bash
npm run media:migrate-flat -- --dry-run
npm run media:migrate-flat -- --single "deckmasters/videos/keller.mp4" --execute
npm run media:migrate-flat -- --execute
```

Use `--map oldKey=newKey` when the automatic rule is wrong (e.g. moving a video into a specific client folder). The script copies, verifies size, then deletes the source.

**Site prefix (`R2_SITE_SLUG`) vs bucket-root `projects/`:** If files still live only under `projects/<client>/...` at the bucket root (no `deckmasters/` segment), Astro will request `https://…/deckmasters/<client>/…` and get **404** until you copy them:

```bash
npm run media:backfill-site-prefix -- --dry-run
npm run media:backfill-site-prefix -- --execute
```

That copies `projects/keller/photo.webp` → `deckmasters/keller/photo.webp` without renaming. Optionally add `--delete-source` after you confirm the site build.

---

## Content (Markdown)

In **`src/content/projects/*.md`**, use **keys**, not full URLs:

```yaml
featuredImage: "keller/005-aerial-wide.webp"
galleryImages:
  - "keller/003-aerial-detail.webp"
video: "keller/keller.mp4"
```

**`src/utils/media.ts`** / **`src/content.config.ts`** resolve to:

- `https://<R2_PUBLIC_BASE_URL>/<key>` when `R2_SITE_SLUG` is unset.
- `https://<R2_PUBLIC_BASE_URL>/<R2_SITE_SLUG>/<key>` when set (and key is not already prefixed).

Absolute `https://...` URLs are passed through unchanged.

---

## Astro / build behavior

- **Output:** static HTML in **`dist/`** — no `@astrojs/cloudflare` worker bundle (avoids Pages + generated `wrangler.json` issues).
- **Projects collection** — Zod transform resolves keys to URLs.
- **`projectImages` collection** — **`src/loaders/r2-loader.ts`** lists flat keys under the site prefix (or bucket root), classifies **images** vs **videos** by file extension.
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
| **404** on remote image during `astro build` | Object missing at built URL. Confirm key in R2 (e.g. `deckmasters/keller/…` vs `projects/keller/…`). Run **`media:backfill-site-prefix`** if needed. **`R2_SITE_SLUG`** must match. Clean: `rm -rf .astro dist`. |
| r2-loader loaded **0** objects | Keys must be flat `client/file` under your prefix; nested paths are skipped. |
| **403** on images | Host in `image.domains`. |
| Wrong objects in R2 | Wrong `--root` or duplicate basenames under one client (upload aborts on collision). |
| Migrate script says “no prefix” locally | **Cloudflare env is not loaded** for CLI—set **`R2_SITE_SLUG`** in `.env` or pass **`--prefix`**. |

---

## Related files

| File | Role |
|------|------|
| `scripts/media-upload-r2.mjs` | Upload `media/raw` → R2 (flat keys). |
| `scripts/r2-migrate-flat.mjs` | One-time copy/delete: strip `projects/` / flatten `videos/` under an existing prefix. |
| `scripts/r2-backfill-site-prefix.mjs` | Copy `projects/<client>/…` → `<siteSlug>/<client>/…` at bucket root. |
| `scripts/lib/r2-naming.mjs` | Kebab-case basename helpers. |
| `src/utils/media.ts` | Key → public URL. |
| `src/content.config.ts` | Zod + `projectImages` loader prefix. |
| `src/loaders/r2-loader.ts` | List R2 objects for content layer. |
| `astro.config.mjs` | Env schema, `image.domains`. |
| `.env.example` | Variable names and notes. |
| `wrangler.toml` | Pages project name, `pages_build_output_dir`, R2 binding for **Functions** (not Astro build). |

---

## Changing `R2_SITE_SLUG` after upload

If you add a slug later, existing keys without that prefix will not resolve. Copy or re-upload objects under `<slug>/...`, then rebuild.

---

## Operational learnings (multi-tenant R2)

- **`R2_SITE_SLUG` is not decorative** — Astro builds URLs as `R2_PUBLIC_BASE_URL` + `/` + `R2_SITE_SLUG` + `/` + key. Objects must exist under that prefix in the bucket (e.g. `deckmasters/keller/…`), or the build gets **404** on remote image fetch.
- **Bucket-root `projects/` ≠ site prefix** — If historical uploads used only `projects/<client>/…` at the bucket root, **`media:backfill-site-prefix`** copies them to `<slug>/<client>/…`. **`media:migrate-flat`** handles different problems (dropping `projects/` *inside* keys that already include your site prefix, flattening `videos/`, etc.).
- **CLI uses local env** — `npm run media:*` loads **`.env`** on your machine, not Cloudflare Pages. Set **`R2_SITE_SLUG`** locally for migrations.
- **`R2_LEGACY_PREPEND_PROJECTS`** — Short-term bridge so flat Markdown keys map to legacy `…/projects/<client>/…` URLs. Set **`false`** once objects live at flat paths under the site prefix.
