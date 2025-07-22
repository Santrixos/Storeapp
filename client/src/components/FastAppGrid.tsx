import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download } from "lucide-react";
import { RealAppIcon } from "./RealAppIcons";
import type { App } from "@shared/schema";

interface FastAppCardProps {
  app: App;
  onAppSelect: (app: App) => void;
}

const FastAppCard = memo(({ app, onAppSelect }: FastAppCardProps) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(app.downloadUrl, '_blank');
  };

  return (
    <Card
      onClick={() => onAppSelect(app)}
      className="group cursor-pointer border-purple-500/20 bg-black/40 backdrop-blur-sm hover:border-purple-400/50 hover:bg-black/60 transition-all duration-200"
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* App Icon */}
          <div className="relative flex-shrink-0">
            <RealAppIcon 
              appName={app.name}
              className="w-12 h-12 rounded-xl shadow-lg"
            />
            {app.isFeatured && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-2 h-2 text-white fill-current" />
              </div>
            )}
          </div>

          {/* App Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
              {app.name}
            </h3>
            <p className="text-sm text-gray-400 truncate">{app.developer}</p>
            
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-300">{app.rating}/5</span>
              </div>
              <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                {app.category}
              </Badge>
            </div>
          </div>

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white flex-shrink-0"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

FastAppCard.displayName = "FastAppCard";

interface FastAppGridProps {
  category: string;
  searchQuery: string;
  onAppSelect: (app: App) => void;
  limit?: number;
}

export function FastAppGrid({ category, searchQuery, onAppSelect, limit = 20 }: FastAppGridProps) {
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

  const { data: apps = [], isLoading, error } = useQuery({
    queryKey: getQueryKey(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (cacheTime is deprecated, use gcTime)
  });

  // Memoize filtered and limited apps
  const displayedApps = useMemo(() => {
    return apps.slice(0, limit);
  }, [apps, limit]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="border-purple-500/20 bg-black/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-600 rounded-xl animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-600 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-2/3" />
                </div>
                <div className="w-16 h-8 bg-gray-600 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 mb-2">⚠️ Error al cargar aplicaciones</div>
        <p className="text-gray-400">Inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  if (displayedApps.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-white mb-2">No se encontraron aplicaciones</h3>
        <p className="text-gray-400">
          {searchQuery 
            ? `No hay resultados para "${searchQuery}"`
            : `No hay aplicaciones en la categoría "${category}"`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayedApps.map((app) => (
        <FastAppCard
          key={app.id}
          app={app}
          onAppSelect={onAppSelect}
        />
      ))}
    </div>
  );
}