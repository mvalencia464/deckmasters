/**
 * Deck Masters — Copywriting Asset Library (structured for site UI).
 * Methodology: Joanna Wiebe / VOC review mining. Sourced from customer language.
 */

export const libraryMeta = {
  title: 'Copywriting Asset Library',
  subtitle: 'Message mining, headlines, trust blocks, and CTAs — rooted in customer language.',
  methodology: 'Joanna Wiebe / VOC Review Mining',
  disclaimer: 'Every line in this library is rooted in exact customer language. No invented marketing fluff.',
  version: '1.0',
} as const;

export const stickyVerbatims = [
  { quote: 'It actually exceeded my expectations. My old deck was an eye sore. The man who did the work is an artist.', author: 'Jeff' },
  { quote: 'I was sort of glad that all the previous contractors had dropped out.', author: 'James Wheeler' },
  { quote: 'I actually cried a little I was so happy.', author: 'Sherri Mulhaney' },
  { quote: 'Our new deck receives compliments constantly from neighbors and passersby.', author: 'Kyle Van Peursem' },
  { quote: 'I am the envy of my block for deck appearance.', author: 'Floyd Steele' },
  { quote: 'The deck helped sell our house!', author: 'Larry Hale' },
  { quote: 'Jordan listened, let me vent and cry, apologized, and quickly made things right.', author: 'Rachel Blakeslee' },
  { quote: 'I felt as though I made some new friends as opposed to a business contact.', author: 'Joseph Lotz' },
  {
    quote: 'We have never been more satisfied with the quality and workmanship of any project we have contracted in our 42 years of marriage.',
    author: 'Jeff Gaylard',
  },
  { quote: "They do what they say they're going to do. Then they over deliver.", author: 'Mark Daly' },
  { quote: "If Google had a 6th star I'd give it to them.", author: 'Chip Alvord' },
] as const;

export const painPoints = [
  'Deck was rotting out / eyesore / warped and dilapidated',
  '“A year of attempting to have my deck repaired” — contractor no-shows, ghosted bids, empty promises',
  '“I was having a hard time finding someone to come out because it was a small job”',
  'Discovered water damage and black mold after old deck was removed',
  'Deck built incorrectly by previous builder — unsafe',
  'Old deck heaved in winter, railing damaged in a windstorm',
  'Left with an exposed roof in the rain after a subcontractor walked',
] as const;

export const desiredOutcomes = [
  '“Most beautiful front porch in the entire neighborhood”',
  'Deck that sold the house',
  'Neighbors stopping to compliment it',
  'Work that looks as good 2 years later as the day it was finished',
  'Someone who shows up, does it right, and doesn’t leave you hanging',
  'A contractor you trust enough to refer to family',
] as const;

export const hesitations = [
  'Price (multiple reviews mention “more expensive but worth it” — price is a real hesitation)',
  'Construction delays / schedule uncertainty',
  'Not being heard — fear the design won’t match their vision',
  'Contractor reliability (no-shows, broken promises from past experiences)',
  'Permitting complexity and municipality red tape',
] as const;

export type HeroBlock = {
  page: string;
  h1Primary?: string;
  h1Alternatives?: string[];
  subheadline?: string;
  ctaTop?: string;
  ctaMid?: string;
  evenIf?: string;
  fascinationBullets?: { title: string; text: string }[];
  pas?: { problem: string; agitation: string; solution: string };
  cta?: string;
};

