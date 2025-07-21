import { Star, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "./ImageOptimizer";
import AppIconGenerator from "./AppIconGenerator";
import type { App } from "@shared/schema";

interface ModernAppCardProps {
  app: App;
  onAppSelect: (app: App) => void;
  layout?: "grid" | "list";
  showDownloadButton?: boolean;
}

export default function ModernAppCard({ 
  app, 
  onAppSelect, 
  layout = "grid",
  showDownloadButton = true 
}: ModernAppCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(app.downloadUrl, '_blank');
  };

  const AppIcon = () => {
    return (
      <div className="relative w-full h-full">
        <AppIconGenerator 
          appName={app.name}
          category={app.category}
          size="lg"
          className="w-full h-full"
        />
        {app.iconUrl && (
          <OptimizedImage
            src={app.iconUrl}
            alt={app.name}
            className="absolute inset-0 w-full h-full rounded-xl"
            size="lg"
            lazy={true}
          />
        )}
      </div>
    );
  };

  return (
    <Card
      onClick={() => onAppSelect(app)}
      className={`modern-glass modern-hover cursor-pointer group border-white/10 hover:border-cyan-400/50 overflow-hidden transition-all duration-300 ${
        layout === "list" ? "flex-row h-32" : "h-full"
      }`}
    >
      <CardContent className={`p-6 ${layout === "list" ? "flex items-center space-x-6 h-full" : ""}`}>
        {/* App Icon */}
        <div className={`relative ${layout === "list" ? "w-20 h-20 flex-shrink-0" : "w-20 h-20 mx-auto mb-4"}`}>
          <AppIcon />
          
          {/* Status Indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white/20">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>

          {/* Featured Badge */}
          {app.isFeatured && (
            <div className="absolute -top-1 -left-1">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
          )}
        </div>

        {/* App Info */}
        <div className={`${layout === "list" ? "flex-1 min-w-0" : "text-center"}`}>
          <h3 className={`font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 ${
            layout === "list" ? "text-lg truncate" : "text-xl"
          }`}>
            {app.name}
          </h3>
          
          <p className="text-gray-400 text-sm mb-3 truncate">{app.developer}</p>
          
          {layout === "grid" && (
            <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
              {app.description}
            </p>
          )}

          {/* Stats */}
          <div className={`flex items-center justify-between mb-4 ${layout === "list" ? "space-x-6" : ""}`}>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-yellow-400">
                <Star className="h-3 w-3 mr-1 fill-current" />
                <span className="font-medium">{(app.rating / 10).toFixed(1)}</span>
              </div>
              <div className="flex items-center text-emerald-400">
                <Download className="h-3 w-3 mr-1" />
                <span className="font-medium">{app.downloads}</span>
              </div>
            </div>
            
            <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
              {app.category}
            </Badge>
          </div>

          {/* Action Button */}
          {showDownloadButton && layout === "grid" && (
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar APK
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}