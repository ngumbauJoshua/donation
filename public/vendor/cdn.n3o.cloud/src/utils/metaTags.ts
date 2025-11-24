/**
 * Meta tag utilities for reading and parsing HTML meta tags
 */

export interface MetaTag {
  name?: string;
  content: string;
}

export interface ParsedMetaTags {
  [key: string]: string;
}

/**
 * Reads all meta tags from the document head
 * @returns Array of meta tag objects
 */
export function getAllMetaTags(): MetaTag[] {
  if (typeof document === 'undefined') {
    return [];
  }

  const metaTags = document.querySelectorAll('meta');
  return Array.from(metaTags).map(tag => ({
    name: tag.getAttribute('name') || undefined,
    content: tag.getAttribute('content') || '',
  }));
}

/**
 * Gets a specific meta tag by name attribute
 * @param name - The name attribute value to search for
 * @returns The meta tag content or null if not found
 */
export function getMetaTagByName(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const metaTag = document.querySelector(`meta[name="${name}"]`);
  return metaTag ? metaTag.getAttribute('content') : null;
}


/**
 * Gets multiple meta tags by their names and returns as an object
 * @param names - Array of meta tag names to retrieve
 * @returns Object with name-value pairs
 */
export function getMetaTagsByNames(names: string[]): ParsedMetaTags {
  const result: ParsedMetaTags = {};
  
  names.forEach(name => {
    const content = getMetaTagByName(name);
    if (content !== null) {
      result[name] = content;
    }
  });

  return result;
}

/**
 * Gets all meta tags parsed into a convenient object format
 * @returns Object with all meta tag key-value pairs
 */
export function getParsedMetaTags(): ParsedMetaTags {
  const metaTags = getAllMetaTags();
  const result: ParsedMetaTags = {};

  metaTags.forEach(tag => {
    if (tag.name && tag.content) {
      result[tag.name] = tag.content;
    }
  });

  return result;
}

/**
 * Common meta tag getters for frequently used tags
 */
export const commonMetaTags = {
  getCrowdfundingId: () => getMetaTagByName('n3o-crowdfunder-id'),
  getCampaignId: () => getMetaTagByName('n3o-campaign-id'),
  getTheme: () => getMetaTagByName('n3o-theme'),
};