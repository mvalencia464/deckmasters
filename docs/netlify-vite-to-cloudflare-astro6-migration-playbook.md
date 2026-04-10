# Netlify + Vite to Cloudflare Pages + Astro 6 Migration Playbook

Use this as a repeatable checklist when cloning the DeckMasters infrastructure for a new site.

## Outcome

- Source framework: Vite site
- Target framework: Astro 6
- Source host: Netlify
- Target host: Cloudflare Pages (static `dist/` + optional `functions/`)
- Optional media layer: Cloudflare R2
- Optional event tracking: Cloudflare Zaraz

## Canonical Reference Docs In This Repo

- `README.md` (commands, Cloudflare Pages deploy shape)
- `docs/MAINTENANCE.md` (stack snapshot and runtime/env expectations)
- `docs/media-management.md` (R2 key format and environment variables)
- `docs/template-clone-and-client-onboarding-playbook.md` (template and onboarding SOP)
- `docs/zaraz/README.md` and `docs/zaraz/SETUP-GUIDE.md` (tracking setup)

## 0) Pre-Migration Audit (Current Vite + Netlify Site)

Before touching code, export and document:

- Netlify environment variables (build + runtime)
- Netlify redirects/rewrites (`_redirects`, `netlify.toml`)
- Scheduled jobs or deploy hooks
- Forms/functions usage on Netlify
- Third-party integrations (CRM, analytics, webhooks)
- Current URL map and SEO-critical pages (home, service/location pages, blog)

Create a migration ticket with:

- Must-keep behavior
- Must-keep URLs
- Risks (forms, API routes, image paths, tracking parity)

## 1) Bootstrap New Astro 6 Project

Create a new repo from this project template approach, then adapt:

1. Initialize Astro 6 app.
2. Copy/adapt reusable architecture:
   - data modules (`src/data/`)
   - content organization (`src/content/`)
   - layout/components patterns (`src/layouts/`, `src/components/`)
3. Move Vite page content into Astro pages/components.
4. If you need dynamic endpoints, implement them as Cloudflare Pages Functions under `functions/`.

Keep early migration simple: static-first pages, minimal client JS.

## 2) Package + Build Convergence

Target conventions used here:

- Build command: `npm run build`
- Output directory: `dist`
- Node runtime: 22+

Checklist:

- Replace Vite-specific tooling/scripts with Astro equivalents.
- Confirm all old Vite aliases/imports still resolve.
- Ensure assets used by Astro build are local or publicly accessible.

## 3) Cloudflare Pages Setup

In Cloudflare Dashboard:

1. Workers & Pages -> Pages -> Connect to Git.
2. Build config:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Configure environment variables (Preview + Production as needed).

Important: if using `functions/`, runtime env vars must be set on the same Pages project.

## 4) Netlify to Cloudflare Behavior Mapping

### Redirects/Rewrites

- Convert Netlify rules to Cloudflare equivalents:
  - static redirects in Astro config/content strategy where possible
  - function routing via `functions/` for API-style endpoints

### Forms/Server Endpoints

- Netlify Forms do not carry over automatically.
- Recreate form handling using:
  - Cloudflare Pages Function endpoint (for example `POST /api/...`)
  - external destination (CRM/webhook/email provider)

### Scheduled Rebuilds

- Replace Netlify scheduled behavior with:
  - GitHub Actions + Cloudflare Pages deploy hook (pattern used in this repo)

## 5) Vite to Astro 6 Content Porting

Porting order:

1. Global shell (layout, head metadata, nav/footer)
2. Home page
3. Revenue/SEO pages (service, location, high-intent pages)
4. Blog/content collections
5. Conversion surfaces (forms, click-to-call, CTAs)

Parity checks:

- Titles/meta/H1s are preserved or improved
- Canonicals and robots behavior match intent
- Internal linking survives migration
- Structured data is still valid

## 6) Optional R2 Media Layer (Match This Repo)

If you want this site to mirror the DeckMasters media model:

- Use R2 for project/gallery assets.
- Keep key naming consistent with `docs/media-management.md`.
- Set `R2_PUBLIC_BASE_URL` and `R2_SITE_SLUG` consistently with actual object paths.

This is the most common source of post-migration image 404s, so verify key prefixes early.

## 7) Tracking and Attribution Parity

If using Zaraz like this project:

- Follow `docs/zaraz/SETUP-GUIDE.md`.
- Rewire high-value events (`phone_click`, `form_submit`, `sale_complete`) to your new site flows.
- Verify event payload contracts before launch.

## 8) Launch QA (Go/No-Go)

- All critical pages render and pass smoke test
- Forms submit successfully in Preview and Production
- Redirects/rewrites work as expected
- Core images load from expected origin (local or R2)
- No placeholder tokens remain in content/config
- Env vars are present in Pages for both runtime and build-time needs
- Lighthouse/CWV roughly in acceptable range vs prior site
- Tracking events fire in the right places

## 9) Cutover Plan (From Netlify)

1. Deploy and verify Cloudflare Pages production URL.
2. Run full QA on that URL.
3. Update DNS to point primary domain to Cloudflare Pages.
4. Re-test HTTPS, canonical host redirect, and form/API flows.
5. Keep Netlify project available for rollback window (short, explicit period).

## 10) Post-Cutover (First 7 Days)

- Monitor 404s and patch missing redirects
- Validate lead flow daily (form + downstream CRM/webhook)
- Compare indexed pages and rankings for key terms
- Confirm scheduled rebuild/refresh jobs are executing

## Reusable Migration Deliverables (Per New Site)

Create these docs/files in each new project:

- `docs/migration-audit.md` (pre-migration inventory)
- `docs/launch-checklist.md` (go-live checklist)
- `docs/env-mapping.md` (old env var -> new env var mapping)
- `docs/redirect-map.md` (old path -> new path/status)

## Fast Start Recommendation

For your next site, start from:

1. `docs/template-clone-and-client-onboarding-playbook.md` for template process
2. This playbook for host/framework migration
3. `README.md` + `docs/MAINTENANCE.md` for exact Cloudflare Pages runtime/build conventions
