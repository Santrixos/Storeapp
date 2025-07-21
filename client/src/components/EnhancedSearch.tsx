import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Mic, Filter, Sparkles, X, Clock, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RealAppIcon } from "./RealAppIcons";
import type { App } from "@shared/schema";

interface EnhancedSearchProps {
  onSearch: (query: string) => void;
  onAppSelect?: (app: App) => void;
  className?: string;
}

export function EnhancedSearch({ onSearch, onAppSelect, className = "" }: EnhancedSearchProps) {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches] = useState<string[]>([
    "Free Fire mod", "Spotify Premium", "WhatsApp Plus", "PUBG Mobile", "Instagram mod"
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();

  const { data: apps = [] } = useQuery<App[]>({
    queryKey: ["/api/apps"],
  });

  const { data: searchResults = [] } = useQuery<App[]>({
    queryKey: ["/api/apps/search", query],
    enabled: query.length > 2,
  });

  // Smart suggestions based on query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = apps
        .filter(app => 
          app.name.toLowerCase().includes(query.toLowerCase()) ||
          app.developer.toLowerCase().includes(query.toLowerCase()) ||
          app.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
        .map(app => app.name);
      
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, apps]);

  // Debounced search
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    searchTimeout.current = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query, onSearch]);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      setIsVoiceActive(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsVoiceActive(false);
      };
      
      recognition.onerror = () => {
        setIsVoiceActive(false);
      };
      
      recognition.onend = () => {
        setIsVoiceActive(false);
      };
      
      recognition.start();
    }
  };

  const popularSearches = [
    { term: "Free Fire", icon: "🔥", count: "1.2M" },
    { term: "Spotify Premium", icon: "🎵", count: "980K" },
    { term: "WhatsApp Plus", icon: "💬", count: "750K" },
    { term: "PUBG Mobile", icon: "🎮", count: "650K" },
    { term: "Instagram", icon: "📸", count: "590K" },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Main Search Input */}
      <div className="relative">
        <div className={`flex items-center gap-3 bg-black/40 backdrop-blur-xl border rounded-xl transition-all duration-300 ${
          isExpanded ? 'border-purple-400 shadow-lg shadow-purple-500/20' : 'border-purple-500/30 hover:border-purple-400/50'
        }`}>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Buscar apps mod, juegos, herramientas..."
              className="pl-12 pr-4 py-4 bg-transparent border-0 text-white placeholder:text-gray-400 focus:ring-0 text-lg"
            />
          </div>
          
          <div className="flex items-center gap-2 pr-3">
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
                className="h-8 w-8 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVoiceSearch}
              className={`h-10 w-10 ${isVoiceActive ? 'text-red-400 animate-pulse' : 'text-gray-400 hover:text-purple-400'}`}
            >
              <Mic className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-gray-400 hover:text-purple-400"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Voice Recording Indicator */}
        <AnimatePresence>
          {isVoiceActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white">Escuchando... Habla ahora</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="bg-black/95 backdrop-blur-xl border-purple-500/30 shadow-xl shadow-purple-500/10">
              <CardContent className="p-0">
                <ScrollArea className="max-h-96">
                  {/* Live Search Results */}
                  {query.length > 2 && searchResults.length > 0 && (
                    <div className="p-4 border-b border-purple-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-300">Resultados</span>
                      </div>
                      <div className="space-y-2">
                        {searchResults.slice(0, 4).map((app) => (
                          <motion.div
                            key={app.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              onAppSelect?.(app);
                              setIsExpanded(false);
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-600/20 cursor-pointer transition-colors"
                          >
                            <RealAppIcon appName={app.name} className="w-10 h-10" />
                            <div className="flex-1">
                              <div className="font-medium text-white">{app.name}</div>
                              <div className="text-sm text-gray-400">{app.developer}</div>
                            </div>
                            <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                              {app.category}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Smart Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="p-4 border-b border-purple-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Search className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">Sugerencias</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setQuery(suggestion);
                              setIsExpanded(false);
                            }}
                            className="bg-blue-600/20 border-blue-500/30 text-blue-300 hover:bg-blue-600/30"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  {query.length === 0 && (
                    <div className="p-4 border-b border-purple-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium text-yellow-300">Búsquedas Populares</span>
                      </div>
                      <div className="space-y-2">
                        {popularSearches.map((search, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              setQuery(search.term);
                              setIsExpanded(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-600/20 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{search.icon}</span>
                              <span className="text-white">{search.term}</span>
                            </div>
                            <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 text-xs">
                              {search.count}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Searches */}
                  {query.length === 0 && recentSearches.length > 0 && (
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Búsquedas Recientes</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setQuery(search);
                              setIsExpanded(false);
                            }}
                            className="text-gray-400 hover:text-white hover:bg-gray-600/20"
                          >
                            {search}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}