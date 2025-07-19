import { Button } from "@/components/ui/button";
import { Gamepad, Users, Briefcase, PlayCircle, Wrench, Grid3X3 } from "lucide-react";

interface CategoryNavigationProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "Todas", icon: Grid3X3 },
  { id: "games", label: "Juegos", icon: Gamepad },
  { id: "social", label: "Social", icon: Users },
  { id: "productivity", label: "Productividad", icon: Briefcase },
  { id: "media", label: "Multimedia", icon: PlayCircle },
  { id: "tools", label: "Herramientas", icon: Wrench },
];

export default function CategoryNavigation({ selectedCategory, onCategoryChange }: CategoryNavigationProps) {
  return (
    <section className="py-8 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple'
                    : 'glass-effect hover:bg-white/20 border-white/20'
                }`}
              >
                <Icon className="mr-2 h-5 w-5" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
