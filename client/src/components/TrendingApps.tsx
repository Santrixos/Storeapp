import { useQuery } from "@tanstack/react-query";
import { Flame, Star, Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { App } from "@shared/schema";

interface TrendingAppsProps {
  onAppSelect: (app: App) => void;
}

export default function TrendingApps({ onAppSelect }: TrendingAppsProps) {
  const { data: trendingApps, isLoading } = useQuery({
    queryKey: ['/api/apps/trending'],
  });

  const handleDownload = (e: React.MouseEvent, downloadUrl: string) => {
    e.stopPropagation();
    window.open(downloadUrl, '_blank');
  };

  if (isLoading) {
    return (
      <section className="py-16 glass-effect">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            <span className="ml-3 text-gray-300">Cargando aplicaciones en tendencia...</span>
          </div>
        </div>
      </section>
    );
  }

  if (!trendingApps || trendingApps.length === 0) {
    return null;
  }

  return (
    <section className="py-16 glass-effect">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full">
              <Flame className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
            En Tendencia Ahora
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Las aplicaciones más populares y descargadas del momento por nuestra comunidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingApps.map((app: App, index: number) => (
            <Card
              key={app.id}
              onClick={() => onAppSelect(app)}
              className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer group border-orange-400/20 hover:border-orange-400/50"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {app.iconUrl ? (
                        <img 
                          src={app.iconUrl} 
                          alt={app.name}
                          className="w-16 h-16 rounded-xl shadow-lg"
                          onError={(e) => {
                            e.currentTarget.src = `https://api.iconscout.com/v4/unicons/line/mobile-android-alt.svg`;
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">📱</span>
                        </div>
                      )}
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs px-2 py-1">
                          #{index + 1}
                        </Badge>
                      </div>
                    </div>
                    <TrendingUp className="h-5 w-5 text-orange-400 animate-bounce" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {app.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {app.description}
                </p>

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
                  </div>
                  <Badge variant="secondary" className="bg-orange-900/30 text-orange-300">
                    {app.size}
                  </Badge>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={(e) => handleDownload(e, app.downloadUrl)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {trendingApps.length > 6 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
            >
              Ver más tendencias
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}