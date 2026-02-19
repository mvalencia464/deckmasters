const fs = require('fs');
const path = require('path');

// 1. Load structured project data
let projects = [];
try {
    projects = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/projects.json'), 'utf8'));
} catch (e) {
    console.warn('Could not load projects.json, proceeding with manual services only.');
}

// 2. Define Core Services (Derived from Core 30 SEO structure)
const services = [
    {
        title: "New Deck Construction",
        description: "Custom deck building in Anchorage. Engineered for Alaska's 50lb+ snow loads and frost heave using helical piers.",
        link: "https://anchorage-deckmasters.com/new-deck-construction",
        image: "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/692128a0090c4aeb361d4e93.png",
        price: "850.00 USD" // Starting price for design/permitting
    },
    {
        title: "Trex Composite Decking",
        description: "Maintenance-free Trex decking with a 50-year warranty. Resistant to fading, staining, and scratching in Alaska's climate.",
        link: "https://anchorage-deckmasters.com/deck-materials-components/trex-deck-installation",
        image: "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/6921213447e1031c6472684f.webp",
        price: "850.00 USD"
    },
    {
        title: "Steel & Helical Piles",
        description: "Frost-proof foundations driven deep below the frost line. Prevents deck heaving and settles in Anchorage's unique soils.",
        link: "https://anchorage-deckmasters.com/deck-materials-components/deck-footings-framing",
        image: "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/692128a0090c4ae84c1d4e92.png",
        price: "850.00 USD"
    },
    {
        title: "Stainless Steel Cable Railing",
        description: "Modern, open railing systems designed to maximize your view of the Chugach Mountains while maintaining safety.",
        link: "https://anchorage-deckmasters.com/custom-deck-design/deck-railing-installation",
        image: "https://storage.googleapis.com/msgsndr/tV8qFLdWkBLBfjh64cFV/media/692128a05408c6549c1b9eea.png",
        price: "850.00 USD"
    },
    {
        title: "Deck Repair & Maintenance",
        description: "Diagnosis and repair of structural rot, frost heave damage, and cosmetic wear. Extends the life of your Alaskan deck.",
        link: "https://anchorage-deckmasters.com/deck-repair-maintenance",
        image: "https://storage.googleapis.com/msgsndr/ZvYXEcu0DmkCtuv5cGcG/media/68507af76b97b26856fdc209.webp",
        price: "125.00 USD" // Hourly labor rate
    }
];

// 3. Combine with recent projects for "Product Showcase"
const showcaseItems = projects
    .filter(p => {
        const isOutdoor = (p.niche || '').toLowerCase() === 'outdoor';
        const isNotTest = !['test', 'testing', 'sample'].includes((p.title || '').toLowerCase().trim());
        return isOutdoor && isNotTest;
    })
    .map(p => ({
        title: `${p.title} - Custom Outdoor Project`,
        description: p.description,
        link: `https://anchorage-deckmasters.com/portfolio#${p.id}`,
        image: p.afterImage,
        price: "850.00 USD"
    }));

const feedItems = services.concat(showcaseItems);

// 4. Generate CSV
const csvHeader = "id,title,description,link,image_link,price,brand,availability,condition,google_product_category\n";
const csvRows = feedItems.map((item, index) => {
    const id = `dm-${index + 1}`;
    const brand = "Deckmasters";
    const availability = "in stock";
    const condition = "new";
    const category = "Home & Garden > Decking";

    const escape = (str) => {
        if (!str) return '""';
        return `"${String(str).replace(/"/g, '""')}"`;
    };

    return [
        id,
        escape(item.title),
        escape(item.description),
        escape(item.link),
        escape(item.image),
        escape(item.price),
        escape(brand),
        escape(availability),
        escape(condition),
        escape(category)
    ].join(',');
}).join('\n');

const outputPath = path.join(__dirname, '../public/product-feed.csv');
fs.writeFileSync(outputPath, csvHeader + csvRows);
console.log(`✅ Product feed successfully generated at: ${outputPath}`);
console.log(`📊 Total items: ${feedItems.length}`);
