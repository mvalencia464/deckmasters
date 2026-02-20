/**
 * Sticky Mobile CTA Component
 * Improves 1.77% Mobile CTR with persistent "Get My Quote" button
 * Only visible on mobile devices
 */

import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { analytics } from '../utils/analyticsTracker';

export const StickyMobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Show CTA after user scrolls down a bit
    const handleScroll = () => {
      if (window.scrollY > 300 && isMobile && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, isDismissed]);

  const handleCtaClick = () => {
    analytics.trackStickyCTAClick();
    // Scroll to quote form
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
      quoteForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isMobile || isDismissed || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-orange-600 to-orange-500 shadow-lg md:hidden">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Phone className="w-5 h-5 text-white flex-shrink-0" />
          <span className="text-white font-semibold text-sm">Ready to transform your deck?</span>
        </div>
        
        <button
          onClick={handleCtaClick}
          className="bg-stone-900 text-white px-4 py-2 rounded-md font-semibold text-sm whitespace-nowrap hover:bg-stone-800 transition-colors flex-shrink-0"
        >
          Get My Quote
        </button>

        <button
          onClick={handleDismiss}
          className="text-white hover:text-stone-100 transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
