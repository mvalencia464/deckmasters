# Vite → Astro migration guide (aligned with this repo)

This document describes how to stand up a new Astro site using the **same kind of stack and patterns** as this project (`deckmasters-astro`), and how to migrate an existing **Vite** app into it.

---

## Convert the existing site vs. build from scratch?

**Recommended default: neither “pure convert” nor “blank rewrite”—do an incremental port.**

| Approach | When it makes sense |
|----------|---------------------|
| **Incremental port (recommended)** | Most real sites. Create a fresh Astro project with the target architecture, then move **one route or feature at a time** (home → inner pages → forms). Keeps shipping possible; you can run old and new in parallel until cutover. |
| **Lift-and-shift “conversion”** | Small marketing sites with few routes, little client JS, and mostly static HTML/CSS. Faster, but you inherit old structure and tech debt. |
| **Build from scratch** | The Vite codebase is unmaintainable, security-sensitive, or you’re changing information architecture and design so much that reusing components isn’t worth it. Still reuse **content** (copy, images, JSON) as data. |

**Practical rule:** If your Vite app uses **React or Vue**, you do **not** need to rewrite every component in `.astro`. Use `@astrojs/react` or `@astrojs/vue` and migrate islands first (only hydrate what needs interactivity). If it’s **vanilla Vite + TS**, pages often map cleanly to `.astro` files plus small client scripts.

### Smaller than this repo (typical small business site)

If the site is **smaller than `deckmasters-astro`** (a few pages: home, about, services, contact, maybe one extra), you can simplify everything below:

- **“Convert” here usually means:** run `create astro`, add one shared `Layout.astro`, then rebuild **a handful of `.astro` pages** and move copy and images over. A short sprint is often enough; you do not need a long incremental migration plan.
- **You can skip (until you need them):** elaborate `src/data/` copy modules, custom image pipelines, R2/media scripts, admin tools, or anything this larger repo accumulated over time.
- **Still worth matching this project’s core:** `output: 'static'`, Tailwind v4 + a small `global.css` `@theme`, shared layout with title/description/canonical, and `@astrojs/sitemap` when you go live. That is the “similar framework” without the extra weight.

For that size, **a thin new Astro shell plus pasted-in content** is usually faster and cleaner than mechanically porting every Vite file. Treat the old app as **reference for copy and layout**, not as something to preserve line-for-line.

---

## What “similar framework” means in this repo

High-level conventions you can copy:

