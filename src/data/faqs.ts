export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "timeline" | "pricing" | "materials" | "trust" | "general";
}

export const ALL_FAQS: FAQItem[] = [
  // Timeline & Process
  {
    id: "timeline-1",
    category: "timeline",
    question: "Will my yard be a construction zone all summer?",
    answer:
      "Absolutely not. We know summer in Alaska is short (about 12 weeks), and you don't want to spend 8 of them waiting on a contractor. We use a \"21-Day Build System.\" We pre-stage your materials and schedule our crews so that once we start, we stay until it's finished—often in under three weeks.",
  },
  {
    id: "timeline-2",
    category: "timeline",
    question: "Do I need to handle the permits and paperwork?",
    answer:
      'No, we are the "Easy Button" for that. In Anchorage, any deck over 30 inches high requires a permit. We handle the entire process: the "As-Built" surveys, engineering, zoning checks, and municipal inspections. We are fully licensed to pull permits so you don\'t have to lift a finger.',
  },
  {
    id: "timeline-3",
    category: "timeline",
    question: "How messy will the job site be?",
    answer:
      "We treat your home like a sanctuary, not a construction site. Our crews clean up every single day, using magnetic rollers to ensure no nails are left behind for kids or pets to find. You can feel safe leaving your deadbolt unlocked while we work.",
  },

  // Pricing & Trust
  {
    id: "pricing-1",
    category: "pricing",
    question: "Are you the cheapest option in town?",
    answer:
      'No, and we don\'t try to be. We are not the "guy with a truck" or a handyman service. We are specialty contractors building "legacy decks" designed to last 30–50 years. We invest in high-quality materials and skilled labor so you don\'t have to pay for repairs a few years down the road.',
  },
  {
    id: "pricing-2",
    category: "pricing",
    question: "Will the price change after we start?",
    answer:
      'We have a strict No-Surprise Guarantee. Many contractors hit you with "change orders" once the deck is torn apart. We provide a detailed, fixed-price quote upfront. Unless you change the design, the price we quote is the price you pay.',
  },
  {
    id: "pricing-3",
    category: "trust",
    question: "What if something goes wrong?",
    answer:
      "We own it. We have built nearly 1,000 decks, and while we strive for perfection, we prioritize integrity. If we make a mistake, we fix it. If a pile fails (which has happened only once in 5,000+ installs), we fix it at no cost to you. We want to sleep well at night knowing we did right by you.",
  },

  // Materials & Engineering
  {
    id: "materials-1",
    category: "materials",
    question: "Will my deck heave or shift in the winter?",
    answer:
      "Frost heave is the #1 killer of Alaskan decks, which is why we don't use concrete footings that crack. We primarily use Driven Steel Piles that go 20–60 feet deep, or Helical Piles for hard-to-reach areas. These anchor your deck far below the frost line, ensuring it stays level through every freeze-thaw cycle.",
  },
  {
    id: "materials-2",
    category: "materials",
    question:
      "I'm tired of staining my deck every year. Is there a better way?",
    answer:
      "Yes! We specialize in Composite Decking (like Trex and TimberTech). These boards look like wood but never need sanding, staining, or painting. They are fade-resistant, stain-resistant, and splinter-free. You spend your summer relaxing on your deck, not working on it.",
  },
  {
    id: "materials-3",
    category: "materials",
    question: "What about rust?",
    answer:
      "We exclusively use Simpson Strong-Tie hot-dip galvanized fasteners and hangers. These are engineered to resist rust and withstand earthquakes. We never use cheap hardware store fasteners that corrode in our climate.",
  },
  {
    id: "materials-4",
    category: "materials",
    question: "I want something unique. Can you do custom designs?",
    answer:
      'Absolutely. We don\'t just build squares. We build custom "resorts" right in your backyard. We can install integrated lighting systems you control with your phone, build "grand entrance" staircases, create seamless board layouts (no ugly seams), and even fabricate custom aluminum or wood railing systems in-house.',
  },
];

// Organize FAQs by category for targeted placement
export const FAQ_BY_CATEGORY = {
  timeline: ALL_FAQS.filter((faq) => faq.category === "timeline"),
  pricing: ALL_FAQS.filter((faq) => faq.category === "pricing"),
  materials: ALL_FAQS.filter((faq) => faq.category === "materials"),
  trust: ALL_FAQS.filter((faq) => faq.category === "trust"),
  general: ALL_FAQS.filter((faq) => faq.category === "general"),
};

// Home page FAQs - mix of timeline, pricing, and trust
export const HOME_PAGE_FAQS = [
  ALL_FAQS[0], // Will my yard be a construction zone?
  ALL_FAQS[1], // Permits
  ALL_FAQS[4], // Price change?
  ALL_FAQS[5], // What if something goes wrong?
  ALL_FAQS[6], // Frost heave
  ALL_FAQS[7], // Staining
];

// New construction page FAQs
export const NEW_CONSTRUCTION_FAQS = [
  ALL_FAQS[0], // Construction zone
  ALL_FAQS[1], // Permits
  ALL_FAQS[2], // Messy job site
  ALL_FAQS[6], // Frost heave
  ALL_FAQS[9], // Custom designs
];

// Materials & Design page FAQs
export const MATERIALS_FAQS = [
  ALL_FAQS[6], // Frost heave
  ALL_FAQS[7], // Staining
  ALL_FAQS[8], // Rust
  ALL_FAQS[9], // Custom designs
];

// Repair & Maintenance page FAQs
export const MAINTENANCE_FAQS = [
  ALL_FAQS[6], // Frost heave
  ALL_FAQS[7], // Staining
  ALL_FAQS[5], // What if something goes wrong?
];

// Trust/Pricing page FAQs
export const TRUST_FAQS = [
  ALL_FAQS[3], // Cheapest option?
  ALL_FAQS[4], // Price change?
  ALL_FAQS[5], // What if something goes wrong?
  ALL_FAQS[8], // Rust
];
