/**
 * Script to import cases from the persisted cases.json file
 */
import { storage } from "../server/storage";
import fs from "fs";
import path from "path";

async function importPersistedCases() {
  console.log("Importing cases from persisted data...");
  
  try {
    const filePath = path.join(process.cwd(), "data", "cases.json");
    
    if (!fs.existsSync(filePath)) {
      console.log("No persisted cases file found");
      return;
    }

    const rawData = fs.readFileSync(filePath, "utf8");
    const persistedCases = JSON.parse(rawData);
    
    console.log(`Found ${persistedCases.length} cases in persisted data`);

    let imported = 0;
    let skipped = 0;

    for (const caseData of persistedCases) {
      try {
        // Check if case already exists by slug
        const existing = await storage.getCaseBySlug(caseData.slug);
        if (existing) {
          skipped++;
          continue;
        }

        // Convert the persisted data format to InsertCase format
        const insertCase = {
          title: caseData.title,
          summary: caseData.summary,
          content: caseData.content,
          category: caseData.category,
          date: caseData.date,
          author: caseData.author,
          tags: caseData.tags || [],
          slug: caseData.slug,
          publishedToDiscord: caseData.publishedToDiscord || false
        };

        await storage.createCase(insertCase);
        imported++;
        console.log(`✓ Imported: ${caseData.title}`);
      } catch (error) {
        console.error(`✗ Failed to import: ${caseData.title}`, error);
        skipped++;
      }
    }

    console.log(`\nImport complete:`);
    console.log(`- Imported: ${imported} cases`);
    console.log(`- Skipped: ${skipped} cases`);

    // Check total cases now
    const allCases = await storage.getCases();
    console.log(`\nDatabase now contains ${allCases.length} total cases`);

  } catch (error) {
    console.error("Error importing persisted cases:", error);
  }
}

// Run the import
importPersistedCases();