import { InsertCase } from "./schema";

/**
 * Helper function to slugify text for URL-friendly strings
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

/**
 * Format content from available data
 */
export const formatCaseContent = (title: string, summary: string, participants: string[] = []): string => {
  return `
# ${title}

## Summary
${summary}

${participants && participants.length > 0 ? `## Participants
${participants.map(p => `- ${p}`).join('\n')}` : ''}
  `;
};

/**
 * Transform raw case data into InsertCase format for database storage
 */
export const transformCaseData = (caseData: any): InsertCase => {
  // Skip malformed data
  if (!caseData.title || typeof caseData.title !== 'string') {
    throw new Error('Invalid case data: Missing or invalid title');
  }

  // Handle different ID formats (MongoDB-style or regular id)
  const isMongoFormat = caseData._id && caseData._id.$oid;
  const hasRegularId = caseData.id && typeof caseData.id === 'string';
  
  // Create a slug from the title
  const slug = caseData.slug || slugify(caseData.title);
  
  // Extract participants, handling different formats
  let participants: string[] = [];
  if (caseData.participants && Array.isArray(caseData.participants)) {
    participants = caseData.participants;
  }
  
  // Format content from available data
  const content = formatCaseContent(
    caseData.title, 
    caseData.summary || "",
    participants
  );
  
  // Add link to content if available
  const contentWithLink = caseData.link 
    ? `${content}\n\n## Original Source\n[View original source](${caseData.link})`
    : content;
  
  // Extract date information - handle various date formats
  let dateString = new Date().toISOString().split('T')[0]; // Default to today if no date
  
  if (caseData.date) {
    // Try to parse the date string - our schema expects ISO format "YYYY-MM-DD"
    try {
      const parsedDate = new Date(caseData.date);
      if (!isNaN(parsedDate.getTime())) {
        dateString = parsedDate.toISOString().split('T')[0];
      }
    } catch (e) {
      // If date parsing fails, keep the default
      console.warn(`Failed to parse date: ${caseData.date}`);
    }
  }
  
  // Extract category from tags if available
  let category = 'Legal';
  if (caseData.tags && Array.isArray(caseData.tags) && caseData.tags.length > 0) {
    category = caseData.tags[0];
  } else if (caseData.category) {
    category = caseData.category;
  }
  
  // Deal with tags array
  let tagsArray: string[] = ['Legal']; // Default
  if (caseData.tags && Array.isArray(caseData.tags)) {
    tagsArray = [...caseData.tags];
  }
  
  // Map JSON data to our schema
  return {
    title: caseData.title,
    summary: caseData.summary || "",
    content: contentWithLink,
    category: category,
    date: dateString,
    author: caseData.author || 'William Mackenzie', // Default author
    tags: tagsArray,
    slug: slug,
    // Default publishedToDiscord to false for imported cases
    publishedToDiscord: caseData.publishedToDiscord || false
  };
};

/**
 * Transform an array of raw case data into InsertCase format
 */
export const transformCasesData = (casesData: any[]): InsertCase[] => {
  // Process each case, filtering out any that fail to transform
  const transformedCases: InsertCase[] = [];
  
  for (const caseData of casesData) {
    try {
      // Skip entries that don't have required fields
      if (!caseData.title || !caseData.summary) {
        console.warn('Skipping case due to missing required fields:', caseData);
        continue;
      }
      
      const transformedCase = transformCaseData(caseData);
      transformedCases.push(transformedCase);
    } catch (error) {
      console.error('Error transforming case:', error);
      // Skip cases that fail to transform
    }
  }
  
  return transformedCases;
};