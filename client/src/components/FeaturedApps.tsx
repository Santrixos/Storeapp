import { useQuery } from "@tanstack/react-query";
import { Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { App } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedAppsProps {
  onAppSelect: (app: App) => void;
}

export default function FeaturedApps({ onAppSelect }: FeaturedAppsProps) {
  const { data: apps, isLoading } = useQuery({
    queryKey: ["/api/apps/featured"],
  });

  const handleDownload = (e: React.MouseEvent, downloadUrl: string) => {
    e.stopPropagation();
    window.open(downloadUrl, '_blank');
  };

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text text-transparent">
              <Star className="inline mr-3 text-neon-amber" />
              Apps Destacadas
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-3xl p-6">
                <Skeleton className="w-20 h-20 rounded-2xl mb-6" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text text-transparent">
            <Star className="inline mr-3 text-neon-amber" />
            Apps Destacadas
          </h3>
          <button className="text-neon-blue hover:text-neon-purple transition-colors duration-300 font-medium">
            Ver todas →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {apps?.map((app: App) => (
            <div
              key={app.id}
              onClick={() => onAppSelect(app)}
              className="group relative holographic-card rounded-3xl p-6 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer animate-cyber-pulse"
              style={{
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Holographic scan line effect */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-data-stream"></div>
              </div>
              
              <div className="relative z-10">
                {/* Futuristic App Icon */}
                <div className="relative w-20 h-20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl animate-pulse"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-cyan-500 to-purple-700 rounded-2xl flex items-center justify-center border border-cyan-400/30 shadow-lg shadow-cyan-500/30">
                    {app.iconUrl ? (
                      <img src={app.iconUrl} alt={app.name} className="w-12 h-12 rounded-xl" />
                    ) : (
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl animate-hologram">
                        📱
                      </div>
                    )}
                  </div>
                  
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Futuristic App Info */}
                <h4 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:animate-hologram transition-all duration-300">
                  {app.name}
                </h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {app.description}
                </p>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    <div className="flex text-neon-amber">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(app.rating / 10)
                              ? "fill-current"
                              : "opacity-30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm ml-2">
                      {(app.rating / 10).toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 glass-effect px-3 py-1 rounded-full">
                    {app.downloads}
                  </span>
                </div>

                {/* Futuristic Download Button */}
                <Button
                  onClick={(e) => handleDownload(e, app.downloadUrl)}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group-hover:scale-105 border border-green-400/30 relative overflow-hidden"
                  style={{
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    <Download className="mr-2 h-4 w-4 animate-pulse" />
                    <span className="font-mono tracking-wider">DESCARGAR</span>
                  </div>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
