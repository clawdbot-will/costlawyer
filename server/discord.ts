import { Case, updateCaseSchema } from "@shared/schema";
import { storage } from "./storage";

// Send notification to Discord when a new case is added
export async function sendDiscordNotification(caseData: Case): Promise<boolean> {
  try {
    const communitySettings = await storage.getCommunitySettings();
    
    if (!communitySettings || !communitySettings.discordWebhookUrl) {
      console.error("Discord webhook URL not set in community settings");
      return false;
    }
    
    // Create Discord embed
    const embed = {
      title: `New Case Law: ${caseData.title}`,
      description: caseData.summary,
      url: `${process.env.SITE_URL || 'https://costlawyer.co.uk'}/case-law/${caseData.slug}`,
      color: 3447003, // Blue color
      fields: [
        {
          name: "Category",
          value: caseData.category,
          inline: true
        },
        {
          name: "Date",
          value: caseData.date,
          inline: true
        },
        {
          name: "Author",
          value: caseData.author,
          inline: true
        }
      ],
      footer: {
        text: "Mackenzie Costs Law Case Database"
      },
      timestamp: new Date().toISOString()
    };
    
    // Send to Discord webhook
    const response = await fetch(communitySettings.discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "Case Law Bot",
        embeds: [embed]
      })
    });
    
    if (!response.ok) {
      console.error("Failed to send Discord notification:", await response.text());
      return false;
    }
    
    // Mark case as published to Discord
    const updateData = updateCaseSchema.parse({ publishedToDiscord: true });
    await storage.updateCase(caseData.id, updateData);
    
    return true;
  } catch (error) {
    console.error("Error sending Discord notification:", error);
    return false;
  }
}