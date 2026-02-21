import React from 'react';
import { core30Pages } from '../data/core30Pages';

const SeoSitemap = ({ navigate }) => {
    const categories = [
        {
            title: "New Deck Construction",
            links: core30Pages.filter(p => p.slug.includes('/new-deck-construction/'))
        },
        {
            title: "Custom Deck Design",
            links: core30Pages.filter(p => p.slug.includes('/custom-deck-design/'))
        },
        {
            title: "Repair & Maintenance",
            links: core30Pages.filter(p => p.slug.includes('/deck-repair-maintenance/'))
        },
        {
            title: "Materials & Components",
            links: core30Pages.filter(p => p.slug.includes('/deck-materials-components/'))
        }
    ];

    const neighborhoods = [
        "Hillside", "Rabbit Creek", "Southport", "Bayshore", "Midtown", "Taku",
        "Eagle River", "Chugiak", "Abbott Loop", "Sahalee", "Turnagain",
        "Spenard", "Bear Valley", "Glen Alps", "Government Hill", "Jewel Lake",
        "Goldenview"
    ];

    return (
        <div className="py-20 border-t border-stone-900 bg-stone-950">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    {categories.map((cat, i) => (
                        <div key={i}>
                            <h3 className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-6 border-b border-stone-800 pb-2">
                                {cat.title}
                            </h3>
                            <ul className="space-y-3">
                                {cat.links.map((page, j) => (
                                    <li key={j}>
                                        <button
                                            onClick={() => navigate(page.slug)}
                                            className="text-stone-500 hover:text-stone-300 text-xs uppercase tracking-wider transition-colors block text-left"
                                        >
                                            {page.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-stone-900 pt-12">
                    <h3 className="text-stone-600 font-bold uppercase tracking-widest text-xs mb-6 text-center">
                        Proudly Serving Anchorage Neighborhoods
                    </h3>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-stone-500 text-xs uppercase tracking-wider">
                        {neighborhoods.map((hood, i) => (
                            <span key={i} className="flex items-center gap-2">
                                {hood} {i !== neighborhoods.length - 1 && <span className="text-stone-800">•</span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeoSitemap;
