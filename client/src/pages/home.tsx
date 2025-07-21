import SmartSearchHeader from "@/components/SmartSearchHeader";
import HeroSection from "@/components/HeroSection";
import CategoryNavigation from "@/components/CategoryNavigation";
import AppCarousel from "@/components/AppCarousel";
import ResponsiveAppGrid from "@/components/ResponsiveAppGrid";
import AppDetailsModal from "@/components/AppDetailsModal";
import Footer from "@/components/Footer";
import { Star, Flame, Trophy } from "lucide-react";
import { useState } from "react";
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
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <SmartSearchHeader 
          searchQuery={searchQuery} 
          onSearchChange={handleNormalSearch}
          onAdvancedSearch={handleAdvancedSearch} 
        />
      </div>

      {/* Category Navigation */}
      <CategoryNavigation 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />

      {/* Featured Apps Carousel */}
      <AppCarousel
        title="Aplicaciones Destacadas"
        endpoint="/api/apps/featured"
        icon={<Star className="h-6 w-6 text-white" />}
        gradient="from-yellow-500 to-orange-600"
        onAppSelect={setSelectedApp}
      />

      {/* Trending Apps Carousel */}
      <AppCarousel
        title="En Tendencia"
        endpoint="/api/apps/trending"
        icon={<Flame className="h-6 w-6 text-white" />}
        gradient="from-orange-500 to-red-600"
        onAppSelect={setSelectedApp}
      />

      {/* Random Apps Carousel */}
      <AppCarousel
        title="Descubre Nuevas Apps"
        endpoint="/api/apps/random?count=8"
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
      
      {selectedApp && (
        <AppDetailsModal 
          app={selectedApp} 
          onClose={() => setSelectedApp(null)} 
        />
      )}
      
      <Footer />
      
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="w-16 h-16 bg-gradient-to-r from-neon-green to-emerald-600 rounded-full shadow-2xl shadow-neon-green/30 hover:scale-110 transition-all duration-300 animate-pulse-slow">
          <i className="fas fa-plus text-2xl text-white"></i>
        </button>
      </div>
    </div>
  );
}
