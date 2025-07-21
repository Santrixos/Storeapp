import { Star, Download, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAppIcon, getAppEmoji, generateGradientIcon } from "@/utils/iconUtils";
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
    const iconUrl = getAppIcon(app);
    const emoji = getAppEmoji(app.name, app.category);
    const gradientClass = generateGradientIcon(app.name);
    
    if (typeof iconUrl === 'string' && iconUrl.startsWith('http')) {
      return (
        <img 
          src={iconUrl} 
          alt={app.name}
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback to gradient with emoji
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br ${gradientClass} rounded-xl flex items-center justify-center text-3xl shadow-lg">
                  ${emoji}
                </div>
              `;
            }
          }}
        />
      );
    } else {
      return (
        <div className={`w-full h-full bg-gradient-to-br ${gradientClass} rounded-xl flex items-center justify-center text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110`}>
          {emoji}
        </div>
      );
    }
  };

  return (
    <Card
      onClick={() => onAppSelect(app)}
      className={`modern-glass modern-hover cursor-pointer group border-white/10 hover:border-cyan-400/50 overflow-hidden ${
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
            
            <div className="flex items-center space-x-2">
              <Badge 
                variant="secondary" 
                className="bg-cyan-900/30 text-cyan-300 border-cyan-400/30 text-xs"
              >
                {app.category}
              </Badge>
              <span className="text-gray-400 text-xs">{app.size}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {showDownloadButton && (
            <div className={`flex space-x-2 ${layout === "list" ? "justify-end" : ""}`}>
              <Button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
                size={layout === "list" ? "sm" : "default"}
              >
                <Download className="h-4 w-4 mr-2" />
                {layout === "list" ? "Instalar" : "Instalar Gratis"}
              </Button>
              
              <Button
                variant="outline"
                size={layout === "list" ? "sm" : "default"}
                className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onAppSelect(app);
                }}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </CardContent>
    </Card>
  );
}