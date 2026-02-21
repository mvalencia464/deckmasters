import './src/index.css';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, ArrowRight, Shield, Hammer, Leaf,
  Star, Instagram, Facebook, Twitter, Phone,
  Mail, MapPin, ChevronRight, Quote, Ruler,
  Clock, CheckCircle2, ArrowLeft, Calendar,
  ChevronDown, Home, Camera, ChevronLeft, ChevronRight as ChevronRightIcon
} from 'lucide-react';

// Lazy load pages - only fetched when navigated to
const ProductsPage = lazy(() => import('./src/pages/ProductsPage'));
const PrivacyPage = lazy(() => import('./src/pages/PrivacyPage'));
const TermsPage = lazy(() => import('./src/pages/TermsPage'));
import QuoteForm from './src/components/QuoteForm';
import FAQSection from './src/components/FAQSection';
import testimonialsData from './src/data/testimonials.json';
import TestimonialImageModal from './src/components/TestimonialImageModal';
import TestimonialVideoCard from './src/components/TestimonialVideoCard';
import PortfolioGrid from './src/components/PortfolioGrid';
import ProcessSection from './src/components/ProcessSection';
import ResponsiveImage from './src/components/ResponsiveImage';
import MobileMenu from './src/components/MobileMenu';
import ServicePageTemplate from './src/components/ServicePageTemplate';
import LeadCaptureModal from './src/components/LeadCaptureModal';
import StrategyModal from './src/components/StrategyModal';
import LocalReviews from './src/components/LocalReviews';
import SeoSitemap from './src/components/SeoSitemap';
import TestimonialRotator from './src/components/TestimonialRotator';
import FooterTestimonials from './src/components/FooterTestimonials';
import ReviewsGridWithModal from './src/components/ReviewsGridWithModal';
import parseMarkdown from './src/utils/markdown';
import { core30Pages } from './src/data/core30Pages';
import { MOCK_PROJECTS } from './src/constants/portfolio';
import { mapAssetUrl } from './src/utils/assetMapper';
import { analytics } from './src/utils/analyticsTracker';
import { HOME_PAGE_FAQS } from './src/data/faqs';
import HomePage from './src/pages/HomePage';

