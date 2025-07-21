import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  X,
  Mic,
  MicOff,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { App } from "@shared/schema";

interface ImprovedSearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdvancedSearch?: (query: string, category?: string, sortBy?: string) => void;
}

export default function ImprovedSearchHeader({ 
  searchQuery, 
  onSearchChange, 
  onAdvancedSearch 
}: ImprovedSearchHeaderProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("rating");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognition = useRef<any>(null);

  // Get trending search terms
  const { data: trendingApps } = useQuery<App[]>({
    queryKey: ["/api/apps/trending"],
    enabled: showSuggestions && !searchQuery
  });

  const categories = [
    { id: "games", label: "🎮 Juegos", color: "bg-purple-500" },
    { id: "social", label: "💬 Social", color: "bg-blue-500" },
    { id: "productivity", label: "📊 Productividad", color: "bg-green-500" },
    { id: "media", label: "🎵 Multimedia", color: "bg-red-500" },
    { id: "tools", label: "🔧 Herramientas", color: "bg-orange-500" }
  ];

  const sortOptions = [
    { id: "rating", label: "🌟 Mejor valoradas" },
    { id: "downloads", label: "📈 Más descargadas" },
    { id: "newest", label: "🆕 Más recientes" },
    { id: "name", label: "🔤 Nombre A-Z" }
  ];

  const smartSuggestions = [
    "juegos offline",
    "editor de fotos",
    "reproductor de música",
    "redes sociales",
    "apps de productividad",
    "navegadores rápidos",
    "apps de streaming",
    "herramientas de desarrollo"
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('nexus-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Setup speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'es-ES';

      recognition.current.onstart = () => setIsListening(true);
      recognition.current.onend = () => setIsListening(false);
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleSearch(transcript);
      };
    }
  }, []);

  const saveRecentSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      const updated = [query, ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('nexus-recent-searches', JSON.stringify(updated));
    }
  };

  const handleSearch = (query: string) => {
    onSearchChange(query);
    saveRecentSearch(query);
    setShowSuggestions(false);
  };

  const handleAdvancedSearchSubmit = () => {
    if (onAdvancedSearch) {
      onAdvancedSearch(searchQuery, selectedCategory, selectedSort);
    }
    saveRecentSearch(searchQuery);
    setIsAdvancedOpen(false);
  };

  const startVoiceSearch = () => {
    if (recognition.current) {
      recognition.current.start();
    }
  };

  const getTrendingTerms = () => {
    return trendingApps?.slice(0, 5).map(app => app.name) || [];
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border-2 border-cyan-500/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="relative">
            <div className="flex items-center gap-3">
              {/* Search Icon */}
              <div className="relative">
                <Search className="h-6 w-6 text-cyan-400" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-cyan-400/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>

              {/* Input Field */}
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Busca apps, juegos, herramientas... ¡Describe lo que necesitas!"
                  className="bg-gray-800/50 border-cyan-500/50 text-white placeholder-gray-400 text-lg py-3 pr-24 focus:border-cyan-400 focus:ring-cyan-400/50"
                />
                
                {/* Voice Search Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={startVoiceSearch}
                  disabled={!recognition.current}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                    isListening 
                      ? 'bg-red-500/20 text-red-400 animate-pulse' 
                      : 'text-gray-400 hover:text-cyan-400'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>

              {/* Advanced Search Toggle */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className={`border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 transition-all ${
                  isAdvancedOpen ? 'bg-cyan-500/20' : ''
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                <Zap className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-2xl z-50"
                >
                  <div className="p-4 space-y-4">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                          <Clock className="h-4 w-4" />
                          Búsquedas recientes
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer bg-gray-800 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300"
                              onClick={() => handleSearch(term)}
                            >
                              {term}
                              <X 
                                className="h-3 w-3 ml-1 hover:text-red-400" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRecentSearches(prev => prev.filter(s => s !== term));
                                }}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Terms */}
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <TrendingUp className="h-4 w-4" />
                        Tendencias
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getTrendingTerms().map((term, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer border-orange-500/50 text-orange-400 hover:bg-orange-500/20"
                            onClick={() => handleSearch(term)}
                          >
                            🔥 {term}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Smart Suggestions */}
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <Sparkles className="h-4 w-4" />
                        Sugerencias inteligentes
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {smartSuggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                            onClick={() => handleSearch(suggestion)}
                          >
                            ✨ {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Advanced Search Filters */}
          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      📱 Categoría
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={selectedCategory === "" ? "default" : "secondary"}
                        className={`cursor-pointer ${
                          selectedCategory === "" 
                            ? "bg-cyan-500 text-white" 
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                        onClick={() => setSelectedCategory("")}
                      >
                        Todas
                      </Badge>
                      {categories.map((category) => (
                        <Badge
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "secondary"}
                          className={`cursor-pointer ${
                            selectedCategory === category.id
                              ? "bg-cyan-500 text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          {category.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      🔄 Ordenar por
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((option) => (
                        <Badge
                          key={option.id}
                          variant={selectedSort === option.id ? "default" : "secondary"}
                          className={`cursor-pointer ${
                            selectedSort === option.id
                              ? "bg-cyan-500 text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                          onClick={() => setSelectedSort(option.id)}
                        >
                          {option.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleAdvancedSearchSubmit}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Buscar con filtros
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}