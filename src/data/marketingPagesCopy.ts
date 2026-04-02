/**
 * Conversion-oriented copy for non-service marketing pages (Copywriting.md: you-first, PAS, proof, CTV).
 * Service/category/core/child pages use their own copy modules + servicePageVoc.
 */

export type SiteForMarketingCopy = {
  businessName: string;
  primaryCity: string;
  primaryPhone: string;
  ownerName: string;
};

export function servicesPageCopy(s: SiteForMarketingCopy) {
  const { businessName, primaryCity, primaryPhone } = s;
  return {
    title: `Services | Decks, Repairs & Exterior Work in ${primaryCity} — ${businessName}`,
    description: `List of our deck and exterior services in ${primaryCity}. Free estimates. ${primaryPhone}.`,
    h1: 'Get a deck your family will actually enjoy',
    heroLead: `You are not hiring "services" for the sake of it. You are creating an outdoor space that feels good to use, looks right for your home, and holds up in ${primaryCity} weather. We offer every service needed to get you there — from new builds to repairs and upgrades.`,
    heroPillars: [
      {
        title: 'Comfort and confidence',
        body: 'You get a deck that feels solid underfoot, functions the way your family lives, and is planned for long-term use.',
      },
      {
        title: 'One team for the full outcome',
        body: 'Whether you need a full build, structural repair, stairs, railing, or resurfacing, every service supports the same end result: a better deck.',
      },
      {
        title: 'Clear path from idea to build',
        body: 'You get straightforward recommendations and written scope language, so you can make decisions without second-guessing.',
      },
    ],
    phoneCtaAfterPrefix: 'Or ',
    phoneCtaAfterSuffix: ' online.',
    waterfrontEyebrow: 'Waterfront & docks',
    waterfrontH2: 'Docks and waterfront work',
    waterfrontLead: `You get the same structural discipline we use on decks — hardware and details that respect ice, moisture, and heavy use, not a warm-climate template.`,
    ctaLead: 'Tell us what you need fixed or built. We will point you to the right service.',
    ctaButton: 'Get my free estimate',
  };
}

export function galleryPageCopy(s: SiteForMarketingCopy) {
  return {
    title: `Gallery | Deck & Outdoor Projects — ${s.businessName}`,
    description: `See real ${s.primaryCity} projects: composite and wood decks, railings, stairs, and outdoor living — built for Alaska weather by ${s.businessName}.`,
    h1: 'See what we actually build',
    lead: `You are looking at finished work in and around ${s.primaryCity} — materials, rails, and details chosen for cold-climate use, not catalog fantasy shots from another state.`,
    ctaLead: 'Want something like this on your property?',
    ctaButton: 'Get my free estimate',
  };
}

export function dockBuildingPageCopy(s: SiteForMarketingCopy) {
  return {
    title: `Dock Building | Alaska Waterfront — ${s.businessName}`,
    description: `Docks and waterfront structures in Alaska — framing and materials for ice, moisture, and heavy use. Free estimates. ${s.primaryPhone}. ${s.businessName}.`,
    h1: 'Docks built for Alaska water and ice',
    problemLead: `You need a dock that survives freeze-thaw, ice abrasion, and seasonal movement — not a weekend kit that looks fine until the first hard winter.`,
    body1: `You work with a crew that builds decks and exterior structure full time in ${s.primaryCity}, so footings, fasteners, and bracing follow real loads and local conditions.`,
    body2: `Whether you are replacing a warped walk, adding boat access, or designing a private residential dock, you get a clear scope before we order material — same discipline as our deck estimates.`,
    ctaPrimary: 'Request a dock estimate',
    ctaSectionLead: 'Planning waterfront work this season?',
    ctaSecondary: 'Get my free estimate',
  };
}

export function contactPageCopy(s: SiteForMarketingCopy) {
  return {
    title: `Contact ${s.businessName} | ${s.primaryCity} Deck & Exterior Contractor`,
    description: `Call ${s.primaryPhone} or send a message — free estimates for decks, repairs, railings, and exterior work in ${s.primaryCity}. Licensed and insured. ${s.businessName}.`,
    heroH1: `Contact ${s.businessName}`,
    heroLead: `No pressure, no obligation — just a real conversation about what your project actually needs. Tell us what is going on (rot, rails, new build, exterior leak) and we will route you to the right next step.`,
    callH2: 'Call us',
    callBlurb: `You reach people who build here every week — say if it is urgent; we check messages closely.`,
    emailH2: 'Email us',
    emailBlurb: `You hear back within one business day in most cases.`,
    emailFallback: `Use the form — we reply by email. Add a company email in site settings when you are ready to publish it.`,
    locationH2: 'Our location',
    hoursH2: 'Hours',
    hoursFallback: `Contact for availability — exterior season drives how we stack jobs.`,
    formHintBefore: `You get the fastest answer by calling `,
    formHintAfter: ` — use the form if you prefer typing; photos help.`,
    areasH2: 'Areas we serve',
    areasLead: `Not sure if you are in range? Call — we tell you straight if the job fits our route and crew capacity.`,
    findUsH2: 'Find us',
    findUsLead: `${s.primaryCity} — open the map for directions.`,
    trustEyebrow: 'Why homeowners reach out',
    trustLine: `Licensed and insured · Free estimates · We pull permits and deal with the municipality · Written scopes — not vague “we’ll see” pricing`,
  };
}

