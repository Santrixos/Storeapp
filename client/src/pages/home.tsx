import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryNavigation from "@/components/CategoryNavigation";
import FeaturedApps from "@/components/FeaturedApps";
import TrendingApps from "@/components/TrendingApps";
import AllAppsGrid from "@/components/AllAppsGrid";
import AppDetailsModal from "@/components/AppDetailsModal";
import Footer from "@/components/Footer";
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
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={handleNormalSearch}
        onAdvancedSearch={handleAdvancedSearch} 
      />
      <HeroSection />
      <CategoryNavigation 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <FeaturedApps onAppSelect={setSelectedApp} />
      <TrendingApps onAppSelect={setSelectedApp} />
      <AllAppsGrid 
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
