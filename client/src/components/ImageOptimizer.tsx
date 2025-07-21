import { useState, useEffect, memo, useRef } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  lazy?: boolean;
  quality?: "low" | "medium" | "high";
}

const sizeClasses = {
  xs: "w-6 h-6",
  sm: "w-8 h-8", 
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-20 h-20"
};

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className = "",
  fallback,
  size = "md",
  lazy = true,
  quality = "medium"
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized fallback based on app name
  const generateFallback = () => {
    if (fallback) return fallback;
    
    // Generate a simple colored rectangle with initials
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Generate color based on alt text
      const hash = alt.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      
      const hue = Math.abs(hash) % 360;
      const gradient = ctx.createLinearGradient(0, 0, 64, 64);
      gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
      gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 70%, 40%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      
      // Add app icon
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('📱', 32, 32);
    }
    
    return canvas.toDataURL('image/png');
  };

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [lazy, isInView]);

  // Load image when in view
  useEffect(() => {
    if (!isInView) return;

    if (src && src.trim()) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
        setHasError(false);
      };
      
      img.onerror = () => {
        setImageSrc(generateFallback());
        setIsLoading(false);
        setHasError(true);
      };

      // Add timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        if (img.complete === false) {
          setImageSrc(generateFallback());
          setIsLoading(false);
          setHasError(true);
        }
      }, 3000);

      img.src = src;
      
      return () => clearTimeout(timeout);
    } else {
      setImageSrc(generateFallback());
      setIsLoading(false);
    }
  }, [src, isInView]);

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-lg" />
        </div>
      )}

      {/* Actual image */}
      <motion.img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg transition-all duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isLoading ? 0 : 1, 
          scale: isLoading ? 0.9 : 1 
        }}
        transition={{ duration: 0.3 }}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
      />

      {/* Error indicator */}
      {hasError && !isLoading && (
        <div className="absolute top-1 right-1 w-3 h-3 bg-yellow-500 rounded-full opacity-75" 
             title="Imagen generada automáticamente" />
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
});

export default OptimizedImage;

// Preload important images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload multiple images
export const preloadImages = async (sources: string[]): Promise<void> => {
  const promises = sources.map(src => preloadImage(src).catch(() => {}));
  await Promise.allSettled(promises);
};