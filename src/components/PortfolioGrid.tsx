import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';

interface PortfolioGridProps {
  images?: string[];
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Generate list of 41 portfolio images (001-029, 043-054)
  const imageFiles = [
    // Aerial (001-008)
    '001-aerial-wraparound.webp',
    '002-aerial-overview.webp',
    '003-aerial-detail.webp',
    '004-aerial-landscape.webp',
    '005-aerial-wide.webp',
    '006-aerial-composite.webp',
    '007-aerial-luxury.webp',
    '008-aerial-elevated.webp',
    // Masterpiece (009-012)
    '009-masterpiece-main.webp',
    '010-masterpiece-detail.webp',
    '011-masterpiece-railing.webp',
    '012-masterpiece-lighting.webp',
    // Contemporary (013-020)
    '013-contemporary-covered.webp',
    '014-contemporary-outdoor.webp',
    '015-contemporary-seating.webp',
    '016-contemporary-angle.webp',
    '017-contemporary-design.webp',
    '018-contemporary-modern.webp',
    '019-contemporary-finish.webp',
    '020-contemporary-full.webp',
    // Custom (021-029)
    '021-custom-entrance.webp',
    '022-custom-stairs.webp',
    '023-custom-railing.webp',
    '024-custom-platform.webp',
    '025-custom-ambiance.webp',
    '026-custom-landscape.webp',
    '027-custom-sunset.webp',
    '028-custom-evening.webp',
    '029-custom-premium.webp',
    // New Premium Images (043-054)
    '043-premium-detail-1.webp',
    '044-premium-detail-2.webp',
    '045-wraparound-angle.webp',
    '046-ground-level-1.webp',
    '047-ground-level-2.webp',
    '048-lighting-detail.webp',
    '049-small-project.webp',
    '050-bonus-1.webp',
    '051-bonus-2.webp',
    '052-bonus-3.webp',
    '053-bonus-4.webp',
    '054-bonus-5.webp',
    // Final Image (055)
    'IMG_1055.webp',
  ];

  const imageCaptions = [
    // Aerial (001-008)
    "Why fly to Hawaii? Walk out your back door instead.",
    "The most impressive room in your house... isn't inside.",
    "Turn your backyard into the private resort your neighbors envy.",
    "Resort-style living, engineered for Alaska winters.",
    "Wraparound dreams. Custom built. 21-day guarantee.",
    "Premium composite that won't rot, warp, or splinter.",
    "Unobstructed views. Wind-rated cable railing perfection.",
    "From concept to completion. No surprises. Just results.",
    // Masterpiece (009-012)
    "Hillside masterpiece. Built to outlast a lifetime.",
    "Precision craftsmanship in every hidden fastener.",
    "Cable railing. Flawless views. Absolute confidence.",
    "Integrated lighting that transforms your evenings.",
    // Contemporary (013-020)
    "Year-round outdoor living. Covered. Protected. Yours.",
    "Where entertaining becomes art. Where summer never ends.",
    "Built-in seating for the entertaining life you deserve.",
    "Modern design meets Alaska engineering excellence.",
    "Contemporary beauty. Frost-heave resistant. Built right.",
    "Composite elegance. No maintenance. All luxury.",
    "Finished to perfection. Ready to host. Ready to impress.",
    "The view from here? Priceless. The deck? An investment.",
    // Custom (021-029)
    "Custom entrance to your outdoor sanctuary.",
    "Engineered stairs. Designed for confidence.",
    "Cable railing that preserves every mountain view.",
    "The platform for your best summer memories.",
    "Twilight ambiance. Your personal resort.",
    "Landscape integration. Seamless beauty.",
    "Sunset views. Stress-free living. No maintenance.",
    "Evening entertainment. Zero surprises. Pure joy.",
    "Premium custom design. Your vision. Our expertise.",
    // Premium New Images (043-054)
    "Handcrafted details that command attention.",
    "Composite perfection. The finish you deserve.",
    "Wraparound possibility. Resort living awaits.",
    "Ground-level elegance. Entertaining made easy.",
    "Multi-level design. Multiple dream spaces.",
    "Lighting that transforms day into magic.",
    "Every size deck deserves premium engineering.",
    "Portfolio showcase. Proof of excellence.",
    "Real results. Real homeowners. Real satisfaction.",
    "Your backyard dream. Our specialty.",
    "Built to impress. Built to last.",
    "This could be your next Anchorage dream.",
    // Final Image (055)
    "The finishing touch. Your deck complete.",
  ];

  const portfolioImages = images || imageFiles.map(filename => `/images/portfolio/${filename}`);

  const handleImageClick = (index: number) => {
    setSelectedImage(portfolioImages[index]);
    setCurrentImageIndex(index);
    // Preload adjacent images for smooth navigation
    preloadAdjacentImages(index);
  };

  const preloadAdjacentImages = (currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % portfolioImages.length;
    const prevIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
    
    // Preload in background
    const nextImg = new Image();
    nextImg.src = portfolioImages[nextIndex];
    
    const prevImg = new Image();
    prevImg.src = portfolioImages[prevIndex];
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % portfolioImages.length;
    setSelectedImage(portfolioImages[nextIndex]);
    setCurrentImageIndex(nextIndex);
    preloadAdjacentImages(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
    setSelectedImage(portfolioImages[prevIndex]);
    setCurrentImageIndex(prevIndex);
    preloadAdjacentImages(prevIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevImage();
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  return (
    <section className="py-24 bg-stone-900 relative overflow-hidden">
      {/* Decorative border at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-orange-600"></div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase leading-[0.9] mb-6">
            Your Backyard Dreams, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Now Reality.
            </span>
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl">
            Every image tells a story of transformation. From wraparound resort spaces to intimate gathering areas—see what's possible when engineering meets artistry.
          </p>
        </div>

        {/* Image Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
           {portfolioImages.map((imageUrl, index) => (
             <div
               key={index}
               onClick={() => handleImageClick(index)}
               className="relative group overflow-hidden rounded-sm bg-stone-800 cursor-pointer"
             >
               <ResponsiveImage
                 src={imageUrl}
                 alt={imageCaptions[index]}
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 containerClassName="absolute inset-0 w-full h-full"
                 sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 24px), calc(33.33vw - 16px)"
                 priority={false}
               />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-semibold leading-tight">{imageCaptions[index]}</p>
                </div>
                </div>
                ))}
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-orange-600 transition-colors p-3 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Image Container */}
          <div className="flex flex-col items-center gap-4 max-w-4xl w-full">
            <ResponsiveImage
              src={selectedImage}
              alt={imageCaptions[currentImageIndex]}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-sm"
              priority={true}
            />
            <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-sm max-w-2xl">
              <p className="text-white text-sm font-semibold leading-relaxed text-center">
                {imageCaptions[currentImageIndex]}
              </p>
              <p className="text-stone-400 text-xs text-center mt-2 font-medium">
                Image {currentImageIndex + 1} of {portfolioImages.length}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-orange-600 transition-colors p-3 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Keyboard Navigation Hint */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-500 text-xs text-center">
            Use ← → arrow keys or buttons to navigate
          </p>
        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;
