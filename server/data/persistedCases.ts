/**
 * This file handles persistence of case data between server restarts
 */
import fs from 'fs';
import path from 'path';
import { Case } from '../../shared/schema';

const DATA_FILE = path.join(process.cwd(), 'data', 'cases.json');

// Ensure data directory exists
function ensureDataDirExists() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Save cases to disk
 */
export function saveCases(cases: Case[]): void {
  try {
    ensureDataDirExists();
    fs.writeFileSync(DATA_FILE, JSON.stringify(cases, null, 2));
    console.log(`Saved ${cases.length} cases to disk storage`);
  } catch (error) {
    console.error('Error saving cases to disk:', error);
  }
}

/**
 * Load cases from disk
 * @returns Array of cases or null if no saved data exists
 */
export function loadCases(): Case[] | null {
  try {
    ensureDataDirExists();
    if (!fs.existsSync(DATA_FILE)) {
      console.log('No persisted cases data found');
      return null;
    }
    
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const cases = JSON.parse(data) as Case[];
    console.log(`Loaded ${cases.length} cases from disk storage`);
    return cases;
  } catch (error) {
    console.error('Error loading cases from disk:', error);
    return null;
  }
}