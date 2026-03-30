/**
 * Internal drip-publishing plan (shown on /admin/publishing only).
 * The full site may hold ~50–60 URLs; we release them in batches so Google is not flooded
 * with dozens of new pages in a single crawl window. Edit batches as the plan evolves.
 */

/** Hero + intro on /admin/publishing */
export const publishingFocus = {
  title: 'Why drip publishing',
  body:
    'Most of the build can be done in the repo ahead of time. The operational question is when URLs go live and get crawled. Shipping 30+ pages in one drop can dilute crawl budget and delay indexing; a steadier cadence (first wave slightly larger, then smaller waves) lines up better with how we verify coverage in Google Search Console before the next batch.',
};

export interface ReleaseBatch {
  /** Short name, e.g. "Batch 1 — week 1" */
  label: string;
  /** Typical size band for this wave */
  pageRange: string;
  /** What to prioritize in this wave */
  focus: string;
  /** Example URL groups or page types (adjust to match site-structure) */
  examples: string[];
  /** Gate before starting the next batch */
  gateBeforeNext: string;
}

/**
 * Illustrative sequence for ~50–60 total public URLs.
 * Replace labels with real week windows when you schedule; keep pageRange bands as guardrails.
 */
export const releaseBatches: ReleaseBatch[] = [
  {
    label: 'Batch 1 — first week',
    pageRange: '8–12 URLs',
    focus:
      'Core crawl paths: homepage, conversion pages, and the main service hubs so Google sees money pages and internal linking first.',
    examples: [
      'Home, contact, schedule, about',
      '/services index + primary category hubs (as agreed)',
      'High-intent marketing pages you want ranking first (e.g. Alaska, featured project if in scope)',
    ],
    gateBeforeNext:
      'In GSC: new URLs requested/indexed or clearly in “Discovered / crawled”; fix Coverage issues. Do not start batch 2 until this batch looks healthy.',
  },
  {
    label: 'Batch 2 — week 2 (or start of week 2)',
    pageRange: '4–6 URLs',
    focus: 'Next tier of service depth: core hubs and first child pages under priority categories.',
    examples: [
      'Remaining category or core pages not in batch 1',
      'First child pages under top revenue categories',
    ],
    gateBeforeNext:
      'Re-check GSC for batch 1 + 2 URLs; confirm internal links from new pages resolve. Then schedule batch 3.',
  },
  {
    label: 'Batch 3 onward — every 1–2 weeks',
    pageRange: '4–6 URLs per wave',
    focus: 'Long-tail and supporting pages: additional child pages, blog posts already drafted, gallery/utility pages as needed.',
    examples: [
      'Remaining child/service URLs',
      'Blog posts (stagger so not all hit at once)',
      'Secondary landings (partners, hiring, etc.) if not already live',
    ],
    gateBeforeNext:
      'After each wave: spot-check indexing for prior batches; resolve soft 404s or duplicate issues before adding the next slice.',
  },
  {
    label: 'Final sweep',
    pageRange: 'Remaining URLs',
    focus: 'Anything held back for last: low-priority child pages, experimental landings, or pages waiting on assets.',
    examples: ['Stragglers from site-structure checklist', 'Optional blog backlog'],
    gateBeforeNext:
      'Full sitemap review in GSC; one pass on internal links and orphan URLs.',
  },
];

export interface StrategySection {
  title: string;
  summary: string;
  bullets: string[];
}

export const launchStrategy: StrategySection[] = [
  {
    title: 'Cadence (rule of thumb)',
    summary:
      'First wave is slightly larger so crawlers see the site skeleton; after that, smaller drops reduce the risk of a single huge “new URL” spike.',
    bullets: [
      'Week 1: about 8–12 pages live (not the entire ~50–60 at once).',
      'Thereafter: about 4–6 pages per week, or every two weeks if you prefer a slower drip.',
      'Dropping 30+ URLs in one day is the pattern to avoid unless you have a strong reason and monitoring in place.',
    ],
  },
  {
    title: 'Google Search Console between batches',
    summary:
      'Batches are gated on evidence, not calendar optimism: the previous set should be crawled and indexed (or clearly progressing) before you add the next.',
    bullets: [
      'Submit/refresh the sitemap after each meaningful go-live.',
      'Use URL inspection for a sample of new URLs; watch Coverage for “Excluded” or “Error” spikes.',
      'If a batch stalls (many “Crawled — not indexed”), pause the next release until causes are understood.',
    ],
  },
  {
    title: 'What this page is not',
    summary:
      'Operational marketing (GBP posts, review asks, blog cadence) still matters — but this screen is about which URLs hit the public web when, to stay aligned with indexing reality.',
    bullets: [
      'Build and content can be finished in Git before public release; “publishing” here means go-live to crawlers.',
      'Keep the detailed route map in /admin/site-structure; use the batches above as the release checklist.',
    ],
  },
  {
    title: 'Google Business Profile (reminder)',
    summary:
      'GBP stays parallel: NAP matches site, photos, posts — it does not replace drip URL releases but complements local visibility.',
    bullets: [
      'Keep NAP identical to site.json and footer.',
      'Review velocity and GBP posts are ongoing, not tied to a single page batch.',
    ],
  },
];

/** Shown in a sidebar on the admin page */
export const deployCadenceNote = {
  title: 'Automated deploy (production)',
  lines: [
    'GitHub Actions workflow `.github/workflows/scheduled-pages-deploy.yml` POSTs the Cloudflare Pages deploy hook daily at 07:00 UTC (`workflow_dispatch` runs it manually too).',
    'Cloudflare Pages runs your project build — keeps live reviews and build output fresh.',
    'Drip publishing is a routing / navigation / sitemap decision: you can keep pages out of the main nav or behind noindex until their batch, or ship code with URLs gated by your release process.',
  ],
};
