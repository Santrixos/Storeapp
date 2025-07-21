import { memo, useMemo, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Memoized App Card component to prevent unnecessary re-renders
export const MemoizedAppCard = memo(function AppCard({ 
  app, 
  onSelect,
  showIcon = true,
  compact = false 
}: {
  app: any;
  onSelect: (app: any) => void;
  showIcon?: boolean;
  compact?: boolean;
}) {
  const handleClick = useCallback(() => {
    onSelect(app);
  }, [app, onSelect]);

  const appRating = useMemo(() => {
    return ((app.rating || 0) / 10).toFixed(1);
  }, [app.rating]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`cursor-pointer ${compact ? 'p-3' : 'p-4'} bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all duration-200`}
    >
      <div className="flex items-center gap-3">
        {showIcon && (
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {app.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{app.name}</h3>
          <p className="text-gray-400 text-sm truncate">{app.developer}</p>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-500 text-sm">⭐ {appRating}</span>
            <span className="text-gray-500">•</span>
            <span className="text-green-500 text-sm">📥 {app.downloads}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Virtual scrolling component for large lists
export const VirtualizedGrid = memo(function VirtualizedGrid({
  items,
  renderItem,
  itemHeight = 120,
  containerHeight = 600,
  columns = 1
}: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemHeight?: number;
  containerHeight?: number;
  columns?: number;
}) {
  const itemsPerRow = columns;
  const rowHeight = itemHeight;
  const totalRows = Math.ceil(items.length / itemsPerRow);
  const visibleRows = Math.ceil(containerHeight / rowHeight) + 2; // Buffer rows

  return (
    <div 
      className="overflow-y-auto"
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalRows * rowHeight, position: 'relative' }}>
        {Array.from({ length: Math.min(visibleRows, totalRows) }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid grid-cols-${columns} gap-4 absolute w-full`}
            style={{
              top: rowIndex * rowHeight,
              height: rowHeight
            }}
          >
            {Array.from({ length: itemsPerRow }).map((_, colIndex) => {
              const itemIndex = rowIndex * itemsPerRow + colIndex;
              const item = items[itemIndex];
              
              return item ? (
                <div key={itemIndex}>
                  {renderItem(item, itemIndex)}
                </div>
              ) : null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
});

// Debounced search hook
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Image lazy loading component
export const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = "",
  fallback = "https://via.placeholder.com/64x64/1f2937/9ca3af?text=📱"
}: {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: string;
}) {
  const [imageSrc, setImageSrc] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setImageSrc(fallback);
        setIsLoading(false);
      };
      img.src = src;
    } else {
      setIsLoading(false);
    }
  }, [src, fallback]);

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded">
          <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
});

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    if (typeof PerformanceObserver !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            console.debug('Navigation timing:', {
              domContentLoaded: (entry as any).domContentLoadedEventEnd - (entry as any).domContentLoadedEventStart,
              loadComplete: (entry as any).loadEventEnd - (entry as any).loadEventStart,
            });
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'measure'] });

      return () => observer.disconnect();
    }
  }, []);
};