export const heroHeadlines: HeroBlock[] = [
  {
    page: 'Homepage',
    h1Primary: 'New decks, replacements, and repairs — built for Anchorage homes.',
    h1Alternatives: [
      'Custom decks and outdoor living in Anchorage — permits through punch list.',
      'Your deck is finished. The neighbors won\'t stop asking who built it.',
      'Reviews in three words: “They do what they say — then they over deliver.”',
    ],
    subheadline:
      'Deck Masters builds decks that exceed expectations, handle Alaska\'s winters, and come with a team that actually picks up the phone — even 9 months after the job is done.',
    ctaTop: 'Get My Free Estimate',
    ctaMid: 'See What My Deck Could Look Like',
  },
  {
    page: 'Deck building (category)',
    h1Primary: 'You\'ve pictured this deck for years. Let\'s build the one that makes the neighbors jealous.',
    h1Alternatives: ['Your backyard deserves better than the eyesore you\'ve been ignoring.'],
    subheadline: 'From the first meeting to the final board, you stay in control of the design — and we handle everything else, including permits.',
    ctaMid: 'Start Designing My Deck',
  },
  {
    page: 'Custom decks & design (core)',
    h1Primary: 'You\'ll know it\'s right when you see it. We\'ll make sure you see it first.',
    h1Alternatives: ['“I actually cried a little I was so happy.” — That\'s what we build toward.'],
    subheadline:
      'You bring the vision. We bring the drawings, the materials expertise, and a crew that treats every cut like it matters.',
    pas: {
      problem:
        'You have an idea of what you want. But turning that into something structurally sound, permitted, and beautiful — without watching the budget blow up — feels like a lot to trust to a stranger.',
      agitation:
        'The wrong builder takes your vague description, builds what\'s easy, and hands you a deck that\'s “fine.” Not what you pictured. Not what you\'ll be proud of. Just fine.',
      solution:
        'Deck Masters starts with a design conversation — not a tape measure and a clipboard. Jordan and the team work with you until the vision is locked in, then they build it exactly that way. No guesswork. No surprises on reveal day.',
    },
    cta: 'Let\'s Talk About My Design',
  },
  {
    page: 'Deck repair & maintenance (category)',
    h1Primary: 'That deck isn\'t just an eyesore. It\'s a liability.',
    h1Alternatives: ['Rotting boards. A wobbly railing. One winter from becoming a real problem.'],
    subheadline:
      'You found the damage. Now you need someone who shows up, scopes it honestly, and fixes it right the first time — not someone who adds to the problem.',
    pas: {
      problem:
        'Your deck has boards that flex wrong, a railing that moves when you grab it, or staining that\'s spreading toward the frame. You\'ve been meaning to call someone.',
      agitation:
        'Deck rot doesn\'t wait. Water gets under the surface, works into the framing, and by the time it\'s obvious, you\'re not replacing boards — you\'re replacing structure. That\'s the difference between a $600 repair and a $6,000 rebuild.',
      solution:
        'Deck Masters catches the real problem before it becomes the expensive one. The crew scopes, explains in plain language what you\'re dealing with, and repairs it with the same craftsmanship they\'d put into a brand-new build.',
    },
    cta: 'Get My Deck Inspected',
  },
  {
    page: 'Deck replacement',
    h1Primary: '“I should have done this years ago.” — Dennis H., Deck Masters customer',
    subheadline: 'You know it\'s time. The question is who to trust with it — and whether the price will be fair.',
    evenIf:
      'You can have the deck replaced and get exactly what you envisioned — even if you\'ve already gotten three quotes that felt too high.',
  },
  {
    page: 'Composite decking installation',
    h1Primary: 'The Trex deck with a 25-year guarantee that helped sell the house.',
    subheadline: 'Low maintenance. Built for Alaska. Looks incredible the day it\'s installed and a decade from now.',
    fascinationBullets: [
      {
        title: 'The “picture frame” finish',
        text: 'that makes your deck look custom-built even from the street — and gets neighbors asking for the contractor\'s number',
      },
      {
        title: '25 years of not re-staining, not re-sealing, not worrying',
        text: 'about boards cupping in the freeze-thaw cycle',
      },
      {
        title: 'Material that held up',
        text: 'through two Anchorage winters and still looks brand new — ask the homeowners in our reviews',
      },
      {
        title: 'A deck that added to your home\'s sale price',
        text: '— not just aesthetics, but actual resale leverage',
      },
      {
        title: 'Installation by crews who treat composite differently',
        text: 'than wood — no shortcuts, no gaps that open up in winter',
      },
    ],
  },
  {
    page: 'Railings & staircases (core)',
    h1Primary: 'A railing that moves when you grab it isn\'t a railing. It\'s a lawsuit waiting to happen.',
    h1Alternatives: ['“Sturdy new cable railing — and I can finally see the whole backyard.” — Marilyn F.'],
    pas: {
      problem:
        'Your railing was damaged in a wind storm, or it heaved over a few winters, or it just looks tired next to everything else you\'ve updated.',
      agitation:
        'A compromised railing is a fall risk every single time someone leans on it — a guest, a kid, an elderly parent. And in Alaska, a staircase that heaves in the wrong spot becomes a trip hazard from October through April.',
      solution:
        'Deck Masters installs railings and staircases engineered for the Alaska climate — cable systems, aluminum, composite, wood. Built so the first hard winter doesn\'t shift them.',
    },
    cta: 'Fix My Railing',
  },
  {
    page: 'Cable railing installation',
    h1Primary: 'Finally see your whole backyard — without sacrificing safety.',
    subheadline:
      'Cable railings give you the view, meet code, and hold up through Alaska winters without rusting or rotting.',
  },
  {
    page: 'Water damage repair (deck)',
    h1Primary: 'The damage you can see is rarely the damage that matters.',
    subheadline:
      'Deck Masters found black mold and structural rot inside a garage wall — discovered only after the deck was removed. The homeowners didn\'t know. Now they do.',
    pas: {
      problem:
        'There\'s discoloration on your deck boards. Or a soft spot. Or the framing smells wrong when it\'s wet.',
      agitation:
        'Water damage under a deck moves silently. It works into the ledger board, into the rim joist, into the house\'s siding and framing — until what started as a deck repair becomes structural reconstruction. The cost doesn\'t grow linearly. It spikes.',
      solution:
        'Deck Masters scopes what\'s actually happening — not just what\'s visible. When they found mold in a customer\'s garage wall during a deck tear-down, they rebuilt the walls without removing the interior drywall or the garage doors, saving the homeowners significant time and cost. That\'s what it looks like when a crew actually cares.',
    },
    cta: 'Schedule a Damage Assessment',
  },
  {
    page: 'Exterior renovations & roofing (core)',
    h1Primary: 'Your deck is the easy part. It\'s what\'s behind the siding that keeps people up at night.',
    subheadline:
      'Siding, fascia, soffit, roofing — the exterior work most contractors talk you out of. We take it on.',
  },
  {
    page: 'General contracting (category)',
    h1Primary: 'One call. One crew. No “that\'s not our problem.”',
    subheadline: 'From demo to clean-up, Deck Masters handles the scope creep that other contractors walk away from.',
    pas: {
      problem:
        'You hired a contractor for a deck. Partway through, they found rotted siding, damaged framing, a roofing issue that can\'t be ignored. Now you\'re managing three separate companies and one is already ghosting you.',
      agitation:
        'Every week that goes by with an unfinished exterior is a week of weather exposure, insurance complications, and a house that looks like a job site from the street.',
      solution:
        'Deck Masters doesn\'t hand you a referral list. They handle the full scope — siding replacement, framing, roofing, structural repairs — with the same crew that already knows your project.',
    },
    ctaMid: 'Tell Me What It Would Cost',
  },
  {
    page: 'Outdoor living (category)',
    h1Primary: 'Stairs, landings & elevated systems that feel solid underfoot',
    subheadline:
      'You need clean load paths and guards that stay stiff — not a kit that ignores your slope, wind exposure, or ice on the treads. We build outdoor access for how Anchorage yards actually drain and freeze.',
    ctaMid: 'Plan My Stairs & Landings',
  },
  {
    page: 'Deck replacement & decking (core)',
    h1Primary: 'Replace what failed — decking, frame, or both',
    subheadline:
      'You know it is time. The question is who you trust with the tear-off — and whether the price reflects a real scope, not new boards hiding old rot.',
    ctaMid: 'Get My Replacement Quote',
  },
  {
    page: 'Deck framing & foundations (core)',
    h1Primary: 'Footings and framing that stay put through frost and snow load',
    subheadline:
      'Everything you walk on hangs off beams, posts, and footings. If anything moves, you deserve to know why — before fresh decking covers it.',
  },
  {
    page: 'Contracting & project services (core)',
    h1Primary: 'One sequence from demo to clean-up — paperwork that matches the build',
    subheadline:
      'When a job touches multiple trades, you need one crew that owns milestones — not three voicemails and a finger-pointing contest.',
    ctaMid: 'Tell Me What It Would Cost',
  },
];

