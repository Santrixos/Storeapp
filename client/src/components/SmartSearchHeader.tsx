import { Search, Filter, SlidersHorizontal, Sparkles, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AdvancedSearch } from "./AdvancedSearch";
import AISearchSuggestions from "./AISearchSuggestions";
import { useState, useEffect } from "react";

interface SmartSearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdvancedSearch?: (query: string, category?: string, sortBy?: string) => void;
}

const quickSearches = [
  { label: "Juegos Populares", query: "juegos", icon: "🎮" },
  { label: "Redes Sociales", query: "social", icon: "📱" },
  { label: "Productividad", query: "office", icon: "💼" },
  { label: "Entretenimiento", query: "video", icon: "🎬" },
  { label: "Fotografía", query: "camera", icon: "📸" },
];

export default function SmartSearchHeader({ 
  searchQuery, 
  onSearchChange, 
  onAdvancedSearch 
}: SmartSearchHeaderProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recent-searches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    addToRecentSearches(suggestion);
  };

  const handleAdvancedSearch = (query: string, category?: string, sortBy?: string) => {
    if (onAdvancedSearch) {
      onAdvancedSearch(query, category, sortBy);
    } else {
      onSearchChange(query);
    }
    setShowAdvancedSearch(false);
    addToRecentSearches(query);
  };

  const handleQuickSearch = (query: string) => {
    onSearchChange(query);
    addToRecentSearches(query);
  };

  const addToRecentSearches = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent-searches');
  };

  return (
    <div className="relative">
      {/* Main Search Container */}
      <Card className="glass-card border-cyan-400/30 mb-6 overflow-hidden">
        <CardContent className="p-6">
          {/* Search Input */}
          <div className="relative group mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative">
              <Input
                type="text"
                placeholder="🤖 Pregúntale a la IA qué app necesitas o busca por nombre..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => {
                  setShowSuggestions(true);
                  setIsSearchFocused(true);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setShowSuggestions(false);
                    setIsSearchFocused(false);
                  }, 200);
                }}
                className="w-full px-6 py-4 bg-black/40 backdrop-blur-xl border-2 border-cyan-400/30 rounded-xl focus:border-cyan-400 focus:bg-black/60 transition-all duration-300 text-white placeholder:text-cyan-300/70 text-lg shadow-xl pl-14"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="text-cyan-400 h-5 w-5" />
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedSearch(true)}
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-2 transition-all duration-300"
                  title="Búsqueda avanzada"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-1">
                  <Sparkles className="text-yellow-400 h-4 w-4 animate-pulse" />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Search Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-400 flex items-center mr-3">
              <Zap className="h-3 w-3 mr-1" />
              Búsquedas rápidas:
            </span>
            {quickSearches.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer bg-gradient-to-r from-cyan-900/30 to-blue-900/30 text-cyan-300 hover:from-cyan-800/40 hover:to-blue-800/40 transition-all duration-300 hover:scale-105"
                onClick={() => handleQuickSearch(item.query)}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Badge>
            ))}
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && !isSearchFocused && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-400 flex items-center mr-3">
                Recientes:
              </span>
              {recentSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
                  onClick={() => handleQuickSearch(search)}
                >
                  {search}
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecentSearches}
                className="text-gray-500 hover:text-gray-400 p-1"
                title="Limpiar búsquedas recientes"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* AI Search Suggestions */}
          {showSuggestions && searchQuery && (
            <div className="absolute top-full left-0 right-0 z-50 mt-2">
              <AISearchSuggestions 
                searchQuery={searchQuery}
                onSuggestionClick={handleSuggestionClick}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Search Modal */}
      {showAdvancedSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl mx-4">
            <AdvancedSearch 
              onSearch={handleAdvancedSearch}
              onClose={() => setShowAdvancedSearch(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}