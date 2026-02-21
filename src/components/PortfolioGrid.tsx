import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';
import { PORTFOLIO_GALLERY } from '../constants/portfolio';

interface PortfolioGridProps {
  images?: string[];
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const portfolioImages = images || PORTFOLIO_GALLERY.map(item => item.src);

  const getCaption = (index: number) => {
    if (images) return `Project Image ${index + 1}`;
    return PORTFOLIO_GALLERY[index]?.caption || '';
  };


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
                alt={getCaption(index)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                containerClassName="absolute inset-0 w-full h-full"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, (max-width: 1440px) 1024px, 640px"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-semibold leading-tight">{getCaption(index)}</p>
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
              alt={getCaption(currentImageIndex)}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-sm"
              priority={true}
            />
            <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-sm max-w-2xl">
              <p className="text-white text-sm font-semibold leading-relaxed text-center">
                {getCaption(currentImageIndex)}
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