/** Fascination bullets for categories/cores not covered by deck-building or repair sets. */
const generalContractingFascinationBullets: { lead: string; rest: string }[] = [
  {
    lead: 'One accountable crew for messy scopes',
    rest: ' — when the job finds rot, siding, or roof lines, you are not handed a referral list mid-stream',
  },
  {
    lead: 'Milestones you can track',
    rest: ' — exterior work sequenced so you are not left open to weather longer than the season allows',
  },
  {
    lead: 'Problem-solvers on big projects',
    rest: ' — homeowners describe craft and communication when trades stack up',
  },
];

const exteriorRenovationFascinationBullets: { lead: string; rest: string }[] = [
  {
    lead: 'Water traced to the failure',
    rest: ' — stains traced to roof lines, laps, and deck tie-ins — not masked with another coat of paint',
  },
  {
    lead: 'Layers planned in the right order',
    rest: ' — flashing, WRB, and cladding so the envelope actually dries',
  },
  {
    lead: 'Deck-to-wall experience',
    rest: ' — we see ledger and siding intersections every week; fewer leaks at the worst joints',
  },
];

const outdoorLivingFascinationBullets: { lead: string; rest: string }[] = [
  {
    lead: 'Landings sized for real life',
    rest: ' — door swing, snow pile, and turns — not a token slab where math ended',
  },
  {
    lead: 'Posts and bracing for elevation',
    rest: ' — tall runs get lateral discipline so you do not feel sway when you lean on the rail',
  },
  {
    lead: 'Guards and treads built for ice months',
    rest: ' — consistent rise-and-run and graspable paths before the first freeze',
  },
];

