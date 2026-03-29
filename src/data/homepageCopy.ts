/**
 * Homepage copy — clear, proof-aware; detailed VOC lives on service/category pages.
 */

export const homeMeta = {
  title: 'Deck Builder in Anchorage, AK | Custom Decks, Repairs & Outdoor Living',
  description:
    'Anchorage homeowners rate us for clear communication, competitive pricing, and decks that hold up — see Google reviews. Custom decks, repairs, railings & exterior work for Alaska. Free estimates. Deck Masters AK.',
};

export function heroCopy(fiveStarCount: number) {
  const n = fiveStarCount >= 100 ? `${fiveStarCount}+` : String(fiveStarCount);
  return {
    h1: `Deck Builder in Anchorage, AK | ${n} Five-Star Reviews`,
    subhead:
      'You get a deck, railing, or repair scoped for Alaska snow and freeze-thaw — with clear communication from first call to walkthrough. Free estimates; no vague “we’ll see” pricing.',
    support:
      'You can move forward with confidence even if you have been burned by contractors who ghosted you, blew the budget, or left a messy site — our reviews keep saying the same things: on time, fair price, and follow-through.',
  };
}

export interface WhyChooseBlock {
  headline: string;
  body: string;
}

export function getWhyChooseUs(googleReviewCount: number, averageRating: string): WhyChooseBlock[] {
  return [
    {
      headline: `${googleReviewCount}+ Google reviews at ${averageRating} — others already took the risk for you`,
      body:
        'You see detailed feedback on how we communicate, show up, and finish — not a star-click and silence. That stack of reviews is your shortcut past “hope this contractor works out.”',
    },
    {
      headline: 'Free estimates — you know the scope before you sign',
      body:
        'You walk through options and real numbers for your site. No pressure to decide on the spot — you deserve a written path before you commit.',
    },
    {
      headline: 'Built for Anchorage weather — not a sunny-state kit',
      body:
        'You get structure, fasteners, and details chosen for load, ice, and wind here — so you are not rebuilding the same problem in three winters.',
    },
    {
      headline: 'You are not hiring a mystery crew',
      body:
        'You hear when we will be there, what happens if weather slips, and how we handle punch-list items — because that is what shows up again and again in reviews.',
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
      'Yes. You tell us what you want fixed or built; we inspect what is there and outline options so you can decide before you sign.',
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
      'You get honesty first: we explain what happened, fix it, and get you back on track — that is the pattern homeowners describe in reviews when something needed a second look.',
  },
];

export function getFinalCta(phone: string) {
  return {
    headline: 'Ready for a deck you will actually use?',
    subtext: `Call ${phone} — or tell us what you need fixed. You will get a straight scope, not a sales maze.`,
    ctvLabel: 'Get my free estimate',
  };
}
