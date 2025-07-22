import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Star, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ModernAppCard from "./ModernAppCard";
import { getAppIcon, getAppEmoji, generateGradientIcon } from "@/utils/iconUtils";
import type { App } from "@shared/schema";
import { RealAppIcon } from "./RealAppIcons";
import { useState, useRef, useEffect } from "react";

interface ModernAppIconProps {
  app: App;
  size?: "sm" | "md" | "lg";
}

function ModernAppIcon({ app, size = "md" }: ModernAppIconProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16", 
    lg: "w-20 h-20"
  };

  const emoji = getAppEmoji(app.name, app.category);
  const gradientClass = generateGradientIcon(app.name);
  
  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className={`w-full h-full bg-gradient-to-br ${gradientClass} rounded-xl flex items-center justify-center text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110`}>
        {emoji}
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

interface AppCarouselProps {
  title: string;
  endpoint: string;
  icon?: React.ReactNode;
  gradient?: string;
  onAppSelect: (app: App) => void;
}

export default function AppCarousel({ 
  title, 
  endpoint, 
  icon, 
  gradient = "from-cyan-500 to-blue-600",
  onAppSelect 
}: AppCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data: apps, isLoading } = useQuery({
    queryKey: [endpoint],
  });

  const itemsPerView = 4;
  const maxIndex = apps ? Math.max(0, apps.length - itemsPerView) : 0;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !apps || apps.length <= itemsPerView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, apps]);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const scrollAmount = index * (320 + 24); // card width + gap
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleDownload = (e: React.MouseEvent, app: App) => {
    e.stopPropagation();
    window.open(app.downloadUrl, '_blank');
  };

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-8">
            <div className={`p-3 bg-gradient-to-r ${gradient} rounded-full animate-pulse`}>
              <div className="w-6 h-6 bg-white/30 rounded"></div>
            </div>
            <div className="h-8 w-48 bg-gradient-to-r from-gray-600 to-gray-400 rounded animate-pulse"></div>
          </div>
          <div className="flex space-x-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-80">
                <div className="glass-card rounded-2xl p-6 animate-pulse">
                  <div className="w-16 h-16 bg-gray-600 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-600 rounded mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 flex-1 bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!apps || apps.length === 0) {
    return null;
  }

  return (
    <section 
      className="py-12 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className={`p-3 bg-gradient-to-r ${gradient} rounded-full shadow-lg shadow-cyan-500/30`}>
              {icon || <Play className="h-6 w-6 text-white" />}
            </div>
            <h2 className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {title}
            </h2>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={!apps || apps.length <= itemsPerView}
              className="glass-effect border-cyan-400/30 hover:bg-cyan-400/20 transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={!apps || apps.length <= itemsPerView}
              className="glass-effect border-cyan-400/30 hover:bg-cyan-400/20 transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {apps.map((app: App, index: number) => (
              <Card
                key={app.id}
                onClick={() => onAppSelect(app)}
                className="flex-shrink-0 w-80 glass-card hover:scale-105 transition-all duration-500 cursor-pointer group border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/20"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <CardContent className="p-6">
                  {/* App Icon and Info */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <RealAppIcon appName={app.name} className="w-16 h-16 rounded-xl shadow-lg" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300 truncate">
                        {app.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{app.developer}</p>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          <span className="text-xs font-medium">{(app.rating / 10).toFixed(1)}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-cyan-900/30 text-cyan-300">
                          {app.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {app.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center text-green-400">
                      <Download className="h-3 w-3 mr-1" />
                      <span>{app.downloads}</span>
                    </div>
                    <span className="text-gray-400">{app.size}</span>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={(e) => handleDownload(e, app)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Instalar Ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress Indicators */}
          {apps.length > itemsPerView && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    scrollToIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? 'bg-cyan-400 w-6' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>


    </section>
  );
}