export const testimonialPulls = [
  {
    label: 'Any deck building page',
    quote:
      '“We have never been more satisfied with the quality and workmanship of any project we have contracted in our 42 years of marriage.” — Jeff G.',
  },
  {
    label: 'Hesitant / comparison shoppers',
    quote:
      '“I was sort of glad that all the previous contractors had dropped out. The new deck has enhanced the appearance of my home.” — James W.',
  },
  {
    label: 'Repair pages',
    quote:
      '“We were buying a house with a deck that had been built incorrectly. Deckmasters fixed it to where it\'s safe and enjoyable for many years to come.” — Tristen T.',
  },
  {
    label: 'Premium pricing objection',
    quote: '“More expensive, but worth it. They paid attention.” — Bruce W.',
  },
  {
    label: 'Small jobs (real anxiety)',
    quote:
      '“I was having a hard time finding someone to come out because it was a small job. DeckMasters scheduled me quickly.” — Annette D.',
  },
  {
    label: 'Anxious / detail-oriented homeowner',
    quote: '“They do what they say they\'re going to do. Then they over deliver.” — Mark D.',
  },
  {
    label: 'Complex / multi-phase projects',
    quote:
      '“Big projects are never perfect, but Deckmasters proved themselves to be problem-solvers who care deeply about both their craft and their clients.” — Rachel B.',
  },
] as const;

export const trustBadges = [
  'On-time, on-budget — confirmed by dozens of homeowners',
  'Follow-up calls 9 months after project completion',
  'We pull your permits and deal with the municipality',
  'No job too small — small repairs scheduled fast',
  'Trex materials with 25-year manufacturer guarantee',
  'Work that sells homes — ask Larry H.',
] as const;

