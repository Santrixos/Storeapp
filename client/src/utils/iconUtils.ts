// Utility functions for app icons

export const getAppIcon = (app: { name: string; iconUrl?: string | null; category?: string }) => {
  // If app has iconUrl, return it
  if (app.iconUrl) {
    return app.iconUrl;
  }

  // Generate icon based on app name
  const appName = app.name.toLowerCase();
  
  // Popular app icons mapping
  const iconMap: { [key: string]: string } = {
    // Social Media
    'facebook': 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    'instagram': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
    'whatsapp': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    'telegram': 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
    'twitter': 'https://upload.wikimedia.org/wikipedia/commons/6/60/Twitter_Logo_as_of_2021.svg',
    'tiktok': 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg',
    'snapchat': 'https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg',
    
    // Games
    'pubg': 'https://cdn.iconscout.com/icon/free/png-256/pubg-3629282-3032399.png',
    'minecraft': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Minecraft-creeper-face.svg',
    'fortnite': 'https://cdn.iconscout.com/icon/free/png-256/fortnite-2296135-1912024.png',
    'call of duty': 'https://cdn.iconscout.com/icon/free/png-256/call-of-duty-3629283-3032400.png',
    'candy crush': 'https://cdn.iconscout.com/icon/free/png-256/candy-crush-3629284-3032401.png',
    
    // Productivity
    'office': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg',
    'word': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg',
    'excel': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg',
    'powerpoint': 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Microsoft_Office_PowerPoint_%282019%E2%80%93present%29.svg',
    'gmail': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
    'chrome': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg',
    
    // Media
    'youtube': 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
    'netflix': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    'spotify': 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    'vlc': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg',
    'adobe': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg',
    
    // Shopping
    'amazon': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'ebay': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg',
    'aliexpress': 'https://cdn.iconscout.com/icon/free/png-256/aliexpress-3629285-3032402.png',
    
    // Banking
    'paypal': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    'venmo': 'https://cdn.iconscout.com/icon/free/png-256/venmo-3629286-3032403.png',
  };

  // Check for direct matches
  for (const [key, icon] of Object.entries(iconMap)) {
    if (appName.includes(key)) {
      return icon;
    }
  }

  // Category-based fallback icons
  const categoryIcons: { [key: string]: string } = {
    'games': '🎮',
    'social': '💬',
    'productivity': '💼',
    'media': '🎬',
    'tools': '🔧',
    'shopping': '🛒',
    'finance': '💰',
    'education': '📚',
    'health': '🏥',
    'travel': '✈️',
    'food': '🍕',
    'lifestyle': '🌟',
    'business': '📊',
    'entertainment': '🎭',
    'communication': '📱',
    'photography': '📸',
    'news': '📰',
    'weather': '🌤️',
    'sports': '⚽',
    'music': '🎵'
  };

  if (app.category && categoryIcons[app.category.toLowerCase()]) {
    return categoryIcons[app.category.toLowerCase()];
  }

  // Generate a colorful gradient icon based on app name
  return generateGradientIcon(app.name);
};

export const generateGradientIcon = (appName: string) => {
  const colors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-blue-600', 
    'from-purple-500 to-pink-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-purple-600',
    'from-yellow-500 to-orange-600',
    'from-emerald-500 to-cyan-600',
    'from-red-500 to-pink-600'
  ];
  
  const colorIndex = appName.length % colors.length;
  return colors[colorIndex];
};

export const getAppEmoji = (appName: string, category?: string) => {
  const name = appName.toLowerCase();
  
  // Specific app emojis
  const emojiMap: { [key: string]: string } = {
    'facebook': '📘',
    'instagram': '📷',
    'whatsapp': '💬',
    'telegram': '✈️',
    'youtube': '📺',
    'netflix': '🎬',
    'spotify': '🎵',
    'gmail': '📧',
    'chrome': '🌐',
    'maps': '🗺️',
    'uber': '🚗',
    'pizza': '🍕',
    'camera': '📸',
    'calculator': '🧮',
    'calendar': '📅',
    'weather': '🌤️',
    'news': '📰',
    'banking': '🏦',
    'shopping': '🛒',
    'fitness': '💪',
    'health': '🏥',
    'travel': '✈️',
    'education': '📚',
    'music': '🎵',
    'video': '🎬',
    'photo': '📸',
    'game': '🎮',
    'chat': '💬',
    'call': '📞',
    'email': '📧',
    'browser': '🌐',
    'office': '💼',
    'document': '📄'
  };

  // Check for specific app emojis
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (name.includes(key)) {
      return emoji;
    }
  }

  // Category-based emojis
  const categoryEmojis: { [key: string]: string } = {
    'games': '🎮',
    'social': '💬',
    'productivity': '💼',
    'media': '🎬',
    'tools': '🔧',
    'shopping': '🛒',
    'finance': '💰',
    'education': '📚',
    'health': '🏥',
    'travel': '✈️',
    'food': '🍕',
    'lifestyle': '🌟',
    'entertainment': '🎭',
    'communication': '📱',
    'photography': '📸',
    'news': '📰',
    'weather': '🌤️',
    'sports': '⚽',
    'music': '🎵'
  };

  if (category && categoryEmojis[category.toLowerCase()]) {
    return categoryEmojis[category.toLowerCase()];
  }

  return '📱'; // Default mobile app emoji
};