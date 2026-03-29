/**
 * Homepage copy — wired to VOC library lines (public-facing only; no internal methodology labels).
 */

import {
  homepagePublicSeo,
  publicHomepageHero,
  riskReversalLines,
} from './copywritingLibrary';

export const homeMeta = {
  title: homepagePublicSeo.title,
  description: homepagePublicSeo.description,
};

export function heroCopy(fiveStarCount: number) {
  const n = fiveStarCount >= 100 ? `${fiveStarCount}+` : String(fiveStarCount);
  return {
    /** Primary headline — customer verbatim from the library */
    h1: publicHomepageHero.h1,
    subhead: publicHomepageHero.subhead,
    /** Social proof line under subhead */
    support: `${n} five-star Google reviews in Anchorage. ${riskReversalLines[0]}`,
    eyebrow: `${n} five-star reviews · Anchorage deck builder`,
  };
}

export interface WhyChooseBlock {
  headline: string;
  body: string;
}

export function getWhyChooseUs(googleReviewCount: number, averageRating: string): WhyChooseBlock[] {
  return [
    {
      headline: '"They do what they say they\'re going to do. Then they over deliver."',
      body:
        'That line shows up in reviews for a reason — homeowners describe follow-through, not just a strong first impression.',
    },
    {
      headline: `${googleReviewCount}+ Google reviews at ${averageRating} — with real detail`,
      body:
        'You see how we communicate, show up, and finish — not a star-click and silence. That stack of reviews is your shortcut past “hope this contractor works out.”',
    },
    {
      headline: 'Permits, scope, and budget in the same conversation',
      body:
        'We pull your permits and deal with the municipality. Your budget is part of the design conversation — not an afterthought.',
    },
    {
      headline: 'Built for Anchorage — not a sunny-state kit',
      body:
        'Structure, fasteners, and materials chosen for snow load, freeze-thaw, and wind — so you are not rebuilding the same problem in three winters.',
    },
  ];
}

export const homeFaqs: { question: string; answer: string }[] = [
  {
    question: 'How much does a new deck or deck replacement cost in Anchorage?',
    answer:
      'You pay based on size, height, materials, railing, stairs, and what we can save vs. replace. After a site visit you get a written scope — homeowners tell us that beats a verbal ballpark that changes mid-job.',
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      'Yes. No pressure, no obligation — just a real conversation about what your project actually needs. Tell us what you want fixed or built; we inspect what is there and outline options before you sign.',
  },
  {
    question: 'How long does a typical deck project take?',
    answer:
      'Your timeline depends on weather, permits, and materials — we give you a realistic window up front and update you when anything shifts (Alaska construction rarely runs like a TV schedule).',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'You are covered throughout Anchorage and nearby areas. If you are on the edge of our range, call — we will tell you straight if we are the right fit.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'You should always ask — we carry the coverage and licensing you would expect for structural exterior work. Ask on your walkthrough and we will show current documentation.',
  },
  {
    question: 'What if something goes wrong during the build?',
    answer:
      'If we find something we did not expect, we tell you before we touch it. When something needs a second look, we explain what happened, fix it, and get you back on track — that is the pattern homeowners describe in reviews.',
  },
];

export function getFinalCta(phone: string) {
  return {
    headline: 'Ready for a deck you will actually use?',
    subtext: `Call ${phone} — or send a message. You get a straight scope, not a sales maze.`,
    ctvLabel: 'Get My Free Estimate',
  };
}

/** Services grid intro on the homepage — from the deck-building category library block. */
export const homeServicesSectionLead =
  'From the first meeting to the final board, you stay in control of the design — and we handle everything else, including permits.';
