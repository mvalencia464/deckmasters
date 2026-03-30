/**
 * Copy for /admin/for-the-nerds — engineering & stack story (internal).
 */

export const forTheNerdsMeta = {
  title: 'For the nerds — Stack & engineering | Deck Masters AK',
  description:
    'How Deck Masters AK’s site is built: Astro, static delivery, Tailwind, typed content architecture, images, SEO, and automation — in plain language.',
};

export const forTheNerdsHero = {
  eyebrow: 'Engineering',
  h1: 'For the nerds',
  lead: `This site is not a generic page builder template. It is a statically generated, type-aware front end with a deliberate content architecture — built for speed, accessibility, and local SEO. If you care about how things work under the hood, you are in the right place.`,
};

/** Right-rail “at a glance” — keep values short; details live in cards */
export const stackAtAGlance: { label: string; value: string }[] = [
  { label: 'Framework', value: 'Astro 6 (static)' },
  { label: 'Styling', value: 'Tailwind CSS v4' },
  { label: 'Language', value: 'TypeScript' },
  { label: 'Deploy', value: 'Cloudflare Pages' },
  { label: 'Images', value: 'AVIF / WebP (astro:assets)' },
  { label: 'Fonts', value: 'Self-hosted (Astro Fonts)' },
];

export type TechPillar = {
  title: string;
  kicker: string;
  summary: string;
  advantages: string[];
};

export const techPillars: TechPillar[] = [
  {
    title: 'Astro — content-first, minimal JavaScript',
    kicker: 'Static site generation',
    summary:
      'We ship HTML from build time, not a heavy client bundle. Pages load fast because the browser does less work — especially on mobile and slower connections in Alaska.',
    advantages: [
      'Static `output` — predictable builds, easy caching on a CDN, no server runtime to babysit for public pages.',
      'Islands architecture when we need interactivity — most of the site stays zero-JS by default.',
      'File-based routing and `.astro` components keep structure obvious: one URL, one obvious file path.',
    ],
  },
  {
    title: 'Tailwind CSS v4 + design tokens',
    kicker: 'Design system in code',
    summary:
      'Spacing, color, and typography live in one theme layer (`@theme` + `global.css`) so the brand stays consistent — orange, teal accent, cream surfaces — without fighting one-off CSS.',
    advantages: [
      'Utility-first workflow: fast iteration, fewer naming debates, smaller CSS surface than hand-rolled stylesheets.',
      'Vite-powered pipeline (`@tailwindcss/vite`) matches Astro’s build — one toolchain, fast HMR in dev.',
      'Accessible focus styles (`focus-ring`) and sharp corners (`rounded-none`) match the Deck Masters look.',
    ],
  },
  {
    title: 'Typed content & site architecture',
    kicker: 'Data modules, not mystery strings',
    summary:
      'Service URLs, parent/child relationships, and hub layouts are driven from typed structures — not copy-pasted slugs across dozens of files.',
    advantages: [
      '`siteArchitecture.ts` is the map: category → core hub → child pages — same source the services index and hubs use.',
      'Marketing copy is split into modules (`categoryPageCopy`, `childPageCopy`, VOC bundles) so writers and devs do not step on each other.',
      'TypeScript catches mistakes at build time: broken imports and bad slugs fail before deploy.',
    ],
  },
  {
    title: 'Images that respect bandwidth',
    kicker: 'astro:assets',
    summary:
      'Hero and project imagery go through Astro’s asset pipeline: modern formats, responsive sizing, and lazy loading where it makes sense.',
    advantages: [
      'AVIF and WebP output (`astro.config` image formats) — smaller files, better LCP scores.',
      'Explicit `width` / `height` on critical images to reduce layout shift.',
      'No giant unoptimized JPEGs pretending to be a “gallery.”',
    ],
  },
  {
    title: 'SEO & structured data',
    kicker: 'Machines read what humans see',
    summary:
      'Sitemap generation, canonical URLs, and JSON-LD on key templates help search engines and maps understand the business — without spammy tricks.',
    advantages: [
      '`@astrojs/sitemap` with filters — internal tools and internal-only pages stay out of the public sitemap.',
      'LocalBusiness and related schema where appropriate — consistent NAP with `site.json` and the footer.',
      'Unique titles and descriptions per route — no duplicate thin pages.',
    ],
  },
  {
    title: 'Automation & fresh proof',
    kicker: 'Scheduled builds',
    summary:
      'Production can rebuild on a schedule so review-driven sections stay current — social proof is not a one-time snapshot from launch day.',
    advantages: [
      'Deploy hooks (e.g. GitHub Actions → Cloudflare Pages) trigger rebuilds without manual FTP.',
      'Review sync runs as part of the production build pipeline — Wall of Love and trust UI track reality.',
      'Infrastructure-as-code mindset: same build locally and in CI reduces “works on my machine” surprises.',
    ],
  },
];
