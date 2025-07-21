import { type InsertApp } from "@shared/schema";
import fs from "fs";
import path from "path";

interface CatalogItem {
  title: string;
  link: string;
}

interface ProcessedApp {
  name: string;
  versions: Array<{
    version: string;
    downloadUrl: string;
    modInfo?: string;
  }>;
  category: string;
  developer?: string;
  modInfo?: string;
}

export class CatalogProcessor {
  private extractAppInfo(title: string): {
    name: string;
    version: string;
    modInfo: string;
    category: string;
  } {
    // Remove symbols and clean title
    let cleanTitle = title.replace(/ᐅ|️|✔️|✅|⚡/g, '').trim();
    
    // Extract version info
    const versionMatch = cleanTitle.match(/(\d+\.[\d\.]+)/);
    const version = versionMatch ? versionMatch[1] : "1.0.0";
    
    // Extract mod info
    let modInfo = "";
    if (cleanTitle.includes("Mod APK")) {
      const modMatch = cleanTitle.match(/\((.*?)\)/);
      modInfo = modMatch ? modMatch[1] : "Modificado";
    }
    
    // Extract app name (everything before "Mod APK" or version info)
    let name = cleanTitle.split(/Mod APK|APK|\d+\.\d+/)[0].trim();
    name = name.replace(/\s+/g, ' ').trim();
    
    // Determine category based on app name
    const category = this.determineCategory(name);
    
    return { name, version, modInfo, category };
  }

  private determineCategory(appName: string): string {
    const name = appName.toLowerCase();
    
    // Racing/Driving games
    if (name.includes('drift') || name.includes('racing') || name.includes('car') || 
        name.includes('driving') || name.includes('motocross') || name.includes('demolition')) {
      return 'games';
    }
    
    // Action/Adventure games
    if (name.includes('hero') || name.includes('sniper') || name.includes('war') || 
        name.includes('battle') || name.includes('zombie') || name.includes('superhero')) {
      return 'games';
    }
    
    // Strategy/Simulation games
    if (name.includes('tycoon') || name.includes('miner') || name.includes('simulator') || 
        name.includes('craft') || name.includes('factory')) {
      return 'games';
    }
    
    // Social apps
    if (name.includes('whatsapp') || name.includes('instagram') || name.includes('telegram') || 
        name.includes('discord') || name.includes('messenger')) {
      return 'social';
    }
    
    // Media apps
    if (name.includes('spotify') || name.includes('youtube') || name.includes('netflix') || 
        name.includes('music') || name.includes('video')) {
      return 'media';
    }
    
    // Productivity apps
    if (name.includes('office') || name.includes('pdf') || name.includes('document') || 
        name.includes('note')) {
      return 'productivity';
    }
    
    // Tools
    if (name.includes('cleaner') || name.includes('manager') || name.includes('vpn') || 
        name.includes('antivirus')) {
      return 'tools';
    }
    
    // Default to games for most APKs in this catalog
    return 'games';
  }

  private generateDeveloper(appName: string): string {
    const name = appName.toLowerCase();
    
    // Known developers
    if (name.includes('whatsapp')) return 'Meta';
    if (name.includes('instagram')) return 'Meta';
    if (name.includes('spotify')) return 'Spotify AB';
    if (name.includes('minecraft') || name.includes('mc ')) return 'Mojang Studios';
    if (name.includes('fortnite')) return 'Epic Games';
    if (name.includes('pubg')) return 'PUBG Corporation';
    if (name.includes('free fire')) return 'Garena';
    if (name.includes('tiktok')) return 'ByteDance';
    if (name.includes('youtube')) return 'Google LLC';
    if (name.includes('netflix')) return 'Netflix Inc.';
    
    // Generate creative developer names for games
    const gameDevs = [
      'Digital Storm Games', 'Apex Interactive', 'Fusion Studios', 'Thunder Games',
      'Elite Gaming Co.', 'Pixel Forge', 'Infinity Labs', 'Storm Entertainment',
      'Quantum Studios', 'Nexus Games', 'Cyber Interactive', 'Phoenix Games'
    ];
    
    return gameDevs[Math.abs(this.hashCode(appName)) % gameDevs.length];
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }

