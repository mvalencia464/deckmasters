import React from 'react';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const LocalReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Joshua Swan",
      neighborhood: "Midtown / Taku",
      street: "Dorbrandt St",
      service: "Rapid Deck Replacement",
      quote: "Their demo crew came out and had it down in about an hour... build crew came out, and had the deck done in less than 24hrs.",
      stars: 5
    },
    {
      id: 2,
      name: "Rachel & Matt Blakeslee",
      neighborhood: "Glen Alps / Hillside",
      street: "Our Own Lane",
      service: "Multi-Level Trex Build",
      quote: "Replacing our second-story wraparound deck... These improvements were critical for both the safety of our kids and longevity.",
      stars: 5
    },
    {
      id: 3,
      name: "Shelly Wells",
      neighborhood: "Southport",
      street: "Spinnaker Drive",
      service: "Custom Design Consultation",
      quote: "I had a general idea of what I wanted and they offered some additional suggestions, and I ended up with front and back decks that I love.",
      stars: 5
    },
    {
      id: 4,
      name: "Rebecca K.",
      neighborhood: "Abbott Loop",
      street: "Shrub Ct",
      service: "Repeat Trex Installation",
      quote: "This summer was the 2nd TREX Deck built for me by Deck Masters... It was a much larger project with two levels.",
      stars: 5
    },
    {
      id: 5,
      name: "Gary Goins",
      neighborhood: "Anchorage Area",
      street: "Turnagain",
      service: "Floating Deck Construction",
      quote: "Deck Masters had to work hard to finish on time, but they did, and their workmanship made it all worth it. Beautiful deck.",
      stars: 5
    },
    {
      id: 6,
      name: "Verified Customer",
      neighborhood: "Anchorage, AK",
      street: "Residential",
      service: "Deck Construction",
      quote: "The quality of work and the kindness of the staff goes way above and beyond…I did a lot of reading reviews…and I must say they were all excellent.",
      stars: 5
    }
  ];

  return (
    <section id="reviews" className="py-32 bg-stone-900 border-t border-stone-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-950/50 skew-x-12 translate-x-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-orange-600"></div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">Voice of the Community</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6">
            Trusted By Your <br /> <span className="text-stone-500">Neighbors</span>
          </h2>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
            We don't just build decks; we build relationships in every corner of Anchorage. From the wind-swept heights of Glen Alps to the quiet cul-de-sacs of Southport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-stone-950 border border-stone-800 p-8 hover:border-orange-600/50 transition-colors group">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-orange-600 fill-orange-600" />
                ))}
              </div>
              <blockquote className="text-stone-300 text-lg italic mb-8 leading-relaxed min-h-[80px]">
                "{review.quote}"
              </blockquote>

              <div className="flex items-center justify-between border-t border-stone-900 pt-6">
                <div>
                  <div className="font-bold uppercase tracking-wider text-sm text-white mb-1">{review.name}</div>
                  <div className="flex items-center gap-2 text-orange-500 text-xs uppercase tracking-widest font-bold">
                    <MapPin className="w-3 h-3" />
                    {review.neighborhood} <span className="text-stone-700">•</span> {review.street}
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-stone-600 text-[10px] uppercase tracking-widest font-bold mb-1">Project Type</div>
                  <div className="text-stone-400 text-xs uppercase tracking-wide">{review.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a href="https://maps.app.goo.gl/shqgWxUYVknh56Xs8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-stone-500 hover:text-orange-500 font-bold uppercase text-xs tracking-widest transition-colors">
            Read all 120+ Reviews on Google <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocalReviews;

