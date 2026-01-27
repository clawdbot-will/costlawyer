import { pgTable, text, serial, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").default("user").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
  role: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Case law model
export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  date: text("date").notNull(),
  author: text("author").notNull(),
  tags: text("tags").array().notNull(),
  slug: text("slug").notNull().unique(),
  publishedToDiscord: boolean("publishedToDiscord").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});

export const insertCaseSchema = createInsertSchema(cases).pick({
  title: true,
  summary: true,
  content: true,
  category: true,
  date: true,
  author: true,
  tags: true,
  slug: true,
  publishedToDiscord: true,
});

// Schema for updating cases, includes publishedToDiscord
export const updateCaseSchema = insertCaseSchema.partial().extend({
  publishedToDiscord: z.boolean().optional()
});
export type InsertCase = z.infer<typeof insertCaseSchema>;
export type Case = typeof cases.$inferSelect;

// Services model
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  slug: text("slug").notNull().unique(),
});

export const insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  icon: true,
  slug: true,
});
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// News/Blog model
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  date: text("date").notNull(),
  author: text("author").notNull(),
  imageUrl: text("imageUrl"),
  slug: text("slug").notNull().unique(),
});

export const insertNewsSchema = createInsertSchema(news).pick({
  title: true,
  summary: true,
  content: true,
  category: true,
  date: true,
  author: true,
  imageUrl: true,
  slug: true,
});
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

// Contact form submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  service: true,
  message: true,
});
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Discord Community
export const community = pgTable("community", {
  id: serial("id").primaryKey(),
  discordInviteUrl: text("discordInviteUrl"),
  discordServerId: text("discordServerId"),
  eventName: text("eventName"),
  eventDescription: text("eventDescription"),
  eventDate: text("eventDate"),
  discordWebhookUrl: text("discordWebhookUrl"),
  settings: json("settings")
});

export const insertCommunitySchema = createInsertSchema(community).pick({
  discordInviteUrl: true,
  discordServerId: true,
  eventName: true,
  eventDescription: true,
  eventDate: true,
  discordWebhookUrl: true,
  settings: true,
});
export type InsertCommunity = z.infer<typeof insertCommunitySchema>;
export type Community = typeof community.$inferSelect;

// Newsletter subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  email: true,
});
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

// Team Members
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("imageUrl"),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  email: text("email"),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).pick({
  name: true,
  position: true,
  bio: true,
  imageUrl: true,
  linkedin: true,
  twitter: true,
  email: true,
});
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
