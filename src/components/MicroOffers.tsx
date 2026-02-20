/**
 * Micro Offers Component
 * Displays three conversion angles based on Andromeda Matrix
 * Trust/Value/Luxury CTAs positioned strategically throughout page
 */

import React from 'react';
import { Shield, Thermometer, Eye, ArrowRight } from 'lucide-react';
import { MICRO_OFFERS } from '../config/microOffers';
import { analytics } from '../utils/analyticsTracker';

interface MicroOffersProps {
  variant?: 'inline' | 'sidebar' | 'popup';
  layout?: 'vertical' | 'horizontal';
}

const iconMap: Record<string, React.ReactNode> = {
  'Shield': <Shield className="w-6 h-6" />,
  'Thermometer': <Thermometer className="w-6 h-6" />,
  'Eye': <Eye className="w-6 h-6" />
};

export const MicroOffers: React.FC<MicroOffersProps> = ({
  variant = 'inline',
  layout = 'horizontal'
}) => {
  const handleOfferClick = (offerId: string, label: string) => {
    analytics.trackMicroOfferClick(offerId, label);
    // Scroll to quote form
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
      quoteForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Inline variant - prominent horizontal cards
  if (variant === 'inline') {
    return (
      <div className={`grid gap-4 ${layout === 'horizontal' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
        {MICRO_OFFERS.map((offer) => (
          <div
            key={offer.id}
            className="bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleOfferClick(offer.id, offer.label)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOfferClick(offer.id, offer.label);
              }
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-orange-600 bg-orange-50 p-3 rounded-lg">
                {offer.icon && iconMap[offer.icon]}
              </div>
              <span className="text-xs font-semibold text-orange-600 uppercase bg-orange-50 px-2 py-1 rounded">
                {offer.trigger.split(':')[0].trim()}
              </span>
            </div>

            <h3 className="text-base font-semibold text-stone-900 mb-2">
              {offer.label}
            </h3>

            <p className="text-sm text-stone-600 mb-4">
              {getOfferDescription(offer.id)}
            </p>

            <button
              className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm hover:gap-3 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                handleOfferClick(offer.id, offer.label);
              }}
            >
              Claim Offer
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  }

  // Sidebar variant - vertical list
  if (variant === 'sidebar') {
    return (
      <div className="space-y-3 bg-stone-50 p-4 rounded-lg border border-stone-200">
        <h3 className="font-semibold text-stone-900 mb-4">Why Choose Us</h3>
        {MICRO_OFFERS.map((offer) => (
          <button
            key={offer.id}
            onClick={() => handleOfferClick(offer.id, offer.label)}
            className="w-full text-left p-3 rounded-lg bg-white border border-stone-200 hover:border-orange-600 hover:bg-orange-50 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="text-orange-600 mt-0.5 flex-shrink-0">
                {offer.icon && iconMap[offer.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-900 group-hover:text-orange-600">
                  {offer.label}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  {offer.trigger}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  // Popup variant - modal-style
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 md:p-8">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">
          Choose Your Path to Your Dream Deck
        </h2>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {MICRO_OFFERS.map((offer) => (
            <button
              key={offer.id}
              onClick={() => handleOfferClick(offer.id, offer.label)}
              className="text-left p-4 rounded-lg border border-stone-200 hover:border-orange-600 hover:bg-orange-50 transition-all"
            >
              <div className="text-orange-600 mb-3">
                {offer.icon && iconMap[offer.icon]}
              </div>
              <h3 className="font-semibold text-stone-900 mb-1">
                {offer.label}
              </h3>
              <p className="text-xs text-stone-600">
                {offer.trigger}
              </p>
            </button>
          ))}
        </div>

        <button
          className="w-full bg-stone-900 text-white py-3 rounded-lg font-semibold hover:bg-stone-800 transition-colors"
          onClick={() => {
            analytics.trackLead('micro_offers_popup');
            const quoteForm = document.getElementById('quote-form');
            if (quoteForm) {
              quoteForm.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

/**
 * Get contextual description for each offer
 */
function getOfferDescription(offerId: string): string {
  const descriptions: Record<string, string> = {
    'safety_insp': 'Our expert team inspects your deck\'s structural integrity and identifies any safety concerns.',
    'frost_heave': 'We assess your foundation\'s resistance to Alaska\'s freeze-thaw cycles and frost heave damage.',
    '3d_render': 'See your dream deck in stunning 3D before we build it. Perfect for visualizing your outdoor space.'
  };

  return descriptions[offerId] || '';
}

export default MicroOffers;