| Layer | This project |
|-------|----------------|
| **Framework** | [Astro](https://docs.astro.build/) `^6.x`, **`output: 'static'`** (pre-rendered HTML). |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) via **`@tailwindcss/vite`** in `astro.config` (`vite.plugins: [tailwindcss()]`). |
| **Global theme** | `src/styles/global.css` with `@import "tailwindcss"` and **`@theme { ... }`** for design tokens (colors, fonts, spacing). |
| **Typography** | Astro **Fonts** (`<Font />` from `astro:assets`) in `src/layouts/Layout.astro`, with CSS variables (e.g. `--font-inter`, `--font-oswald`) wired in `@theme`. |
| **Pages** | File-based routing: `src/pages/**/*.astro` → URLs. |
| **Layout** | Shared shell: meta, header/nav, footer, slots for `head` and page body. |
| **Content / config** | JSON + TS modules under `src/data/` (e.g. `site.json` + typed copy helpers). Adjust to your brand; the **pattern** is “central site facts + page copy functions”. |
| **Images** | `astro:assets` `<Image />` where possible; `astro.config` `image` options for formats/domains/sharp pipeline as needed. |
| **SEO** | `@astrojs/sitemap`, canonical URLs, `site` in `astro.config`. |

Your other project might not need every integration (sitemap, custom image service, R2 scripts). **Start minimal**; add only what that site requires.

---

## Phase 1 — Bootstrap a new Astro project (mirror this stack)

### Option A — Use the repo starter (fastest)

This repository includes **Astro Stoke Starter** (`astro-stoke-starter/`): a minimal Astro + Tailwind v4 layout aligned with the patterns above (static build, `@theme`, `Layout.astro`, `site.json`, sitemap). Copy that folder into a new repo and follow its `README.md`, or bootstrap manually below.

### 1. Create the project

```bash
npm create astro@latest
```

Suggested choices for a marketing/site similar to this one:

- **Template:** Empty or minimal (you’ll add layout yourself).
- **TypeScript:** Yes (strict extends `astro/tsconfigs/strict` like here).
- **Install dependencies:** Yes.

### 2. Align `package.json` scripts

Match the basics:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

Add more scripts only when needed (deploy, content sync, etc.).

### 3. Dependencies (Tailwind v4 + Astro 6)

This repo uses:

- `astro`
- `tailwindcss` + `@tailwindcss/vite`

Install the same major versions your team standardizes on (see this repo’s `package.json` for reference).

### 4. `astro.config`

Minimum to mirror **Tailwind v4 via Vite plugin** (same pattern as here):

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://your-domain.com', // required for absolute canonicals + sitemap
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

Add `@astrojs/sitemap` when you’re ready for production SEO.

### 5. TypeScript paths (optional but nice)

Like `tsconfig.json` here:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 6. Global CSS + design tokens

1. Add `src/styles/global.css` starting from:

   - `@import "tailwindcss";`
   - `@theme { ... }` for your brand colors, `font-sans`, `font-display`, etc.

2. Import it once from your root layout (see below).

### 7. Root layout

Create `src/layouts/Layout.astro` that:

- Sets `<html lang="...">`, viewport, default `<title>` / description pattern.
- Imports `../styles/global.css`.
- Optionally uses `<Font />` for Google fonts (same pattern as this repo’s `Layout.astro`).
- Provides `<slot name="head" />` for page-specific meta/scripts.
- Renders shared chrome: header, footer.

### 8. First page

`src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Home" description="...">
  <section>...</section>
</Layout>
```

### 9. Verify

```bash
npm run dev
npm run build && npm run preview
```

---

## Phase 2 — Map your Vite app to Astro

### Routing

| Vite | Astro |
|------|--------|
| `index.html` or router `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| Dynamic `/blog/:slug` | `src/pages/blog/[slug].astro` |
| SPA client routes only | Prefer **file-based routes** in Astro; avoid making the whole site a client-only SPA unless necessary. |

### Components

| Vite | Astro |
|------|--------|
| HTML partials / template strings | `.astro` components (HTML + frontmatter). |
| React `.tsx` | Keep as `.tsx`, add `@astrojs/react`, use in `.astro` with `client:load` / `client:visible` only where needed. |
| Vue SFC | `@astrojs/vue` + partial hydration. |
| Shared CSS | Tailwind utilities + small `@layer` blocks in `global.css` or scoped `<style>` in `.astro`. |

### Assets

- Move static files to `public/` when they must be verbatim URLs.
- Prefer `src/assets/` + `astro:assets` for images that should be optimized.

### Environment variables

- Vite: `import.meta.env.VITE_*`
- Astro: `import.meta.env.PUBLIC_*` for client-safe vars; follow [Astro env docs](https://docs.astro.build/en/guides/environment-variables/) for server secrets and `astro.config` `env.schema` if you use validated env (this repo uses `envField` for server tooling).

---

## Phase 3 — Content and design parity

1. **Extract copy** into `src/data/` (JSON or `.ts` modules) so pages stay thin—same idea as `marketingPagesCopy` / `site.json` here.
2. **Recreate spacing and type scale** using your `@theme` tokens and Tailwind utilities (`font-display`, `text-neutral-800`, section padding patterns).
3. **Forms:** server actions or your existing API—static sites often POST to an external endpoint or serverless function; mirror whatever this repo does for forms if you deploy similarly.

---

## Phase 4 — Cutover checklist

Use this as a release gate:

- [ ] `npm run build` succeeds with no errors.
- [ ] All important URLs match old site or 301s are planned.
- [ ] Meta titles/descriptions and Open Graph tags per page.
- [ ] `site` in `astro.config` correct; canonical URLs behave as expected.
- [ ] Sitemap generated if you use `@astrojs/sitemap`.
- [ ] Images: LCP image uses appropriate `loading` / `fetchpriority` on hero.
- [ ] Analytics / tag manager (if any) injected via layout or `slot="head"`.
- [ ] 404 page: `src/pages/404.astro`.
- [ ] Lighthouse / accessibility spot check on key templates.

---

## Optional: machine-readable checklist (JSON)

If you want the same checklist in JSON for tooling or CI, you can duplicate the **Phase 4** items as an array of `{ "id", "label", "done" }` objects in your own repo—there is no need for a second format unless automation requires it.

---

## Summary

- **Best path for most teams:** new Astro app + **same stack as this repo** (Astro static, Tailwind v4 via Vite plugin, global `@theme`, shared `Layout`) + **incremental migration** from the Vite project.
- **Avoid** a big-bang rewrite unless the old app is truly not worth salvaging; **avoid** a naive one-to-one port if it copies spaghetti—use migration as a chance to **thin pages and centralize content**.

For concrete file references while you work, compare this repository’s `astro.config.mjs`, `src/layouts/Layout.astro`, `src/styles/global.css`, and `src/pages/*.astro`.