export function aboutPageCopy(s: SiteForMarketingCopy) {
  return {
    title: `About ${s.businessName} | ${s.primaryCity} Deck & Exterior Contractor`,
    description: `Locally owned deck and exterior contractor in ${s.primaryCity}. ${s.ownerName} and team — clear scopes, Alaska-ready details, strong reviews. Licensed and insured.`,
    heroLead: `You work with a local crew trained for real weather — not a franchise script. Straight answers, clean sites, and details that hold up after winter.`,
    storyH2: `How ${s.businessName} got started`,
    afterAboutP1: `You deserve outdoor space engineered for ${s.primaryCity} — snow load, wind, freeze-thaw, and how you actually clear the deck — not catalog details copied from warmer climates.`,
    afterAboutP2: `You get thoughtful design paired with framing and hardware choices that match your property. Referrals and repeat clients built this business: people who wanted clear scopes, crews that show up, and fixes when something needs a second look.`,
    ownerBlurb: `${s.ownerName} leads estimating and production with an emphasis on written scopes and code-aware details. You talk to someone who still thinks in lumber and fasteners — so recommendations match what gets built on your lot.`,
    servingH2: `Proudly serving ${s.primaryCity} and surrounding areas`,
    servingLead: `You get scheduling across greater ${s.primaryCity} with quick replies most workdays. On the edge of our range? Call anyway — we tell you honestly if the job is a fit.`,
    licensedH2: 'Licensed, insured, built for Alaska',
    licensedLead: `You can request license numbers, insurance certificates, and documentation before you sign — we expect you to ask.`,
    envH2: 'Environmental stress we design for',
    envLead: `Your deck or exterior faces a harsh mix of factors here — we plan for them up front, not after the first winter.`,
    gbpH2: 'Find us on Google',
    gbpLead: `You read real homeowner feedback, see photos, and get directions from our Google Business Profile.`,
    ctaHeadline: 'Ready to plan your project?',
  };
}

export function wallOfLovePageCopy(s: SiteForMarketingCopy) {
  return {
    title: `Reviews | What ${s.primaryCity} Homeowners Say — ${s.businessName}`,
    description: `Real Google reviews for ${s.businessName} in ${s.primaryCity} — communication, pricing, craftsmanship, and follow-through in homeowners’ own words.`,
    eyebrow: 'Wall of love',
    h1: 'Reviews in their words',
    h1Benefit: `Real Google feedback from ${s.primaryCity} homeowners`,
    lead: `You are not reading marketing fluff — these are public reviews from people who hired us for decks, repairs, railings, and exterior work in ${s.primaryCity}.`,
    ctaLead: 'Ready for your own “five-star” story?',
    ctaButton: 'Get my free estimate',
  };
}

export function schedulePageCopy(s: SiteForMarketingCopy) {
  return {
    title: `Get a Quote | Free Estimate — ${s.primaryCity} — ${s.businessName}`,
    description: `Request a free estimate for your deck or exterior project in ${s.primaryCity}. ${s.businessName} — written scope, no obligation. Call ${s.primaryPhone} for the fastest reply.`,
    h1: 'Get a written estimate',
    lead: `You tell us what you need — new build, repair, rails, or exterior damage. We follow up with a clear path to a site visit or written scope. No obligation; no surprise “ballpark” that changes after you sign.`,
    calloutBefore: `Fastest path: call `,
    calloutAfter: ` with photos and a short description.`,
  };
}

