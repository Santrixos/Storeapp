import { users, apps, type User, type InsertUser, type App, type InsertApp } from "@shared/schema";
import { CatalogProcessor } from "./catalogProcessor";
import path from "path";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllApps(): Promise<App[]>;
  getAppById(id: number): Promise<App | undefined>;
  getAppsByCategory(category: string): Promise<App[]>;
  getFeaturedApps(): Promise<App[]>;
  searchApps(query: string): Promise<App[]>;
  searchAppsAdvanced(query: string, category?: string, sortBy?: string): Promise<App[]>;
  getAppVersions(appName: string): Promise<App[]>;
  createApp(app: InsertApp): Promise<App>;
  updateApp(id: number, app: Partial<InsertApp>): Promise<App | undefined>;
  getTrendingApps(): Promise<App[]>;
  getAppsByDeveloper(developer: string): Promise<App[]>;
  getRandomApps(count: number): Promise<App[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private apps: Map<number, App>;
  private currentUserId: number;
  private currentAppId: number;

  constructor() {
    this.users = new Map();
    this.apps = new Map();
    this.currentUserId = 1;
    this.currentAppId = 1;

    // Initialize with catalog data
    this.initializeApps();
  }

  private async initializeApps() {
    try {
      // Process the catalog file
      const catalogPath = path.join(process.cwd(), 'catalogo_juegos-2_1753114960857.json');
      const processor = new CatalogProcessor();
      const catalogApps = await processor.processCatalog(catalogPath);
      
      // Add catalog apps
      catalogApps.forEach(app => {
        const appWithId: App = {
          id: this.currentAppId++,
          ...app,
          iconUrl: app.iconUrl || null,
          rating: app.rating || 0,
          downloads: app.downloads || "0",
          requirements: app.requirements || "Android 5.0+",
          languages: app.languages || "Español, Inglés",
          features: app.features || [],
          isFeatured: app.isFeatured || false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this.apps.set(appWithId.id, appWithId);
      });

      console.log(`Loaded ${catalogApps.length} apps from catalog`);
    } catch (error) {
      console.warn('Could not load catalog, using fallback data:', error);
      this.initializeFallbackApps();
    }
  }

  private initializeFallbackApps() {
    const sampleApps: InsertApp[] = [
      {
        name: "WhatsApp Plus",
        developer: "Meta",
        description: "Versión modificada de WhatsApp con funciones adicionales y personalización avanzada para una mejor experiencia de mensajería.",
        category: "social",
        downloadUrl: "https://mediafire.com/whatsapp-plus",
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
        rating: 45,
        downloads: "10M+",
        size: "45MB",
        version: "2.1.4",
        requirements: "Android 5.0+",
        languages: "Español, Inglés, Portugués",
        features: ["Sin anuncios", "Temas personalizados", "Mayor privacidad", "Funciones premium"],
        isFeatured: true,
      },
      {
        name: "Spotify Premium",
        developer: "Spotify AB",
        description: "Disfruta de música sin límites con todas las funciones premium desbloqueadas, sin anuncios y con calidad superior.",
        category: "media",
        downloadUrl: "https://mediafire.com/spotify-premium",
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
        rating: 48,
        downloads: "50M+",
        size: "68MB",
        version: "8.7.12",
        requirements: "Android 5.0+",
        languages: "Múltiples idiomas",
        features: ["Sin anuncios", "Calidad superior", "Descargas ilimitadas", "Modo offline"],
        isFeatured: true,
      },
      {
        name: "Instagram Pro",
        developer: "Meta",
        description: "Versión mejorada de Instagram con funciones adicionales de privacidad, descarga de contenido y personalización.",
        category: "social",
        downloadUrl: "https://mediafire.com/instagram-pro",
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
        rating: 42,
        downloads: "25M+",
        size: "52MB",
        version: "3.2.1",
        requirements: "Android 6.0+",
        languages: "Español, Inglés",
        features: ["Descarga de fotos/videos", "Sin anuncios", "Zoom de fotos", "Privacidad mejorada"],
        isFeatured: true,
      },
      {
        name: "TikTok Pro",
        developer: "ByteDance",
        description: "Versión premium de TikTok sin anuncios y con funciones adicionales para creadores de contenido.",
        category: "media",
        downloadUrl: "https://mediafire.com/tiktok-pro",
        iconUrl: "https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png",
        rating: 46,
        downloads: "100M+",
        size: "85MB",
        version: "4.1.2",
        requirements: "Android 5.0+",
        languages: "Múltiples idiomas",
        features: ["Sin anuncios", "Descarga de videos", "Herramientas de edición", "Sin marca de agua"],
        isFeatured: false,
      },
      {
        name: "YouTube Vanced",
        developer: "Team Vanced",
        description: "Cliente modificado de YouTube con bloqueo de anuncios, reproducción en segundo plano y muchas más funciones.",
        category: "media",
        downloadUrl: "https://mediafire.com/youtube-vanced",
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
        rating: 47,
        downloads: "75M+",
        size: "68MB",
        version: "17.03.38",
        requirements: "Android 5.0+",
        languages: "Múltiples idiomas",
        features: ["Sin anuncios", "Reproducción de fondo", "Picture-in-Picture", "Controles gestuales"],
        isFeatured: false,
      },
      {
        name: "Termux",
        developer: "Fredrik Fornwall",
        description: "Terminal de Linux completo para Android con acceso a herramientas de línea de comandos y programación.",
        category: "tools",
        downloadUrl: "https://mediafire.com/termux",
        iconUrl: "https://f-droid.org/repo/com.termux/en-US/icon_aQhms5TgSfC_5iSdLs4WgBOk.png",
        rating: 43,
        downloads: "5M+",
        size: "15MB",
        version: "0.118.0",
        requirements: "Android 7.0+",
        languages: "Inglés",
        features: ["Terminal completo", "Paquetes Linux", "Desarrollo móvil", "Scripts automatizados"],
        isFeatured: false,
      }
    ];

    sampleApps.forEach(app => this.createApp(app));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllApps(): Promise<App[]> {
    return Array.from(this.apps.values()).sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  async getAppById(id: number): Promise<App | undefined> {
    return this.apps.get(id);
  }

  async getAppsByCategory(category: string): Promise<App[]> {
    if (category === 'all') {
      return this.getAllApps();
    }
    return Array.from(this.apps.values())
      .filter(app => app.category === category)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  async getFeaturedApps(): Promise<App[]> {
    return Array.from(this.apps.values())
      .filter(app => app.isFeatured)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  async searchApps(query: string): Promise<App[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.apps.values())
      .filter(app => 
        app.name.toLowerCase().includes(lowercaseQuery) ||
        app.developer.toLowerCase().includes(lowercaseQuery) ||
        app.description.toLowerCase().includes(lowercaseQuery) ||
        app.category.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  async createApp(insertApp: InsertApp): Promise<App> {
    const id = this.currentAppId++;
    const now = new Date();
    const app: App = { 
      ...insertApp,
      iconUrl: insertApp.iconUrl || null,
      rating: insertApp.rating || 0,
      downloads: insertApp.downloads || "0",
      requirements: insertApp.requirements || "Android 5.0+",
      languages: insertApp.languages || "Español, Inglés",
      features: insertApp.features || [],
      isFeatured: insertApp.isFeatured || false,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.apps.set(id, app);
    return app;
  }

  async updateApp(id: number, updateApp: Partial<InsertApp>): Promise<App | undefined> {
    const existingApp = this.apps.get(id);
    if (!existingApp) return undefined;

    const updatedApp: App = {
      ...existingApp,
      ...updateApp,
      updatedAt: new Date()
    };
    this.apps.set(id, updatedApp);
    return updatedApp;
  }

  async searchAppsAdvanced(query: string, category?: string, sortBy?: string): Promise<App[]> {
    const lowercaseQuery = query.toLowerCase();
    let results = Array.from(this.apps.values())
      .filter(app => {
        const matchesQuery = 
          app.name.toLowerCase().includes(lowercaseQuery) ||
          app.developer.toLowerCase().includes(lowercaseQuery) ||
          app.description.toLowerCase().includes(lowercaseQuery) ||
          (app.features && app.features.some(feature => feature.toLowerCase().includes(lowercaseQuery)));
        
        const matchesCategory = !category || category === 'all' || app.category === category;
        
        return matchesQuery && matchesCategory;
      });

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'downloads':
        results.sort((a, b) => this.parseDownloads(b.downloads || "0") - this.parseDownloads(a.downloads || "0"));
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        results.sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0));
        break;
      default:
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return results;
  }

  async getAppVersions(appName: string): Promise<App[]> {
    const baseAppName = appName.replace(/\sv\d+\.\d+\.\d+/g, '');
    return Array.from(this.apps.values())
      .filter(app => app.name.includes(baseAppName))
      .sort((a, b) => b.version.localeCompare(a.version));
  }

  async getTrendingApps(): Promise<App[]> {
    // Get apps with high downloads and recent activity
    const apps = Array.from(this.apps.values());
    if (apps.length === 0) return [];
    
    return apps
      .filter(app => app.downloads && app.downloads !== "0")
      .sort((a, b) => {
        const aDownloads = this.parseDownloads(a.downloads || "0");
        const bDownloads = this.parseDownloads(b.downloads || "0");
        const aRating = a.rating || 0;
        const bRating = b.rating || 0;
        // Combine downloads and rating for trending score
        const aScore = aDownloads * 0.7 + aRating * 1000;
        const bScore = bDownloads * 0.7 + bRating * 1000;
        return bScore - aScore;
      })
      .slice(0, 8);
  }

  async getAppsByDeveloper(developer: string): Promise<App[]> {
    return Array.from(this.apps.values())
      .filter(app => app.developer.toLowerCase().includes(developer.toLowerCase()))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  async getRandomApps(count: number): Promise<App[]> {
    const allApps = Array.from(this.apps.values());
    const shuffled = allApps.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private parseDownloads(downloads: string): number {
    const num = parseInt(downloads.replace(/\D/g, ''));
    if (downloads.includes('M')) return num * 1000000;
    if (downloads.includes('K')) return num * 1000;
    return num;
  }
}

export const storage = new MemStorage();
