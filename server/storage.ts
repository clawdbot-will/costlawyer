import { 
  users, type User, type InsertUser,
  cases, type Case, type InsertCase,
  services, type Service, type InsertService,
  news, type News, type InsertNews,
  contacts, type Contact, type InsertContact,
  community, type Community, type InsertCommunity,
  subscriptions, type Subscription, type InsertSubscription,
  teamMembers, type TeamMember, type InsertTeamMember
} from "@shared/schema";
import { caseData } from "./data/caseLaw";
import { saveCases, loadCases } from "./data/persistedCases";
import { teamData } from "./data/team";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, like, and, or, desc } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Case law
  getCases(): Promise<Case[]>;
  getCaseById(id: number): Promise<Case | undefined>;
  getCaseBySlug(slug: string): Promise<Case | undefined>;
  searchCases(query: string, category?: string, year?: string): Promise<Case[]>;
  createCase(caseData: InsertCase): Promise<Case>;
  importCases(casesData: InsertCase[]): Promise<{
    imported: Case[];
    skipped: string[];
  }>;
  updateCase(id: number, caseData: Partial<InsertCase>): Promise<Case | undefined>;
  deleteCase(id: number): Promise<boolean>;
  
  // Services
  getServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // News/Blog
  getNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: number, news: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: number): Promise<boolean>;
  
  // Contact form submissions
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Discord community
  getCommunitySettings(): Promise<Community | undefined>;
  updateCommunitySettings(settings: Partial<InsertCommunity>): Promise<Community | undefined>;
  
  // Newsletter subscriptions
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptions(): Promise<Subscription[]>;
  deleteSubscription(id: number): Promise<boolean>;
  
  // Team members
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMemberById(id: number): Promise<TeamMember | undefined>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, teamMember: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;
}

