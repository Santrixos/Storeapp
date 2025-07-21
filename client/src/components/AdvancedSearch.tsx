import { useState } from "react";
import { Search, Filter, SortAsc, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface AdvancedSearchProps {
  onSearch: (query: string, category?: string, sortBy?: string) => void;
  onClose: () => void;
}

export function AdvancedSearch({ onSearch, onClose }: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  const categories = [
    { value: "all", label: "Todas las categorías" },
    { value: "games", label: "Juegos" },
    { value: "social", label: "Social" },
    { value: "media", label: "Multimedia" },
    { value: "productivity", label: "Productividad" },
    { value: "tools", label: "Herramientas" }
  ];

  const sortOptions = [
    { value: "rating", label: "Mejor valoradas" },
    { value: "downloads", label: "Más descargadas" },
    { value: "newest", label: "Más recientes" },
    { value: "name", label: "Nombre A-Z" }
  ];

  const filterOptions = [
    { value: "featured", label: "Destacadas" },
    { value: "free", label: "Gratis" },
    { value: "mod", label: "Modificadas" },
    { value: "premium", label: "Premium" }
  ];

  const handleSearch = () => {
    onSearch(query, category || undefined, sortBy || undefined);
  };

  const toggleFilter = (filter: string) => {
    setFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setSortBy("");
    setFilters([]);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-black/90 border-cyan-500/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-cyan-400">Búsqueda Avanzada</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar aplicaciones, desarrolladores, características..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Categoría</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-600">
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value} className="text-white hover:bg-gray-800">
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Ordenar por</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                  <SelectValue placeholder="Seleccionar orden" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-600">
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-800">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Tags */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Filtros adicionales</label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(filter => (
                <Badge
                  key={filter.value}
                  variant={filters.includes(filter.value) ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    filters.includes(filter.value)
                      ? "bg-cyan-500 text-black hover:bg-cyan-400"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => toggleFilter(filter.value)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Limpiar filtros
            </Button>
            
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}