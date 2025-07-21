import { Search, Heart, User, Box, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AISearchSuggestions from "./AISearchSuggestions";
import { AdvancedSearch } from "./AdvancedSearch";
import { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdvancedSearch?: (query: string, category?: string, sortBy?: string) => void;
}

export default function Header({ searchQuery, onSearchChange, onAdvancedSearch }: HeaderProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
  };

  const handleAdvancedSearch = (query: string, category?: string, sortBy?: string) => {
    if (onAdvancedSearch) {
      onAdvancedSearch(query, category, sortBy);
    } else {
      onSearchChange(query);
    }
    setShowAdvancedSearch(false);
  };

  return (
    <header className="relative z-50 backdrop-blur-xl bg-gradient-to-r from-black/40 via-purple-900/30 to-blue-900/40 border-b border-cyan-400/30 sticky top-0 shadow-2xl shadow-cyan-500/20">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" style={{top: '20%', left: '10%', animationDelay: '0s'}}></div>
        <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40" style={{top: '60%', left: '80%', animationDelay: '1s'}}></div>
        <div className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50" style={{top: '40%', left: '60%', animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Futuristic Logo and Branding */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-glow shadow-lg shadow-cyan-500/50">
                <Box className="text-2xl text-white animate-pulse" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
            </div>
            <div className="relative">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse-slow">
                THE STYLE OF NEXUS
              </h1>
              <p className="text-sm text-cyan-300 font-mono tracking-wider opacity-80">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                POWERED BY L3HO AI
              </p>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60"></div>
            </div>
          </div>

          {/* Futuristic AI Search Bar */}
          <div className="flex-1 max-w-3xl mx-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="🤖 Pregúntale a la IA qué app necesitas..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full px-8 py-4 bg-black/30 backdrop-blur-xl border-2 border-cyan-400/30 rounded-3xl focus:border-cyan-400 focus:bg-black/50 transition-all duration-300 text-white placeholder:text-cyan-300/70 text-lg shadow-lg shadow-cyan-500/10"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAdvancedSearch(true)}
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-2"
                    title="Búsqueda avanzada"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                  </Button>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <Search className="text-cyan-400 h-6 w-6 animate-pulse" />
                </div>
              </div>
              
              {/* AI Search Suggestions */}
              {showSuggestions && (
                <AISearchSuggestions 
                  searchQuery={searchQuery}
                  onSuggestionClick={handleSuggestionClick}
                />
              )}
            </div>
          </div>

          {/* Futuristic Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              size="icon"
              className="relative w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl border border-pink-400/30 hover:shadow-lg hover:shadow-pink-500/40 transition-all duration-300 hover:scale-110"
            >
              <Heart className="h-5 w-5 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </Button>
            <Button 
              size="icon"
              className="relative w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl border border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-110"
            >
              <User className="h-5 w-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>

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
    </header>
  );
}
