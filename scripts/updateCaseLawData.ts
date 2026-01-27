/**
 * Script to update the caseLaw.ts file with the latest unique cases
 * to prevent duplication on server restart
 */
import fs from 'fs';
import path from 'path';
import { storage } from '../server/storage';

async function updateCaseLawData() {
  try {
    console.log('Starting update of caseLaw.ts with unique cases...');
    
    // Get all cases from the database
    const allCases = await storage.getCases();
    console.log(`Found ${allCases.length} cases in the database`);

    // Get unique cases by title
    const uniqueCases = new Map();
    for (const caseItem of allCases) {
      // Skip news articles that are in the cases list (they have different schema structure)
      if (caseItem.title.startsWith("QOCS applies") || 
          caseItem.title.startsWith("Solicitor's Act") ||
          caseItem.title.startsWith("Recent developments") ||
          caseItem.title.startsWith("The expansion of") ||
          caseItem.title.startsWith("Court of Appeal") ||
          caseItem.title.startsWith("Precedent H") ||
          caseItem.title.startsWith("Revised budget")) {
        continue;
      }
      uniqueCases.set(caseItem.title, caseItem);
    }
    
    console.log(`Found ${uniqueCases.size} unique cases after filtering`);
    
    // Create the case data array content
    const casesArray = Array.from(uniqueCases.values());
    
    // Format for the JavaScript file
    let fileContent = `import { InsertCase } from "@shared/schema";

export const caseData: InsertCase[] = [
`;

    casesArray.forEach((caseItem, index) => {
      fileContent += `  {
    title: ${JSON.stringify(caseItem.title)},
    summary: ${JSON.stringify(caseItem.summary)},
    content: ${JSON.stringify(caseItem.content)},
    category: ${JSON.stringify(caseItem.category)},
    date: ${JSON.stringify(caseItem.date)},
    author: ${JSON.stringify(caseItem.author)},
    tags: ${JSON.stringify(caseItem.tags)},
    slug: ${JSON.stringify(caseItem.slug)},
    publishedToDiscord: ${caseItem.publishedToDiscord}
  }${index < casesArray.length - 1 ? ',' : ''}
`;
    });
    
    fileContent += `];`;
    
    // Write to the file
    const filePath = path.join(process.cwd(), 'server', 'data', 'caseLaw.ts');
    fs.writeFileSync(filePath, fileContent);
    
    console.log(`Updated caseLaw.ts with ${casesArray.length} unique cases`);
    console.log('Please restart the server to apply changes');
    
    return {
      updated: casesArray.length
    };
    
  } catch (error) {
    console.error('Error updating caseLaw.ts:', error);
    throw error;
  }
}

// Execute the function when run directly
import { fileURLToPath } from 'url';
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  updateCaseLawData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Update failed:', error);
      process.exit(1);
    });
}

export { updateCaseLawData };