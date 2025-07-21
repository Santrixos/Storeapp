import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Gamepad, Users, Briefcase, PlayCircle, Wrench, Grid3X3 } from "lucide-react";

interface CategoryNavigationProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "Todas", icon: Grid3X3, color: "from-gray-500 to-gray-600" },
  { id: "games", label: "🎮 Juegos", icon: Gamepad, color: "from-purple-500 to-pink-600" },
  { id: "social", label: "💬 Social", icon: Users, color: "from-blue-500 to-cyan-600" },
  { id: "productivity", label: "📊 Productividad", icon: Briefcase, color: "from-green-500 to-emerald-600" },
  { id: "media", label: "🎵 Multimedia", icon: PlayCircle, color: "from-red-500 to-orange-600" },
  { id: "tools", label: "🔧 Herramientas", icon: Wrench, color: "from-orange-500 to-yellow-600" },
];

export default function CategoryNavigation({ selectedCategory, onCategoryChange }: CategoryNavigationProps) {
  return (
    <section className="py-8 border-b border-white/10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => onCategoryChange(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-gray-800/50 border border-gray-600 text-gray-300 hover:border-cyan-500/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 relative z-10">
                    <Icon className="h-5 w-5" />
                    {category.label}
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
