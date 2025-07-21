import { useState } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AppIconGenerator from "@/components/AppIconGenerator";
import { 
  ArrowLeft, 
  Star,
  Download,
  Globe,
  Mail,
  Building,
  Calendar,
  Users,
  Trophy,
  TrendingUp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { App } from "@shared/schema";
import { Link } from "wouter";

export default function DeveloperPage() {
  const { developer = "" } = useParams<{ developer: string }>();
  const decodedDeveloper = decodeURIComponent(developer);

  const { data: apps = [], isLoading } = useQuery<App[]>({
    queryKey: ["/api/apps/developer", decodedDeveloper],
  });

  // Calculate developer stats
  const totalDownloads = apps.reduce((total, app) => {
    const downloads = app.downloads || "0";
    const num = parseInt(downloads.replace(/\D/g, ''));
    if (downloads.includes('M')) return total + (num * 1000000);
    if (downloads.includes('K')) return total + (num * 1000);
    return total + num;
  }, 0);

  const averageRating = apps.length > 0 
    ? apps.reduce((sum, app) => sum + (app.rating || 0), 0) / apps.length / 10
    : 0;

  const categoriesCount = new Set(apps.map(app => app.category)).size;

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M+`;
    if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)}K+`;
    return downloads.toString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-gray-700 rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al catálogo
            </Button>
          </Link>
        </motion.div>

        {/* Developer Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none">
            <CardContent className="p-8">
              <div className="flex items-center gap-6 text-white">
                <div className="p-4 bg-white/20 rounded-full">
                  <Building className="h-12 w-12" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{decodedDeveloper}</h1>
                  <p className="text-white/80 text-lg mb-4">
                    Desarrollador de aplicaciones Android
                  </p>
                  
                  {/* Developer Stats */}
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      <span className="font-semibold">
                        {formatDownloads(totalDownloads)} descargas totales
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="font-semibold">
                        {averageRating.toFixed(1)} promedio
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      <span className="font-semibold">
                        {apps.length} aplicaciones
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      <span className="font-semibold">
                        {categoriesCount} categorías
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Developer Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Top App */}
          {apps.length > 0 && (
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Trophy className="h-5 w-5" />
                  App Más Popular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <AppIconGenerator
                    appName={apps[0].name}
                    category={apps[0].category}
                    size="md"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{apps[0].name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-300">
                        {((apps[0].rating || 0) / 10).toFixed(1)}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-300">{apps[0].downloads}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Categories */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <TrendingUp className="h-5 w-5" />
                Categorías
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from(new Set(apps.map(app => app.category))).map((category) => {
                  const count = apps.filter(app => app.category === category).length;
                  return (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-gray-300 capitalize">{category}</span>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {count}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Users className="h-5 w-5" />
                Información
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Building className="h-4 w-4 text-gray-500" />
                <span>Desarrollador verificado</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Activo desde 2020</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Globe className="h-4 w-4 text-gray-500" />
                <span>Internacional</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Apps Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Todas las aplicaciones ({apps.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <AppIconGenerator
                        appName={app.name}
                        category={app.category}
                        size="lg"
                        showGlow={true}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {app.name}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className="mt-1 bg-gray-700 text-gray-300 capitalize"
                        >
                          {app.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-gray-300">
                            {((app.rating || 0) / 10).toFixed(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-green-500" />
                          <span className="text-gray-300">{app.downloads}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Tamaño: {app.size}</span>
                        <span>v{app.version}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {app.description}
                    </p>

                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar APK
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {apps.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <Building className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Desarrollador no encontrado
              </h3>
              <p className="text-gray-500">
                No se encontraron aplicaciones para este desarrollador.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}