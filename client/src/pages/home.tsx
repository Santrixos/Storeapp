import ImprovedSearchHeader from "@/components/ImprovedSearchHeader";
import HeroSection from "@/components/HeroSection";
import CategoryNavigation from "@/components/CategoryNavigation";
import AppCarousel from "@/components/AppCarousel";
import ResponsiveAppGrid from "@/components/ResponsiveAppGrid";
import AppDetailsModal from "@/components/AppDetailsModal";
import HelpBot from "@/components/HelpBot";
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
      
      {/* Smart Search */}
      <div ref={searchHeaderRef} className="container mx-auto px-4 -mt-20 relative z-10">
        <ImprovedSearchHeader 
          searchQuery={searchQuery} 
          onSearchChange={handleNormalSearch}
          onAdvancedSearch={handleAdvancedSearch} 
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

      {/* Main Apps Grid */}
      <ResponsiveAppGrid 
        category={selectedCategory}
        searchQuery={searchQuery}
        onAppSelect={setSelectedApp} 
      />
      
      {/* Footer */}
      <Footer />

      {/* Help Bot */}
      <HelpBot 
        onSearchDemo={() => {
          searchHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const input = searchHeaderRef.current?.querySelector('input');
            input?.focus();
          }, 500);
        }}
        onCategoryDemo={(category) => {
          setSelectedCategory(category);
          categoryNavRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        onFeaturedDemo={() => {
          featuredSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

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
