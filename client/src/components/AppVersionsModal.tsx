import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, Download, Star, Users, HardDrive, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { App } from "@shared/schema";

interface AppVersionsModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AppVersionsModal({ app, isOpen, onClose }: AppVersionsModalProps) {
  const { data: versions, isLoading } = useQuery({
    queryKey: ['/api/apps/versions', app?.name],
    enabled: !!app && isOpen
  });

  if (!app) return null;

  const handleDownload = (version: App) => {
    window.open(version.downloadUrl, '_blank');
  };

  const formatRating = (rating: number) => {
    return (rating / 10).toFixed(1);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Fecha no disponible';
    return new Date(date).toLocaleDateString('es-ES');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-black/95 border-cyan-500/30 text-white">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
            {app.iconUrl && (
              <img 
                src={app.iconUrl} 
                alt={app.name}
                className="w-12 h-12 rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = `https://api.iconscout.com/v4/unicons/line/mobile-android-alt.svg`;
                }}
              />
            )}
            Versiones de {app.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
              <span className="ml-3 text-gray-300">Cargando versiones...</span>
            </div>
          ) : versions && versions.length > 0 ? (
            <div className="grid gap-4">
              {versions.map((version: App) => (
                <Card key={version.id} className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-lg font-semibold text-white">
                            Versión {version.version}
                          </h4>
                          {version.isFeatured && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                              Destacada
                            </Badge>
                          )}
                        </div>

                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {version.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{formatRating(version.rating)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Users className="h-4 w-4 text-green-500" />
                            <span>{version.downloads}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <HardDrive className="h-4 w-4 text-blue-500" />
                            <span>{version.size}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="h-4 w-4 text-purple-500" />
                            <span>{formatDate(version.createdAt)}</span>
                          </div>
                        </div>

                        {version.features && version.features.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-300 mb-2">Características:</h5>
                            <div className="flex flex-wrap gap-2">
                              {version.features.slice(0, 3).map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-gray-800 text-gray-300 text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                              {version.features.length > 3 && (
                                <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                                  +{version.features.length - 3} más
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-4">
                        <Button
                          onClick={() => handleDownload(version)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No se encontraron otras versiones de esta aplicación.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}