  private generateDescription(appName: string, category: string, modInfo: string): string {
    const base = `${appName} es una aplicación ${category === 'games' ? 'de juego' : 'de ' + category} 
    ${modInfo ? 'modificada con ' + modInfo.toLowerCase() : 'premium'} que ofrece una experiencia única y emocionante.`;
    
    const features = [];
    if (modInfo.includes('infinito') || modInfo.includes('unlimited')) {
      features.push('recursos ilimitados');
    }
    if (modInfo.includes('premium') || modInfo.includes('pro')) {
      features.push('funciones premium desbloqueadas');
    }
    if (modInfo.includes('mod') || modInfo.includes('modificado')) {
      features.push('mejoras exclusivas');
    }
    
    return base + (features.length > 0 ? ` Incluye ${features.join(', ')}.` : '');
  }

  private generateSize(): string {
    const sizes = ['25MB', '35MB', '45MB', '55MB', '68MB', '75MB', '89MB', '125MB', '156MB', '245MB'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

  private generateRating(): number {
    // Generate rating between 35-50 (3.5-5.0 stars)
    return Math.floor(Math.random() * 16) + 35;
  }

  private generateDownloads(): string {
    const downloads = ['1M+', '5M+', '10M+', '25M+', '50M+', '100M+'];
    return downloads[Math.floor(Math.random() * downloads.length)];
  }

  private generateFeatures(appName: string, modInfo: string): string[] {
    const baseFeatures = ['Interfaz optimizada', 'Rendimiento mejorado', 'Compatibilidad amplia'];
    
    if (modInfo.includes('infinito') || modInfo.includes('unlimited')) {
      baseFeatures.push('Recursos ilimitados');
    }
    if (modInfo.includes('premium')) {
      baseFeatures.push('Funciones premium');
    }
    if (modInfo.includes('sin anuncios') || modInfo.includes('no ads')) {
      baseFeatures.push('Sin publicidad');
    }
    if (modInfo.includes('desbloqueado')) {
      baseFeatures.push('Todo desbloqueado');
    }
    
    // Add app-specific features
    const name = appName.toLowerCase();
    if (name.includes('game') || name.includes('juego')) {
      baseFeatures.push('Gráficos HD', 'Controles intuitivos');
    }
    if (name.includes('music') || name.includes('spotify')) {
      baseFeatures.push('Calidad superior', 'Modo offline');
    }
    if (name.includes('social') || name.includes('chat')) {
      baseFeatures.push('Privacidad mejorada', 'Funciones extra');
    }
    
    return baseFeatures.slice(0, 5); // Limit to 5 features
  }

  public async processCatalog(catalogPath: string): Promise<InsertApp[]> {
    const catalogData: CatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
    
    // Group apps by name to handle multiple versions
    const appGroups = new Map<string, ProcessedApp>();
    
    for (const item of catalogData) {
      const { name, version, modInfo, category } = this.extractAppInfo(item.title);
      
      if (!appGroups.has(name)) {
        appGroups.set(name, {
          name,
          versions: [],
          category,
          developer: this.generateDeveloper(name),
          modInfo
        });
      }
      
      const app = appGroups.get(name)!;
      app.versions.push({
        version,
        downloadUrl: item.link,
        modInfo
      });
    }

    // Convert to InsertApp format
    const apps: InsertApp[] = [];
    
    for (const [_, appGroup] of Array.from(appGroups.entries())) {
      // Sort versions and take the latest as primary
      appGroup.versions.sort((a: any, b: any) => b.version.localeCompare(a.version));
      const latestVersion = appGroup.versions[0];
      
      const app: InsertApp = {
        name: appGroup.name,
        developer: appGroup.developer || 'Desarrollador Independiente',
        description: this.generateDescription(appGroup.name, appGroup.category, latestVersion.modInfo || ''),
        category: appGroup.category,
        downloadUrl: latestVersion.downloadUrl,
        iconUrl: null, // Will be generated by AI if available
        rating: this.generateRating(),
        downloads: this.generateDownloads(),
        size: this.generateSize(),
        version: latestVersion.version,
        requirements: 'Android 5.0+',
        languages: 'Español, Inglés',
        features: this.generateFeatures(appGroup.name, latestVersion.modInfo || ''),
        isFeatured: Math.random() < 0.15 // 15% chance of being featured
      };
      
      apps.push(app);
      
      // Add additional versions as separate entries if there are multiple
      if (appGroup.versions.length > 1) {
        for (let i = 1; i < Math.min(appGroup.versions.length, 3); i++) {
          const version = appGroup.versions[i];
          const versionedApp: InsertApp = {
            ...app,
            name: `${appGroup.name} v${version.version}`,
            version: version.version,
            downloadUrl: version.downloadUrl,
            isFeatured: false
          };
          apps.push(versionedApp);
        }
      }
    }
    
    return apps;
  }
}