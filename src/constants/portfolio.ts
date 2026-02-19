import { Project, ServiceNiche } from "../types/portfolio";
import portfolioDataJson from "../data/portfolio-data.json";

export const NICHES: ServiceNiche[] = ['New Build', 'Resurfacing', 'Railing', 'Covered Deck', 'Commercial'];

// Combine new optimized portfolio data with legacy projects
const legacyProjects: Project[] = [
  {
    "id": "hillside-mountain-view",
    "title": "Hillside Mountain View Deck",
    "niche": "New Build",
    "location": "Hillside",
    "description": "Custom Trex composite deck with cable railing maximizing Chugach Mountain views. This multi-level design features seamless sightline optimization with stainless steel cable railings.",
    "beforeImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce846b2e7dc59948847.webp",
    "afterImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce846b2e7dc59948847.webp",
    "gallery": [],
    "date": "2024-07-15",
    "featured": true,
    "testimonial": {
      "quote": "The design maximizes our mountain views perfectly. Couldn't be happier with the craftsmanship.",
      "author": "Hillside Homeowner",
      "rating": 5
    }
  },
  {
    "id": "south-anchorage-retreat",
    "title": "South Anchorage Retreat",
    "niche": "Covered Deck",
    "location": "South Anchorage",
    "description": "Cedar construction with integrated pergola and built-in seating. A complete outdoor living transformation with superior weather protection and entertaining space.",
    "beforeImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce88e95930485eed7e9.webp",
    "afterImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce88e95930485eed7e9.webp",
    "gallery": [],
    "date": "2024-06-20",
    "featured": true,
    "testimonial": {
      "quote": "Our backyard is now our favorite room in the house. The pergola provides the perfect shade.",
      "author": "South Anchorage Family",
      "rating": 5
    }
  },
  {
    "id": "turnagain-coastal",
    "title": "Turnagain Coastal Deck",
    "niche": "Resurfacing",
    "location": "Turnagain",
    "description": "Trex Enhance in Coastal Bluff with aluminum railing system. A complete resurfacing that transformed an aging deck into a modern masterpiece.",
    "beforeImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce88e95930ecdeed7ea.webp",
    "afterImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce88e95930ecdeed7ea.webp",
    "gallery": [],
    "date": "2024-05-30",
    "featured": false,
    "testimonial": {
      "quote": "The transformation was amazing. We didn't realize how much better it could look.",
      "author": "Turnagain Homeowner",
      "rating": 5
    }
  },
  {
    "id": "eagle-river-sanctuary",
    "title": "Eagle River Sanctuary",
    "niche": "New Build",
    "location": "Eagle River",
    "description": "Premium Alaskan Yellow Cedar with custom privacy screens. A natural wood masterpiece that blends seamlessly with the surrounding landscape.",
    "beforeImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce8a6fefe0d974f34d8.webp",
    "afterImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce8a6fefe0d974f34d8.webp",
    "gallery": [],
    "date": "2024-08-10",
    "featured": false,
    "testimonial": {
      "quote": "The cedar deck smells amazing and looks even better. Worth every penny.",
      "author": "Eagle River Owner",
      "rating": 5
    }
  },
  {
    "id": "midtown-modern",
    "title": "Midtown Modern",
    "niche": "New Build",
    "location": "Midtown Anchorage",
    "description": "Engineered deck with reinforced hot tub platform and LED lighting. A contemporary design perfect for entertaining with integrated luxury amenities.",
    "beforeImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce9e4747c47d3daaeba.webp",
    "afterImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924dce9e4747c47d3daaeba.webp",
    "gallery": [],
    "date": "2024-07-05",
    "featured": true,
    "testimonial": {
      "quote": "Our hot tub deck is the envy of the neighborhood. The engineering is rock solid.",
      "author": "Midtown Resident",
      "rating": 5
    }
  },
  {
    "id": "glen-alps-entertainer",
    "title": "Glen Alps Entertainer",
    "niche": "Covered Deck",
    "location": "Glen Alps",
    "description": "Expansive deck with built-in grill station and dining area. An outdoor kitchen paradise designed for large gatherings and entertaining.",
    "beforeImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924e48946b2e7e3e1997a18.webp",
    "afterImage": "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6924e48946b2e7e3e1997a18.webp",
    "gallery": [],
    "date": "2024-06-15",
    "featured": true,
    "testimonial": {
      "quote": "Hosting on our deck is now a dream. The grill station is perfectly integrated.",
      "author": "Glen Alps Entertainer",
      "rating": 5
    }
  }
];

// Merge legacy projects with new optimized portfolio data
export const MOCK_PROJECTS: Project[] = [
  ...legacyProjects,
  ...(portfolioDataJson as Project[])
];
