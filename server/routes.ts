import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppSchema } from "@shared/schema";
import { z } from "zod";
import { generateAppRecommendations, generateAppDescription, detectAppIcon, generateNexusBotResponse } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all apps
  app.get("/api/apps", async (req, res) => {
    try {
      const apps = await storage.getAllApps();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch apps" });
    }
  });

  // Get apps by category
  app.get("/api/apps/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const apps = await storage.getAppsByCategory(category);
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch apps by category" });
    }
  });

  // Get featured apps
  app.get("/api/apps/featured", async (req, res) => {
    try {
      const apps = await storage.getFeaturedApps();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured apps" });
    }
  });

  // Search apps
  app.get("/api/apps/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const apps = await storage.searchApps(query);
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to search apps" });
    }
  });

  // Get app by ID
  app.get("/api/apps/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid app ID" });
      }
      const app = await storage.getAppById(id);
      if (!app) {
        return res.status(404).json({ message: "App not found" });
      }
      res.json(app);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch app" });
    }
  });

  // Create new app
  app.post("/api/apps", async (req, res) => {
    try {
      const validatedData = insertAppSchema.parse(req.body);
      const app = await storage.createApp(validatedData);
      res.status(201).json(app);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid app data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create app" });
    }
  });

  // AI-powered app recommendations
  app.post("/api/ai/recommendations", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ message: "Query is required" });
      }
      
      const recommendations = await generateAppRecommendations(query);
      res.json(recommendations);
    } catch (error) {
      console.error("AI recommendations error:", error);
      res.status(500).json({ message: "Failed to generate AI recommendations" });
    }
  });

  // Generate app description with AI
  app.post("/api/ai/description", async (req, res) => {
    try {
      const { appName, category } = req.body;
      if (!appName || !category) {
        return res.status(400).json({ message: "App name and category are required" });
      }
      
      const description = await generateAppDescription(appName, category);
      res.json(description);
    } catch (error) {
      console.error("AI description error:", error);
      res.status(500).json({ message: "Failed to generate AI description" });
    }
  });

  // Generate app icon with AI
  app.post("/api/ai/icon", async (req, res) => {
    try {
      const { appName } = req.body;
      if (!appName) {
        return res.status(400).json({ message: "App name is required" });
      }
      
      const iconUrl = await detectAppIcon(appName);
      res.json({ iconUrl });
    } catch (error) {
      console.error("AI icon generation error:", error);
      res.status(500).json({ message: "Failed to generate AI icon" });
    }
  });

  // Advanced search with filters and sorting
  app.get("/api/apps/search/advanced", async (req, res) => {
    try {
      const query = req.query.q as string;
      const category = req.query.category as string;
      const sortBy = req.query.sortBy as string;
      
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const apps = await storage.searchAppsAdvanced(query, category, sortBy);
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to perform advanced search" });
    }
  });

  // Get app versions
  app.get("/api/apps/versions/:appName", async (req, res) => {
    try {
      const { appName } = req.params;
      const versions = await storage.getAppVersions(decodeURIComponent(appName));
      res.json(versions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch app versions" });
    }
  });

  // Get trending apps
  app.get("/api/apps/trending", async (req, res) => {
    try {
      const apps = await storage.getTrendingApps();
      res.json(apps);
    } catch (error) {
      console.error("Trending apps error:", error);
      // Fallback to regular apps if trending fails
      const fallbackApps = await storage.getAllApps();
      res.json(fallbackApps.slice(0, 10));
    }
  });

  // Get apps by developer
  app.get("/api/apps/developer/:developer", async (req, res) => {
    try {
      const { developer } = req.params;
      const apps = await storage.getAppsByDeveloper(decodeURIComponent(developer));
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch apps by developer" });
    }
  });

  // Get random apps
  app.get("/api/apps/random", async (req, res) => {
    try {
      const count = parseInt(req.query.count as string) || 6;
      const allApps = await storage.getAllApps();
      
      // Shuffle and get random apps
      const shuffled = allApps.sort(() => 0.5 - Math.random());
      const randomApps = shuffled.slice(0, count);
      
      res.json(randomApps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch random apps" });
    }
  });

  // NexusBot AI Chat endpoint
  app.post("/api/nexusbot/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }
      
      const response = await generateNexusBotResponse(message);
      res.json(response);
    } catch (error) {
      console.error("NexusBot chat error:", error);
      res.status(500).json({ message: "Failed to generate chat response" });
    }
  });

  // Auto-detect app icon (legacy)
  app.get("/api/apps/icon/:packageName", async (req, res) => {
    try {
      const { packageName } = req.params;
      
      // Try multiple icon sources
      const iconSources = [
        `https://play-lh.googleusercontent.com/apps/${packageName}/icon`,
        `https://lh3.googleusercontent.com/apps/${packageName}/icon`,
        `https://api.iconscout.com/v4/unicons/line/mobile-android-alt.svg`, // fallback
      ];

      // For now, return the first available source
      // In a real implementation, you would check if each URL is accessible
      for (const iconUrl of iconSources) {
        try {
          const response = await fetch(iconUrl, { method: 'HEAD' });
          if (response.ok) {
            return res.json({ iconUrl });
          }
        } catch {
          continue;
        }
      }

      // Return default icon if none found
      res.json({ iconUrl: iconSources[2] });
    } catch (error) {
      res.status(500).json({ message: "Failed to detect app icon" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
