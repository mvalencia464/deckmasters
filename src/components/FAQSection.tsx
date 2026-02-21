import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  category?: string;
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  items,
  title = "Frequently Asked Questions",
  subtitle,
  category,
  className = "",
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={`py-20 px-6 bg-stone-950 border-t border-stone-800 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-orange-600" />
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white mb-4">
            {title}
          </h2>
          {subtitle && <p className="text-stone-400 text-lg max-w-2xl">{subtitle}</p>}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-stone-800 overflow-hidden hover:border-orange-600/50 transition-colors duration-300"
            >
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full px-6 py-5 flex items-start justify-between gap-4 bg-stone-900/50 hover:bg-stone-900 transition-colors text-left"
              >
                <span className="text-base md:text-lg font-semibold text-white flex-1">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5 transition-transform duration-300 ${expandedId === item.id ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Answer */}
              {expandedId === item.id && (
                <div className="px-6 py-5 bg-stone-900 border-t border-stone-800">
                  <div className="text-stone-400 leading-relaxed space-y-3">
                    {item.answer.split("\n\n").map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
