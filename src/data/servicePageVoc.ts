/**
 * Voice-of-customer quotes for category, core, and leaf service pages (not homepage).
 * Excerpts mined from google-reviews.json — update when sync adds standout lines.
 */
import type { ServiceCategoryId, CoreServiceSlug, ChildServiceSlug } from './siteArchitecture';
import type { VocSnippet } from './vocQuotes';

export type { VocSnippet };

export const categoryVocQuotes: Record<ServiceCategoryId, VocSnippet[]> = {
  'deck-building': [
    {
      excerpt: 'Price was competitive against other quotes… quality of the work was excellent.',
      author: 'Nate Van Nortwick',
    },
    {
      excerpt:
        'They worked to get us a design that fit our budget… focused on getting the job done right — price was very competitive.',
      author: 'Damon “DS” Scott',
    },
  ],
  'deck-repair': [
    {
      excerpt: 'Deck Masters scheduled me quickly and completed the job to my satisfaction.',
      author: 'Anita Baker',
    },
    {
      excerpt:
        'I was impressed when I got a call 9 months after the deck was finished to ask if we had any concerns.',
      author: 'Caryn Bromirski',
    },
  ],
  'general-contracting': [
    {
      excerpt:
        'Working with Deck Masters has been a good experience… dedicated to customer service and getting projects built in a timely manner.',
      author: 'Justin Hoeldt',
    },
    {
      excerpt:
        'Their customer service is exceptional. I highly recommend them — anyone that knows me, I am very picky as to companies I choose to work in my home.',
      author: 'Annette Dyess',
    },
  ],
  'outdoor-living': [
    {
      excerpt: 'We were well informed throughout the whole process.',
      author: 'Arron Reese',
    },
    {
      excerpt: 'Excellent job from start to finish… helpful office team.',
      author: 'Jim Bennett',
    },
  ],
};

export const coreVocQuotes: Record<CoreServiceSlug, VocSnippet[]> = {
  'custom-decks-design': [
    {
      excerpt: 'Deckmasters was very accommodating and helped me pick out the perfect colors.',
      author: 'Deborah Warnke',
    },
  ],
  'deck-replacement-decking': [
    {
      excerpt:
        'I started out wanting the front deck expanded and then ended up with a complete front and rear deck replacement… I should have done this years ago.',
      author: 'Dennis Hardman',
    },
  ],
  'deck-framing-foundations': [
    {
      excerpt: 'The work was done expediently, professionally and with attention to detail and quality.',
      author: 'Joseph Leman',
    },
  ],
  'railings-staircases': [
    {
      excerpt: 'The company was on time, on budget and produced a lovely deck exactly as requested.',
      author: 'Penny G.',
    },
  ],
  'exterior-renovations-roofing': [
    {
      excerpt:
        'Deck masters replaced our 30 year old deck and a section of rotted exterior siding. Very nice job. I\'d recommend them highly.',
      author: 'Brent Schlosstein',
    },
  ],
  'contracting-project-services': [
    {
      excerpt: 'They showed up when they said they would and did a great job.',
      author: 'Frank Gwartney',
    },
  ],
};

