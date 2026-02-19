import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';

interface TestimonialImageCarouselProps {
  images: string[];
  reviewerName: string;
}

export default function TestimonialImageCarousel({
  images,
  reviewerName,
}: TestimonialImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div
      ref={carouselRef}
      className="relative w-full bg-gray-100 rounded-lg overflow-hidden group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Image */}
      <div className="relative w-full aspect-video">
        <ResponsiveImage
          src={images[currentIndex]}
          alt={`${reviewerName} project ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1024px"
          priority={false}
        />

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Navigation Arrows (Desktop) */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Mobile Swipe Hint */}
      {images.length > 1 && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded hidden max-sm:block">
          Swipe to browse
        </div>
      )}
    </div>
  );
}
