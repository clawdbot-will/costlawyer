/**
 * Script to import cases from the modified-caselaws.json file
 */
import fs from 'fs';
import path from 'path';
import { transformCasesData } from '../shared/utils';
import { storage } from '../server/storage';

async function importModifiedCases() {
  try {
    console.log('Starting import of modified case laws...');
    
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'attached_assets', 'modified-caselaws-json.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const casesData = JSON.parse(fileContent);
    
    console.log(`Loaded ${casesData.length} cases from the file`);
    
    // Transform the data
    const transformedCases = transformCasesData(casesData);
    console.log(`Transformed ${transformedCases.length} cases successfully`);
    
    // Import the cases
    const result = await storage.importCases(transformedCases);
    
    console.log('Import completed:');
    console.log(`- Imported: ${result.imported.length} cases`);
    console.log(`- Skipped: ${result.skipped.length} cases`);
    
    if (result.skipped.length > 0) {
      console.log('Skipped cases:');
      result.skipped.forEach((title, i) => {
        if (i < 5) console.log(`  - ${title}`);
      });
      if (result.skipped.length > 5) {
        console.log(`  - ... and ${result.skipped.length - 5} more`);
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error importing modified cases:', error);
    throw error;
  }
}

// Execute the function when run directly
// Using ESM detection instead of CommonJS require.main check
import { fileURLToPath } from 'url';
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  importModifiedCases()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Import failed:', error);
      process.exit(1);
    });
}

export { importModifiedCases };