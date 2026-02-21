import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

const StrategyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-950/95 backdrop-blur-md animate-fade-in">
      <div className="max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-sm overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-12 border-r border-stone-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-orange-600"></div>
              <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs">The Fixed-Price System™</span>
            </div>

            <h2 className="text-4xl font-display font-bold uppercase mb-8 leading-none">
              The No-Surprise <br />
              <span className="text-white">Guarantee.</span>
            </h2>

            <div className="space-y-6">
              {[
                { title: 'Fixed-Price Contracts', desc: 'If the scope doesn\'t change, the price doesn\'t change. Period.' },
                { title: 'Weekly Check-ins', desc: 'You\'ll never have to chase us. We host weekly in-person progress meetings.' },
                { title: 'Clean Site Policy', desc: 'Job sites are cleared every single day. Zero nails left behind.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">{item.title}</h4>
                    <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-12 bg-stone-950/50 flex flex-col justify-center">
            <h3 className="text-xl font-display font-bold uppercase mb-6">Experience the Difference</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              We've built our entire business around eliminating the "Contractor Horror Story." From 3D design renders to fixed-price guarantees, we make building easy.
            </p>

            <button
              onClick={onClose}
              className="bg-orange-600 text-white px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-orange-700 transition-all flex items-center justify-center gap-2 group"
            >
              Start My Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyModal;

