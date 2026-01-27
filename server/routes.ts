import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCaseSchema,
  updateCaseSchema,
  insertContactSchema, 
  insertNewsSchema, 
  insertServiceSchema, 
  insertSubscriptionSchema,
  insertTeamMemberSchema
} from "@shared/schema";
import { z } from "zod";
import { 
  authenticate, 
  requireAdmin, 
  loginHandler, 
  logoutHandler, 
  getCurrentUserHandler,
  initializeAuth
} from "./auth";
import { sendDiscordNotification } from "./discord";
import { sendContactNotificationEmail } from "./email";
import { generateSitemap } from "./sitemap";
import cookieParser from "cookie-parser";
import { UploadedFile } from "express-fileupload";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize auth system
  await initializeAuth();
  
  // Middleware
  app.use(cookieParser());
  
  // API Routes - all prefixed with /api
  
  // Authentication Routes
  app.post("/api/auth/login", loginHandler);
  app.post("/api/auth/logout", logoutHandler);
  app.get("/api/auth/me", authenticate, getCurrentUserHandler);
  
  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  
  // Get service by slug
  app.get("/api/services/:slug", async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });
  
  // Get all cases
  app.get("/api/cases", async (req, res) => {
    try {
      const cases = await storage.getCases();
      res.json(cases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cases" });
    }
  });
  
  // Search cases
  app.get("/api/cases/search", async (req, res) => {
    try {
      const query = req.query.q as string || "";
      const category = req.query.category as string;
      const year = req.query.year as string;
      
      const cases = await storage.searchCases(query, category, year);
      res.json(cases);
    } catch (error) {
      res.status(500).json({ message: "Failed to search cases" });
    }
  });
  
  // Get case by ID (for admin editing)
  app.get("/api/cases/id/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid case ID" });
      }
      
      const caseItem = await storage.getCaseById(id);
      if (!caseItem) {
        return res.status(404).json({ message: "Case not found" });
      }
      res.json(caseItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch case" });
    }
  });
  
  // Get case by slug
  app.get("/api/cases/:slug", async (req, res) => {
    try {
      const caseItem = await storage.getCaseBySlug(req.params.slug);
      if (!caseItem) {
        return res.status(404).json({ message: "Case not found" });
      }
      res.json(caseItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch case" });
    }
  });
  
  // Create a new case (admin only)
  app.post("/api/cases", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const caseData = insertCaseSchema.parse(req.body);
      const newCase = await storage.createCase(caseData);
      
      // Send to Discord if requested
      if (req.body.publishToDiscord) {
        await sendDiscordNotification(newCase);
      }
      
      res.status(201).json(newCase);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid case data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create case" });
    }
  });
  
  // Bulk import cases (admin only)
  app.post("/api/cases/import", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      // Check if the request includes a file or JSON data
      if (req.headers['content-type']?.includes('multipart/form-data')) {
        // Handle file upload - we'll parse the file and extract case data
        if (!req.files || !('casesFile' in req.files)) {
          return res.status(400).json({ message: "No file uploaded" });
        }
        
        const file = req.files.casesFile as UploadedFile;
        if (Array.isArray(file)) {
          return res.status(400).json({ message: "Only one file can be uploaded at a time" });
        }
        
        // For security, ensure the file is JSON
        if (!file.name.endsWith('.json')) {
          return res.status(400).json({ message: "Only JSON files are supported" });
        }
        
        try {
          // Parse JSON content
          const fileContent = file.data.toString();
          const jsonData = JSON.parse(fileContent);
          
          // Check if the data is in the expected format
          if (!Array.isArray(jsonData)) {
            return res.status(400).json({ 
              message: "Invalid file format. Expected an array of case objects." 
            });
          }
          
          // Import the cases - transform the JSON data to match our schema
          const { transformCasesData } = await import("@shared/utils");
          const transformedCases = transformCasesData(jsonData);
          
          console.log(`Transformed ${transformedCases.length} cases out of ${jsonData.length}`);
          
          // Now import the transformed cases
          const result = await storage.importCases(transformedCases);
          
          return res.status(201).json({
            imported: result.imported,
            skipped: result.skipped
          });
        } catch (parseError: unknown) {
          const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown error';
          return res.status(400).json({ 
            message: "Failed to parse JSON file", 
            error: errorMessage
          });
        }
      } else {
        // Handle direct JSON payload
        const importSchema = z.object({
          cases: z.array(insertCaseSchema)
        });
        
        const { cases } = importSchema.parse(req.body);
        
        // Transform cases to ensure they match our format
        const { transformCasesData } = await import("@shared/utils");
        const transformedCases = transformCasesData(cases);
        
        const result = await storage.importCases(transformedCases);
        
        res.status(201).json({
          imported: result.imported,
          skipped: result.skipped
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid import data", 
          errors: error.errors 
        });
      }
      console.error("Import error:", error);
      res.status(500).json({ message: "Failed to import cases" });
    }
  });
  
  // Update a case (admin only)
  app.put("/api/cases/:id", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const caseData = updateCaseSchema.parse(req.body);
      const updatedCase = await storage.updateCase(id, caseData);
      
      if (!updatedCase) {
        return res.status(404).json({ message: "Case not found" });
      }
      
      res.json(updatedCase);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid case data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update case" });
    }
  });
  
  // Delete a case (admin only)
  app.delete("/api/cases/:id", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      // Log the ID being deleted for debugging
      console.log(`Attempting to delete case with ID: ${id}`);
      
      const success = await storage.deleteCase(id);
      
      if (!success) {
        console.log(`Case not found with ID: ${id}`);
        return res.status(404).json({ message: "Case not found" });
      }
      
      console.log(`Successfully deleted case with ID: ${id}`);
      
      // Return 200 with success message instead of 204 no content
      res.status(200).json({ message: "Case deleted successfully" });
    } catch (error) {
      console.error(`Error deleting case with ID: ${req.params.id}`, error);
      res.status(500).json({ message: "Failed to delete case" });
    }
  });
  
  // Publish case to Discord (admin only)
  app.post("/api/cases/:id/publish-to-discord", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const caseItem = await storage.getCaseById(id);
      
      if (!caseItem) {
        return res.status(404).json({ message: "Case not found" });
      }
      
      const success = await sendDiscordNotification(caseItem);
      
      if (!success) {
        return res.status(500).json({ message: "Failed to publish to Discord" });
      }
      
      res.json({ message: "Successfully published to Discord" });
    } catch (error) {
      res.status(500).json({ message: "Failed to publish to Discord" });
    }
  });
  
  // Get all news
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });
  
  // Get news by slug
  app.get("/api/news/:slug", async (req, res) => {
    try {
      const newsItem = await storage.getNewsBySlug(req.params.slug);
      if (!newsItem) {
        return res.status(404).json({ message: "News not found" });
      }
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });
  
  // Create a new news item (admin only)
  app.post("/api/news", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const newNews = await storage.createNews(newsData);
      res.status(201).json(newNews);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid news data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create news" });
    }
  });
  
  // Update a news item (admin only)
  app.put("/api/news/:id", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const newsData = insertNewsSchema.partial().parse(req.body);
      const updatedNews = await storage.updateNews(id, newsData);
      
      if (!updatedNews) {
        return res.status(404).json({ message: "News not found" });
      }
      
      res.json(updatedNews);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid news data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update news" });
    }
  });
  
  // Delete a news item (admin only)
  app.delete("/api/news/:id", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteNews(id);
      
      if (!success) {
        return res.status(404).json({ message: "News not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete news" });
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const newContact = await storage.createContact(contactData);
      
      // Send email notification
      try {
        await sendContactNotificationEmail(newContact);
        console.log(`Contact notification email sent for submission ID: ${newContact.id}`);
      } catch (emailError) {
        // Log the error but don't fail the request - the contact was still saved to the database
        console.error("Failed to send contact notification email:", emailError);
      }
      
      res.status(201).json({ message: "Contact form submitted successfully", id: newContact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  
  // Get community settings
  app.get("/api/community", async (req, res) => {
    try {
      const settings = await storage.getCommunitySettings();
      if (!settings) {
        return res.status(404).json({ message: "Community settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch community settings" });
    }
  });
  
  // Subscribe to newsletter
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscriptionData = insertSubscriptionSchema.parse(req.body);
      const subscription = await storage.createSubscription(subscriptionData);
      res.status(201).json({ message: "Subscription created successfully", id: subscription.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subscription data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });
  
  // Get all team members
  app.get("/api/team", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });
  
  // Get team member by ID
  app.get("/api/team/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const teamMember = await storage.getTeamMemberById(id);
      
      if (!teamMember) {
        return res.status(404).json({ message: "Team member not found" });
      }
      
      res.json(teamMember);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team member" });
    }
  });
  
  // Create a new team member (admin only)
  app.post("/api/team", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const teamMemberData = insertTeamMemberSchema.parse(req.body);
      const newTeamMember = await storage.createTeamMember(teamMemberData);
      res.status(201).json(newTeamMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid team member data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create team member" });
    }
  });
  
  // Update a team member (admin only)
  app.put("/api/team/:id", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const teamMemberData = insertTeamMemberSchema.partial().parse(req.body);
      const updatedTeamMember = await storage.updateTeamMember(id, teamMemberData);
      
      if (!updatedTeamMember) {
        return res.status(404).json({ message: "Team member not found" });
      }
      
      res.json(updatedTeamMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid team member data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update team member" });
    }
  });
  
  // Delete a team member (admin only)
  app.delete("/api/team/:id", authenticate, requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTeamMember(id);
      
      if (!success) {
        return res.status(404).json({ message: "Team member not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete team member" });
    }
  });

  // XML Sitemap for SEO
  app.get("/sitemap.xml", (req, res) => {
    generateSitemap(req, res, storage);
  });

  const httpServer = createServer(app);
  return httpServer;
}
