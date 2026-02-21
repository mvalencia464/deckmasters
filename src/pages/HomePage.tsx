import React from 'react';
import { ArrowRight, Phone, Star, Shield, Hammer } from 'lucide-react';
import ResponsiveImage from '../components/ResponsiveImage';
import TestimonialRotator from '../components/TestimonialRotator';
import QuoteForm from '../components/QuoteForm';
import PortfolioGrid from '../components/PortfolioGrid';
import ReviewsGridWithModal from '../components/ReviewsGridWithModal';
import ProcessSection from '../components/ProcessSection';
import testimonialsData from '../data/testimonials.json';

const HomePage = ({ openQuoteForm, handleHeroFormSubmit, navigate, activeService, setActiveService, services }) => (
  <>
    {/* Hero Section */}
    <header className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-48 lg:pt-0 lg:pb-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-stone-900">
        <ResponsiveImage
          src="/images/portfolio/002-aerial-overview.webp"
          alt="Modern Deck in Anchorage"
          className="w-full h-full object-cover opacity-70 grayscale-0 scale-105 animate-slow-zoom"
          containerClassName="absolute inset-0 w-full h-full"
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px"
          priority={true}
        />
        <div className="absolute inset-0 bg-stone-950/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/90 via-stone-950/40 to-stone-950"></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="flex flex-col gap-2 mb-8 animate-fade-in-up">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-orange-600"></div>
                <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">Anchorage's #1 Rated Deck Builder</span>
              </div>

            </div>

            <h1 className="text-5xl md:text-8xl font-display font-bold leading-[0.9] tracking-tight mb-8 uppercase animate-fade-in-up delay-100">
              Turn Your Backyard <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-100 to-stone-500">Into A Resort.</span>
            </h1>

            <div className="mb-12 animate-fade-in-up delay-200">
              <TestimonialRotator />

              <p className="text-stone-400 text-lg md:text-xl max-w-xl leading-relaxed border-l-2 border-stone-800 pl-6 mt-8">
                Skip the contractor nightmares. Weekly check-ins, transparent pricing, and frost-proof engineering designed for Alaska's climate. Build your 21-day legacy today.
              </p>
            </div>

            <div className="flex flex-col gap-6 animate-fade-in-up delay-300">
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={openQuoteForm}
                  className="lg:hidden bg-orange-600 text-white px-10 py-4 font-display font-bold uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center justify-center gap-2 group"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex items-center gap-3 text-stone-500 text-xs font-bold uppercase tracking-widest flex-wrap">
                <span className="flex items-center gap-1">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-4 h-4 opacity-70" />
                  Google Reviews
                </span>
                <span className="w-1 h-1 bg-stone-700 rounded-full"></span>
                <span>#1 Rated in Anchorage</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block max-w-md justify-self-end w-full relative group">
            <QuoteForm />

            {/* Playful Call-out Arrow */}
            <div className="absolute -left-32 top-10 flex flex-col items-end animate-fade-in-up delay-700 opacity-90 rotate-[-5deg]">
              <span className="font-handwriting text-2xl text-white mb-2 rotate-[-5deg]">Start Your Project Here!</span>
              <svg width="60" height="40" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow-md">
                <path d="M5 20C20 15 40 10 60 25C75 35 85 40 95 30M95 30L80 25M95 30L85 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />
                ))}
              </div>
              <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">4.9, 122 Google Reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-stone-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-400 text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
            <span>#1 Rated in Anchorage</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-600" />
            <span>25 Year Structural Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <Hammer className="w-4 h-4 text-orange-600" />
            <span>Master Craftsmen Certified</span>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Call Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pointer-events-none">
        <a
          href="tel:+19078918283"
          className="bg-orange-600 text-white font-bold uppercase tracking-widest py-4 px-6 flex items-center justify-center gap-3 shadow-2xl pointer-events-auto hover:bg-orange-700 transition-colors"
        >
          <Phone className="w-5 h-5 fill-white" />
          <span>Call 907.891.8283</span>
        </a>
      </div>
    </header>



    {/* Portfolio Grid - 41 Project Images */}
    <PortfolioGrid />

    {/* ── REVIEWS / WALL OF LOVE ─────────────────────────────────────── */}
    <section id="reviews" className="py-32 bg-stone-950 border-t border-stone-800 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-orange-600" />
              <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">Reviews</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase leading-[1.1] md:leading-[0.95]">
              What Anchorage <br /><span className="text-stone-500">Is Saying.</span>
            </h2>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
                ))}
              </div>
              <span className="text-stone-400 text-sm font-bold uppercase tracking-wider">4.9 Average · 122 Google Reviews</span>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/Deck+Masters+AK+Anchorage+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors flex items-center gap-2 pb-2 border-b border-stone-800 shrink-0"
          >
            See All Google Reviews <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <ReviewsGridWithModal testimonialsData={testimonialsData} />

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/maps/search/Deck+Masters+AK+Anchorage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-stone-700 text-stone-400 hover:border-orange-600 hover:text-white font-bold uppercase text-xs tracking-widest transition-all duration-300"
          >
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            Leave Us a Review on Google
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>

    {/* Process Section */}
    <ProcessSection />
  </>
);

export default HomePage;

