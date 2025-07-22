import { EnhancedSearch } from "@/components/EnhancedSearch";
import HeroSection from "@/components/HeroSection";
import CategoryNavigation from "@/components/CategoryNavigation";
import AppCarousel from "@/components/AppCarousel";
import { FastAppGrid } from "@/components/FastAppGrid";
import AppDetailsModal from "@/components/AppDetailsModal";
import Footer from "@/components/Footer";
import { Star, Flame, Trophy } from "lucide-react";
import { useState, useRef } from "react";
import type { App } from "@shared/schema";

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [advancedSearchParams, setAdvancedSearchParams] = useState<{
    query: string;
    category?: string;
    sortBy?: string;
  }>({ query: "" });
  
  const searchHeaderRef = useRef<HTMLDivElement>(null);
  const featuredSectionRef = useRef<HTMLDivElement>(null);
  const categoryNavRef = useRef<HTMLDivElement>(null);

  const handleAdvancedSearch = (query: string, category?: string, sortBy?: string) => {
    setSearchQuery(query);
    setAdvancedSearchParams({ query, category, sortBy });
    setIsAdvancedSearch(true);
    if (category) {
      setSelectedCategory(category);
    }
  };

  const handleNormalSearch = (query: string) => {
    setSearchQuery(query);
    setIsAdvancedSearch(false);
    setAdvancedSearchParams({ query });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Enhanced Search Section */}
      <div ref={searchHeaderRef} className="container mx-auto px-4 -mt-20 relative z-10 mb-12">
        <EnhancedSearch 
          onSearch={setSearchQuery}
          onAppSelect={setSelectedApp}
          className="w-full max-w-4xl mx-auto"
        />
      </div>

      {/* Category Navigation */}
      <div ref={categoryNavRef}>
        <CategoryNavigation 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
      </div>

      {/* Featured Apps Carousel */}
      <div ref={featuredSectionRef}>
        <AppCarousel
          title="Aplicaciones Destacadas"
          endpoint="/api/apps/featured"
          icon={<Star className="h-6 w-6 text-white" />}
          gradient="from-yellow-500 to-orange-600"
          onAppSelect={setSelectedApp}
        />
      </div>

      {/* Trending Apps Carousel */}
      <AppCarousel
        title="En Tendencia"
        endpoint="/api/apps/trending"
        icon={<Flame className="h-6 w-6 text-white" />}
        gradient="from-orange-500 to-red-600"
        onAppSelect={setSelectedApp}
      />

      {/* Popular Apps Carousel */}
      <AppCarousel
        title="Más Populares"
        endpoint="/api/apps"
        icon={<Trophy className="h-6 w-6 text-white" />}
        gradient="from-purple-500 to-pink-600"
        onAppSelect={setSelectedApp}
      />

      {/* Main Apps Grid - Optimized for Performance */}
      <section className="py-8 container mx-auto px-4">
        <FastAppGrid 
          category={selectedCategory}
          searchQuery={searchQuery}
          onAppSelect={setSelectedApp}
          limit={50}
        />
      </section>
      
      {/* Footer */}
      <Footer />

      {/* Help functionality now provided by NexusBot AI chatbot */}

      {/* App Details Modal */}
      {selectedApp && (
        <AppDetailsModal 
          app={selectedApp} 
          isOpen={!!selectedApp} 
          onClose={() => setSelectedApp(null)} 
        />
      )}
    </div>
  );
}
