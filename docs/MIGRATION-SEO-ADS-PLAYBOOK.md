# DeckMasters Migration SEO + Ads Playbook

## Scope

- Temporary/dev hostname: `https://deckmasters.stokeleads.com/`
- Final production hostname: `https://deckmastersak.com/`
- GBP source of truth (for now): phone `(907) 782-4043`
- Google Ads are active, so destination health is a launch blocker.
- Legacy crawl input reviewed from `Table.csv`.

## Decisions Locked

- Canonical production origin is `https://deckmastersak.com`.
- Keep single-host strategy (no alternate canonical host).
- Old WordPress blog HTML files under `src/data/old-blog/` are reference only and not used for Ads.
- NAP alignment uses `(907) 782-4043` until GBP changes.

## Code Updates Applied

- Updated `src/data/site.json`:
  - `primaryPhone` -> `(907) 782-4043`
- Extended `public/_redirects`:
  - Added wildcard redirects:
    - `/tag/* -> /blog`
    - `/category/* -> /blog`
    - `/author/* -> /blog`
  - Added specific redirect:
    - `/gallery/homepage/ -> /gallery`
- Existing migration work already in repo:
  - Astro `site` set to `https://deckmastersak.com`
  - Sitemap generation enabled (`@astrojs/sitemap`)
  - Canonical/OG URL generation tied to production origin
  - Optional staging `noindex` support via `PUBLIC_NO_INDEX=true`

## Launch Requirements (Execution Checklist)

1. DNS + SSL Cutover
   - Point `deckmastersak.com` to the final Cloudflare Pages project.
   - Enforce one canonical host with 301 (apex or www).
2. Ads Destination Integrity
   - Ensure all active ad final URLs resolve to 200 on `deckmastersak.com`.
   - Verify sitelinks and extensions use final domain.
   - Verify query-string tolerant pages (`gclid`, UTM params) still render normally.
3. Search Console
   - Submit `https://deckmastersak.com/sitemap-index.xml`.
   - Monitor coverage, redirects, and soft-404 reports.
4. GBP Consistency
   - Confirm website URL remains `https://deckmastersak.com/`.
   - Confirm phone displayed on site and GBP remain `(907) 782-4043`.
5. Staging Controls
   - Set `PUBLIC_NO_INDEX=true` on staging/previews.
   - Do not use staging host in paid campaigns.

## Printed URL Inventory

### A) Current Astro pages expected to return 200

- `https://deckmastersak.com/`
- `https://deckmastersak.com/about/`
- `https://deckmastersak.com/alaska/`
- `https://deckmastersak.com/blog/`
- `https://deckmastersak.com/contact/`
- `https://deckmastersak.com/dock-building/`
- `https://deckmastersak.com/featured-project/`
- `https://deckmastersak.com/gallery/`
- `https://deckmastersak.com/hiring/`
- `https://deckmastersak.com/partners/`
- `https://deckmastersak.com/privacy/`
- `https://deckmastersak.com/schedule/`
- `https://deckmastersak.com/services/`
- `https://deckmastersak.com/terms/`
- `https://deckmastersak.com/wall-of-love/`
- `https://deckmastersak.com/10-cool-backyard-deck-design-ideas/`
- `https://deckmastersak.com/alaska-custom-deck-cost-2026-guide/`
- `https://deckmastersak.com/best-decking-materials/`
- `https://deckmastersak.com/deck-benefits/`
- `https://deckmastersak.com/deck-masters-introduction/`
- `https://deckmastersak.com/definitive-2026-deck-building-cost-guide/`
- `https://deckmastersak.com/is-trex-decking-right-for-you/`

### B) URLs from `Table.csv` and expected handling

