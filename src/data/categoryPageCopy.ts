/**
 * Core30 Prompt 4 — secondary category pages (deck-building, deck-repair, general-contracting, outdoor-living).
 * Hero H1 benefits stay keyword-forward for SEO (e.g. deck builder, Anchorage); body copy uses VOC elsewhere.
 */

import type { ServiceCategoryId } from './siteArchitecture';
import { metaSeoRows } from './copywritingLibrary';

const seo = (page: string) => metaSeoRows.find((r) => r.page === page)!;

export interface CategoryPageBundle {
  /** Page `<title>` segment before Layout adds ` | Deck Masters AK` — no brand suffix */
  browserTitle: string;
  metaDescription: string;
  heroImage: string;
  /** Completes: "{title} in Anchorage, AK — {h1Benefit}" */
  h1Benefit: string;
  /** Use {phone} for click-to-call number text */
  heroSubhead: string;
  /** Mid-page CTV label for secondary hero button */
  heroSecondaryCta: string;
  trustPills: string[];
  opening: string[];
  problemsTitle: string;
  problems: string[];
  /** PAS — sharpen cost of inaction after problems */
  agitationTitle: string;
  agitation: string[];
  /** One line before auto-generated service link blocks */
  servicesIntro: string;
  /** Optional lead sentence per core slug (when category uses core hubs) */
  coreLead?: Partial<Record<string, string>>;
  cityTitle: string;
  city: string[];
  whyTitle: string;
  why: string[];
  finalCta: string;
}

