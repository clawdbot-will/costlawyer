/**
 * Script to reset all cases in the database
 * This completely wipes the cases table and reinitializes it
 */
import { storage } from '../server/storage';

async function resetAllCases() {
  try {
    console.log('Starting to reset all case data...');
    
    // Get all cases
    const allCases = await storage.getCases();
    console.log(`Found ${allCases.length} cases in database`);
    
    // Delete all cases one by one
    let deleteCount = 0;
    for (const caseItem of allCases) {
      const success = await storage.deleteCase(caseItem.id);
      if (success) {
        deleteCount++;
        console.log(`Deleted case ID: ${caseItem.id} - ${caseItem.title}`);
      } else {
        console.error(`Failed to delete case ID: ${caseItem.id} - ${caseItem.title}`);
      }
    }
    
    console.log(`Reset completed: Deleted ${deleteCount} out of ${allCases.length} cases`);
    
    // Verify deletion
    const remainingCases = await storage.getCases();
    if (remainingCases.length > 0) {
      console.warn(`Warning: ${remainingCases.length} cases still remain in database.`);
      remainingCases.forEach(c => console.log(`- ID: ${c.id}, Title: ${c.title}`));
    } else {
      console.log('All cases successfully deleted.');
    }
    
    return { deletedCount: deleteCount, totalCases: allCases.length };
  } catch (error) {
    console.error('Error resetting cases:', error);
    throw error;
  }
}

// Execute the function when run directly
import { fileURLToPath } from 'url';
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  resetAllCases()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Reset failed:', error);
      process.exit(1);
    });
}

export { resetAllCases };