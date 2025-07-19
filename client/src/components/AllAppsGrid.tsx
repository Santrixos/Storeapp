import { useQuery } from "@tanstack/react-query";
import { Star, Download, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { App } from "@shared/schema";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface AllAppsGridProps {
  category: string;
  searchQuery: string;
  onAppSelect: (app: App) => void;
}

export default function AllAppsGrid({ category, searchQuery, onAppSelect }: AllAppsGridProps) {
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  const { data: apps, isLoading } = useQuery({
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
      case "popular":
      default:
        return b.rating - a.rating;
    }
  }) : [];

  if (isLoading) {
    return (
      <section className="py-16 glass-effect">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <Skeleton className="h-8 w-64" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-4">
                <div className="flex items-start space-x-4">
                  <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            <Grid3X3 className="inline mr-3 text-neon-blue" />
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Todas las Aplicaciones'}
            {sortedApps.length > 0 && (
              <span className="text-lg text-gray-400 ml-2">
                ({sortedApps.length} apps)
              </span>
            )}
          </h3>
          <div className="flex items-center space-x-4">
            {/* Sort Options */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="glass-effect border-white/20 rounded-xl px-4 py-2 text-white focus:border-neon-blue w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20 rounded-xl text-white">
                <SelectItem value="popular">Más Populares</SelectItem>
                <SelectItem value="newest">Más Recientes</SelectItem>
                <SelectItem value="rating">Mejor Valoradas</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex glass-effect rounded-xl p-1 border border-white/20">
              <Button
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-neon-blue"
                    : "bg-transparent hover:bg-white/10"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-neon-blue"
                    : "bg-transparent hover:bg-white/10"
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {sortedApps.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 glass-effect rounded-full flex items-center justify-center">
              <Grid3X3 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchQuery ? "No se encontraron aplicaciones" : "No hay aplicaciones disponibles"}
            </h3>
            <p className="text-gray-400">
              {searchQuery 
                ? `Intenta con otros términos de búsqueda` 
                : "Pronto agregaremos más aplicaciones"}
            </p>
          </div>
        ) : (
          <>
            {/* Apps Grid */}
            <div className={`gap-6 ${
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "flex flex-col space-y-4"
            }`}>
              {sortedApps.map((app: App) => (
                <div
                  key={app.id}
                  onClick={() => onAppSelect(app)}
                  className={`group glass-card hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    viewMode === "grid" 
                      ? "rounded-2xl p-4" 
                      : "rounded-xl p-4 flex items-center space-x-4"
                  }`}
                >
                  <div className={`flex ${viewMode === "grid" ? "items-start space-x-4" : "items-center flex-1 space-x-4"}`}>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {app.iconUrl ? (
                        <img src={app.iconUrl} alt={app.name} className="w-12 h-12 rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                          📱
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white group-hover:text-neon-blue transition-colors duration-300 truncate">
                        {app.name}
                      </h4>
                      <p className="text-gray-400 text-sm truncate">{app.developer}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex text-neon-amber text-xs">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(app.rating / 10)
                                  ? "fill-current"
                                  : "opacity-30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-300 text-xs ml-2">
                          {(app.rating / 10).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center ${viewMode === "grid" ? "mt-4 justify-between" : "space-x-4"}`}>
                    <span className="text-xs text-gray-400 glass-effect px-2 py-1 rounded-full">
                      {app.size}
                    </span>
                    <Button
                      onClick={(e) => handleDownload(e, app.downloadUrl)}
                      className="px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300"
                    >
                      <Download className="mr-1 h-4 w-4" />
                      Obtener
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button className="px-8 py-4 glass-effect border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Download className="mr-2 h-4 w-4" />
                Cargar Más Aplicaciones
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
