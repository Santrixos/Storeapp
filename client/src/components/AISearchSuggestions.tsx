import { useState, useEffect } from "react";
import { Brain, Lightbulb, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AISearchSuggestionsProps {
  searchQuery: string;
  onSuggestionClick: (suggestion: string) => void;
}

interface AIRecommendation {
  category: string;
  reason: string;
  keywords: string[];
}

export default function AISearchSuggestions({ searchQuery, onSuggestionClick }: AISearchSuggestionsProps) {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [suggestedTerms, setSuggestedTerms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 3) {
      const timer = setTimeout(() => {
        generateAIRecommendations();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setRecommendations([]);
      setSuggestedTerms([]);
    }
  }, [searchQuery]);

  const generateAIRecommendations = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setAiThinking(true);
    
    try {
      const response = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations || []);
        setSuggestedTerms(data.suggestedSearchTerms || []);
      }
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAiThinking(false), 500);
    }
  };

  if (!searchQuery || searchQuery.length <= 3) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2">
      <div className="holographic-card rounded-2xl p-6 mx-4 max-w-4xl">
        {/* AI Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className={`h-6 w-6 text-cyan-400 ${aiThinking ? 'animate-pulse' : ''}`} />
              {aiThinking && (
                <div className="absolute -inset-2 bg-cyan-400/20 rounded-full animate-ping"></div>
              )}
            </div>
            <span className="text-sm font-mono text-cyan-400 tracking-wider">
              {isLoading ? 'ANALIZANDO CON IA...' : 'RECOMENDACIONES IA'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">CONECTADO</span>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-cyan-400/20 rounded-lg mb-2"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-purple-400/20 rounded-full w-16"></div>
                  <div className="h-6 bg-blue-400/20 rounded-full w-20"></div>
                  <div className="h-6 bg-pink-400/20 rounded-full w-14"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* AI Recommendations */}
            {recommendations.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-yellow-400 animate-pulse" />
                  <span className="text-sm font-medium text-yellow-400">
                    Categorías Recomendadas por IA
                  </span>
                </div>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="group bg-black/20 rounded-xl p-4 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:bg-cyan-400/5"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge 
                              variant="outline" 
                              className="border-cyan-400/50 text-cyan-400 bg-cyan-400/10"
                            >
                              {rec.category.toUpperCase()}
                            </Badge>
                            <Sparkles className="h-3 w-3 text-purple-400" />
                          </div>
                          <p className="text-sm text-gray-300 mb-3">{rec.reason}</p>
                          <div className="flex flex-wrap gap-2">
                            {rec.keywords.map((keyword, idx) => (
                              <button
                                key={idx}
                                onClick={() => onSuggestionClick(keyword)}
                                className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400/60 transition-all duration-200 hover:scale-105"
                              >
                                {keyword}
                              </button>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onSuggestionClick(rec.category)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
                        >
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Search Terms */}
            {suggestedTerms.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="h-4 w-4 text-pink-400 animate-pulse" />
                  <span className="text-sm font-medium text-pink-400">
                    Búsquedas Sugeridas
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedTerms.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => onSuggestionClick(term)}
                      className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-pink-400/30 hover:border-pink-400/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/20"
                    >
                      <span className="text-sm text-pink-300 group-hover:text-pink-200">
                        {term}
                      </span>
                      <ArrowRight className="h-3 w-3 text-pink-400 group-hover:text-pink-300 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* AI Footer */}
        <div className="mt-4 pt-4 border-t border-cyan-400/20">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
            <Brain className="h-3 w-3 text-cyan-400" />
            <span>Recomendaciones generadas por IA usando GPT-4o</span>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}