export const riskReversalLines = [
  'No pressure. No obligation. Just a real conversation about what your project actually needs.',
  'If we find something we didn\'t expect, we\'ll tell you before we touch it.',
  'Your budget is part of the design conversation — not an afterthought.',
] as const;

export const fascinationSets: { title: string; bullets: { lead: string; rest: string }[] }[] = [
  {
    title: 'Deck building (Pride / Envy / Greed)',
    bullets: [
      { lead: 'The deck that sold a house', rest: ' — one customer called it the deciding factor for their buyer' },
      { lead: 'Neighbors who stop mid-walk', rest: ' to ask who built it — that\'s the Deck Masters finish standard' },
      { lead: 'Design input at every stage', rest: ' — you\'re not handing off a napkin sketch and hoping for the best' },
      { lead: 'Permits handled, municipality managed', rest: ' — you show up at the end to a finished deck, not a paperwork nightmare' },
      { lead: 'The craftsmanship that still looks right 2 years later', rest: ' — not just on install day' },
      { lead: 'A crew that cleans up after itself', rest: ' — no nails in the yard, no debris left for your dogs to find' },
    ],
  },
  {
    title: 'Deck repair (Wrath / Fear / Sloth)',
    bullets: [
      { lead: 'The repair that stops the rot before it hits your framing', rest: ' — catch it now or pay triple later' },
      { lead: 'A scope you can trust', rest: ' — no invented problems, no inflated estimates just because you called' },
      { lead: 'Small jobs taken seriously', rest: ' — you won\'t get deprioritized because your job isn\'t a full rebuild' },
      { lead: 'Storm damage handled fast', rest: ' — because a compromised deck doesn\'t get safer sitting through another month of weather' },
      { lead: 'Fixed right the first time', rest: ' — no callbacks, no “we\'ll get to that next time”' },
    ],
  },
  {
    title: 'Composite decking (Sloth / Greed / Pride)',
    bullets: [
      { lead: 'Zero maintenance for 25 years', rest: ' — no staining, no sealing, no worrying about the freeze-thaw cycle doing its damage' },
      { lead: 'The material that held up through 2 Anchorage winters', rest: ' and still looks like it was installed last month' },
      { lead: 'A picture-frame finish', rest: ' that makes your deck look like a furniture showroom, not a construction project' },
      { lead: 'More value per square foot than wood', rest: ' — when you account for the maintenance you\'ll never have to do' },
    ],
  },
  {
    title: 'Railings & staircases (Fear / Safety / Pride)',
    bullets: [
      { lead: 'Cable railing that gives you the whole backyard view', rest: ' — without sacrificing the safety code' },
      { lead: 'Aluminum that doesn\'t rust, rot, or heave', rest: ' the way wood does after the first hard winter' },
      { lead: 'A staircase engineered for heave', rest: ' — so you\'re not navigating a trip hazard by November' },
      { lead: 'Custom design that matches your deck', rest: ' — not a stock railing bolted on as an afterthought' },
    ],
  },
];

/** Stable references for service-page mapping (same copy as `fascinationSets`). */
export const fascinationBundles = {
  deckBuilding: fascinationSets[0],
  deckRepair: fascinationSets[1],
  composite: fascinationSets[2],
  railings: fascinationSets[3],
  generalContracting: {
    title: 'General contracting (coordination & trust)',
    bullets: generalContractingFascinationBullets,
  },
  exteriorRenovations: {
    title: 'Exterior & envelope',
    bullets: exteriorRenovationFascinationBullets,
  },
  outdoorLiving: {
    title: 'Outdoor access & elevation',
    bullets: outdoorLivingFascinationBullets,
  },
} as const;

export type FascinationBundle = (typeof fascinationBundles)[keyof typeof fascinationBundles];

/** Resolve hero library block by internal page label (see `heroHeadlines[].page`). */
export function getHeroBlock(pageLabel: string): HeroBlock | undefined {
  return heroHeadlines.find((h) => h.page === pageLabel);
}

