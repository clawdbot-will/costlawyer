/**
 * Script to initialize services and team data in the database
 */
import { storage } from "../server/storage";
import { servicesData } from "../server/data/services";
import { teamData } from "../server/data/team";

async function initializeData() {
  console.log("Initializing services and team data...");
  
  try {
    // Add services
    const existingServices = await storage.getServices();
    if (existingServices.length === 0) {
      console.log("Adding services...");
      for (const service of servicesData) {
        await storage.createService(service);
      }
      console.log(`Added ${servicesData.length} services`);
    } else {
      console.log(`Services already exist: ${existingServices.length} found`);
    }

    // Add team members
    const existingTeam = await storage.getTeamMembers();
    if (existingTeam.length === 0) {
      console.log("Adding team members...");
      for (const member of teamData) {
        await storage.createTeamMember(member);
      }
      console.log(`Added ${teamData.length} team members`);
    } else {
      console.log(`Team members already exist: ${existingTeam.length} found`);
    }

    // Initialize community settings
    const existingCommunity = await storage.getCommunitySettings();
    if (!existingCommunity) {
      console.log("Adding community settings...");
      await storage.updateCommunitySettings({
        discordInviteUrl: "https://discord.gg/jMWCAbUP",
        discordServerId: "1321163628756332565",
        eventName: "Legal Costs Discussion",
        eventDescription: "Join our community to discuss legal costs, share insights, and get expert advice.",
        eventDate: "Ongoing",
        discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL || "",
        settings: {}
      });
      console.log("Added community settings");
    } else {
      console.log("Community settings already exist");
    }

    console.log("Data initialization complete!");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}

// Run the initialization
initializeData();