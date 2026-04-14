# Astro Stoke Starter

Opinionated **Astro 6** + **Tailwind CSS v4** starter for StokeLeads client marketing sites. Patterns match the parent **deckmasters-astro** codebase: static output, `@theme` tokens, shared layout with SEO defaults, Google fonts via Astro Fonts, and a simple `site.json` for business fields. If you copied this folder into its own repository, delete this paragraph or point it at your own reference project.

## Quick start

From the repo root (or after copying this folder out on its own):

```bash
cd astro-stoke-starter
npm install
npm run dev
```

Open the local URL shown in the terminal.

| Command | What it does |
|--------|----------------|
| `npm run dev` | Local dev server (hot reload) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the `dist/` build locally |

## Using this as a template for a new site

1. **Copy the folder** `astro-stoke-starter/` into a new repository (or use GitHub “Use this template” if you publish it as a template repo).
2. **Search and replace** placeholders:
   - `astro.config.mjs` → set `site` to your production URL (canonical links + sitemap).
   - `src/data/site.json` → business name, phone, email, city, tagline, `nav` and `footerNav`.
   - `src/assets/icon.svg` → your favicon/mark (or swap for PNG/WebP in `public/` and update the `<link rel="icon">` in `src/layouts/Layout.astro`).
3. **Brand colors** → edit `src/styles/global.css` (`@theme`, especially `--color-brand-orange` and `.brand-text-gradient`).
4. **Fonts** → adjust `fonts` in `astro.config.mjs` (or change `--font-sans` / `--font-display` in `global.css` if you switch families).
5. **Staging** → copy `.env.example` to `.env` and set `PUBLIC_NO_INDEX=true` so previews stay out of Google until launch.

## What’s included

| Item | Notes |
|------|--------|
| Static HTML | `output: 'static'` |
| Tailwind v4 | Vite plugin in `astro.config.mjs` |
| Design tokens | `src/styles/global.css` `@theme` |
| Layout + meta | Title template, description, canonical, Open Graph, `PUBLIC_NO_INDEX` |
| Sitemap | `@astrojs/sitemap` |
| Header / footer | Driven by `site.json`; responsive nav with mobile overlay |
| Example pages | Home, About, Contact, Privacy placeholder, 404 |

## What’s intentionally left out

No analytics scripts, no CMS, no form backend, no image pipeline beyond Astro defaults, no Cloudflare/R2 tooling—add per client.

## Relationship to the reference site

When this starter lives inside the deckmasters-astro repository, the full production site is in the parent directory. The starter is a **trimmed, generic** snapshot of the same architecture so new projects don’t copy site-specific data or integrations.

## License

Use freely for client and internal projects. Add your own license file in forks if needed.