// Loading fallback component for lazy-loaded pages
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-stone-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
      <p className="text-stone-400 text-lg">Loading...</p>
    </div>
  </div>
);

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.substring(1) || '/');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  // Helper to handle hash path consistency
  const getHashPath = () => window.location.hash.substring(1) || '/';

  useEffect(() => {
    const onHashChange = () => {
      const newPath = getHashPath();
      setCurrentPath(newPath);
      window.scrollTo(0, 0);
      setMobileMenuOpen(false);

      // Track page view with analytics
      analytics.trackPageView(newPath, document.title);
    };

    // Ensure initial state matches URL
    if (!window.location.hash) {
      // Optional: force hash if needed, but better to let "/" handle it
    }

    // Track initial page load
    analytics.trackPageView(getHashPath(), document.title);

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navigate = (path) => {
    window.location.hash = path;
  };

  const openQuoteForm = () => {
    setMobileMenuOpen(false);
    setIsModalOpen(true);
  };

  const handleHeroFormSubmit = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoize services and layer 2 pages to prevent unnecessary re-renders
  const services = React.useMemo(() => [
    {
      title: "Composite Decking",
      desc: "Low maintenance, high durability premium composite solutions from Trex and TimberTech.",
      image: "/images/portfolio/001-aerial-wraparound.webp"
    },
    {
      title: "Hardwood Crafts",
      desc: "Exotic Ipe, Tigerwood, and Cedar decks for those who appreciate natural beauty and aging.",
      image: "/images/content/hardwood-crafts.webp"
    },
    {
      title: "Outdoor Living",
      desc: "Complete outdoor kitchens, fire pits, and pergolas to extend your living space.",
      image: "/images/portfolio/glen-alps-entertainer.webp"
    }
  ], []);

  const layer2Pages = React.useMemo(() => core30Pages.filter(p => p.layer === 2), []);



  // Routing Logic
  const isHome = currentPath === '/' || currentPath === '/index.html' || currentPath === '';
  const activePage = core30Pages.find(p => p.slug === currentPath);

  return (
    <div className="font-sans bg-stone-950 text-stone-100 min-h-screen selection:bg-orange-600 selection:text-white overflow-x-hidden">
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-stone-950/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#/" onClick={(e) => { if (isHome) e.preventDefault(); }} className="text-2xl font-display font-bold tracking-tight uppercase flex items-center gap-3 z-50 relative">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
              <img src="/images/icon.webp" alt="Deck Masters" className="w-full h-full object-contain" />
            </div>
            <span className="tracking-[0.2em]">Deck Masters</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12 font-medium text-xs tracking-[0.2em] uppercase">
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 hover:text-orange-500 transition-colors py-4"
                onMouseEnter={() => setDropdownOpen(true)}
              >
                Services <ChevronDown className="w-3 h-3" />
              </button>

              {/* Dropdown Content */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-stone-950 border border-stone-800 p-6 grid grid-cols-2 gap-6 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                {core30Pages.filter(p => p.layer === 2).map((page) => (
                  <a
                    key={page.slug}
                    href={`#${page.slug}`}
                    className="block p-3 hover:bg-stone-900 border border-transparent hover:border-stone-800 transition-all"
                  >
                    <div className="text-orange-600 font-bold mb-1">{page.category}</div>
                    <div className="text-stone-400 text-[10px] normal-case tracking-normal leading-snug">{page.title}</div>
                  </a>
                ))}
              </div>
            </div>

            <a href="#/" onClick={() => setTimeout(() => document.getElementById('portfolio')?.scrollIntoView(), 100)} className="hover:text-orange-500 transition-colors">Work</a>
            <a href="#/" onClick={() => setTimeout(() => document.getElementById('process')?.scrollIntoView(), 100)} className="hover:text-orange-500 transition-colors">Process</a>
            <a href="#/" onClick={() => setTimeout(() => document.getElementById('reviews')?.scrollIntoView(), 100)} className="hover:text-orange-500 transition-colors">Reviews</a>
          </div>

          <div className="hidden md:block">
            <a
              href="tel:+19078918283"
              className="group relative px-6 py-3 bg-white text-stone-950 font-bold uppercase text-xs tracking-widest overflow-hidden transition-all hover:bg-orange-600 hover:text-white flex items-center gap-2"
            >
              <div className="relative z-10 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                <Phone className="w-4 h-4" />
                <span>(907) 891-8283</span>
              </div>
              <div className="absolute inset-0 bg-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? null : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigate={navigate}
        openQuoteForm={openQuoteForm}
        pages={layer2Pages}
      />

      {/* Main Content Router */}
      <main>
        {isHome ? (
          <HomePage
            openQuoteForm={openQuoteForm}
            handleHeroFormSubmit={handleHeroFormSubmit}
            navigate={navigate}
            activeService={activeService}
            setActiveService={setActiveService}
            services={services}
          />
        ) : currentPath === '/products' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <ProductsPage onOpenQuote={openQuoteForm} navigate={navigate} />
          </Suspense>
        ) : currentPath === '/privacy' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <PrivacyPage navigate={navigate} />
          </Suspense>
        ) : currentPath === '/terms' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <TermsPage navigate={navigate} />
          </Suspense>
        ) : activePage ? (
          <ServicePageTemplate pageData={activePage} openQuoteForm={openQuoteForm} navigate={navigate} />
        ) : (
          <div className="min-h-screen flex items-center justify-center text-stone-500">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p>Page not found: {currentPath}</p>
              <button onClick={() => navigate('/')} className="mt-4 text-orange-600 hover:underline">Return Home</button>
            </div>
          </div>
        )}
      </main>

      {/* CTA / Footer */}
      <footer className="bg-stone-950 pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-900 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between gap-20 mb-24">
            <div className="lg:w-1/2">
              <h2 className="text-6xl md:text-8xl font-display font-bold uppercase leading-[1.1] md:leading-[0.95] mb-12">
                Ready to <br /> <span className="text-orange-600">Build?</span>
              </h2>
              <p className="text-xl text-stone-400 max-w-md mb-12">
                Schedule your complimentary design consultation today. Let's discuss how to elevate your property value and lifestyle.
              </p>

              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-10 h-10 bg-stone-900 flex items-center justify-center rounded-full text-orange-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-bold tracking-wider">(907) 782-4043</span>
                </div>
                <div className="flex items-center gap-4 text-base md:text-lg">
                  <div className="w-10 h-10 bg-stone-900 flex items-center justify-center rounded-full text-orange-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-bold tracking-wide break-all">CONTACT@DECKMASTERSAK.COM</span>
                </div>
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-10 h-10 bg-stone-900 flex items-center justify-center rounded-full text-orange-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-bold tracking-wider">625 W 59TH AVE UNIT J, ANCHORAGE, AK 99518</span>
                </div>
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-10 h-10 bg-stone-900 flex items-center justify-center rounded-full text-orange-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="font-bold tracking-wider">7:30 AM - 7:00 PM, SUN - SAT</span>
                </div>
              </div>

              {/* Branded Map Embed */}
              <div className="w-full rounded-sm overflow-hidden border border-stone-800 relative group">
                <div className="w-full h-64 relative grayscale-0 group-hover:grayscale transition-all duration-500 ease-in-out">
                  <iframe
                    title="Deck Masters location in Anchorage, Alaska on Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2853.5566334411346!2d-149.8942242!3d61.1676417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x56c891cae1357399%3A0xd7b37a2095289a27!2sDeck%20Masters%20AK!5e1!3m2!1sen!2sus!4v1763737932256!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="bg-stone-900 p-4 flex justify-between items-center border-t border-stone-800">
                  <div className="flex items-center gap-2">
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png" alt="Google" className="h-5 opacity-80" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Business Profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">4.9</span>
                    <div className="flex text-orange-500">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-orange-500" />)}
                    </div>
                    <span className="text-xs text-stone-500">(120 Reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              {/* Replaced Generic Form with QuoteForm */}
              <QuoteForm />

              <div className="mt-8">
                <FooterTestimonials />
              </div>
            </div>
          </div>

          {/* SEO Sitemap & Neighborhoods - Passed navigate function */}
          <SeoSitemap navigate={navigate} />

          <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-600 text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2 font-bold text-stone-400">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img src="/images/icon.webp" alt="Logo" className="w-full h-full object-contain" />
              </div>
              DECK MASTERS
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="hover:text-white transition-colors">Site Info</a>
              <a href="#" className="hover:text-white transition-colors">Alaska Service Area</a>
              <a href="#" className="hover:text-white transition-colors">Deck Building</a>
              <a href="#" className="hover:text-white transition-colors">Now Hiring</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 border border-stone-800 flex items-center justify-center rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 border border-stone-800 flex items-center justify-center rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 border border-stone-800 flex items-center justify-center rounded-full hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);