export class PostgreSQLStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required for PostgreSQL storage");
    }
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql);
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Case law
  async getCases(): Promise<Case[]> {
    return await this.db.select().from(cases).orderBy(desc(cases.createdAt));
  }

  async getCaseById(id: number): Promise<Case | undefined> {
    const result = await this.db.select().from(cases).where(eq(cases.id, id));
    return result[0];
  }

  async getCaseBySlug(slug: string): Promise<Case | undefined> {
    const result = await this.db.select().from(cases).where(eq(cases.slug, slug));
    return result[0];
  }

  async searchCases(query: string, category?: string, year?: string): Promise<Case[]> {
    let conditions = [];
    
    if (query) {
      conditions.push(
        or(
          like(cases.title, `%${query}%`),
          like(cases.summary, `%${query}%`),
          like(cases.content, `%${query}%`)
        )
      );
    }
    
    if (category) {
      conditions.push(eq(cases.category, category));
    }
    
    if (year) {
      conditions.push(like(cases.date, `%${year}%`));
    }

    const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;
    
    return await this.db.select().from(cases)
      .where(whereCondition)
      .orderBy(desc(cases.createdAt));
  }

  async createCase(caseData: InsertCase): Promise<Case> {
    const result = await this.db.insert(cases).values(caseData).returning();
    return result[0];
  }

  async importCases(casesData: InsertCase[]): Promise<{
    imported: Case[];
    skipped: string[];
  }> {
    const imported: Case[] = [];
    const skipped: string[] = [];

    for (const caseData of casesData) {
      try {
        // Check if case already exists by slug
        const existing = await this.getCaseBySlug(caseData.slug);
        if (existing) {
          skipped.push(caseData.title);
          continue;
        }

        const newCase = await this.createCase(caseData);
        imported.push(newCase);
      } catch (error) {
        console.error(`Failed to import case: ${caseData.title}`, error);
        skipped.push(caseData.title);
      }
    }

    return { imported, skipped };
  }

  async updateCase(id: number, caseData: Partial<InsertCase>): Promise<Case | undefined> {
    const result = await this.db.update(cases).set(caseData).where(eq(cases.id, id)).returning();
    return result[0];
  }

  async deleteCase(id: number): Promise<boolean> {
    const result = await this.db.delete(cases).where(eq(cases.id, id));
    return result.rowCount > 0;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await this.db.select().from(services);
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    const result = await this.db.select().from(services).where(eq(services.id, id));
    return result[0];
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const result = await this.db.select().from(services).where(eq(services.slug, slug));
    return result[0];
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await this.db.insert(services).values(service).returning();
    return result[0];
  }

  async updateService(id: number, serviceData: Partial<InsertService>): Promise<Service | undefined> {
    const result = await this.db.update(services).set(serviceData).where(eq(services.id, id)).returning();
    return result[0];
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await this.db.delete(services).where(eq(services.id, id));
    return result.rowCount > 0;
  }

  // News/Blog
  async getNews(): Promise<News[]> {
    return await this.db.select().from(news);
  }

  async getNewsById(id: number): Promise<News | undefined> {
    const result = await this.db.select().from(news).where(eq(news.id, id));
    return result[0];
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    const result = await this.db.select().from(news).where(eq(news.slug, slug));
    return result[0];
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const result = await this.db.insert(news).values(newsItem).returning();
    return result[0];
  }

  async updateNews(id: number, newsData: Partial<InsertNews>): Promise<News | undefined> {
    const result = await this.db.update(news).set(newsData).where(eq(news.id, id)).returning();
    return result[0];
  }

  async deleteNews(id: number): Promise<boolean> {
    const result = await this.db.delete(news).where(eq(news.id, id));
    return result.rowCount > 0;
  }

  // Contact form submissions
  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await this.db.insert(contacts).values(contact).returning();
    return result[0];
  }

  async getContacts(): Promise<Contact[]> {
    return await this.db.select().from(contacts);
  }

  // Discord community
  async getCommunitySettings(): Promise<Community | undefined> {
    const result = await this.db.select().from(community);
    return result[0];
  }

  async updateCommunitySettings(settings: Partial<InsertCommunity>): Promise<Community | undefined> {
    const existing = await this.getCommunitySettings();
    if (existing) {
      const result = await this.db.update(community).set(settings).where(eq(community.id, existing.id)).returning();
      return result[0];
    } else {
      const result = await this.db.insert(community).values(settings as InsertCommunity).returning();
      return result[0];
    }
  }

  // Newsletter subscriptions
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const result = await this.db.insert(subscriptions).values(subscription).returning();
    return result[0];
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return await this.db.select().from(subscriptions);
  }

  async deleteSubscription(id: number): Promise<boolean> {
    const result = await this.db.delete(subscriptions).where(eq(subscriptions.id, id));
    return result.rowCount > 0;
  }

  // Team members
  async getTeamMembers(): Promise<TeamMember[]> {
    return await this.db.select().from(teamMembers);
  }

  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    const result = await this.db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return result[0];
  }

  async createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember> {
    const result = await this.db.insert(teamMembers).values(teamMember).returning();
    return result[0];
  }

  async updateTeamMember(id: number, teamMemberData: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const result = await this.db.update(teamMembers).set(teamMemberData).where(eq(teamMembers.id, id)).returning();
    return result[0];
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    const result = await this.db.delete(teamMembers).where(eq(teamMembers.id, id));
    return result.rowCount > 0;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cases: Map<number, Case>;
  private services: Map<number, Service>;
  private news: Map<number, News>;
  private contacts: Map<number, Contact>;
  private community: Map<number, Community>;
  private subscriptions: Map<number, Subscription>;
  private teamMembers: Map<number, TeamMember>;
  
  private userCurrentId: number;
  private caseCurrentId: number;
  private serviceCurrentId: number;
  private newsCurrentId: number;
  private contactCurrentId: number;
  private communityCurrentId: number;
  private subscriptionCurrentId: number;
  private teamMemberCurrentId: number;

  constructor() {
    this.users = new Map();
    this.cases = new Map();
    this.services = new Map();
    this.news = new Map();
    this.contacts = new Map();
    this.community = new Map();
    this.subscriptions = new Map();
    this.teamMembers = new Map();
    
    this.userCurrentId = 1;
    this.caseCurrentId = 1;
    this.serviceCurrentId = 1;
    this.newsCurrentId = 1;
    this.contactCurrentId = 1;
    this.communityCurrentId = 1;
    this.subscriptionCurrentId = 1;
    this.teamMemberCurrentId = 1;
    
    // Try to load persisted cases first
    const persistedCases = loadCases();
    if (persistedCases && persistedCases.length > 0) {
      console.log(`Loading ${persistedCases.length} cases from persisted storage`);
      
      // Determine the highest ID to set caseCurrentId
      let maxId = 0;
      
      // Add each case to the cases Map
      persistedCases.forEach(caseItem => {
        this.cases.set(caseItem.id, caseItem);
        maxId = Math.max(maxId, caseItem.id);
      });
      
      // Set the current ID to be one higher than the highest existing ID
      this.caseCurrentId = maxId + 1;
      console.log(`Set case ID counter to ${this.caseCurrentId}`);
    } else {
      // If no persisted cases, initialize with sample data
      console.log('No persisted cases found, initializing with default data');
    }
    
    // Initialize with sample data (will check if cases already exist)
    this.initializeData();
  }
  
  private initializeData() {
    // Create default admin user
    this.createUser({
      username: "admin",
      password: "admin123",  // In a real app, this would be hashed
      email: "admin@costlawyer.co.uk",
      name: "William Mackenzie",
      role: "admin"
    });
    
    // Check if we should initialize with default cases
    // Only do this if there are no cases in the database
    const existingCases = Array.from(this.cases.values());
    if (existingCases.length === 0) {
      // Only import cases if none exist already
      if (caseData && Array.isArray(caseData) && caseData.length > 0) {
        console.log(`Initializing with ${caseData.length} cases from caseLaw.ts (first time setup)`);
        caseData.forEach(caseItem => {
          this.createCase(caseItem);
        });
      }
    } else {
      console.log(`Database already has ${existingCases.length} cases - skipping initial data import`);
    }
    
    // Create sample services
    const servicesList = [
      {
        title: "Drafting & Bills of Costs",
        description: "Your bill of costs will be prepared by a Costs Lawyer with attention to detail in order to maximise your legal costs recovery. We draft all types of bills and/or schedules.",
        icon: "file-invoice-dollar",
        slug: "drafting-bills-of-costs"
      },
      {
        title: "Negotiations & Analysis",
        description: "Over many years, our team has gained the experience and expertise necessary to advise and achieve successful outcomes. Should it be necessary we can attend any hearings or detailed assessment.",
        icon: "handshake",
        slug: "negotiations-analysis"
      },
      {
        title: "Cost Budgeting",
        description: "From the drafting of the Precedent H to the budget discussion report. We can assist with all aspects of costs budgeting along with advising as to when revisions may need to take place.",
        icon: "calculator",
        slug: "cost-budgeting"
      },
      {
        title: "Detailed Assessment",
        description: "Our team has extensive experience in detailed assessment proceedings, both in preparation and attendance, ensuring maximum recovery for our clients.",
        icon: "search-dollar",
        slug: "detailed-assessment"
      },
      {
        title: "Points of Dispute/Reply",
        description: "We draft comprehensive Points of Dispute and Points of Reply, focusing on the key issues to maximize recovery or minimize liability.",
        icon: "gavel",
        slug: "points-of-dispute-reply"
      },
      {
        title: "Costs Consultation",
        description: "We provide expert advice on all aspects of costs law, helping clients navigate complex legal costs issues with confidence.",
        icon: "comments-dollar",
        slug: "costs-consultation"
      }
    ];
    
    servicesList.forEach(service => {
      this.createService(service);
    });
    
    // Only create sample cases if no cases exist already
    if (existingCases.length === 0) {
      console.log("No cases found - adding sample cases");
      const casesList = [
        {
          title: "QOCS applies to detailed assessment proceedings",
          summary: "The Court of Appeal has ruled that Qualified One-way Costs Shifting protection extends to detailed assessment proceedings.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
          category: "QOCS",
          date: "May 19, 2024",
          author: "William Mackenzie",
          tags: ["QOCS", "Detailed Assessment", "Court of Appeal"],
          slug: "qocs-applies-to-detailed-assessment-proceedings"
        },
        {
          title: "Solicitor's Act preliminary issues hearing in relation to interim payments",
          summary: "A recent High Court decision has clarified the treatment of interim payments under the Solicitors Act.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
          category: "Solicitor's Act",
          date: "May 15, 2024",
          author: "William Mackenzie",
          tags: ["Solicitor's Act", "Interim Payments", "High Court"],
          slug: "solicitors-act-preliminary-issues-interim-payments"
        },
        {
          title: "Revised budget application successful despite significant increase",
          summary: "Case study of a successful application for a revised budget with substantial increases in projected costs.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
          category: "Cost Budgeting",
          date: "May 8, 2024",
          author: "William Mackenzie",
          tags: ["Cost Budgeting", "Budget Revision", "Costs Management"],
          slug: "revised-budget-application-successful"
        }
      ];
      
      casesList.forEach(caseItem => {
        this.createCase(caseItem);
      });
    } else {
      console.log("Skipping sample case creation because cases already exist");
    }
    
    // Create sample news
    const newsList = [
      {
        title: "QOCS applies to detailed assessment proceedings",
        summary: "The Court of Appeal has ruled that Qualified One-way Costs Shifting protection extends to detailed assessment proceedings, significantly impacting costs recovery strategies.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
        category: "News",
        date: "May 19, 2024",
        author: "William Mackenzie",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        slug: "qocs-applies-to-detailed-assessment-proceedings"
      },
      {
        title: "Solicitor's Act preliminary issues hearing in relation to interim payments",
        summary: "A recent High Court decision has clarified the treatment of interim payments under the Solicitors Act, providing guidance on assessing final bills.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
        category: "Case Study",
        date: "May 15, 2024",
        author: "William Mackenzie",
        imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        slug: "solicitors-act-preliminary-issues-interim-payments"
      },
      {
        title: "Upcoming Webinar: Navigating Cost Budgeting in 2024",
        summary: "Join William Mackenzie for an in-depth discussion on cost budgeting strategies, recent case law, and best practices for maximizing recovery.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
        category: "Event",
        date: "May 8, 2024",
        author: "William Mackenzie",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        slug: "webinar-cost-budgeting-2024"
      }
    ];
    
    newsList.forEach(newsItem => {
      this.createNews(newsItem);
    });
    
    // Initialize community settings
    this.community.set(this.communityCurrentId++, {
      id: 1,
      discordInviteUrl: "https://discord.gg/jRPTE4Bp",
      discordServerId: "1344647433677963324",
      eventName: "May Discussion on QOCS Applications",
      eventDescription: "Join us for our monthly discussion on QOCS applications and recent Court of Appeal decisions.",
      eventDate: "May 25, 2024",
      discordWebhookUrl: "https://discord.com/api/webhooks/1344647433677963324/b2bh9PASzOBNkGN30IhE0aeChwWicRLSXVy1AAmh8x6W2I6MUQ2Pl0oQpB_PkZqrHEo_",
      settings: {
        showDiscordWidget: true,
        enableNotifications: true
      }
    });
    
    // Initialize team members
    if (teamData && Array.isArray(teamData) && teamData.length > 0) {
      teamData.forEach(teamMember => {
        this.createTeamMember(teamMember);
      });
    }
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "user" 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Case law
  async getCases(): Promise<Case[]> {
    // Get all cases and sort by date (newest first)
    const allCases = Array.from(this.cases.values());
    
    return allCases.sort((a, b) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      // Sort newest first (descending order)
      return dateB.getTime() - dateA.getTime();
    });
  }
  
  async getCaseById(id: number): Promise<Case | undefined> {
    return this.cases.get(id);
  }
  
  async getCaseBySlug(slug: string): Promise<Case | undefined> {
    return Array.from(this.cases.values()).find(
      (caseItem) => caseItem.slug === slug,
    );
  }
  
  async searchCases(query: string, category?: string, year?: string): Promise<Case[]> {
    let results = Array.from(this.cases.values());
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        caseItem => 
          caseItem.title.toLowerCase().includes(lowerQuery) ||
          caseItem.summary.toLowerCase().includes(lowerQuery) ||
          caseItem.content.toLowerCase().includes(lowerQuery) ||
          caseItem.author.toLowerCase().includes(lowerQuery) ||
          caseItem.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }
    
    if (category && category !== "All Categories") {
      results = results.filter(caseItem => caseItem.category === category);
    }
    
    if (year && year !== "All Years") {
      results = results.filter(caseItem => caseItem.date.includes(year));
    }
    
    // Sort by date (newest first)
    return results.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }
  
  async createCase(caseData: InsertCase): Promise<Case> {
    const id = this.caseCurrentId++;
    const newCase: Case = { 
      ...caseData, 
      id, 
      publishedToDiscord: false,
      createdAt: new Date()
    };
    this.cases.set(id, newCase);
    
    // Persist all cases to disk after adding a new one
    this.persistCases();
    
    return newCase;
  }
  
  // Helper method to persist all cases to disk
  private persistCases(): void {
    const allCases = Array.from(this.cases.values());
    saveCases(allCases);
  }

  async importCases(casesData: InsertCase[]): Promise<{
    imported: Case[];
    skipped: string[];
  }> {
    const importedCases: Case[] = [];
    const skippedCases: string[] = [];
    
    for (const caseData of casesData) {
      try {
        // Check if a case with this slug already exists
        const existingCase = await this.getCaseBySlug(caseData.slug);
        
        if (existingCase) {
          // Skip this case and record it as skipped
          console.log(`Skipping duplicate case: ${caseData.title} (slug: ${caseData.slug})`);
          skippedCases.push(caseData.title);
        } else {
          // Create the new case
          const newCase = await this.createCase(caseData);
          importedCases.push(newCase);
        }
      } catch (err) {
        console.error(`Error importing case: ${caseData.title}`, err);
        skippedCases.push(caseData.title);
      }
    }
    
    // Ensure all cases are persisted after bulk import
    if (importedCases.length > 0) {
      console.log(`Persisting ${importedCases.length} imported cases`);
      this.persistCases();
    }
    
    return {
      imported: importedCases,
      skipped: skippedCases
    };
  }
  
  async updateCase(id: number, caseData: Partial<InsertCase>): Promise<Case | undefined> {
    const existingCase = this.cases.get(id);
    if (!existingCase) return undefined;
    
    const updatedCase = { ...existingCase, ...caseData };
    this.cases.set(id, updatedCase);
    
    // Persist all cases to disk after updating
    this.persistCases();
    
    return updatedCase;
  }
  
  async deleteCase(id: number): Promise<boolean> {
    console.log(`Storage: Attempting to delete case with ID: ${id}`);
    
    // Log all case IDs for debugging
    const caseIds = Array.from(this.cases.keys());
    console.log(`Storage: Current cases map keys (${caseIds.length}): ${caseIds.join(', ')}`);
    
    // Convert string IDs to numbers if needed
    // Sometimes IDs can be string representations of numbers due to JSON parsing
    if (!this.cases.has(id)) {
      // Check if the ID exists as a string
      const idStr = id.toString();
      const stringKeys = Array.from(this.cases.keys()).map(k => k.toString());
      
      if (stringKeys.includes(idStr)) {
        const numericKey = Number(idStr);
        console.log(`Storage: Found case with string ID ${idStr}, converting to numeric ID`);
        const caseData = this.cases.get(numericKey);
        const result = this.cases.delete(numericKey);
        console.log(`Storage: Case deletion result: ${result}`);
        
        // After deletion, persist the remaining cases
        if (result) {
          this.persistCases();
          console.log('Persisted cases after deletion');
        }
        
        return result;
      }
      
      console.log(`Storage: Case with ID ${id} does not exist`);
      return false;
    }
    
    const result = this.cases.delete(id);
    console.log(`Storage: Case deletion result: ${result}`);
    
    // After deletion, persist the remaining cases
    if (result) {
      this.persistCases();
      console.log('Persisted cases after deletion');
    }
    
    return result;
  }
  
  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getServiceById(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(
      (service) => service.slug === slug,
    );
  }
  
  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }
  
  async updateService(id: number, serviceData: Partial<InsertService>): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    if (!existingService) return undefined;
    
    const updatedService = { ...existingService, ...serviceData };
    this.services.set(id, updatedService);
    return updatedService;
  }
  
  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }
  
  // News/Blog
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }
  
  async getNewsById(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }
  
  async getNewsBySlug(slug: string): Promise<News | undefined> {
    return Array.from(this.news.values()).find(
      (news) => news.slug === slug,
    );
  }
  
  async createNews(newsItem: InsertNews): Promise<News> {
    const id = this.newsCurrentId++;
    const newNews: News = { 
      ...newsItem, 
      id, 
      imageUrl: newsItem.imageUrl || null 
    };
    this.news.set(id, newNews);
    return newNews;
  }
  
  async updateNews(id: number, newsData: Partial<InsertNews>): Promise<News | undefined> {
    const existingNews = this.news.get(id);
    if (!existingNews) return undefined;
    
    const updatedNews = { ...existingNews, ...newsData };
    this.news.set(id, updatedNews);
    return updatedNews;
  }
  
  async deleteNews(id: number): Promise<boolean> {
    return this.news.delete(id);
  }
  
  // Contact form submissions
  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const newContact: Contact = { 
      ...contact, 
      id, 
      phone: contact.phone || null,
      service: contact.service || null,
      createdAt: new Date()
    };
    this.contacts.set(id, newContact);
    return newContact;
  }
  
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  // Discord community
  async getCommunitySettings(): Promise<Community | undefined> {
    // We'll always return the first community settings
    return this.community.get(1);
  }
  
  async updateCommunitySettings(settings: Partial<InsertCommunity>): Promise<Community | undefined> {
    const existingSettings = this.community.get(1);
    if (!existingSettings) return undefined;
    
    const updatedSettings = { ...existingSettings, ...settings };
    this.community.set(1, updatedSettings);
    return updatedSettings;
  }
  
  // Newsletter subscriptions
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    // Check if email already exists
    const existingSubscription = Array.from(this.subscriptions.values()).find(
      (sub) => sub.email === subscription.email
    );
    
    if (existingSubscription) {
      return existingSubscription;
    }
    
    const id = this.subscriptionCurrentId++;
    const newSubscription: Subscription = { 
      ...subscription, 
      id, 
      createdAt: new Date()
    };
    this.subscriptions.set(id, newSubscription);
    return newSubscription;
  }
  
  async getSubscriptions(): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values());
  }
  
  async deleteSubscription(id: number): Promise<boolean> {
    return this.subscriptions.delete(id);
  }
  
  // Team members
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }
  
  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }
  
  async createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.teamMemberCurrentId++;
    const newTeamMember: TeamMember = { 
      ...teamMember, 
      id,
      email: teamMember.email || null,
      imageUrl: teamMember.imageUrl || null,
      linkedin: teamMember.linkedin || null,
      twitter: teamMember.twitter || null
    };
    this.teamMembers.set(id, newTeamMember);
    return newTeamMember;
  }
  
  async updateTeamMember(id: number, teamMemberData: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const existingTeamMember = this.teamMembers.get(id);
    if (!existingTeamMember) return undefined;
    
    const updatedTeamMember = { ...existingTeamMember, ...teamMemberData };
    this.teamMembers.set(id, updatedTeamMember);
    return updatedTeamMember;
  }
  
  async deleteTeamMember(id: number): Promise<boolean> {
    return this.teamMembers.delete(id);
  }
}

// Use PostgreSQL storage for production, fallback to memory storage for development
export const storage = process.env.DATABASE_URL ? new PostgreSQLStorage() : new MemStorage();