export const evenIfCrushers = [
  'You can get a design that perfectly matches your vision — **even if you\'ve never been able to describe it clearly to a contractor before.**',
  'You can get a fair quote — **even if you\'ve already been burned by low bids that ballooned.**',
  'You can get your small repair done without waiting 3 months — **even if every other company told you they were too busy.**',
  'You can have a deck that survives Alaska winters — **even if you\'re worried composite will look plastic and cheap.**',
  'You can get the job done this year — **even if you\'re not sure your timeline is realistic.**',
  'You can trust the final price — **even if “no cost overrides” sounds too good to believe.** (One customer confirmed it: “There were no cost overrides.” — Gail C.)',
] as const;

export const buttonCopyRows = [
  { placement: 'Hero CTA (ready buyers)', copy: 'Get My Free Estimate' },
  { placement: 'Mid-page (still deciding)', copy: 'See What\'s Possible for My Deck' },
  { placement: 'Repair pages', copy: 'Find Out What\'s Wrong' },
  { placement: 'Railing pages', copy: 'Fix My Railing Today' },
  { placement: 'Design pages', copy: 'Start My Design Conversation' },
  { placement: 'Replacement pages', copy: 'Get My Replacement Quote' },
  { placement: 'Water damage pages', copy: 'Schedule a Damage Assessment' },
  { placement: 'General contracting', copy: 'Tell Me What It Would Cost' },
  { placement: 'Floating mobile button', copy: 'Call Now — We Pick Up' },
] as const;

export const metaSeoRows = [
  {
    page: 'Homepage',
    title: 'Deck Builders Anchorage AK | Deck Masters',
    description:
      'Deck Masters builds, repairs, and replaces decks in Anchorage AK. 5-star rated. Trex specialists. Free estimates. Call today.',
  },
  {
    page: 'Deck Building',
    title: 'Custom Deck Builder Anchorage AK',
    description:
      'Design the deck you\'ve been picturing. Deck Masters handles custom builds, permits, and everything in between. Free estimate.',
  },
  {
    page: 'Custom Deck Design',
    title: 'Custom Deck Design Anchorage | Deck Masters',
    description:
      'From napkin sketch to finished build — Deck Masters works with you on every design decision. No surprises. Free consultation.',
  },
  {
    page: 'Deck Replacement',
    title: 'Deck Replacement Anchorage AK',
    description:
      'Your old deck replaced with materials that last. Trex, composite, wood — priced fairly and done right. Get your quote today.',
  },
  {
    page: 'Composite Decking',
    title: 'Composite Decking Installation Anchorage',
    description:
      'Trex composite decking installed by Anchorage\'s deck specialists. 25-year guarantee. Low maintenance. Free estimate.',
  },
  {
    page: 'Deck Repair',
    title: 'Deck Repair Anchorage AK | Deck Masters',
    description:
      'Rotting boards, wobbly railings, water damage — fixed before it becomes structural. Call Deck Masters for a fast scope.',
  },
  {
    page: 'Cable Railing',
    title: 'Cable Railing Installation Anchorage AK',
    description:
      'See your whole backyard without sacrificing safety. Cable railing installed by Deck Masters — built for Alaska winters.',
  },
  {
    page: 'Water Damage Repair',
    title: 'Deck Water Damage Repair Anchorage',
    description:
      'Soft spots and rot don\'t fix themselves. Deck Masters scopes the real damage and repairs it before it hits your framing.',
  },
  {
    page: 'Railings & Staircases',
    title: 'Railing & Staircase Installation AK',
    description:
      'Custom railings and staircases built for Alaska. Cable, aluminum, wood, composite — installed right. Free estimate.',
  },
  {
    page: 'General Contracting',
    title: 'General Contractor Anchorage AK',
    description:
      'Siding, framing, roofing, structural repairs — Deck Masters handles the full exterior scope. No handoffs, no excuses.',
  },
] as const;

