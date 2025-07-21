import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, Star, Download, Search, Filter, Grid, List, Heart, Share, Zap, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { App } from "@shared/schema";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const { data: apps = [], isLoading } = useQuery<App[]>({
    queryKey: ["/api/apps"],
  });

  const { data: featuredApps = [] } = useQuery<App[]>({
    queryKey: ["/api/apps/featured"],
  });

  const categories = [
    { id: "all", name: "Todas", icon: "🌟", color: "from-purple-500 to-pink-500" },
    { id: "games", name: "Juegos", icon: "🎮", color: "from-blue-500 to-cyan-500" },
    { id: "social", name: "Social", icon: "💬", color: "from-green-500 to-emerald-500" },
    { id: "productivity", name: "Productividad", icon: "📊", color: "from-orange-500 to-red-500" },
    { id: "media", name: "Media", icon: "🎵", color: "from-purple-500 to-indigo-500" },
    { id: "tools", name: "Herramientas", icon: "🛠️", color: "from-gray-500 to-slate-500" },
  ];

  const sortOptions = [
    { id: "popular", name: "Más Popular", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "rating", name: "Mejor Valoradas", icon: <Star className="h-4 w-4" /> },
    { id: "downloads", name: "Más Descargadas", icon: <Download className="h-4 w-4" /> },
    { id: "newest", name: "Más Recientes", icon: <Zap className="h-4 w-4" /> },
  ];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.developer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const AppCard = ({ app }: { app: App }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden bg-black/40 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {app.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                  {app.name}
                </CardTitle>
                <p className="text-gray-400 text-sm">{app.developer}</p>
              </div>
            </div>
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              {app.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{app.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{app.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>{app.downloads}+</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-purple-400">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-purple-400">
                <Share className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Descargar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Descubre Apps Increíbles
          </motion.h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explora nuestra colección curada de aplicaciones modificadas con funciones premium desbloqueadas
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar aplicaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/40 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="bg-purple-600/20 border-purple-500/30 hover:bg-purple-600/40"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="bg-purple-600/20 border-purple-500/30 hover:bg-purple-600/40"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <ScrollArea className="w-full">
            <div className="flex gap-3 pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white`
                      : "bg-black/40 border-purple-500/30 hover:bg-purple-600/20"
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Featured Section */}
        {featuredApps.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="h-6 w-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Apps Destacadas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApps.slice(0, 3).map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {filteredApps.length} aplicaciones encontradas
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/40 border border-purple-500/30 rounded-md px-3 py-1 text-white text-sm focus:border-purple-400 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Apps Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Cargando aplicaciones...</p>
            </div>
          ) : (
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredApps.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-600/20 flex items-center justify-center">
              <Search className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No se encontraron aplicaciones</h3>
            <p className="text-gray-400">Intenta con otros términos de búsqueda o categorías</p>
          </div>
        )}
      </div>
    </div>
  );
}