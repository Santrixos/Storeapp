// Utility functions for app icons

export const getAppIcon = (app: { name: string; iconUrl?: string | null; category?: string }) => {
  // If app has iconUrl, return it
  if (app.iconUrl) {
    return app.iconUrl;
  }

  // Generate icon based on app name
  const appName = app.name.toLowerCase();
  
  // Enhanced app icons mapping with specific app names
  const iconMap: { [key: string]: string } = {
    // Social Media Apps
    'facebook': '📘',
    'facebook lite': '📘', 
    'instagram': '📷',
    'whatsapp': '💬',
    'telegram': '✈️',
    'twitter': '🐦',
    'tiktok': '🎵',
    'snapchat': '👻',
    'discord': '🎮',
    'skype': '📹',
    
    // Games
    'pubg': '🔫',
    'minecraft': '⛏️',
    'fortnite': '🌪️',
    'call of duty': '🎖️',
    'candy crush': '🍭',
    'clash of clans': '⚔️',
    'clash royale': '👑',
    'among us': '🚀',
    'free fire': '🔥',
    'mobile legends': '🏆',
    'genshin impact': '⚡',
    'roblox': '🎯',
    'pokemon go': '🐱',
    'subway surfers': '🚇',
    'temple run': '🏃',
    'angry birds': '🐦',
    'plants vs zombies': '🌱',
    'geometry dash': '📐',
    'hill climb racing': '🏔️',
    'shadow fight': '🥋',
    'mortal kombat': '👊',
    'asphalt': '🏎️',
    'need for speed': '🏁',
    'real racing': '🏁',
    'fifa': '⚽',
    'pes': '⚽',
    'nba': '🏀',
    'pool': '🎱',
    'chess': '♟️',
    'ludo': '🎲',
    'monopoly': '🏦',
    'scrabble': '📝',
    'words with friends': '📝',
    'true skate': '🛹',
    'human fall flat': '🤸',
    'fall guys': '🏃',
    'stumble guys': '🏃',
    'sniper 3d': '🎯',
    'garena free fire': '🔥',
    'demolition derby': '🚗',
    
    // Productivity Apps
    'office': '💼',
    'word': '📄',
    'excel': '📊',
    'powerpoint': '📊',
    'gmail': '📧',
    'chrome': '🌐',
    'firefox': '🦊',
    'edge': '🌐',
    'safari': '🧭',
    'google': '🔍',
    'calculator': '🧮',
    'calendar': '📅',
    'notes': '📝',
    'keep': '📝',
    'evernote': '📒',
    'notion': '📋',
    'todoist': '✅',
    'any.do': '✅',
    'wunderlist': '✅',
    'dropbox': '📦',
    'google drive': '💾',
    'onedrive': '💾',
    'mega': '☁️',
    'zoom': '📹',
    'teams': '👥',
    'slack': '💬',
    'adobe': '🎨',
    'photoshop': '🎨',
    'lightroom': '📸',
    'canva': '🎨',
    'picsart': '🎨',
    'vsco': '📸',
    'snapseed': '📸',
    
    // Media & Entertainment
    'youtube': '📺',
    'netflix': '🎬',
    'spotify': '🎵',
    'apple music': '🎵',
    'soundcloud': '🎧',
    'amazon music': '🎵',
    'deezer': '🎵',
    'tidal': '🎵',
    'vlc': '🎬',
    'mx player': '🎬',
    'kodi': '📺',
    'plex': '📺',
    'twitch': '🎮',
    'tinder': '💕',
    'bumble': '💛',
    'badoo': '💕',
    
    // Shopping & Food
    'amazon': '📦',
    'ebay': '🛒',
    'aliexpress': '🛒',
    'wish': '🛍️',
    'shopee': '🛒',
    'lazada': '🛒',
    'mercado libre': '🛒',
    'flipkart': '🛒',
    'uber': '🚗',
    'lyft': '🚗',
    'uber eats': '🍕',
    'doordash': '🍕',
    'grubhub': '🍕',
    'zomato': '🍕',
    'swiggy': '🍕',
    'foodpanda': '🍕',
    
    // Banking & Finance
    'paypal': '💰',
    'venmo': '💰',
    'cashapp': '💰',
    'zelle': '💰',
    'mint': '💰',
    'robinhood': '📈',
    'coinbase': '₿',
    'binance': '₿',
    
    // Travel & Maps
    'google maps': '🗺️',
    'waze': '🗺️',
    'airbnb': '🏠',
    'booking': '🏨',
    'expedia': '✈️',
    'tripadvisor': '✈️',
    'skyscanner': '✈️',
    
    // Health & Fitness
    'fitbit': '💪',
    'nike training': '👟',
    'strava': '🏃',
    'myfitnesspal': '🥗',
    'headspace': '🧘',
    'calm': '🧘',
    'sleep cycle': '😴',
    
    // News & Reading
    'reddit': '🤖',
    'flipboard': '📰',
    'pocket': '📖',
    'kindle': '📚',
    'audible': '🎧',
    
    // Utilities
    'flashlight': '🔦',
    'compass': '🧭',
    'weather': '🌤️',
    'clock': '⏰',
    'timer': '⏲️',
    'stopwatch': '⏱️',
    'battery': '🔋',
    'wifi analyzer': '📶',
    'speedtest': '📊',
    'file manager': '📁',
    'cleaner': '🧹',
    'antivirus': '🛡️',
    'vpn': '🔒',
    'password manager': '🔐'
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