| URL | Last crawled | Expected handling |
|---|---|---|
| https://deckmastersak.com/best-decking-materials/ | 2026-03-22 | 200 (blog post) |
| https://deckmastersak.com/tag/best-decking-materials/ | 2026-03-22 | 301 -> /blog |
| https://deckmastersak.com/ | 2026-03-22 | 200 |
| https://deckmastersak.com/tag/deck-patio-combo/ | 2026-03-21 | 301 -> /blog |
| https://deckmastersak.com/gallery/ | 2026-03-20 | 200 |
| https://deckmastersak.com/tag/small-simple/ | 2026-03-20 | 301 -> /blog |
| https://deckmastersak.com/10-cool-backyard-deck-design-ideas/ | 2026-03-19 | 200 (blog post) |
| https://deckmastersak.com/contact/ | 2026-03-19 | 200 |
| https://deckmastersak.com/tag/deck-ideas/ | 2026-03-18 | 301 -> /blog |
| https://deckmastersak.com/alaska/ | 2026-03-15 | 200 |
| https://deckmastersak.com/tag/benches/ | 2026-03-13 | 301 -> /blog |
| https://deckmastersak.com/wall-of-love/ | 2026-03-13 | 200 |
| https://deckmastersak.com/about/ | 2026-03-13 | 200 |
| https://deckmastersak.com/tag/deck/ | 2026-03-13 | 301 -> /blog |
| https://deckmastersak.com/dock-building/ | 2026-03-09 | 200 |
| https://deckmastersak.com/deck-benefits/ | 2026-03-04 | 200 (blog post) |
| https://deckmastersak.com/tag/birdhouses/ | 2026-03-04 | 301 -> /blog |
| https://deckmastersak.com/privacy-policy/ | 2026-02-25 | 301 -> /privacy |
| https://deckmastersak.com/hiring/ | 2026-02-21 | 200 |
| https://deckmastersak.com/tag/affordable-home-addition/ | 2026-02-21 | 301 -> /blog |
| https://deckmastersak.com/is-trex-decking-right-for-you/ | 2026-02-19 | 200 (blog post) |
| https://deckmastersak.com/category/deck/ | 2026-02-19 | 301 -> /blog |
| https://deckmastersak.com/tag/exotic-woods/ | 2026-02-17 | 301 -> /blog |
| https://deckmastersak.com/tag/trex-decking-vs-other-decking/ | 2026-02-17 | 301 -> /blog |
| https://deckmastersak.com/tag/two-story-deck/ | 2026-02-16 | 301 -> /blog |
| https://deckmastersak.com/gallery/homepage/ | 2026-02-15 | 301 -> /gallery |
| https://deckmastersak.com/schedule/ | 2026-02-14 | 200 |
| https://deckmastersak.com/author/jordan_webb/ | 2026-02-13 | 301 -> /blog |
| https://deckmastersak.com/tag/pergolas-gazebos/ | 2026-02-06 | 301 -> /blog |
| https://deckmastersak.com/tag/no-railings/ | 2026-01-30 | 301 -> /blog |
| https://deckmastersak.com/tag/trex-decking-composite-wood/ | 2026-01-20 | 301 -> /blog |
| https://deckmastersak.com/tag/kempas/ | 2026-01-04 | 301 -> /blog |
| https://deckmastersak.com/tag/10-cool-backyard-deck-design-ideas/ | 2026-01-02 | 301 -> /blog |
| https://deckmastersak.com/tag/australian-cypress/ | 2026-01-02 | 301 -> /blog |
| https://deckmastersak.com/tag/what-is-trex-decking/ | 2026-01-01 | 301 -> /blog |
| https://deckmastersak.com/tag/built-in-seating/ | 2025-12-29 | 301 -> /blog |
| https://deckmastersak.com/tag/tigerwood/ | 2025-12-29 | 301 -> /blog |
| https://deckmastersak.com/author/alpha/ | 2025-12-27 | 301 -> /blog |
| https://deckmastersak.com/tag/types-of-decking-materials/ | 2025-12-27 | 301 -> /blog |
| https://deckmastersak.com/tag/unique-railings/ | 2025-12-27 | 301 -> /blog |
| https://deckmastersak.com/author/mauricio/ | 2025-12-27 | 301 -> /blog |
| https://deckmastersak.com/blog/ | 2025-12-26 | 200 |
| https://deckmastersak.com/tag/fits-all-terrain/ | 2025-12-26 | 301 -> /blog |
| https://deckmastersak.com/tag/is-trex-decking-affordable/ | 2025-12-26 | 301 -> /blog |
| https://deckmastersak.com/tag/trex/ | 2025-12-26 | 301 -> /blog |
| https://deckmastersak.com/tag/best-uses-for-composite-boards/ | 2025-12-26 | 301 -> /blog |
| https://deckmastersak.com/tag/pressure-treated-wood/ | 2025-12-25 | 301 -> /blog |
| https://deckmastersak.com/tag/outdoor-entertainment-space/ | 2025-12-25 | 301 -> /blog |
| https://deckmastersak.com/tag/composite-decking-material/ | 2025-12-25 | 301 -> /blog |
| https://deckmastersak.com/tag/is-trex-environmentally-friendly/ | 2025-12-25 | 301 -> /blog |
| https://deckmastersak.com/tag/sapele-mahogany/ | 2025-12-21 | 301 -> /blog |
| https://deckmastersak.com/tag/wood-decking-material/ | 2025-12-05 | 301 -> /blog |
| https://deckmastersak.com/tag/composite-materials/ | 2025-12-03 | 301 -> /blog |
| https://deckmastersak.com/tag/increased-home-value/ | 2025-12-03 | 301 -> /blog |
| https://deckmastersak.com/tag/docks/ | 2025-12-03 | 301 -> /blog |
| https://deckmastersak.com/tag/10-benefits-of-adding-a-deck-to-your-home/ | 2025-12-03 | 301 -> /blog |

## Validation Commands (post-deploy quick test)

Use after deployment:

- `curl -I https://deckmastersak.com/sitemap-index.xml`
- `curl -I https://deckmastersak.com/tag/deck/`
- `curl -I https://deckmastersak.com/author/jordan_webb/`
- `curl -I https://deckmastersak.com/gallery/homepage/`
- `curl -I https://deckmastersak.com/deck-benefits/`

Expected:

- `sitemap-index.xml` -> `200`
- legacy archive URLs -> `301` to `/blog`
- live pages/posts -> `200`
