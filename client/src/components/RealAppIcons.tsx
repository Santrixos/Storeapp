import { useState, useEffect } from "react";

interface RealAppIconProps {
  appName: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

// Real app icon mappings based on popular apps
const APP_ICONS: Record<string, string> = {
  // Social Media
  "whatsapp": "https://cdn.iconscout.com/icon/free/png-512/whatsapp-43-476487.png",
  "whatsapp plus": "https://cdn.iconscout.com/icon/free/png-512/whatsapp-43-476487.png",
  "instagram": "https://cdn.iconscout.com/icon/free/png-512/instagram-216-721958.png",
  "facebook": "https://cdn.iconscout.com/icon/free/png-512/facebook-262-721949.png",
  "telegram": "https://cdn.iconscout.com/icon/free/png-512/telegram-3518907-2944918.png",
  "tiktok": "https://cdn.iconscout.com/icon/free/png-512/tiktok-3384873-2822906.png",
  "twitter": "https://cdn.iconscout.com/icon/free/png-512/twitter-262-721979.png",
  "snapchat": "https://cdn.iconscout.com/icon/free/png-512/snapchat-263-721988.png",

  // Music & Media
  "spotify": "https://cdn.iconscout.com/icon/free/png-512/spotify-11-432546.png",
  "youtube": "https://cdn.iconscout.com/icon/free/png-512/youtube-262-721990.png",
  "youtube music": "https://cdn.iconscout.com/icon/free/png-512/youtube-music-3384877-2822910.png",
  "netflix": "https://cdn.iconscout.com/icon/free/png-512/netflix-282624.png",
  "amazon prime": "https://cdn.iconscout.com/icon/free/png-512/amazon-prime-video-3384870-2822903.png",
  "disney plus": "https://cdn.iconscout.com/icon/free/png-512/disney-plus-3384872-2822905.png",

  // Games
  "free fire": "https://cdn.iconscout.com/icon/free/png-512/garena-free-fire-5-569554.png",
  "pubg": "https://cdn.iconscout.com/icon/free/png-512/pubg-4-569557.png",
  "pubg mobile": "https://cdn.iconscout.com/icon/free/png-512/pubg-4-569557.png",
  "call of duty": "https://cdn.iconscout.com/icon/free/png-512/call-of-duty-5-569542.png",
  "minecraft": "https://cdn.iconscout.com/icon/free/png-512/minecraft-2-569507.png",
  "clash of clans": "https://cdn.iconscout.com/icon/free/png-512/clash-of-clans-569484.png",
  "clash royale": "https://cdn.iconscout.com/icon/free/png-512/clash-royale-569486.png",
  "among us": "https://cdn.iconscout.com/icon/free/png-512/among-us-5728871-4758854.png",
  "fortnite": "https://cdn.iconscout.com/icon/free/png-512/fortnite-16-569493.png",

  // Productivity
  "microsoft office": "https://cdn.iconscout.com/icon/free/png-512/microsoft-office-2-569526.png",
  "google drive": "https://cdn.iconscout.com/icon/free/png-512/google-drive-3384875-2822908.png",
  "dropbox": "https://cdn.iconscout.com/icon/free/png-512/dropbox-3-569489.png",
  "zoom": "https://cdn.iconscout.com/icon/free/png-512/zoom-4-569576.png",
  "adobe photoshop": "https://cdn.iconscout.com/icon/free/png-512/adobe-photoshop-3384860-2822893.png",

  // Popular Apps
  "whatsapp business": "https://cdn.iconscout.com/icon/free/png-512/whatsapp-business-3384879-2822912.png",
  "uber": "https://cdn.iconscout.com/icon/free/png-512/uber-3384878-2822911.png",
  "paypal": "https://cdn.iconscout.com/icon/free/png-512/paypal-3-569536.png",
  "chrome": "https://cdn.iconscout.com/icon/free/png-512/google-chrome-3384870-2822903.png",
  "firefox": "https://cdn.iconscout.com/icon/free/png-512/firefox-3384861-2822894.png"
};

// Generate SVG icons for apps that don't have images
const generateSVGIcon = (appName: string, className: string) => {
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-yellow-500 to-orange-500'
  ];
  
  const colorIndex = appName.charCodeAt(0) % colors.length;
  const gradient = colors[colorIndex];
  const letter = appName.charAt(0).toUpperCase();
  
  return (
    <div className={`${className} bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold rounded-xl shadow-lg`}>
      <span className="text-lg">{letter}</span>
    </div>
  );
};

export function RealAppIcon({ appName, className = "w-12 h-12", fallbackIcon }: RealAppIconProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const normalizedName = appName.toLowerCase().trim();
  const iconUrl = APP_ICONS[normalizedName];

  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [appName]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  // If we have a real icon URL and no error, show the image
  if (iconUrl && !imageError) {
    return (
      <div className="relative">
        {isLoading && (
          <div className={`${className} bg-gray-800 animate-pulse rounded-xl`} />
        )}
        <img
          src={iconUrl}
          alt={`${appName} icon`}
          className={`${className} rounded-xl shadow-lg transition-opacity duration-300 ${isLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
    );
  }

  // If we have a fallback icon component, use it
  if (fallbackIcon) {
    return <div className={className}>{fallbackIcon}</div>;
  }

  // Generate a beautiful gradient icon as last resort
  return generateSVGIcon(appName, className);
}

export function AppIconWithFallback({ app, className = "w-12 h-12" }: { app: { name: string; category: string }, className?: string }) {
  return (
    <RealAppIcon
      appName={app.name}
      className={className}
      fallbackIcon={
        <div className={`${className} bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold rounded-xl shadow-lg`}>
          <span className="text-lg">{app.name.charAt(0).toUpperCase()}</span>
        </div>
      }
    />
  );
}