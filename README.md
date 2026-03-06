# Northern Timber & Outdoor Living — Contractor Site

A static, high-performance marketing site for a cold-climate deck builder and general contractor. Built with **Astro 5**, **Tailwind CSS**, and optimized for 98+ Lighthouse, fast LCP, and zero unnecessary JavaScript.

## Stack

- **Astro 5** — static output (`output: 'static'`)
- **Tailwind CSS** — premium 2026 aesthetic (light neutrals, soft grays, muted wood, restrained teal accent)
- **Cloudflare** — deploy `./dist` via Workers Static Assets / Pages

## Commands

| Command        | Action           |
|----------------|------------------|
| `npm run dev`  | Start dev server |
| `npm run build`| Build to `./dist`|
| `npm run preview` | Preview production build |

## Deploy (Cloudflare)

1. Build: `npm run build`
2. Deploy: `npx wrangler pages deploy dist` (or connect repo to Cloudflare Pages with build command `npm run build` and output directory `dist`)

The included `wrangler.toml` points static assets to `./dist`. For 404 handling, Astro static builds do not use SPA fallback by default; add a custom 404 page in `src/pages/404.astro` if desired.

## Project structure

- `src/data/site.json` — single source of truth (business info, services, testimonials, neighborhoods). Edit to update site content.
- `src/layouts/Layout.astro` — header (logo + nav + phone CTA), footer (hours, address, social, trust badges).
- `src/pages/` — index, services, about, contact.
- `src/components/` — Hero, TrustBar, ServiceCard, ReviewCard, ProcessSteps, Gallery, QuoteSection, QuoteForm (island).

## Quote form (phase 2)

**Next steps:** The quote form on the Contact page is currently stubbed. Phase 2 will add:

- Secure **GoHighLevel (GHL)** form submission (server action or serverless endpoint).
- **Cloudflare Turnstile** for spam protection (replace test sitekey with production key).
- API keys and form endpoint configured securely (env / server-only).

Until then, the form shows a placeholder message that submission will be enabled in phase 2.

## Performance

- Minimal JS: only the quote form uses an Astro island (`client:idle`).
- Images: Astro `<Image />` with remote Unsplash placeholders (avif); replace with client photos when ready.
- No third-party script bloat; fonts loaded with `media="print"` + `onload` for non-blocking.

## Aesthetic

Light neutrals, soft grays, muted wood tones, restrained teal/green accent, generous whitespace, subtle hovers and transitions. High-end outdoor living brand feel — trustworthy and aspirational.
