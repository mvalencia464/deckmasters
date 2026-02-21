import React from 'react';
import { ArrowRight } from 'lucide-react';
import PageLoadingFallback from './PageLoadingFallback';
import FAQSection from './FAQSection';
import parseMarkdown from '../utils/markdown';
import {
    NEW_CONSTRUCTION_FAQS,
    MATERIALS_FAQS,
    MAINTENANCE_FAQS,
    TRUST_FAQS,
} from '../data/faqs';

// Map Layer 2 slugs to their specific FAQ sets
const LAYER2_FAQS: Record<string, typeof NEW_CONSTRUCTION_FAQS> = {
    '/new-deck-construction': NEW_CONSTRUCTION_FAQS,
    '/deck-repair-maintenance': MAINTENANCE_FAQS,
    '/custom-deck-design': TRUST_FAQS,
    '/deck-materials-components': MATERIALS_FAQS,
};

const ServicePageTemplate = ({ pageData, openQuoteForm, navigate }) => {
    if (!pageData) return <PageLoadingFallback />;

    const categoryFAQs = pageData.layer === 2 ? LAYER2_FAQS[pageData.slug] : null;

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-orange-600"></div>
                            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">{pageData.category}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase mb-8 leading-tight">
                            {pageData.title}
                        </h1>
                        <p className="text-xl text-stone-400 mb-8 leading-relaxed">
                            {parseMarkdown(pageData.content.intro)}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-20 bg-stone-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    {pageData.content.sections && pageData.content.sections.map((section, idx) => (
                        <div key={idx} className="mb-16">
                            <h2 className="text-3xl font-display font-bold uppercase mb-6">{section.title}</h2>
                            <div className="space-y-6">
                                {Array.isArray(section.body) ? (
                                    section.body.map((paragraph, pIdx) => (
                                        <p key={pIdx} className="text-stone-400 leading-relaxed text-lg">
                                            {parseMarkdown(paragraph)}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-stone-400 leading-relaxed text-lg">{parseMarkdown(section.body)}</p>
                                )}
                            </div>
                            {section.imagePlaceholder && (
                                <div className="mt-8 rounded-lg overflow-hidden border border-stone-800 h-64 bg-stone-900">
                                    <img
                                        src={section.imagePlaceholder}
                                        alt={section.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section — Layer 2 pages only */}
            {categoryFAQs && categoryFAQs.length > 0 && (
                <FAQSection
                    items={categoryFAQs}
                    title="Common Questions"
                    subtitle="Straight answers to the most common questions we hear on this topic."
                />
            )}

            {/* CTA */}
            <section className="py-20 bg-stone-900 border-t border-stone-800">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold uppercase mb-8">
                        Ready to Get Started?
                    </h2>
                    <button
                        onClick={openQuoteForm}
                        className="bg-orange-600 text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-orange-700 transition-all inline-flex items-center gap-2 group"
                    >
                        Get Your Free Quote
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>
        </>
    );
};

export default ServicePageTemplate;
