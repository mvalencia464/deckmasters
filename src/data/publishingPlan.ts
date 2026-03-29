/**
 * Internal publishing calendar & launch strategy (shown on /admin/publishing only).
 * Edit dates and rows as the plan evolves — not customer-facing.
 */

export interface PublishingWeek {
  /** Display label, e.g. "Mar 31 – Apr 6, 2026" */
  label: string;
  /** Focus theme for the week */
  theme: string;
  /** Concrete deliverables */
  tasks: string[];
}

/** Rolling ~8-week window; advance / replace rows each quarter. */
export const publishingWeeks: PublishingWeek[] = [
  {
    label: 'Mar 31 – Apr 6, 2026',
    theme: 'Post-launch stabilization',
    tasks: [
      'Google Search Console: confirm property, submit sitemap, check Coverage for obvious errors',
      'GBP: verify NAP matches site + footer; add 3–5 new project photos; respond to any new Q&A',
      'Spot-check core service + child URLs on mobile (CTA, tel:, quote form)',
    ],
  },
  {
    label: 'Apr 7 – Apr 13, 2026',
    theme: 'Reviews & trust',
    tasks: [
      'Request reviews from 3–5 recent happy jobs (SMS/email with direct GBP link)',
      'Wall of Love / homepage: confirm review sync after scheduled deploy (google-reviews.json)',
      'Add one short case-style note to a service page or blog (before/after or scope)',
    ],
  },
  {
    label: 'Apr 14 – Apr 20, 2026',
    theme: 'Content — one pillar piece',
    tasks: [
      'Publish one long-form blog aligned to a money keyword (cost, materials, or repairs)',
      'Internal links: new post → relevant /services/* hubs and back',
      'Optional: short clip for GBP or featured project (15–30s on-site)',
    ],
  },
  {
    label: 'Apr 21 – Apr 27, 2026',
    theme: 'GBP engagement',
    tasks: [
      'Weekly GBP post (seasonal tip, project highlight, or offer if applicable)',
      'Update services list in GBP to mirror site architecture (no orphan categories)',
      'Photo batch: upload 5+ jobsite or detail shots',
    ],
  },
  {
    label: 'Apr 28 – May 4, 2026',
    theme: 'Local relevance',
    tasks: [
      'Second blog or FAQ expansion targeting a neighborhood + intent (e.g. Hillside, repair)',
      'Check competitor GBP categories; adjust secondary categories only if accurate',
      'Build 1–2 local citations (BBB, Alignable, industry) if not already present',
    ],
  },
  {
    label: 'May 5 – May 11, 2026',
    theme: 'Technical hygiene',
    tasks: [
      'Re-run Lighthouse on homepage + /contact; fix easy wins (images, LCP)',
      'Confirm robots.txt + sitemap in GSC; fix any soft 404s',
      'Review Search Console queries: add FAQ or copy tweaks where impressions are high but CTR low',
    ],
  },
  {
    label: 'May 12 – May 18, 2026',
    theme: 'Seasonal push (pre-summer)',
    tasks: [
      'Homepage or deck-building hub: refresh copy for “book before peak season” if still accurate',
      'Email past leads with maintenance or inspection offer (if list exists)',
      'GBP post: scheduling / estimate CTA',
    ],
  },
  {
    label: 'May 19 – May 25, 2026',
    theme: 'Measure & adjust',
    tasks: [
      'Export GSC 28-day comparison: top pages and queries',
      'GBP insights: views, calls, direction requests — set next quarter targets',
      'Update this calendar for the next 8 weeks',
    ],
  },
];

export interface StrategySection {
  title: string;
  summary: string;
  bullets: string[];
}

export const launchStrategy: StrategySection[] = [
  {
    title: 'Google Business Profile (GBP)',
    summary:
      'GBP is the fastest local lever: same brand, address, and phone as the site; strong photos; regular posts; and review velocity.',
    bullets: [
      'Keep NAP identical to site.json and footer (no typos in suite or ZIP).',
      'Primary category: Deck Builder; secondaries match real work (repair, GC, outdoor living).',
      'Photos: mix of wide shots, detail/craft, team — refreshed monthly.',
      'Review strategy: ask within 48h of completion; reply to every review professionally.',
      'Use Q&A to seed real homeowner questions (one person asks, official account answers).',
      'Track GBP metrics monthly (views, calls, directions) and tie posts to seasonality in Anchorage.',
    ],
  },
  {
    title: 'Organic SEO (site)',
    summary:
      'Hubs (/services), category/core/child pages, and blog posts; technical base is sitemap, robots, schema, and internal links.',
    bullets: [
      'Homepage + hubs target head terms; child pages capture specific intent and long-tail queries.',
      'Maintain internal links: category → core → child; siblings; no orphan URLs.',
      'Blog supports topical authority (cost guides, materials, climate) — link into service hubs.',
      'Title + meta: unique per URL; refine if GSC shows high impressions with low CTR.',
      'Schema: LocalBusiness + Service where applicable; keep email/phone consistent with JSON-LD.',
    ],
  },
  {
    title: 'Content & publishing rhythm',
    summary:
      'Predictable publishing beats “random bursts”: steady blogs, GBP posts, and photo drops signal an active business.',
    bullets: [
      'Aim for 1–2 quality posts per month minimum (depth over volume).',
      'Align topics to seasonal search (snow load, spring builds, repair after winter).',
      'Repurpose: one project can yield site photos, GBP photos, a short post, and a testimonial pull-quote.',
      'Scheduled production deploy: daily hook rebuilds review-driven UI — verify Wall of Love + ratings after sync.',
    ],
  },
  {
    title: 'Launch sequencing (first 30 days)',
    summary:
      'After go-live, prioritize verification and measurement before chasing new features.',
    bullets: [
      'Week 1: GSC + GBP verified; sitemap submitted; manual test of quote form and phone.',
      'Week 2: Review generation push; first GBP post; fix any crawl errors.',
      'Week 3–4: First new blog or major FAQ update; internal link pass from new content.',
      'Ongoing: weekly GBP touch (post or photos); monthly GSC review.',
    ],
  },
  {
    title: 'What we do not rely on',
    summary: 'Avoid scope creep that does not move Anchorage deck leads.',
    bullets: [
      'Thin location pages for every suburb unless each one is truly unique and useful.',
      'Automated junk blog — hurts trust and can trigger quality issues.',
      'Keyword-stuffed titles; prefer clear benefit + city where it reads naturally.',
    ],
  },
];

/** Shown in a sidebar on the admin page */
export const deployCadenceNote = {
  title: 'Automated deploy (production)',
  lines: [
    'GitHub Actions workflow `.github/workflows/scheduled-pages-deploy.yml` POSTs the Cloudflare Pages deploy hook daily at 07:00 UTC (`workflow_dispatch` runs it manually too).',
    'Cloudflare Pages runs your project build command (e.g. review sync + `astro build` as configured in Pages) — keeps live reviews and build output fresh.',
    'This route uses `noindex` and is not linked from the public nav or sitemap.',
  ],
};