export const pasByService = [
  {
    service: 'Structural Deck Repair',
    problem:
      'Your deck\'s surface looks fine, but something underneath feels wrong. Maybe it\'s the flex when you walk across it. Maybe it\'s the post that doesn\'t sit square anymore.',
    agitation:
      'Structural problems don\'t announce themselves until they fail. And in Alaska, the freeze-thaw cycle works on every weakness in your frame every single winter.',
    solution:
      'Deck Masters goes below the surface. They find what\'s actually wrong, explain it in plain language, and fix the framing — not just the cosmetics.',
  },
  {
    service: 'Deck Board Replacement',
    problem: 'A few boards have gone gray, soft, or started cupping at the edges.',
    agitation:
      'Soft boards are where water gets in. Once it\'s in the frame, you\'re not replacing boards — you\'re replacing structure.',
    solution:
      'Deck Masters replaces boards with materials matched to what you have, or helps you upgrade to composite that won\'t have this problem again for 25 years.',
  },
  {
    service: 'New Deck Construction',
    problem: 'You have a backyard and no deck. Or you have a slab that never became what you imagined.',
    agitation:
      'Every summer you put it off is a summer you didn\'t use your outdoor space. And in Alaska, that\'s a real cost.',
    solution:
      'Deck Masters takes you from site visit to finished build — permit included. Most homeowners say they should have called years earlier.',
  },
  {
    service: 'Multi-Level Decks',
    problem:
      'Your yard has elevation changes, or you want to connect a first-story door to a second-story space, or you\'ve got a vision that involves more than a flat platform.',
    agitation:
      'Multi-level builds require engineering precision. A crew that guesses on the framing will give you a deck that looks off and settles wrong.',
    solution:
      'Deck Masters has built complex, multi-level systems — including second-story wraparound replacements with new first-floor connections. They know how to make the levels feel intentional, not just stacked.',
  },
  {
    service: 'Siding Replacement',
    problem: 'Your siding is overdue. Maybe it\'s showing its age, or a deck replacement revealed rot underneath.',
    agitation:
      'Compromised siding is a moisture pathway into your wall assembly. Left alone, it creates the conditions for the mold problem that surprises you during the next renovation.',
    solution:
      'Deck Masters replaced siding on a complex, odd-angled home — measuring and cutting everything so the new materials fit precisely, including adjusting deck boards where the gap wasn\'t perfectly parallel. That\'s the attention to detail level.',
  },
  {
    service: 'Permit Acquisition Assistance',
    problem: 'You\'ve heard permitting in Anchorage is slow, unpredictable, and can derail a project mid-build.',
    agitation:
      'A contractor who doesn\'t handle permits hands that problem to you. And a municipality hold doesn\'t pause the weather.',
    solution:
      'Deck Masters handles permitting as part of the job. They\'ve worked with the Muni on complex projects and have a track record of getting it done — while keeping your build on schedule.',
  },
] as const;

/** SEO strings for homepage — aligned with Part 7 meta table. */
export const homepagePublicSeo = {
  title: metaSeoRows[0].title,
  description: metaSeoRows[0].description,
} as const;

/**
 * Homepage hero — H1 pairs SEO kicker (in homepageCopy) + clear offer; subhead carries voice/proof.
 */
export const publicHomepageHero = {
  h1: 'New decks, replacements, and repairs — built for Anchorage homes.',
  subhead:
    'Deck Masters builds decks that exceed expectations, handle Alaska\'s winters, and come with a team that actually picks up the phone — even 9 months after the job is done.',
  ctaPrimary: 'Get My Free Estimate',
  ctaMidPage: 'See What My Deck Could Look Like',
} as const;

/** Homepage trust strip — short, customer-facing (from trust badges / VOC). */
export const homepageTrustStripItems = [
  { kicker: 'Permits', line: 'We pull permits and deal with the municipality' },
  { kicker: 'Trex', line: '25-year manufacturer guarantee on select materials' },
  { kicker: 'Every job', line: 'Small repairs scheduled fast — no job too small' },
] as const;

