import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Wind, Layers, Star, X, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface ProductsPageProps {
  onOpenQuote: () => void;
  navigate?: (path: string) => void;
}

// --- MOCK DATA FOR GALLERIES & REVIEWS ---
const PRODUCT_DATA = {
  composite: {
    images: [
      { src: "/images/deck-installation-thumbnail.webp", alt: "Composite Deck Installation" },
      { src: "/images/dsc_9524_webp.webp", alt: "Finished Composite Deck" },
      { src: "/images/deck-demolition-crew.webp", alt: "Deck Prep & Framing" }
    ],
    reviews: [
      {
        text: "Replacing a small second-story deck with a much larger one made from Trex... Our new deck receives compliments constantly.",
        author: "Kyle Van Peursem",
        location: "Anchorage Area"
      },
      {
        text: "Deck turned out beautiful, the price was right, the team was super responsive... 10/10 Would recommend.",
        author: "d meeks",
        location: "Anchorage, AK"
      }
    ]
  },
  railing: {
    images: [
      { src: "/images/moa.webp", alt: "Modern Cable Railing" },
      { src: "/images/dsc_9524_webp.webp", alt: "Glass Railing View" }, // Reusing for demo
      { src: "/images/consultation.webp", alt: "Railing Consultation" }
    ],
    reviews: [
      {
        text: "The cables from the railing enable us to see the whole back yard. The pipe stairway railing is really sturdy!",
        author: "Philip Freitag",
        location: "1514 Marten Street"
      },
      {
        text: "Deck Masters was able to remove the old railing and install a new, sturdier cable wire railing! Extremely pleased.",
        author: "Jackie Slagle",
        location: "Anchorage Area"
      }
    ]
  },
  underdeck: {
    images: [
      { src: "/images/consultation.webp", alt: "Under-Deck Drainage System" },
      { src: "/images/deck-demolition-crew.webp", alt: "Waterproofing Prep" }, // Reusing for demo
      { src: "/images/24-hour-replacement-promise.webp", alt: "Dry Patio Space" }
    ],
    reviews: [
      {
        text: "Sean on Jordan's crew was amazing, especially with the water damage repairs — he minimized the impact.",
        author: "Matthew Blakeslee",
        location: "Our Own Lane"
      },
      {
        text: "They reconstructed the walls of our garage... saving us significant time and cost. They also rebuilt the garage roof.",
        author: "Rachel Blakeslee",
        location: "Hillside"
      }
    ]
  }
};

