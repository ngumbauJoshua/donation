import { useState, useEffect, useCallback } from 'react';
import {
  getAllMetaTags,
  getMetaTagByName,
  getMetaTagsByNames,
  getParsedMetaTags,
  commonMetaTags,
  type MetaTag,
  type ParsedMetaTags,
} from '@/utils/metaTags';

export interface UseMetaTagsOptions {
  /**
   * Whether to automatically update when meta tags change in the DOM
   * @default false
   */
  watch?: boolean;
  /**
   * Specific meta tag names to watch for changes
   */
  watchNames?: string[];
}

export interface UseMetaTagsReturn {
  allTags: MetaTag[];
  parsedTags: ParsedMetaTags;
  getByName: (name: string) => string | null;
  getByNames: (names: string[]) => ParsedMetaTags;
  common: typeof commonMetaTags;
  refresh: () => void;
  isWatching: boolean;
}

/**
 * Custom React hook for reading and managing meta tags
 * 
 * @param options Configuration options for the hook
 * @returns Object with meta tag data and utility functions
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { parsedTags, getByName, common } = useMetaTags();
 *   
 *   const description = getByName('description');
 *   const ogTitle = common.getOgTitle();
 *   
 *   return (
 *     <div>
 *       <p>Description: {description}</p>
 *       <p>OG Title: {ogTitle}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useMetaTags(options: UseMetaTagsOptions = {}): UseMetaTagsReturn {
  const { watch = false, watchNames = [] } = options;
  
  const [allTags, setAllTags] = useState<MetaTag[]>([]);
  const [parsedTags, setParsedTags] = useState<ParsedMetaTags>({});
  const [isWatching, setIsWatching] = useState(false);

  const getByName = useCallback((name: string) => {
    return getMetaTagByName(name);
  }, []);


  const getByNames = useCallback((names: string[]) => {
    return getMetaTagsByNames(names);
  }, []);

  const refresh = useCallback(() => {
    const tags = getAllMetaTags();
    const parsed = getParsedMetaTags();
    setAllTags(tags);
    setParsedTags(parsed);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!watch || typeof document === 'undefined') {
      setIsWatching(false);
      return;
    }

    setIsWatching(true);

    // Create a MutationObserver to watch for changes to meta tags
    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);
          
          const hasMetaChanges = [...addedNodes, ...removedNodes].some(
            node => node.nodeName?.toLowerCase() === 'meta'
          );

          if (hasMetaChanges) {
            shouldRefresh = true;
          }
        } else if (mutation.type === 'attributes') {
          const target = mutation.target as Element;
          if (target.nodeName?.toLowerCase() === 'meta') {
            // If we're watching specific names, check if this tag matches
            if (watchNames.length > 0) {
              const name = target.getAttribute('name');
              
              const nameMatches = name && watchNames.includes(name);
              if (nameMatches) {
                shouldRefresh = true;
              }
            } else {
              shouldRefresh = true;
            }
          }
        }
      });

      if (shouldRefresh) {
        refresh();
      }
    });

    // Observe changes to the document head
    observer.observe(document.head, {
      childList: true,
      attributes: true,
      attributeFilter: ['name', 'content'],
      subtree: true,
    });

    return () => {
      observer.disconnect();
      setIsWatching(false);
    };
  }, [watch, watchNames, refresh]);

  return {
    allTags,
    parsedTags,
    getByName,
    getByNames,
    common: commonMetaTags,
    refresh,
    isWatching,
  };
}

/**
 * Hook for getting a specific meta tag by name with reactive updates
 * 
 * @param name The meta tag name to watch
 * @param options Configuration options
 * @returns The meta tag content or null
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const description = useMetaTag('description');
 *   return <p>{description}</p>;
 * }
 * ```
 */
export function useMetaTag(name: string, options: Pick<UseMetaTagsOptions, 'watch'> = {}) {
  const { getByName, refresh } = useMetaTags({
    watch: options.watch,
    watchNames: [name],
  });

  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(getByName(name));
  }, [getByName, name, refresh]);

  return value;
}