export function alaskaLandingCopy(s: SiteForMarketingCopy) {
  return {
    title: `Anchorage Deck Builder | Custom Decks & Railings — ${s.businessName}`,
    description: `Deck builder in Anchorage, AK — custom decks, railings, repairs, and outdoor living built for snow, wind, and freeze-thaw. Hundreds of local reviews. Free estimates. ${s.primaryPhone}.`,
    h1: 'Anchorage deck builder',
    lead: `You get decks, railings, stairs, and repairs scoped for Alaska — loads, drainage, and hardware that survive what ${s.primaryCity} throws at them, not a sunny-state kit.`,
    lead2: `From first call through walkthrough, you work with a local crew that publishes the same line items online that you see on your estimate — so you always know what you are buying.`,
    servicesH2: 'Deck services you can click into',
    servicesLead: `Each card links to a full page with scope notes — pick what matches your job.`,
    neighborhoodsH2: 'Neighborhoods we work in',
    neighborhoodsLead: `You see us across greater Anchorage — including:`,
    ctaLead: 'Ready for a deck you will actually use?',
    ctaButton: 'Get my free estimate',
  };
}

export function blogIndexCopy(s: SiteForMarketingCopy) {
  return {
    title: `Blog | Deck & Outdoor Living Tips — ${s.businessName}`,
    description: `Practical deck and outdoor living ideas for ${s.primaryCity} — materials, costs, and Alaska climate realities from ${s.businessName}.`,
    h1: 'Deck tips & ideas',
    lead: `You get articles written for ${s.primaryCity} homeowners — materials, maintenance, and planning — not generic advice from another climate.`,
    ctaLead: 'Rather have us look at your deck in person?',
    ctaButton: 'Get my free estimate',
  };
}

export function featuredProjectCopy(city = 'Anchorage') {
  return {
    title: 'Featured Build | Keller Deck Walkthrough — Deck Masters AK',
    description:
      'Start-to-finish video: composite deck build — framing, cable rail, lighting, and how we run the job site. Deck Masters AK.',
    h1: 'Keller deck build walkthrough',
    subhead: `You see structure, details, and how we communicate on site — not a highlight reel with the messy middle cut out.`,
    sectionH2: 'What you will see in this video',
    p1: `You watch a full deck build from footing and framing through railing, lighting, and punch list — a realistic snapshot of sequencing and problem-solving in ${city}.`,
    p2: `You get a feel for how we protect your home, keep the site organized, and keep you informed at each stage — the same rhythm we bring to your job.`,
    asideCtaEyebrow: 'Want a project like this?',
    asideCtaBody: `When you are ready, request an estimate — we walk the site with you, talk options, and put a written plan in your hands.`,
    asideCtaButton: 'Get my free estimate',
  };
}

export function partnersPageCopy(s: SiteForMarketingCopy) {
  return {
    title: `Installation Partners | ${s.businessName} — ${s.primaryCity}, AK`,
    description: `You run production; we bring booked deck and exterior jobs, scopes, permits, and logistics in ${s.primaryCity}. Partner with ${s.businessName}.`,
    eyebrow: 'Installation partners',
    h1Line1: 'We sell and scope the work.',
    h1Line2: 'You keep your crew building.',
    intro: `You get steady, organized work when you would rather build than chase leads — ${s.businessName} handles homeowner conversations, permits, and material timing so your crew stays on tools.`,
    benefitsH2: 'What you get as an Installation Partner',
    benefit1Title: 'Booked work — not tire-kickers',
    benefit1Body: `Marketing, sales, permits, and material logistics sit with us — you and your crew focus on production.`,
    benefit2Title: 'Alaska-season rhythm',
    benefit2Body: `Short, intense seasons need clean job starts and minimal downtime — systems built for real field schedules, not a spreadsheet from Outside.`,
    benefit3Title: 'Project management on our side',
    benefit3Body: `Our PM team carries homeowners, inspections, and changes — you are not the default call for every question.`,
    benefit4Title: 'Clear expectations and payouts',
    benefit4Body: `Defined scopes, agreed rates, and predictable payment timing — you know the deal before you mobilize.`,
    fitH2: 'Who this is a great fit for',
    fitBody: `You run a small or mid-size crew, care about quality, communicate on site, and want more of your season building — not guessing where the next job comes from.`,
  };
}

export function hiringPageCopy(s: SiteForMarketingCopy) {
  return {
    title: `Careers | Join the Crew — ${s.businessName}`,
    description: `Skilled carpenters and builders in ${s.primaryCity}: ${s.businessName} hires people who care about cold-climate craft and clear communication.`,
    h1: 'Careers',
    lead: `You take pride in durable outdoor work and want a team that values straight talk and clean job sites — we want to hear from you.`,
    body: `${s.businessName} builds decks, railings, and exterior projects across ${s.primaryCity}. If you bring deck, carpentry, or GC experience and want steady, well-scoped work, reach out.`,
    applyH2: 'How to apply',
    applyBody: `Send your name, phone, and a short note on your experience — we reply with current openings and next steps.`,
    boxH2: 'Contact about jobs',
  };
}
