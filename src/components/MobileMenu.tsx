import React from 'react';
import { X } from 'lucide-react';

const MobileMenu = React.memo(({ isOpen, onClose, navigate, openQuoteForm, pages }) => {
  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute top-0 right-0 w-full max-w-sm h-full bg-stone-950 border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-out delay-75 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-white/5">
          <span className="text-sm font-display font-bold uppercase tracking-[0.2em] text-white">Menu</span>
          <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => { navigate('/'); onClose(); }}
              className="text-left text-2xl font-display font-bold uppercase text-white hover:text-orange-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => { onClose(); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView(), 100); }}
              className="text-left text-2xl font-display font-bold uppercase text-stone-300 hover:text-orange-500 transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => { onClose(); setTimeout(() => document.getElementById('reviews')?.scrollIntoView(), 100); }}
              className="text-left text-2xl font-display font-bold uppercase text-stone-300 hover:text-orange-500 transition-colors"
            >
              Reviews
            </button>
          </div>

          <div className="pt-6 border-t border-white/5">
            <span className="text-xs text-orange-600 font-bold uppercase tracking-widest block mb-4">Services</span>
            <div className="flex flex-col gap-4">
              {pages.map(p => (
                <button
                  key={p.slug}
                  onClick={() => { navigate(p.slug); onClose(); }}
                  className="text-left text-sm text-stone-400 hover:text-orange-500 transition-colors font-bold uppercase tracking-wide"
                >
                  {p.category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Bottom CTA */}
        <div className="p-6 border-t border-white/5 bg-stone-950">
          <button
            onClick={() => { openQuoteForm(); onClose(); }}
            className="w-full bg-orange-600 text-white py-4 font-bold uppercase tracking-widest hover:bg-orange-700 transition-colors"
          >
            Get Free Quote
          </button>
        </div>
      </div>
    </div>
  );
});

export default MobileMenu;

