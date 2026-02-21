import React, { useState, useEffect } from 'react';

const FooterTestimonials = () => {
  const testimonials = [
    { quote: "From the initial consultation to the final product... Jordan gave us great recommendations.", author: "Anton Szender" },
    { quote: "I had a general idea of what I wanted... I ended up with front and back decks that I love.", author: "Shelly Wells" },
    { quote: "Professional, precise, prompt—clean and accurate. Perfection.", author: "Ruth McNearney" }
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-24 flex flex-col justify-center">
      <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-stone-300 font-light italic text-lg leading-relaxed mb-2">
          "{testimonials[index].quote}"
        </p>
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-8 bg-orange-600"></div>
          <span className="text-stone-500 text-xs font-bold uppercase tracking-widest">{testimonials[index].author}</span>
        </div>
      </div>
    </div>
  );
};

export default FooterTestimonials;

