import { useQuery } from "@tanstack/react-query";
import { Star, Download, Grid3X3, List, Filter, SortAsc, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
            <Card
              key={app.id}
              onClick={() => onAppSelect(app)}
              className={`glass-card hover:scale-105 transition-all duration-500 cursor-pointer group border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/20 ${
                viewMode === "list" ? "flex-row" : ""
              }`}
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.05}s both`
              }}
            >
              <CardContent className={`p-6 ${viewMode === "list" ? "flex items-center space-x-6" : ""}`}>
                {/* App Icon */}
                <div className={`relative ${viewMode === "list" ? "flex-shrink-0" : "mb-4"}`}>
                  {app.iconUrl ? (
                    <img 
                      src={app.iconUrl} 
                      alt={app.name}
                      className="w-16 h-16 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `https://api.iconscout.com/v4/unicons/line/mobile-android-alt.svg`;
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">📱</span>
                    </div>
                  )}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* App Info */}
                <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {app.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-3">{app.developer}</p>
                  
                  <p className={`text-gray-300 text-sm mb-4 leading-relaxed ${
                    viewMode === "list" ? "line-clamp-2" : "line-clamp-3"
                  }`}>
                    {app.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <span>{(app.rating / 10).toFixed(1)}</span>
                      </div>
                      <div className="flex items-center text-green-400">
                        <Download className="h-4 w-4 mr-1" />
                        <span>{app.downloads}</span>
                      </div>
                      <div className="flex items-center text-blue-400">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{app.size}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-cyan-900/30 text-cyan-300">
                      {app.category}
                    </Badge>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={(e) => handleDownload(e, app.downloadUrl)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Gratis
                  </Button>
                </div>
              </CardContent>
            </Card>
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