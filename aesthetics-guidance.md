Build a complete, production-ready Astro 5.x website (use latest stable version, e.g., 5.16+ or whatever is current) for a generic home service contractor specializing in decks, outdoor living, repairs, and general contracting in a cold-climate area like Alaska. Use static output ('output: 'static') for maximum speed and SEO — no adapter needed unless we add hybrid later.

Key requirements from my SOP:
- Use Tailwind CSS (add via astro add tailwind).
- Brand color: #336699 (primary blue-gray for cold/durable feel).
- Font: Modern sans-serif (e.g., Inter or system-ui).
- Structure: 
  - Layout: Single Layout.astro with header (logo placeholder + nav + phone CTA), footer (hours, address, social links, copyright).
  - Pages: 
    - index.astro: Hero (tagline + USP + "Get Free Quote" CTA), Services overview (cards from primary category), Testimonials carousel/section, About snippet, Call-to-action.
    - services.astro: Detailed list grouped by category, highlight selected services (e.g., Custom Deck Design, Deck Replacement, Composite Decking, Custom Railing, Siding Replacement, Structural Repairs).
    - about.astro: Full aboutUs blurb + climate resilience section (mention challenges like freeze-thaw, heavy snow, high winds; emphasize durable builds).
    - contact.astro: Quote form island + contact info.
- Minimal JavaScript: Only use Astro Islands for the quote form (client:visible or client:idle). Use vanilla JS for form handling.
- Quote Form (island component):
  - Fields: Name, Phone, Email, Service Type (dropdown populated from selected services across categories), Project Description, Address/Neighborhood (optional dropdown from neighborhoods served).
  - Spam protection: Cloudflare Turnstile (use test sitekey 1x00000000000000000000AA for dev; mention switching to real later).
  - Submit: Async fetch to placeholder HighLevel GHL API endpoint[](https://api.gohighlevel.com/v1/forms/submit/[placeholder-id]). Show success/error message.
- Images: Do NOT use old/outdated Google Business Profile photos. Instead:Use placeholder images from Unsplash-style sources or describe them clearly so AI can generate code with real src URLs (e.g., https://images.unsplash.com/...). Ensure all use Astro <Image> with sizes, formats (avif/webp fallback), and loading='lazy'.
  - Suggest in comments: Client will provide fresh photos from hard drive later — optimize/upload to site, then update GBP/social with them for consistency.
  - Hero: Large background image of durable deck in winter setting.
  - Service cards: Small icons or photos.
  - Testimonials: Optional headshot placeholders.
  - Gallery section on home/services: 4–6 placeholder images.
- SEO: Dynamic title/description using businessName + primaryCity + services (e.g., "[Business Name] | Custom Decks & Repairs in [City], AK").
- Performance: Use Astro <Image> component for optimization.
- Deployment: Include wrangler.toml for Cloudflare Workers Static Assets (directory: ./dist, not_found_handling: "single-page-application"). For Cloudflare Workers Static Assets, confirm compatibility with Astro 5 adapter if hybrid added later — but keep pure static for now.
- Data source: Use this JSON exactly (fill placeholders if needed):
{
  "businessName": "[Business Name]",
  "ownerName": "",
  "tagline": "Building Durable Outdoor Spaces, One Project at a Time.",
  "primaryPhone": "(XXX) XXX-XXXX",
  "primaryEmail": "",
  "taxId": "",
  "address": "[Street Address], [City], [State] [ZIP], USA",
  "shippingAddress": "",
  "operatingHours": "Mon-Fri: 7:30 AM - 7:00 PM, Sat-Sun: Closed",
  "licenseNumber": "",
  "googleBusinessProfileUrl": "",
  "websiteUrl": "[website-url-placeholder]",
  "discounts": "",
  "highlights": "",
  "brandColor": "#336699",
  "fontPreference": "Modern",
  "logoUrl": null,
  "needsLogo": false,
  "aboutUs": "[Business Name] is a premier general contractor based in [City], specializing in crafting high-quality outdoor living spaces. With expertise in the region's unique climate and building styles, we deliver superior craftsmanship, innovative design, and long-lasting durability in every project. From custom deck builds and repairs to outdoor structures and exterior renovations, our team ensures a smooth process and results that enhance your home's value and enjoyment.",
  "primaryCity": "[City]",
  "neighborhoods": [
    "South [City]",
    "Central [City]",
    "Downtown [City]",
    "North [City]",
    "East [City]",
    "West [City]",
    "Airport Area",
    "Midtown [City]",
    "Residential Park",
    "Suburban Area"
  ],
  "environmentalChallenges": [
    "Extreme Cold",
    "Heavy Snowfall",
    "Ice Accumulation",
    "Freeze-Thaw Cycles",
    "Permafrost Issues",
    "High Winds",
    "Moisture and Humidity (seasonal)",
    "UV Radiation (summer)",
    "Pest Infestation (seasonal)"
  ],
  "categories": [
    {
      "isPrimary": true,
      "name": "Deck Builder",
      "services": [
        {"name": "Custom Deck Design", "selected": true},
        {"name": "New Deck Construction", "selected": true},
        {"name": "Deck Replacement", "selected": true},
        {"name": "Multi-level Decks", "selected": true},
        {"name": "Ground-level Decks", "selected": false},
        {"name": "Composite Decking Installation", "selected": true},
        {"name": "Wood Decking Installation", "selected": true},
        {"name": "Pressure-Treated Decking", "selected": false},
        {"name": "Redwood Decking", "selected": false},
        {"name": "Cedar Decking", "selected": false},
        {"name": "Deck Framing", "selected": true},
        {"name": "Deck Footings and Foundations", "selected": true},
        {"name": "Deck Staining and Sealing", "selected": false},
        {"name": "Deck Painting", "selected": false},
        {"name": "Deck Resurfacing", "selected": false},
        {"name": "Built-in Seating", "selected": false},
        {"name": "Pergola Construction", "selected": false},
        {"name": "Gazebo Construction", "selected": false},
        {"name": "Deck Lighting Installation", "selected": false},
        {"name": "Deck Waterproofing", "selected": false},
        {"name": "Deck Board Replacement", "selected": true},
        {"name": "Deck Inspection", "selected": false},
        {"name": "Deck Maintenance Plans", "selected": false},
        {"name": "Custom Railing Design", "selected": true},
        {"name": "Aluminum Railing Installation", "selected": true},
        {"name": "Cable Railing Installation", "selected": true},
        {"name": "Wood Railing Installation", "selected": true},
        {"name": "Glass Panel Railing", "selected": false},
        {"name": "Composite Railing Installation", "selected": true},
        {"name": "Staircase Design and Build", "selected": true}
      ]
    },
    {
      "isPrimary": false,
      "name": "Deck Repair & Maintenance",
      "services": [
        {"name": "Deck Board Replacement", "selected": true},
        {"name": "Structural Deck Repair", "selected": true},
        {"name": "Railing Repair", "selected": true},
        {"name": "Stair Repair", "selected": true},
        {"name": "Deck Joist Repair", "selected": false},
        {"name": "Deck Post Repair", "selected": false},
        {"name": "Dry Rot Repair", "selected": false},
        {"name": "Water Damage Repair", "selected": true},
        {"name": "Mold Remediation (Deck related)", "selected": true},
        {"name": "Deck Cleaning and Power Washing", "selected": false},
        {"name": "Deck Staining Services", "selected": false},
        {"name": "Deck Sealing Services", "selected": false},
        {"name": "Fastener Replacement", "selected": false},
        {"name": "Flashing Repair and Installation", "selected": false},
        {"name": "Deck Leveling", "selected": false},
        {"name": "Ice Damage Repair", "selected": false},
        {"name": "Snow Load Reinforcement", "selected": false},
        {"name": "General Deck Inspections", "selected": false},
        {"name": "Preventative Maintenance Plans", "selected": false},
        {"name": "Deck Restoration", "selected": false},
        {"name": "Permit Consultation for Repairs", "selected": false},
        {"name": "Code Compliance Upgrades", "selected": false},
        {"name": "Termite Damage Repair", "selected": false},
        {"name": "Storm Damage Repair", "selected": true},
        {"name": "Hardware Replacement", "selected": false}
      ]
    },
    {
      "isPrimary": false,
      "name": "General Contracting",
      "services": [
        {"name": "Residential General Contracting", "selected": true},
        {"name": "Commercial General Contracting", "selected": false},
        {"name": "Home Remodeling", "selected": false},
        {"name": "Exterior Home Renovations", "selected": true},
        {"name": "Siding Replacement", "selected": true},
        {"name": "Fascia & Soffit Installation", "selected": true},
        {"name": "Window & Door Installation", "selected": false},
        {"name": "Roofing Services", "selected": true},
        {"name": "Garage Wall Reconstruction", "selected": true},
        {"name": "Garage Roof Reconstruction", "selected": true},
        {"name": "Foundation Repair", "selected": false},
        {"name": "Water Damage Restoration", "selected": true},
        {"name": "Structural Repairs", "selected": true},
        {"name": "Project Management", "selected": true},
        {"name": "Permit Acquisition Assistance", "selected": true},
        {"name": "Site Preparation", "selected": true},
        {"name": "Material Sourcing", "selected": true},
        {"name": "Rough Carpentry", "selected": true},
        {"name": "Finish Carpentry", "selected": true},
        {"name": "Framing Services", "selected": true},
        {"name": "Additions and Extensions", "selected": false},
        {"name": "Demolition Services", "selected": true},
        {"name": "Consultation and Planning", "selected": true},
        {"name": "Building Code Compliance", "selected": true},
        {"name": "Construction Clean-up", "selected": true}
      ]
    },
    {
      "isPrimary": false,
      "name": "Outdoor Living",
      "services": [
        {"name": "Outdoor Kitchen Design", "selected": false},
        {"name": "Fire Pit Installation", "selected": false},
        {"name": "Custom Patio Covers", "selected": false},
        {"name": "Screened Porches", "selected": false},
        {"name": "Sunroom Additions", "selected": false},
        {"name": "Arbor and Trellis Construction", "selected": false},
        {"name": "Outdoor Fireplace Construction", "selected": false},
        {"name": "Retaining Wall Construction", "selected": false},
        {"name": "Outdoor Entertainment Areas", "selected": false},
        {"name": "Landscape Design Integration", "selected": false},
        {"name": "Hot Tub Deck Surrounds", "selected": false},
        {"name": "Custom Benches and Seating", "selected": false},
        {"name": "Planter Box Construction", "selected": false},
        {"name": "Privacy Screens", "selected": false},
        {"name": "Outdoor Bar Areas", "selected": false},
        {"name": "Paver Patios", "selected": false},
        {"name": "Concrete Patios", "selected": false},
        {"name": "Outdoor Audio Installation", "selected": false},
        {"name": "Accent Lighting for Outdoor Spaces", "selected": false},
        {"name": "Deck Enclosures", "selected": false},
        {"name": "Custom Staircases and Landings", "selected": true},
        {"name": "Elevated Deck Systems", "selected": true},
        {"name": "Underdecking Solutions", "selected": false},
        {"name": "Deck Benches", "selected": false},
        {"name": "Integrated Deck Storage", "selected": false}
      ]
    },
    {
      "isPrimary": false,
      "name": "Fencing",
      "services": [
        {"name": "Wood Fence Installation", "selected": false},
        {"name": "Vinyl Fence Installation", "selected": false},
        {"name": "Chain Link Fence Installation", "selected": false},
        {"name": "Aluminum Fence Installation", "selected": false},
        {"name": "Privacy Fence Installation", "selected": false},
        {"name": "Decorative Fence Installation", "selected": false},
        {"name": "Custom Fence Design", "selected": false},
        {"name": "Fence Repair Services", "selected": false},
        {"name": "Gate Installation", "selected": false},
        {"name": "Gate Repair", "selected": false},
        {"name": "Commercial Fencing", "selected": false},
        {"name": "Residential Fencing", "selected": false},
        {"name": "Security Fencing", "selected": false},
        {"name": "Ranch Fencing", "selected": false},
        {"name": "Composite Fencing", "selected": false},
        {"name": "Picket Fences", "selected": false},
        {"name": "Split Rail Fences", "selected": false},
        {"name": "Perimeter Fencing", "selected": false},
        {"name": "Sound Barrier Fences", "selected": false},
        {"name": "Automated Gate Systems", "selected": false},
        {"name": "Fence Staining and Painting", "selected": false},
        {"name": "Post Replacement", "selected": false},
        {"name": "Panel Replacement", "selected": false},
        {"name": "Fence Demolition and Removal", "selected": false},
        {"name": "Fence Consultation", "selected": false}
      ]
    }
  ],
  "deckingBrand": "",
  "railingType": "",
  "foundationType": "",
  "projects": [],
  "galleryUrls": [],
  "testimonials": [
    {
      "author": "Customer A",
      "id": "review-1",
      "location": "[City], [State]",
      "quote": "They did a wonderful job on our deck! Responsive, respectful, and delivered a beautiful result at a fair price. Highly recommend."
    },
    {
      "author": "Customer B",
      "id": "review-2",
      "location": "[City], [State]",
      "quote": "Our large project exceeded expectations. They handled challenges expertly, with great attention to detail and a hardworking team. We are very satisfied with the final result."
    },
    {
      "author": "Customer C",
      "id": "review-4",
      "location": "[City], [State]",
      "quote": "After storm damage, they installed a stronger railing and new stairs. Fast, friendly, and skilled craftsmanship. Extremely pleased!"
    }
  ],
  "rawReviews": [
    {
      "source": "Google",
      "text": "Great work on the deck! Responsive team, beautiful result, fair price. Highly recommend for local projects.",
      "author": "Customer A",
      "rating": 5,
      "date": "5 months ago"
    },
    {
      "source": "Google",
      "text": "Completed a large, complex project successfully. Handled unexpected issues well, with strong attention to detail and professional crew. Very satisfied overall.",
      "author": "Customer B",
      "rating": 5,
      "date": "5 months ago"
    },
    {
      "source": "Google",
      "text": "Smooth experience overall. Team resolved initial issues quickly and delivered a quality deck replacement efficiently. Happy with the outcome.",
      "author": "Customer D",
      "rating": 5,
      "date": "3 months ago"
    },
    {
      "source": "Google",
      "text": "Excellent work on railing and stairs after storm damage. Fast, skilled, and friendly. Would recommend.",
      "author": "Customer C",
      "rating": 5,
      "date": "a year ago"
    },
    {
      "source": "Google",
      "text": "Very happy with the new deck. Professional team, quality craftsmanship. Some delays but owner communicated well. Would use again.",
      "author": "Customer E",
      "rating": 5,
      "date": "a year ago"
    }
  ],
  "processSteps": [
    "Consult & Design",
    "Precision Build",
    "Lifetime Enjoyment"
  ],
  "termsAccepted": false,
  "socials": {
    "instagram": "[instagram-url-placeholder]",
    "facebook": "[facebook-url-placeholder]",
    "linkedin": "",
    "yelp": "",
    "houzz": "",
    "bbb": "[bbb-url-placeholder]",
    "tiktok": ""
  },
  "googlePlaceId": "[google-place-id-placeholder]"
}



Parse the JSON to populate dynamic parts (e.g., services dropdown from selected services, neighborhoods dropdown, testimonials array)

Make it beautiful, trustworthy, and conversion-focused: Emphasize free estimates, satisfaction guarantee, climate-durable builds, real testimonials with crew shoutouts if present.

First generate the full project structure, astro.config.mjs, key components (e.g., QuoteForm.astro island), and sample pages. Then I can iterate.

### Critical Things to Strictly Avoid (Performance & Lighthouse Focus)
To ensure 95–100 Lighthouse scores, sub-1s loads, and true zero-JS-by-default benefits, do NOT do any of these common mistakes:

- Avoid over-hydration: Never use client:load on non-essential components (e.g., no JS for static cards, headers, footers, or service lists). Use client:visible, client:idle, or client:media only when truly needed for interactivity. Default to zero JS everywhere else — that's Astro's superpower.
- No unnecessary islands: Keep islands minimal — only the quote form needs one. Do not wrap testimonials, about text, or service cards in islands.
- Image optimization mandatory: Always use Astro's <Image /> component from 'astro:assets' for every image (with width/height, format: 'avif' or 'webp' fallback, loading="lazy"). Never use plain <img> tags. Optimize placeholders to small file sizes.
- No third-party script bloat: Avoid embedding heavy trackers, live chat widgets, maps, or fonts without defer/async. If needed (e.g., Google Maps embed), lazy-load them or use static image placeholders instead.
- Static output only: Stick to output: 'static' — do NOT switch to 'hybrid' or 'server' unless we explicitly add a server-side feature later. No adapter unless required.
- Deployment gotchas: For Cloudflare Workers Static Assets, ensure wrangler.toml has correct directory: "./dist" and not_found_handling set properly. No large unused chunks in build — Astro should tree-shake automatically.
- No render-blocking resources: All CSS should be critical/inlined where possible; no blocking JS/CSS.
- Avoid Lighthouse "gaming": Do not hide content, defer everything artificially, or add fake performance marks — focus on real UX (fast TTFB, low CLS, quick TTI).
- Bundle size check: Aim for <20–50KB total JS shipped (ideally near zero). Comment where JS is added and why.

Follow these strictly to give the contractor the fastest, most conversion-friendly site possible.