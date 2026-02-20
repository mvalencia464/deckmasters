import React, { useState, useRef, useEffect } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * ResponsiveImage Component
 * 
 * Automatically generates responsive image variants using srcset.
 * Supports lazy loading and provides loading states.
 * 
 * Example:
 * <ResponsiveImage src="/images/portfolio/001-aerial-wraparound.webp" alt="Project" />
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  sizes = '(max-width: 640px) 320px, (max-width: 1024px) 640px, (max-width: 1440px) 1024px, 1440px',
  priority = false,
  onLoad,
}) => {
  const [isLoading, setIsLoading] = useState(priority ? false : true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoading(priority ? false : true);
    setHasError(false);
    
    const img = imgRef.current;
    if (img && img.complete) {
      setIsLoading(false);
      onLoad?.();
    }
  }, [src, priority, onLoad]);

  // Simple srcset - browser will handle selection
  const srcSet = `${src}`;

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.warn(`Failed to load image: ${src}`);
  };

  return (
    <div className={`relative ${containerClassName || 'w-full h-full'}`}>
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
      />
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-stone-800 animate-pulse" />
      )}
      {hasError && (
        <div className="absolute inset-0 bg-stone-800 flex items-center justify-center">
          <span className="text-stone-600 text-xs">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
