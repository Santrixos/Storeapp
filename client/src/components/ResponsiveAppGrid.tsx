import { useQuery } from "@tanstack/react-query";
import { Star, Download, Grid3X3, List, Filter, SortAsc, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ModernAppCard from "./ModernAppCard";
import type { App } from "@shared/schema";
import { useState, useEffect } from "react";

interface ResponsiveAppGridProps {
  category: string;
  searchQuery: string;
  onAppSelect: (app: App) => void;
}

export default function ResponsiveAppGrid({ category, searchQuery, onAppSelect }: ResponsiveAppGridProps) {
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [displayCount, setDisplayCount] = useState(12);

  // Determine which API endpoint to use
  const getQueryKey = () => {
    if (searchQuery.trim()) {
      return [`/api/apps/search?q=${encodeURIComponent(searchQuery)}`];
    }
    if (category === "all") {
      return ["/api/apps"];
    }
    return [`/api/apps/category/${category}`];
  };

  const { data: apps, isLoading, error } = useQuery({
    queryKey: getQueryKey(),
  });

  const handleDownload = (e: React.MouseEvent, downloadUrl: string) => {
    e.stopPropagation();
    window.open(downloadUrl, '_blank');
  };

  // Sort apps based on selected criteria
  const sortedApps = apps ? [...apps].sort((a: App, b: App) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      case "downloads":
        const aDownloads = parseInt(a.downloads.replace(/\D/g, '')) || 0;
        const bDownloads = parseInt(b.downloads.replace(/\D/g, '')) || 0;
        return bDownloads - aDownloads;
      case "popular":
      default:
        return b.rating - a.rating;
    }
  }) : [];

  const displayedApps = sortedApps.slice(0, displayCount);

  const loadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-600 rounded animate-pulse"></div>
              <div className="h-8 w-64 bg-gray-600 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-32 bg-gray-600 rounded animate-pulse"></div>
              <div className="h-10 w-20 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-600 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-600 rounded mb-3"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-red-400 mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-white mb-2">Error al cargar aplicaciones</h3>
            <p className="text-gray-400">No se pudieron cargar las aplicaciones. Inténtalo de nuevo.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!apps || apps.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron aplicaciones</h3>
            <p className="text-gray-400">
              {searchQuery 
                ? `No hay resultados para "${searchQuery}"`
                : `No hay aplicaciones en la categoría "${category}"`
              }
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header with Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg">
              <Grid3X3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                {searchQuery ? `Resultados para "${searchQuery}"` : 
                 category === "all" ? "Todas las Aplicaciones" : 
                 `Categoría: ${category.charAt(0).toUpperCase() + category.slice(1)}`}
              </h2>
              <p className="text-gray-400 mt-1">
                {apps.length} aplicación{apps.length !== 1 ? 'es' : ''} encontrada{apps.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sort Selector */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 glass-effect border-cyan-400/30">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="glass-card border-cyan-400/30">
                <SelectItem value="popular">Más Popular</SelectItem>
                <SelectItem value="rating">Mejor Calificación</SelectItem>
                <SelectItem value="downloads">Más Descargadas</SelectItem>
                <SelectItem value="newest">Más Recientes</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex items-center glass-effect border border-cyan-400/30 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-cyan-500" : ""}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-cyan-500" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Apps Grid/List */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
            : "flex flex-col space-y-4"
        }>
          {displayedApps.map((app: App, index: number) => (
            <div
              key={app.id}
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.05}s both`
              }}
            >
              <ModernAppCard
                app={app}
                onAppSelect={onAppSelect}
                layout={viewMode}
                showDownloadButton={true}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < sortedApps.length && (
          <div className="text-center mt-12">
            <Button
              onClick={loadMore}
              variant="outline"
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              Cargar más aplicaciones ({sortedApps.length - displayCount} restantes)
            </Button>
          </div>
        )}
      </div>


    </section>
  );
}