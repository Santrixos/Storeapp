import { useState } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AppIconGenerator from "@/components/AppIconGenerator";
import { 
  ArrowLeft, 
  Grid3X3, 
  List, 
  Filter,
  SortAsc,
  Star,
  Download,
  Gamepad2,
  MessageCircle,
  Music,
  Settings,
  Zap,
  TrendingUp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { App } from "@shared/schema";
import { Link } from "wouter";

const categoryInfo = {
  games: {
    name: "🎮 Juegos",
    description: "Los mejores juegos para Android, desde casuales hasta hardcore",
    color: "from-purple-600 to-pink-600",
    icon: <Gamepad2 className="h-8 w-8" />,
    subcategories: ["Acción", "Aventura", "Casual", "Deportes", "Estrategia", "Puzzle"]
  },
  social: {
    name: "💬 Social",
    description: "Mantente conectado con amigos y familiares",
    color: "from-blue-600 to-cyan-600",
    icon: <MessageCircle className="h-8 w-8" />,
    subcategories: ["Mensajería", "Redes Sociales", "Dating", "Comunidades", "Video Chat"]
  },
  media: {
    name: "🎵 Multimedia",
    description: "Música, videos y entretenimiento digital",
    color: "from-red-600 to-orange-600",
    icon: <Music className="h-8 w-8" />,
    subcategories: ["Streaming", "Reproductores", "Editores", "Radio", "Podcasts"]
  },
  productivity: {
    name: "📊 Productividad",
    description: "Herramientas para ser más eficiente y organizado",
    color: "from-green-600 to-emerald-600",
    icon: <Zap className="h-8 w-8" />,
    subcategories: ["Oficina", "Notas", "Calendario", "Finanzas", "Documentos"]
  },
  tools: {
    name: "🔧 Herramientas",
    description: "Utilidades y herramientas especializadas",
    color: "from-orange-600 to-yellow-600",
    icon: <Settings className="h-8 w-8" />,
    subcategories: ["Sistema", "Seguridad", "Desarrollo", "Personalización", "Utilidades"]
  }
};

export default function CategoryPage() {
  const { category = "games" } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"rating" | "downloads" | "name" | "newest">("rating");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  const { data: apps = [], isLoading } = useQuery<App[]>({
    queryKey: ["/api/apps/category", category],
  });

  const categoryData = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.games;

  // Filter and sort apps
  const filteredApps = apps
    .filter(app => !selectedSubcategory || app.name.toLowerCase().includes(selectedSubcategory.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "downloads":
          const parseDownloads = (downloads: string) => {
            const num = parseInt(downloads.replace(/\D/g, ''));
            if (downloads.includes('M')) return num * 1000000;
            if (downloads.includes('K')) return num * 1000;
            return num;
          };
          return parseDownloads(b.downloads || "0") - parseDownloads(a.downloads || "0");
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-gray-700 rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
          </div>

          <Card className={`bg-gradient-to-r ${categoryData.color} border-none`}>
            <CardContent className="p-8">
              <div className="flex items-center gap-4 text-white">
                <div className="p-3 bg-white/20 rounded-lg">
                  {categoryData.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{categoryData.name}</h1>
                  <p className="text-white/80 text-lg">{categoryData.description}</p>
                  <Badge variant="secondary" className="mt-2 bg-white/20 text-white">
                    {filteredApps.length} aplicaciones
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Controls */}
        <Card className="bg-gray-900/50 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Subcategories */}
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Subcategorías
                </label>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedSubcategory === "" ? "default" : "secondary"}
                    className={`cursor-pointer ${
                      selectedSubcategory === "" 
                        ? "bg-cyan-500 text-white" 
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                    onClick={() => setSelectedSubcategory("")}
                  >
                    Todas
                  </Badge>
                  {categoryData.subcategories.map((sub) => (
                    <Badge
                      key={sub}
                      variant={selectedSubcategory === sub ? "default" : "secondary"}
                      className={`cursor-pointer ${
                        selectedSubcategory === sub
                          ? "bg-cyan-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                      onClick={() => setSelectedSubcategory(sub)}
                    >
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator orientation="vertical" className="hidden lg:block h-16" />

              {/* Sort and View Controls */}
              <div className="flex gap-4 items-center">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-gray-800 border border-gray-600 text-white text-sm rounded px-3 py-1 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="rating">Mejor valoradas</option>
                    <option value="downloads">Más descargadas</option>
                    <option value="name">Nombre A-Z</option>
                    <option value="newest">Más recientes</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex border border-gray-600 rounded overflow-hidden">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "ghost"}
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apps Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
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
                          <p className="text-gray-400 text-sm">{app.developer}</p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-gray-300">
                                {((app.rating || 0) / 10).toFixed(1)}
                              </span>
                            </div>
                            <span className="text-gray-500">•</span>
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-300">{app.downloads}</span>
                            </div>
                          </div>

                          <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                            {app.description}
                          </p>

                          <Button
                            size="sm"
                            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApps.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <AppIconGenerator
                          appName={app.name}
                          category={app.category}
                          size="md"
                          showGlow={true}
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                {app.name}
                              </h3>
                              <p className="text-gray-400 text-sm">{app.developer}</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm text-gray-300">
                                  {((app.rating || 0) / 10).toFixed(1)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Download className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-gray-300">{app.downloads}</span>
                              </div>
                              <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                                {app.size}
                              </Badge>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Descargar
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {filteredApps.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <TrendingUp className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No se encontraron aplicaciones
              </h3>
              <p className="text-gray-500">
                Intenta cambiar los filtros o buscar en otra categoría.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}