const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenQuote, navigate }) => {
  const [activeSection, setActiveSection] = useState('composite');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['composite', 'railing', 'underdeck'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const GalleryGrid = ({ section }: { section: keyof typeof PRODUCT_DATA }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {PRODUCT_DATA[section].images.map((img, idx) => (
        <div 
          key={idx} 
          className={`relative overflow-hidden rounded-sm border border-stone-800 cursor-pointer group ${idx === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
          onClick={() => setLightboxImage(img.src)}
        >
          <img 
            src={img.src} 
            alt={img.alt} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-white font-bold uppercase tracking-widest text-xs border border-white px-4 py-2 bg-black/50 backdrop-blur-sm transition-opacity">
              View
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const TestimonialCard = ({ review }: { review: { text: string, author: string, location: string } }) => (
    <div className="bg-stone-900/50 p-6 border border-stone-800 rounded-sm relative">
      <Quote className="w-8 h-8 text-stone-700 absolute top-4 right-4" />
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-orange-600 fill-orange-600" />
        ))}
      </div>
      <p className="text-stone-300 italic mb-4 leading-relaxed">"{review.text}"</p>
      <div className="text-sm">
        <span className="text-white font-bold uppercase tracking-wide block">{review.author}</span>
        <span className="text-stone-500">{review.location}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-stone-950 min-h-screen pb-20 selection:bg-orange-600 selection:text-white">
      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-6 right-6 text-stone-500 hover:text-white">
            <X className="w-8 h-8" />
          </button>
          <img src={lightboxImage} alt="Gallery Preview" className="max-w-full max-h-[90vh] rounded-sm shadow-2xl" />
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-stone-950/70 z-10"></div>
          <img 
            src="/images/dsc_9524_webp.webp" 
            alt="Deck Masters Premium Build" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto animate-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-orange-900/20 border border-orange-900/30 text-orange-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></span>
            The 2026 Collection
          </div>
          <h1 className="font-display font-bold uppercase text-5xl md:text-7xl text-white mb-6 leading-[0.9] tracking-tight">
            Engineered for <br/>
            <span className="text-stone-500">The Last Frontier.</span>
          </h1>
          <p className="text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Our curated product line combines laboratory-tested durability with resort-style aesthetics. Built to withstand Anchorage's freeze-thaw cycles, high winds, and snow loads.
          </p>
        </div>
      </header>

      {/* Sticky Sub-Nav */}
      <div className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl">
        <div className="container mx-auto px-6 flex justify-center gap-4 md:gap-12 text-xs font-bold uppercase tracking-widest overflow-x-auto no-scrollbar">
          <button 
            onClick={() => scrollToSection('composite')}
            className={`transition-colors whitespace-nowrap px-4 py-2 rounded-sm ${activeSection === 'composite' ? 'bg-orange-600 text-white' : 'text-stone-500 hover:text-white hover:bg-white/5'}`}
          >
            Composite Decks
          </button>
          <button 
            onClick={() => scrollToSection('railing')}
            className={`transition-colors whitespace-nowrap px-4 py-2 rounded-sm ${activeSection === 'railing' ? 'bg-orange-600 text-white' : 'text-stone-500 hover:text-white hover:bg-white/5'}`}
          >
            Railing Systems
          </button>
          <button 
            onClick={() => scrollToSection('underdeck')}
            className={`transition-colors whitespace-nowrap px-4 py-2 rounded-sm ${activeSection === 'underdeck' ? 'bg-orange-600 text-white' : 'text-stone-500 hover:text-white hover:bg-white/5'}`}
          >
            Under-Deck Systems
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* PRODUCT A: COMPOSITE DECKS */}
        <section id="composite" className="py-24 border-b border-white/5 scroll-mt-20">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="order-2 md:order-1 space-y-8 sticky top-32">
              <div className="flex items-center gap-4 text-orange-600 mb-2">
                <Layers className="w-6 h-6" />
                <span className="font-bold uppercase tracking-widest text-sm">Core Revenue Driver</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none">
                Maintenance-Free <br/>
                <span className="text-stone-600">Composite Systems</span>
              </h2>
              
              <div className="text-2xl font-bold text-white">$15,000 - $45,000</div>
              
              <div className="space-y-6 text-stone-400 text-lg leading-relaxed">
                <p>
                  Stop painting and start relaxing. Our high-performance composite decks are built for the Anchorage climate—no rot, no splintering, and absolutely no sanding.
                </p>
                <p>
                  We use hidden fasteners for a flawless, barefoot-friendly finish backed by a 25-year fade & stain warranty.
                </p>
              </div>

              <div className="bg-stone-900/50 p-6 border border-stone-800 rounded-sm space-y-4">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm">Why Homeowners Choose This:</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-stone-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                    <span><strong>21-Day Build Guarantee:</strong> We finish on time so you don't miss summer.</span>
                  </li>
                  <li className="flex gap-3 text-stone-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                    <span><strong>Wind-Rated Engineering:</strong> Built to withstand 90mph+ gusts.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={onOpenQuote}
                  className="bg-orange-600 text-white px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
                >
                  Get Quote <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Reviews for this section */}
              <div className="pt-8 grid gap-4">
                 {PRODUCT_DATA.composite.reviews.map((review, idx) => (
                   <TestimonialCard key={idx} review={review} />
                 ))}
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <GalleryGrid section="composite" />
            </div>
          </div>
        </section>

        {/* PRODUCT B: RAILING SYSTEMS */}
        <section id="railing" className="py-24 border-b border-white/5 scroll-mt-20">
          <div className="grid md:grid-cols-2 gap-16 items-start">
             <div className="order-1">
              <GalleryGrid section="railing" />
            </div>

            <div className="order-2 space-y-8 sticky top-32">
              <div className="flex items-center gap-4 text-orange-600 mb-2">
                <Wind className="w-6 h-6" />
                <span className="font-bold uppercase tracking-widest text-sm">The Upsell</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none">
                Modern Cable & <br/>
                <span className="text-stone-600">Aluminum Railing</span>
              </h2>
              
              <div className="space-y-6 text-stone-400 text-lg leading-relaxed">
                <p>
                  Preserve your view and upgrade your safety. Our minimalist cable railing systems are engineered for Alaska’s high winds—allowing airflow to pass through instead of fighting it.
                </p>
              </div>

              <div className="bg-stone-900/50 p-6 border border-stone-800 rounded-sm space-y-4">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm">Key Features:</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-stone-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-stone-500 shrink-0" />
                    <span><strong>Rust-Resistant Aluminum:</strong> Won't corrode like steel or rot like wood.</span>
                  </li>
                  <li className="flex gap-3 text-stone-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-stone-500 shrink-0" />
                    <span><strong>Unobstructed Views:</strong> Perfect for properties with mountains or inlets in sight.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={onOpenQuote}
                  className="text-orange-600 px-8 py-4 font-bold uppercase text-xs tracking-widest hover:text-white transition-all flex items-center justify-center gap-2 border border-orange-600 hover:bg-orange-600"
                >
                  Inquire About Railings
                </button>
              </div>

               {/* Reviews for this section */}
               <div className="pt-8 grid gap-4">
                 {PRODUCT_DATA.railing.reviews.map((review, idx) => (
                   <TestimonialCard key={idx} review={review} />
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT C: UNDER-DECK DRAINAGE */}
        <section id="underdeck" className="py-24 scroll-mt-20">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="order-2 md:order-1 space-y-8 sticky top-32">
              <div className="flex items-center gap-4 text-orange-600 mb-2">
                <Shield className="w-6 h-6" />
                <span className="font-bold uppercase tracking-widest text-sm">The Space Multiplier</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-white leading-none">
                DrySpace <br/>
                <span className="text-stone-600">Under-Deck System</span>
              </h2>
              
              <div className="text-2xl font-bold text-white">$3,500 - $12,000</div>
              
              <div className="space-y-6 text-stone-400 text-lg leading-relaxed">
                <p>
                  Double your outdoor living space. Our DrySpace system captures rain falling through your deck boards and channels it away, creating a 100% dry, usable patio underneath.
                </p>
              </div>

              <div className="bg-stone-900/50 p-6 border border-stone-800 rounded-sm space-y-4">
                <h3 className="font-bold text-white uppercase tracking-wider text-sm">Transform Your Space:</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-stone-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                    <span><strong>Create Storage:</strong> Perfect for keeping winter gear, ATVs, or tools dry.</span>
                  </li>
                  <li className="flex gap-3 text-stone-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                    <span><strong>Add a Patio:</strong> Install lights and furniture for a second outdoor room.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={onOpenQuote}
                  className="bg-stone-100 text-stone-950 px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>

               {/* Reviews for this section */}
               <div className="pt-8 grid gap-4">
                 {PRODUCT_DATA.underdeck.reviews.map((review, idx) => (
                   <TestimonialCard key={idx} review={review} />
                 ))}
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <GalleryGrid section="underdeck" />
            </div>
          </div>
        </section>

      </div>

      {/* Final CTA */}
      <section className="py-20 bg-orange-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-white mb-8">
            Build the <span className="text-stone-950">Asset</span>
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-12 text-lg">
            Don't lose another summer to a half-finished project. Secure your spot on our 2026 build calendar today.
          </p>
          <button 
            onClick={onOpenQuote}
            className="bg-stone-950 text-white px-12 py-5 font-bold uppercase text-sm tracking-widest hover:bg-stone-900 hover:scale-105 transition-all shadow-2xl"
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