export const categoryPageCopy: Record<ServiceCategoryId, CategoryPageBundle> = {
  'deck-building': {
    browserTitle: seo('Deck Building').title,
    metaDescription: seo('Deck Building').description,
    heroImage: '/projects/matt-blakeslee-multi-level.avif',
    h1Benefit: 'Custom Decks & Railings Built for Snow and Ice',
    heroSubhead:
      'New builds, replacements, and structural work — scoped for Anchorage loads and freeze-thaw. Questions? Call {phone} for a straight answer and a clear next step.',
    heroSecondaryCta: 'Start Designing My Deck',
    trustPills: ['Google-reviewed crew', 'Written scope before work begins', 'Alaska-focused details'],
    opening: [
      'You want a deck you can trust when the snow piles up and the temperature swings hard. That means correct footings, hardware that holds, railings that stay stiff, and decking that drains instead of trapping water.',
      'We design and build decks for how Anchorage homes actually live: kids, pets, grills, stairs down to the yard, and winters that punish shortcuts.',
    ],
    problemsTitle: 'What deck problems are you seeing?',
    problems: [
      'Soft spots underfoot usually mean moisture reached the joists or the ledger connection. In Anchorage, freeze-thaw cycles and roof drip lines make that worse if flashing and spacing were skipped years ago.',
      'Railings that move in the wind, stairs that bounce, and posts that shift in frost are warning signs. They are also fixable when you address structure instead of only swapping boards on top.',
      'DIY repairs can help for a season, but the wrong fastener or the wrong span table often shows up as sagging, nail pop, or rot the next year. If you are tired of patching, it is time for a crew that works from structure outward.',
    ],
    agitationTitle: 'If you wait, the job gets harder — not cheaper',
    agitation: [
      'Anchorage winters do not forgive bad ledgers, skipped flashing, or undersized footings. You pay for “just the boards” twice when rot runs deeper than the surface.',
      'Lead times and good crews book early. The longer you defer, the fewer options you have next season — and emergency fixes cost more than a planned build.',
    ],
    servicesIntro:
      'You get line-item names that match your estimate — no mystery labels. Click any service below for photos, scope notes, and what happens next.',
    coreLead: {
      'custom-decks-design':
        'New layouts should account for sun, wind, door locations, and how you will clear snow off the walking surface.',
      'deck-replacement-decking':
        'Replacement is more than boards: we check framing, ledgers, and connections before we commit to a surface system.',
      'deck-framing-foundations':
        'Footings and framing carry every load. In Anchorage, depth, drainage, and hardware schedules matter as much as lumber grade.',
      'railings-staircases':
        'Railings and stairs take abuse from ice and people leaning hard on the top rail. We build to code and to common sense.',
    },
    cityTitle: 'Deck building for Anchorage homes',
    city: [
      'We work across Anchorage, from tight Midtown lots to Hillside slopes where elevation and wind change the engineering. Sand Lake, Turnagain, and Mountain View each bring different drainage and access realities — your plan should match the lot, not a generic drawing from another state.',
      'If you are in Spenard, Fairview, Downtown, or South Addition, odds are we have built or repaired a deck nearby. Ask us how we handle permits, inspections, and neighbor-friendly staging on your street.',
    ],
    whyTitle: 'Why choose Deck Masters for deck work?',
    why: [
      'Clients mention communication and follow-through in reviews as often as they mention the finished wood. You get a crew that shows up, explains trade-offs, and fixes issues when they appear.',
      'We carry exterior carpentry depth beyond a single deck package: when siding, fascia, or structure touch the deck ledger, we can coordinate the repair instead of handing you another phone number.',
    ],
    finalCta:
      'Tell us what you are seeing — sagging, rot, a railing that flexes, or a blank slate for a new build. We will help you pick the right service page above or talk it through on the phone.',
  },

  'deck-repair': {
    browserTitle: seo('Deck Repair').title,
    metaDescription: seo('Deck Repair').description,
    heroImage: '/projects/olivia-grill-deck-angle.avif',
    h1Benefit: 'Fast, Honest Repairs Before Small Issues Grow',
    heroSubhead:
      'Soft boards, shaky railings, and storm damage do not get cheaper if you wait. Call {phone} — we will tell you what needs fixing now and what can wait.',
    heroSecondaryCta: 'Find Out What\'s Wrong',
    trustPills: ['Clear repair scope', 'Structural checks, not just cosmetics', 'Local storm-season experience'],
    opening: [
      'Repair calls usually start the same way: something moved, something rotted, or something failed after a wind or snow event. You want to know if the deck is safe this weekend, not after a patch that hides rot.',
      'We separate cosmetic fixes from structural risk. That means looking at posts, joists, ledgers, and connections — not only the top boards you walk on.',
    ],
    problemsTitle: 'Signs your Anchorage deck needs professional repair',
    problems: [
      'Cupped or cracked boards, popped screws, and soft spots often track back to moisture. In Alaska, that can be splash from roofs, poor drainage, or plastic tucked too tight against siding.',
      'Loose guardrails and wobbly stairs are a safety issue, especially with kids, guests, or ice on the treads. Hardware loosens over time; sometimes the fix is new anchors, sometimes new posts or stringers.',
      'After heavy snow or wind, we see lifted joist hangers, shifted posts, and damaged railing sections. If you are unsure, a short site visit beats guessing from the ground.',
    ],
    agitationTitle: 'Ignoring warning signs buys stress — not savings',
    agitation: [
      'Soft spots spread; loose rails fail when someone leans hard after ice. You are not saving money — you are gambling the next storm is not the one that forces a full rebuild.',
      'Buyers and inspectors remember decks. Deferred repairs become leverage or a failed contingency when you sell.',
    ],
    servicesIntro:
      'You get estimate line items you can recognize — each link below goes deeper on that exact scope.',
    cityTitle: 'Deck repair across Anchorage neighborhoods',
    city: [
      'Weather hits every part of town a little differently — wind exposure on the Hillside, shade and ice in some Midtown backyards, tight side yards in older Fairview homes. We adjust the repair plan to your real conditions.',
      'If you are not sure whether to repair or replace, we will walk you through cost and lifespan so you can decide with numbers, not fear.',
    ],
    whyTitle: 'Why call us for deck repair?',
    why: [
      'We will not sell you a full replacement when a targeted structural fix is the right move — and we will not pretend a few new boards fix a rotten ledger.',
      'Reviews mention straight talk and cleanup. You should know what we found, what we recommend, and what happens if we open up more rot than expected.',
    ],
    finalCta:
      'Snap a few photos if you can, then call or request a quote. We will route you to the right repair scope and schedule a look when it makes sense.',
  },

  'general-contracting': {
    browserTitle: seo('General Contracting').title,
    metaDescription: seo('General Contracting').description,
    heroImage: '/projects/matt-blakeslee-multi-level.avif',
    h1Benefit: 'Exterior and Structural Work With One Responsible Crew',
    heroSubhead:
      'When siding, roof edges, or structure fail, you need a plan that ties materials, code, and sequencing together. Start with {phone} — we will outline realistic options.',
    heroSecondaryCta: 'Tell Me What It Would Cost',
    trustPills: ['Permit help when required', 'Coordinated trades', 'Written scope'],
    opening: [
      'General contracting for us means the messy middle: water got in, something sagged, or an exterior system failed. You want one team that can frame, sheath, side, and roof lines that meet — not three bids that blame each other.',
      'We carry residential experience from rough carpentry through finish details, plus the paperwork side when Anchorage requires permits or inspections.',
    ],
    problemsTitle: 'Problems we see on Anchorage exteriors',
    problems: [
      'Ice dams and wind drive water behind siding and fascia. Stains on ceilings near outside walls, soft OSB, and peeling paint are clues the envelope failed somewhere along the line.',
      'Garage walls and garage roofs take sun, snow load, and door vibration. Separated trim, sagging headers, and leaks at the roof-to-wall joint are common starting points.',
      'Interior water stains after a thaw sometimes trace to roof edges, step flashing, or wall penetrations — not only plumbing. You need someone willing to trace the stain instead of guessing.',
    ],
    agitationTitle: 'Unmanaged water and structure failures compound fast',
    agitation: [
      'Stains and soft sheathing move inward — drywall, trim, and air quality take the hit while you guess which trade to call first.',
      'Multi-trade jobs without a clear sequence leave walls open to weather longer than shoulder season allows in Anchorage.',
    ],
    servicesIntro:
      'You jump straight to the scope that matches your damage or remodel — tell us the full story so we sequence trades in the right order.',
    coreLead: {
      'exterior-renovations-roofing':
        'Exterior work is where water management, ventilation, and materials meet — we plan layers in the right order.',
      'contracting-project-services':
        'Project-based work covers planning, demolition, carpentry, code compliance, and closeout — built around your timeline and permit reality.',
    },
    cityTitle: 'General contracting tied to local weather',
    city: [
      'Anchorage homes deal with long winters, short construction seasons, and materials that move with temperature. We schedule exterior phases so you are not left open to rain or snow longer than necessary.',
      'From Government Hill to Sand Lake, access, slope, and wind exposure change how we stage equipment and protect landscaping. We plan for your lot, not a generic single-family template.',
    ],
    whyTitle: 'Why use Deck Masters for GC work?',
    why: [
      'You get a local crew used to cold-climate exteriors — the same mindset we bring to decks, applied to walls, roofs, and structure.',
      'Our reviews reward communication. On multi-step jobs, that matters as much as the nail pattern.',
    ],
    finalCta:
      'Describe the damage or the remodel goal. We will point you to the right service page or book a site visit if photos are not enough.',
  },

  'outdoor-living': {
    browserTitle: 'Outdoor Living Anchorage AK — Stairs, Landings & Elevated Deck Systems',
    metaDescription:
      'Outdoor living in Anchorage: custom stairs, landings, and elevated deck systems. Built for snow load and daily use. Deck Masters AK — free estimates.',
    heroImage: '/projects/matt-blakeslee-multi-level.avif',
    h1Benefit: 'Stairs, Landings & Elevated Systems That Feel Solid',
    heroSubhead:
      'Elevated decks and custom stairs need clean load paths and safe railings in Alaska conditions. Call {phone} to talk through height, access, and materials.',
    heroSecondaryCta: 'Plan My Stairs & Landings',
    trustPills: ['Engineered connections', 'Code-aware rail heights', 'Cold-climate materials'],
    opening: [
      'Outdoor living here is not just furniture — it is how you move between yard levels, attach to the house, and handle ice on treads. Stairs and elevated decks need to feel stiff underfoot and stay predictable in wind.',
      'We focus on the two services below for this category: custom staircases and landings, and elevated deck systems. Both tie back to the same structural discipline we use on full deck builds.',
    ],
    problemsTitle: 'When outdoor access becomes a problem',
    problems: [
      'Wobbly landings at the bottom of stairs, uneven rise and run, and handrails that stop short are more than annoyances — they are trip and fall risks, especially with snow boots.',
      'Elevated decks amplify motion if posts, beams, or bracing are undersized. You feel it before you see it.',
      'If you are adding height for a view or dealing with a sloped lot, cookie-cutter stringer counts from a big-box guide rarely match Anchorage snow load and wind exposure.',
    ],
    agitationTitle: 'Bad stairs and elevated frames punish hesitation',
    agitation: [
      'Ice and uneven treads trip people before you notice flex in posts. Liability and failed inspections follow.',
      'Sloped lots and wind amplify motion. Waiting turns a targeted fix into a full guard or framing rebuild.',
    ],
    servicesIntro:
      'You pick the access problem you are solving — each page spells out what we inspect, how we brace height, and how guards stay stiff in real weather.',
    cityTitle: 'Outdoor living built for Anchorage yards',
    city: [
      'Tight side yards and steep lots push stairs and landings into creative layouts. We measure the real grade, not an assumed flat lawn.',
      'Whether you are in Turnagain, Hillside, or Midtown, we align guardrail height, opening limits, and attachment details with current expectations so you are not redoing work at resale.',
    ],
    whyTitle: 'Why choose us for stairs and elevated decks?',
    why: [
      'We build outdoor structure every week — not once a season as a side job. That repetition shows up in cleaner details and fewer surprises mid-build.',
      'If your stair or landing ties into an existing deck, we evaluate the whole connection instead of bolting on a quick fix.',
    ],
    finalCta:
      'Bring measurements if you have them, or invite us to measure on site. We will confirm which service fits and what to expect on timeline.',
  },
};
