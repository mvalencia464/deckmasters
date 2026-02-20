import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { mapAssetUrl } from '../utils/assetMapper';

interface TestimonialImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  review: {
    author: string;
    text: string;
    rating: number;
    avatarUrl?: string;
  };
}

export default function TestimonialImageModal({
  isOpen,
  onClose,
  images,
  review,
}: TestimonialImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  // Get high-res image URL - uses local assets if available
  const getHighResImage = (url: string) => {
    // Map the asset URL (will return local or external as-is)
    const localUrl = mapAssetUrl(url, true);
    
    // Local assets are already full quality - return as is
    if (localUrl.startsWith('/assets/')) {
      return localUrl;
    }
    
    // For remote URLs (avatars, etc.), try to increase resolution if it supports query params
    if (localUrl.includes('?width=')) {
      return localUrl.replace(/\?width=\d+/, '?width=1200');
    }
    if (localUrl.includes('?')) {
      return localUrl + '&width=1200';
    }
    
    // Return as-is if no width parameter support
    return localUrl;
  };

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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown as any);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown as any);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors z-60"
        aria-label="Close modal"
      >
        <X size={32} />
      </button>

      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-stone-900 rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[400px]">
          <img
            src={getHighResImage(images[currentIndex])}
            alt={`${review.author} project ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full font-bold">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all ${
                      index === currentIndex
                        ? 'bg-orange-600 w-8 h-2'
                        : 'bg-white bg-opacity-40 hover:bg-opacity-60 w-2 h-2 rounded-full'
                    }`}
                    style={
                      index === currentIndex
                        ? { borderRadius: '4px' }
                        : { borderRadius: '50%' }
                    }
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Review Section */}
        <div className="p-8 border-t border-stone-800">
          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-orange-600/20 border border-orange-600/30 flex items-center justify-center overflow-hidden">
              {review.avatarUrl ? (
                <img
                  src={review.avatarUrl}
                  alt={review.author}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-orange-500 text-sm font-bold uppercase">
                  {review.author.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <div className="text-white font-bold text-lg">{review.author}</div>
              <div className="flex gap-1 mt-2">
                {[...Array(review.rating)].map((_, i) => (
                  <span
                    key={i}
                    className="text-orange-500 text-lg"
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-stone-300 text-base leading-relaxed">
            &ldquo;{review.text}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
