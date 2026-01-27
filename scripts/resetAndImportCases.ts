/**
 * Script to reset the database and import all cases from the different JSON files
 */
import fs from 'fs';
import path from 'path';
import { storage } from '../server/storage';
import { importCasesFromFile } from './importCases';
import { updateCaseLawData } from './updateCaseLawData';

async function resetAndImportAllCases() {
  try {
    console.log('Starting database reset and case law import...');
    
    // Get all current cases from database
    const beforeCases = await storage.getCases();
    console.log(`Database contains ${beforeCases.length} cases before reset`);
    
    // Delete all cases
    const deletePromises = beforeCases.map(c => storage.deleteCase(c.id));
    await Promise.all(deletePromises);
    
    console.log('All cases have been deleted from database');
    
    // Get cases after deletion to verify
    const afterDeleteCases = await storage.getCases();
    console.log(`Database contains ${afterDeleteCases.length} cases after reset`);
    
    // Import cases from original CaseLaws.json
    console.log('\nImporting cases from CaseLaws.json...');
    const caseLawsResult = await importCasesFromFile('attached_assets/CaseLaws.json');
    console.log(`Imported ${caseLawsResult.imported.length} cases and skipped ${caseLawsResult.skipped.length} cases`);
    
    // Import cases from modified-caselaws.json
    console.log('\nImporting cases from modified-caselaws.json...');
    const modifiedResult = await importCasesFromFile('attached_assets/modified-caselaws.json');
    console.log(`Imported ${modifiedResult.imported.length} cases and skipped ${modifiedResult.skipped.length} cases`);
    
    // Import cases from modified-caselaws-json.json
    console.log('\nImporting cases from modified-caselaws-json.json...');
    const modifiedJsonResult = await importCasesFromFile('attached_assets/modified-caselaws-json.json');
    console.log(`Imported ${modifiedJsonResult.imported.length} cases and skipped ${modifiedJsonResult.skipped.length} cases`);
    
    // Get final count
    const finalCases = await storage.getCases();
    console.log(`\nDatabase now contains ${finalCases.length} total cases`);
    
    // Update caseLaw.ts file with unique cases
    console.log('\nUpdating caseLaw.ts with unique cases...');
    const updateResult = await updateCaseLawData();
    console.log(`Updated caseLaw.ts with ${updateResult.updated} unique cases`);
    
    return {
      initialCount: beforeCases.length,
      deletedCount: beforeCases.length,
      importedCaseLaws: caseLawsResult.imported.length,
      importedModified: modifiedResult.imported.length,
      importedModifiedJson: modifiedJsonResult.imported.length,
      skippedCaseLaws: caseLawsResult.skipped.length,
      skippedModified: modifiedResult.skipped.length,
      skippedModifiedJson: modifiedJsonResult.skipped.length,
      finalCount: finalCases.length,
      uniqueCases: updateResult.updated
    };
    
  } catch (error) {
    console.error('Error during reset and import:', error);
    throw error;
  }
}

// Execute the function when run directly
import { fileURLToPath } from 'url';
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  resetAndImportAllCases()
    .then((result) => {
      console.log('\nReset and import summary:');
      console.log(JSON.stringify(result, null, 2));
      console.log('\nPlease restart the server to apply changes');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Reset and import failed:', error);
      process.exit(1);
    });
}

export { resetAndImportAllCases };