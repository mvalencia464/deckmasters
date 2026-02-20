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
    <section className={`py-20 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            {title}
          </h2>
          {subtitle && <p className="text-xl text-stone-600">{subtitle}</p>}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-stone-300 rounded-lg overflow-hidden hover:border-orange-600 transition-colors"
            >
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full px-6 py-5 flex items-start justify-between gap-4 bg-white hover:bg-stone-50 transition-colors text-left"
              >
                <span className="text-lg font-semibold text-stone-900 flex-1">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-orange-600 flex-shrink-0 transition-transform duration-300 ${
                    expandedId === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              {expandedId === item.id && (
                <div className="px-6 py-5 bg-stone-50 border-t border-stone-300">
                  <div className="text-stone-700 leading-relaxed space-y-3">
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
