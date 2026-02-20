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

  // Generate responsive srcset with available image variants
  const generateSrcSet = (imagePath: string): string => {
    // Extract base path without extension
    const basePath = imagePath.replace(/\.webp$/, '');
    
    // For portfolio images, just use the base image without srcset variants
    // This avoids 404s for missing responsive variants
    if (basePath.includes('/portfolio/')) {
      return imagePath;
    }
    
    // Check if this is a non-portfolio image that has variants
    if (basePath.match(/-(320|640|1024)$/)) {
      // Already a specific size variant, don't modify
      return imagePath;
    }
    
    // For other images, check if they have variants
    return `${basePath}-320.webp 320w, ${basePath}-640.webp 640w, ${basePath}.webp 1024w`;
  };

  const srcSet = generateSrcSet(src);

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
