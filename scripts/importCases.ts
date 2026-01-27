import fs from 'fs';
import path from 'path';
import { storage } from '../server/storage';
import { transformCasesData } from '../shared/utils';

/**
 * Import cases from a JSON file into the database
 * 
 * @param filePath - Path to the JSON file containing case data
 * @returns Promise with import results
 */
export async function importCasesFromFile(filePath: string) {
  try {
    // Read and parse the JSON file
    const fullPath = path.resolve(filePath);
    console.log(`Importing cases from: ${fullPath}`);
    
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const rawCases = JSON.parse(fileContent);
    
    if (!Array.isArray(rawCases)) {
      throw new Error('Invalid JSON format: expected an array of cases');
    }
    
    console.log(`Found ${rawCases.length} cases in file`);
    
    // Transform the raw data into our schema format
    const formattedCases = transformCasesData(rawCases);
    
    // Import the cases using the storage interface
    const result = await storage.importCases(formattedCases);
    
    console.log(`Import complete:`);
    console.log(`- Successfully imported: ${result.imported.length} cases`);
    console.log(`- Skipped (duplicates): ${result.skipped.length} cases`);
    
    return result;
  } catch (error) {
    console.error('Error importing cases:', error);
    throw error;
  }
}

// If this script is run directly (not imported)
import { fileURLToPath } from 'url';
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: tsx scripts/importCases.ts <path-to-json-file>');
    process.exit(1);
  }
  
  const filePath = args[0];
  
  importCasesFromFile(filePath)
    .then(() => {
      console.log('Import completed successfully');
      process.exit(0);
    })
    .catch(err => {
      console.error('Import failed:', err);
      process.exit(1);
    });
}