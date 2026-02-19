import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Consultation & Design',
      description: 'We meet with you to understand your vision, yard conditions, and lifestyle needs. Using advanced 3D CAD rendering, we create a detailed visual plan you can approve before construction begins.'
    },
    {
      number: '02',
      title: 'Permitting & Planning',
      description: 'We handle all Municipality of Anchorage permitting, zoning reviews, and structural inspections. Our relationships with local inspectors ensure smooth approvals and code compliance.'
    },
    {
      number: '03',
      title: 'Precision Engineering',
      description: 'We engineer for Alaska. Frost-proof helical piles, seismic bracing, and snow load calculations standard on every build. No shortcuts—only engineering that protects your investment.'
    },
    {
      number: '04',
      title: 'Rapid Construction',
      description: 'Our Strike Team deploys efficiently to minimize disruption. Simple replacements complete in 24 hours. Complex builds executed with military precision and attention to detail.'
    },
    {
      number: '05',
      title: 'Final Walkthrough',
      description: 'We conduct a comprehensive inspection with you, covering every detail. The deck is yours when you\'re 100% satisfied—not before.'
    },
    {
      number: '06',
      title: 'Lifetime Support',
      description: 'Your deck comes with a comprehensive warranty, maintenance plans, and our commitment to stand behind every board we install. We\'re here for the long haul.'
    }
  ];

  return (
    <section id="process" className="py-32 bg-stone-900 border-t border-stone-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-orange-600"></div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">Our Process</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-display font-bold uppercase leading-[0.8] mb-6">
            Built Right, <br /> <span className="text-stone-500">Built Fast.</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl">
            From initial consultation to lifetime support, we follow a proven process that ensures your deck is engineered precisely, built efficiently, and backed by our commitment to excellence.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-8 border border-stone-800 bg-stone-950/50 hover:bg-stone-900/80 hover:border-orange-600/50 transition-all duration-300"
            >
              {/* Step Number */}
              <div className="mb-6">
                <span className="text-orange-600 font-display text-5xl font-bold leading-none">
                  {step.number}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-display font-bold uppercase mb-4 group-hover:text-orange-500 transition-colors">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Accent Line */}
              <div className="h-[2px] w-8 bg-gradient-to-r from-orange-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center border-t border-stone-800 pt-12">
          <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
            Ready to start your deck journey? Contact us today for a free consultation and 3D design rendering.
          </p>
          <a
            href="tel:+19078918283"
            className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase text-xs tracking-widest transition-all duration-300"
          >
            Call (907) 891-8283 <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
