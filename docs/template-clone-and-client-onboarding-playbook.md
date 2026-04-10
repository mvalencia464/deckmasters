# Template Clone + Client Onboarding Playbook

This document describes the fastest way to turn this project into a repeatable, scalable starter for new businesses while keeping quality high and onboarding consistent.

## Goals

- Reuse what should stay the same across projects.
- Replace only business-specific inputs with structured placeholders.
- Reduce setup time for each new client site.
- Keep SEO, content quality, and local relevance strong from day one.

## Recommended Strategy

Create a trimmed "base template repo" once, then use it for each new business.

### What stays in the base template

- Core Astro architecture, routing, components, and styling system.
- SEO helpers, schema patterns, utility functions, and page templates.
- Reusable section structures (hero, services, FAQs, reviews/testimonials, CTA, etc.).
- Content strategy framework (headlines, offer structure, trust signals, conversion patterns).
- Deployment, CI/CD, and lint/test scripts.

### What should be placeholders

- Business name, phone, email, address, city/state/region.
- Services and categories.
- Location pages and service area pages.
- Reviews, ratings, and social proof.
- Brand voice snippets (tone, positioning, UVP).
- Media assets (logo, photos, before/after images, team photos).
- Legal/business details (hours, license info, service guarantees).

## One-Time Setup: Create a Reusable Template Repo

1. Duplicate this project into a new repository (example: `astro-local-business-template`).
2. Remove client-specific content/assets and replace with tokenized placeholders.
3. Add a single source of truth file for placeholders, such as:
   - `src/data/clientProfile.ts`
   - or `src/data/clientProfile.json`
4. Refactor copy/data modules to read from that profile wherever possible.
5. Add a setup checklist markdown in the template (`docs/new-client-checklist.md`).
6. Add scripts (optional but recommended):
   - `npm run setup:client` (interactive prompt to populate profile fields)
   - `npm run validate:placeholders` (fail if placeholder tokens still exist)
7. Mark the repository as a GitHub Template.

## New Client Workflow (Fast Path)

1. Create a new repo from your template.
2. Fill out `clientProfile` with known client data.
3. Replace remaining placeholder copy and media.
4. Generate/validate local SEO pages and schema.
5. Run QA checklist and publish.

## Client Onboarding SOP (Suggested)

Use this sequence for every client to keep intake consistent.

### Phase 1: Intake and Source Collection

1. Collect core business details:
   - Legal/business name
   - NAP (name, address, phone)
   - Hours
   - Primary service areas
   - Services and categories
2. Google Business Profile (GBP):
   - Export/collect GBP business information.
   - Capture categories, services, description, FAQs, and all visible attributes.
3. Reviews and reputation:
   - Export/scrape available review text and ratings (Google + other key platforms).
   - Identify recurring themes, objections, and top trust drivers.
4. Competitor and SERP scan:
   - Search key services + city.
   - Capture common intent patterns, page types, and local SERP opportunities.

### Phase 2: SEO + Content Inputs

1. Build a keyword-to-page map:
   - Core service keywords
   - Location modifiers
   - Intent buckets (commercial, informational, trust)
2. Define page architecture:
   - Home
   - Service pages
   - Location pages
   - About
   - Contact
   - Supporting content/FAQs
3. Use "data for SEO" sources to pull:
   - Query opportunities
   - SERP features
   - Related questions/topics
   - Competitor benchmark signals

### Phase 3: Copy System Adaptation

Apply your core copywriting framework in a repeatable way:

1. Keep the same conversion structure and persuasive sequence.
2. Adapt "Core 30" messaging to:
   - Business type
   - Location and service area
   - Service mix
   - Category and audience sophistication
3. Inject local proof and specificity:
   - Neighborhoods/cities
   - Real review snippets
   - Credibility signals and guarantees
4. Ensure every key page has:
   - Clear offer
   - Local relevance
   - Objection handling
   - Strong CTA

## Suggested Placeholder Schema

Use a structured object so every reusable component can consume it.

```ts
export const clientProfile = {
  business: {
    name: "%%BUSINESS_NAME%%",
    phone: "%%PHONE%%",
    email: "%%EMAIL%%",
    website: "%%WEBSITE%%",
    address: {
      street: "%%STREET%%",
      city: "%%CITY%%",
      region: "%%REGION%%",
      postalCode: "%%POSTAL_CODE%%",
      country: "%%COUNTRY%%"
    }
  },
  seo: {
    primaryCategory: "%%PRIMARY_CATEGORY%%",
    secondaryCategories: ["%%SECONDARY_CATEGORY_1%%"],
    primaryLocations: ["%%PRIMARY_LOCATION%%"],
    services: ["%%SERVICE_1%%", "%%SERVICE_2%%"]
  },
  proof: {
    reviewCount: "%%REVIEW_COUNT%%",
    rating: "%%RATING%%",
    testimonials: []
  },
  brand: {
    voice: "%%VOICE%%",
    usp: "%%USP%%",
    guarantees: ["%%GUARANTEE_1%%"]
  }
};
```

## QA Before Launch

- No unresolved placeholder tokens remain.
- NAP consistency across site + schema.
- Title/meta/H1 uniqueness for core pages.
- Internal links connect service and location clusters.
- Review snippets are accurate and policy-safe.
- LocalBusiness (and related) schema validates.
- Mobile speed and CWV are acceptable.
- Contact forms, calls, and conversion events are tracked.

## Operations and Scale

As volume increases, standardize these artifacts:

- `Client Brief` template (intake form)
- `SEO Input` sheet (keywords, clusters, targets)
- `Copy Blocks` library (modular persuasion sections)
- `Launch QA` checklist
- `Post-Launch 30/60/90` optimization checklist

## Practical Implementation Plan

### Week 1 (Foundation)

- Create the template repo.
- Abstract all hard-coded client fields into a profile object.
- Add checklist docs and placeholder validation script.

### Week 2 (Automation)

- Add an onboarding script that prompts for client basics.
- Add optional import from CSV/JSON intake data.
- Add pre-deploy check that blocks placeholder leaks.

### Week 3+ (Optimization)

- Track production outcomes by page type and industry.
- Improve template defaults from top-performing projects.
- Expand "Core 30" variants by niche and geography.

---

If you want, the next step can be turning this playbook into:

1. A concrete `clientProfile` schema inside this codebase, and
2. A `new-client-checklist.md` + `setup:client` script in the template repo.
