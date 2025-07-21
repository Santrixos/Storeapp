import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "./ImageOptimizer";
import { 
  Smartphone, 
  Gamepad2, 
  MessageCircle, 
  Music, 
  Settings, 
  Download,
  Star,
  Zap,
  Sparkles
} from "lucide-react";

interface AppIconGeneratorProps {
  appName: string;
  category: string;
  size?: "sm" | "md" | "lg" | "xl";
  showGlow?: boolean;
  className?: string;
}

export default function AppIconGenerator({ 
  appName, 
  category, 
  size = "md", 
  showGlow = false,
  className = "" 
}: AppIconGeneratorProps) {
  const [iconColor, setIconColor] = useState("");
  const [bgGradient, setBgGradient] = useState("");

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-10 w-10"
  };

  // Generate dynamic colors based on app name (memoized for performance)
  const colors = useMemo(() => {
    const hash = appName.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const hue = Math.abs(hash) % 360;
    const saturation = 60 + (Math.abs(hash) % 40); // 60-100%
    const lightness = 45 + (Math.abs(hash) % 20);  // 45-65%

    const secondHue = (hue + 60) % 360;
    
    return {
      iconColor: `hsl(${hue}, ${saturation}%, ${lightness + 20}%)`,
      bgGradient: `linear-gradient(135deg, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, hsl(${secondHue}, ${saturation - 10}%, ${lightness - 10}%) 100%)`
    };
  }, [appName]);

  useEffect(() => {
    setIconColor(colors.iconColor);
    setBgGradient(colors.bgGradient);
  }, [colors]);

  // Get icon based on category
  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case 'games':
        return <Gamepad2 className={iconSizes[size]} style={{ color: iconColor }} />;
      case 'social':
        return <MessageCircle className={iconSizes[size]} style={{ color: iconColor }} />;
      case 'media':
      case 'multimedia':
        return <Music className={iconSizes[size]} style={{ color: iconColor }} />;
      case 'tools':
      case 'herramientas':
        return <Settings className={iconSizes[size]} style={{ color: iconColor }} />;
      case 'productivity':
      case 'productividad':
        return <Zap className={iconSizes[size]} style={{ color: iconColor }} />;
      default:
        return <Smartphone className={iconSizes[size]} style={{ color: iconColor }} />;
    }
  };

  // Get app initial or custom symbol
  const getAppSymbol = () => {
    const name = appName.toLowerCase();
    
    // Special cases for popular apps
    if (name.includes('whatsapp')) return '💬';
    if (name.includes('spotify')) return '🎵';
    if (name.includes('instagram')) return '📸';
    if (name.includes('tiktok')) return '🎬';
    if (name.includes('youtube')) return '📺';
    if (name.includes('facebook')) return '👥';
    if (name.includes('netflix')) return '🎭';
    if (name.includes('uber')) return '🚗';
    if (name.includes('zoom')) return '📹';
    if (name.includes('discord')) return '🎮';
    if (name.includes('telegram')) return '✈️';
    if (name.includes('chrome')) return '🌐';
    if (name.includes('firefox')) return '🦊';
    if (name.includes('vsCode') || name.includes('code')) return '💻';
    if (name.includes('photoshop')) return '🎨';
    if (name.includes('minecraft')) return '⛏️';
    if (name.includes('fortnite')) return '🏰';
    if (name.includes('pubg')) return '🔫';
    if (name.includes('candy')) return '🍭';
    if (name.includes('clash')) return '⚔️';
    
    // Category based symbols
    if (category === 'games') {
      const gameSymbols = ['🎮', '🕹️', '🎯', '🎲', '🏆', '⚡'];
      return gameSymbols[Math.abs(appName.length) % gameSymbols.length];
    }
    
    if (category === 'social') {
      const socialSymbols = ['💬', '👥', '💙', '📱', '🌟', '💫'];
      return socialSymbols[Math.abs(appName.length) % socialSymbols.length];
    }
    
    if (category === 'media') {
      const mediaSymbols = ['🎵', '🎬', '📺', '🎪', '🎨', '🎭'];
      return mediaSymbols[Math.abs(appName.length) % mediaSymbols.length];
    }
    
    if (category === 'tools') {
      const toolSymbols = ['🔧', '⚙️', '🛠️', '📊', '📈', '⚡'];
      return toolSymbols[Math.abs(appName.length) % toolSymbols.length];
    }
    
    // Default: first letter of app name
    return appName.charAt(0).toUpperCase();
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow Effect */}
      {showGlow && (
        <div 
          className="absolute inset-0 rounded-xl blur-sm opacity-50"
          style={{ background: bgGradient }}
        />
      )}
      
      {/* Main Icon */}
      <div
        className="relative w-full h-full rounded-xl flex items-center justify-center shadow-lg border border-white/10 overflow-hidden"
        style={{ background: bgGradient }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1 right-1">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
          <div className="absolute bottom-1 left-1">
            <Star className="h-2 w-2 text-white" />
          </div>
        </div>
        
        {/* App Symbol */}
        <div className="relative z-10 flex items-center justify-center">
          {typeof getAppSymbol() === 'string' && getAppSymbol().length === 1 ? (
            <span 
              className="font-bold text-white"
              style={{ 
                fontSize: size === 'sm' ? '12px' : size === 'md' ? '16px' : size === 'lg' ? '20px' : '24px',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {getAppSymbol()}
            </span>
          ) : (
            <span 
              style={{ 
                fontSize: size === 'sm' ? '14px' : size === 'md' ? '18px' : size === 'lg' ? '22px' : '26px',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
              }}
            >
              {getAppSymbol()}
            </span>
          )}
        </div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Corner Badge for Premium/Featured Apps */}
        {appName.toLowerCase().includes('pro') || appName.toLowerCase().includes('premium') && (
          <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
            <Star className="h-2 w-2 text-white" />
          </div>
        )}
      </div>
      
      {/* Download Indicator */}
      <motion.div 
        className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Download className="h-2 w-2 text-white" />
      </motion.div>
    </motion.div>
  );
}

// Utility function for external use
export const generateAppIcon = (appName: string, category: string) => {
  return {
    component: AppIconGenerator,
    props: { appName, category }
  };
};