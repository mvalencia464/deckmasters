import React, { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(!priority);

  // Extract the base path and filename
  const parts = src.split('/');
  const filename = parts[parts.length - 1];
  const basePath = src.replace(filename, '');
  const basename = filename.replace(/\.[^.]+$/, ''); // Remove extension
  const ext = filename.slice(filename.lastIndexOf('.'));

  // Generate srcset with responsive variants
  const srcSet = [
    `${basePath}${basename}-320${ext} 320w`,
    `${basePath}${basename}-640${ext} 640w`,
    `${basePath}${basename}-1024${ext} 1024w`,
    `${src} 1440w`,
  ].join(', ');

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div className={containerClassName}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-stone-800 animate-pulse" />
      )}
    </div>
  );
};

export default ResponsiveImage;
