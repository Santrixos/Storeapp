import { X, Star, Download, Share, Check, Package, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AppVersionsModal } from "./AppVersionsModal";
import type { App } from "@shared/schema";
import { useState } from "react";

interface AppDetailsModalProps {
  app: App;
  onClose: () => void;
}

export default function AppDetailsModal({ app, onClose }: AppDetailsModalProps) {
  const [showVersions, setShowVersions] = useState(false);

  const handleDownload = () => {
    window.open(app.downloadUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: app.name,
        text: app.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${app.name} - ${window.location.href}`);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 max-w-2xl max-h-[90vh] overflow-hidden p-0">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center">
                {app.iconUrl ? (
                  <img src={app.iconUrl} alt={app.name} className="w-12 h-12 rounded-xl" />
                ) : (
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    📱
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{app.name}</h3>
                <p className="text-gray-400">{app.developer}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* App Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center text-neon-amber mb-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-1 font-bold">{(app.rating / 10).toFixed(1)}</span>
              </div>
              <p className="text-gray-400 text-sm">Rating</p>
            </div>
            <div className="text-center">
              <div className="text-neon-green font-bold mb-2">{app.downloads}</div>
              <p className="text-gray-400 text-sm">Descargas</p>
            </div>
            <div className="text-center">
              <div className="text-neon-blue font-bold mb-2">{app.size}</div>
              <p className="text-gray-400 text-sm">Tamaño</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Descripción</h4>
            <p className="text-gray-300 leading-relaxed">{app.description}</p>
          </div>

          {/* Features */}
          {app.features && app.features.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Características</h4>
              <ul className="space-y-2">
                {app.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-neon-green mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Version Info */}
          <div className="glass-effect rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Versión:</span>
                <span className="text-white ml-2">{app.version}</span>
              </div>
              <div>
                <span className="text-gray-400">Actualizado:</span>
                <span className="text-white ml-2">
                  {new Date(app.updatedAt).toLocaleDateString('es-ES')}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Requiere:</span>
                <span className="text-white ml-2">{app.requirements}</span>
              </div>
              <div>
                <span className="text-gray-400">Idiomas:</span>
                <span className="text-white ml-2">{app.languages}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/20">
          <div className="flex space-x-4">
            <Button
              onClick={handleDownload}
              className="flex-1 py-3 bg-gradient-to-r from-neon-green to-emerald-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar Ahora
            </Button>
            <Button
              onClick={() => setShowVersions(true)}
              variant="outline"
              className="px-6 py-3 glass-effect border border-purple-400/30 rounded-xl font-medium hover:bg-purple-400/20 transition-all duration-300"
            >
              <History className="mr-2 h-4 w-4" />
              Versiones
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="px-6 py-3 glass-effect border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-all duration-300"
            >
              <Share className="mr-2 h-4 w-4" />
              Compartir
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* App Versions Modal */}
      <AppVersionsModal
        app={app}
        isOpen={showVersions}
        onClose={() => setShowVersions(false)}
      />
    </Dialog>
  );
}
