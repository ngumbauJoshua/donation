/**
 * React hook for loading and applying theme-specific CSS to shadow DOM
 */

import React, { useEffect, useRef } from 'react';
import { themeCSSInjector, type ThemeCSSConfig } from '@/services/ThemeCSSInjector';
import { useMetaTags } from './useMetaTags';
import { getSubscriptionCode } from '@/utils/env';

import { cdnConfig } from "@/api/common/config/CdnConfig";
import { Environment } from '@/api/common/contexts/EnvironmentProvider';

const subscriptionId = getSubscriptionCode();

export interface UseThemeCSSOptions {
  /**
   * Override CDN URL from runtime config
   */
  cdnUrl?: string;
  
  /**
   * Custom element tag name (e.g., 'n3o-donation-form')
   * Used to find the shadow root for CSS injection
   */
  elementName?: string;

  /**
   * Environment name (e.g., 'development', 'production')
   * Defaults to 'development'
   */
  env?: Environment;
}

export interface UseThemeCSSReturn {
  isLoading: boolean;
  error: Error | null;
  themeId: string | null;
  cdnUrl: string | null | undefined;
  reload: () => void;
}

/**
 * Hook to automatically load and inject theme CSS into shadow DOM
 * 
 * @example
 * ```tsx
 * function DonationFormWrapper() {
 *   const { isLoading, error, themeId } = useThemeCSS({
 *     elementName: 'n3o-donation-form'
 *   });
 *   
 *   if (isLoading) return <div>Loading theme...</div>;
 *   if (error) console.error('Theme loading error:', error);
 *   
 *   return <DonationFormInline {...props} />;
 * }
 * ```
 */
export function useThemeCSS(options: UseThemeCSSOptions = {}): UseThemeCSSReturn {
  const {
    elementName,
    env,
  } = options;

  const { common } = useMetaTags();
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const hasInjectedRef = useRef(false);

  const themeId = common.getTheme() || 'default';
  const cdnUrl = env ? `${cdnConfig[env].host}/connect-${subscriptionId}` : null;

  const injectThemeCSS = React.useCallback(async () => {
    if (!cdnUrl) {
      return;
    }

    if (hasInjectedRef.current) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (elementName && typeof document !== 'undefined') {
        const elements = Array.from(document.querySelectorAll(elementName));

        if (elements.length === 0) {
          const observer = new MutationObserver(() => {
            const lateElements = Array.from(document.querySelectorAll(elementName));
            if (lateElements.length > 0) {
              for (const el of lateElements) {
                const root = (el as any).shadowRoot as ShadowRoot | null;
                if (root) {
                  const config: ThemeCSSConfig = { cdnUrl, themeId: themeId || undefined };
                  themeCSSInjector.updateTheme(root, config);
                }
              }
              hasInjectedRef.current = true;
              observer.disconnect();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
          return;
        }

        for (const el of elements) {
          const root = (el as any).shadowRoot as ShadowRoot | null;
          if (root) {
            const config: ThemeCSSConfig = { cdnUrl, themeId: themeId || undefined };
            themeCSSInjector.updateTheme(root, config);
          }
        }
        hasInjectedRef.current = true;
      } else {
        console.warn('[useThemeCSS] Provide elementName option to locate the shadow root.');
        return;
      }
      
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to inject theme CSS');
      setError(error);
      console.error('[useThemeCSS] Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cdnUrl, themeId, elementName]);

  const reload = React.useCallback(() => {
    hasInjectedRef.current = false;
    injectThemeCSS();
  }, [injectThemeCSS]);

  useEffect(() => {
    injectThemeCSS();
  }, [injectThemeCSS]);

  return {
    isLoading,
    error,
    themeId,
    cdnUrl,
    reload
  };
}