/** One quote per leaf URL — review-verbatim excerpts where possible */
export const childVocBySlug: Record<ChildServiceSlug, VocSnippet> = {
  'custom-deck-design': {
    excerpt:
      'Having a company that has proven quality and knowledge of all stages of my deck rebuild and design was exactly what I was looking for.',
    author: 'Matthew C',
  },
  'new-deck-construction': {
    excerpt: 'The company was on time, on budget and produced a lovely deck exactly as requested.',
    author: 'Penny G.',
  },
  'multi-level-decks': {
    excerpt: 'Price was competitive… quality of the work was excellent.',
    author: 'Nate Van Nortwick',
  },
  'deck-replacement': {
    excerpt: 'I should have done this years ago.',
    author: 'Dennis Hardman',
  },
  'composite-decking-installation': {
    excerpt: 'Really happy with the result… focused on getting the job done right.',
    author: 'Damon “DS” Scott',
  },
  'wood-decking-installation': {
    excerpt: 'Excellent job from start to finish… helpful office team.',
    author: 'Jim Bennett',
  },
  'deck-framing': {
    excerpt: 'The work site was maintained clean and free of debris.',
    author: 'Joseph Leman',
  },
  'deck-footings-foundations': {
    excerpt: 'We were well informed throughout the whole process.',
    author: 'Arron Reese',
  },
  'custom-railing-design': {
    excerpt: 'We are very happy with Deckmasters. You will be too!',
    author: 'Deborah Warnke',
  },
  'aluminum-railing-installation': {
    excerpt: 'Professional, easy to talk to. They definitely know decks for sure.',
    author: 'Bob Witt',
  },
  'cable-railing-installation': {
    excerpt: 'Lovely deck exactly as requested.',
    author: 'Penny G.',
  },
  'wood-railing-installation': {
    excerpt: 'Quality of the work was excellent.',
    author: 'Nate Van Nortwick',
  },
  'composite-railing-installation': {
    excerpt: 'Their customer service is exceptional.',
    author: 'Annette Dyess',
  },
  'staircase-design-build': {
    excerpt: 'Dedicated to customer service and getting projects built in a timely manner.',
    author: 'Justin Hoeldt',
  },
  'deck-board-replacement': {
    excerpt: 'Scheduled me quickly and completed the job to my satisfaction.',
    author: 'Anita Baker',
  },
  'structural-deck-repair': {
    excerpt: 'I got a call 9 months after the deck was finished to ask if we had any concerns.',
    author: 'Caryn Bromirski',
  },
  'railing-repair': {
    excerpt: 'They showed up when they said they would and did a great job.',
    author: 'Frank Gwartney',
  },
  'stair-repair': {
    excerpt: 'We were well informed throughout the whole process.',
    author: 'Arron Reese',
  },
  'water-damage-repair-decks': {
    excerpt: 'Focused on getting the job done right — price was very competitive.',
    author: 'Damon “DS” Scott',
  },
  'mold-remediation-decks': {
    excerpt: 'I am very picky as to companies I choose to work in my home.',
    author: 'Annette Dyess',
  },
  'storm-damage-repair-decks': {
    excerpt: 'We were so happy with our deck repair and the professionalism was top notch.',
    author: 'Dale Johnson',
  },
  'exterior-home-renovations': {
    excerpt:
      'Not just a deck, but siding, roof work, and repairing framing after water damage… they took the time to do it right.',
    author: 'Matthew Blakeslee',
  },
  'siding-replacement': {
    excerpt: 'Replaced our 30 year old deck and a section of rotted exterior siding. Very nice job.',
    author: 'Brent Schlosstein',
  },
  'fascia-soffit-installation': {
    excerpt: 'Family, friendly environment.',
    author: 'Justin Hoeldt',
  },
  'roofing-services': {
    excerpt: 'Workmanship is excellent right down to the last detail.',
    author: 'Mark Daly',
  },
  'garage-wall-reconstruction': {
    excerpt: 'Deck masters replaced our 30 year old deck and a section of rotted exterior siding.',
    author: 'Brent Schlosstein',
  },
  'garage-roof-reconstruction': {
    excerpt: 'Beautiful deck. Thank you.',
    author: 'Gary Goins, MS, BSN, RN',
  },
  'residential-general-contracting': {
    excerpt: 'Really great company, wonderful people to work with.',
    author: 'Shelly Wells',
  },
  'water-damage-restoration': {
    excerpt:
      'Sean… was amazing, especially with the water damage repairs — he minimized the impact and kept things moving.',
    author: 'Matthew Blakeslee',
  },
  'structural-repairs': {
    excerpt: 'Attention to detail and quality.',
    author: 'Joseph Leman',
  },
  'project-management': {
    excerpt: 'They kept me informed at every stage and always gave me at least a week’s advance notice before starting any work.',
    author: 'Shelly Wells',
  },
  'permit-acquisition-assistance': {
    excerpt: 'They took care of every issue, including working with the Muni on permitting.',
    author: 'Mark Daly',
  },
  'site-preparation': {
    excerpt: 'Their demo crew came out and had it down in about an hour, and the trash gone 30min later.',
    author: 'Joshua Swan',
  },
  'material-sourcing': {
    excerpt: 'They worked to get us a design that fit our budget.',
    author: 'Damon “DS” Scott',
  },
  'rough-carpentry': {
    excerpt: 'From the demo guys to the framers to the final details guy, everyone was professional.',
    author: 'Alaskadk',
  },
  'finish-carpentry': {
    excerpt: 'Robert, Quillin, and Cameron were wizards when it came to finishing touches.',
    author: 'Rachel Blakeslee',
  },
  'framing-services': {
    excerpt: 'Professional, precise, prompt, perfection, clean, accurate.',
    author: 'Ruth Mcnearney',
  },
  'demolition-services': {
    excerpt: 'Their demo crew came out and had it down in about an hour.',
    author: 'Joshua Swan',
  },
  'consultation-planning': {
    excerpt: 'Very patient and helpful in completing the job.',
    author: 'Dennis Hardman',
  },
  'building-code-compliance': {
    excerpt: 'They took care of every issue, including working with the Muni on permitting.',
    author: 'Mark Daly',
  },
  'construction-clean-up': {
    excerpt: 'Good clean up. Highly recommendable.',
    author: 'Ruth Mcnearney',
  },
  'custom-staircases-landings': {
    excerpt:
      'The staircase is sturdy, safe, and beautifully designed, giving us both confidence and peace of mind when using it.',
    author: 'TONI REESE',
  },
  'elevated-deck-systems': {
    excerpt: 'You will not be sorry with Deck Masters.',
    author: 'Mark Daly',
  },
};
