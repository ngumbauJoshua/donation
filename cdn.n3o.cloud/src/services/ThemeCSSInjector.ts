/**
 * Simple theme CSS injection using <link> elements in shadow DOM
 */

export interface ThemeCSSConfig {
  cdnUrl: string;
  themeId?: string;
}

export class ThemeCSSInjector {
  private static instance: ThemeCSSInjector;
  private injectedRoots = new WeakSet<ShadowRoot>();

  private constructor() {}

  public static getInstance(): ThemeCSSInjector {
    if (!ThemeCSSInjector.instance) {
      ThemeCSSInjector.instance = new ThemeCSSInjector();
    }
    return ThemeCSSInjector.instance;
  }

  /**
   * Build the theme CSS URL based on themeId
   * - For 'default' or undefined: {cdnUrl}/themes/styles.css
   * - For other themes: {cdnUrl}/themes/{themeId}/styles.css
   */
  private buildThemeUrl(cdnUrl: string, themeId?: string): string {
    const baseUrl = cdnUrl.endsWith('/') ? cdnUrl.slice(0, -1) : cdnUrl;
    
    if (!themeId || themeId === 'default') {
      return `${baseUrl}/themes/style.css`;
    }
    
    return `${baseUrl}/themes/${themeId}/style.css`;
  }

  /**
   * Inject theme CSS into shadow DOM using <link> element
   */
  public injectIntoShadowRoot(
    shadowRoot: ShadowRoot,
    config: ThemeCSSConfig
  ): HTMLLinkElement {
    if (this.injectedRoots.has(shadowRoot)) {
      const existingLink = shadowRoot.querySelector('link[data-theme-css]');
      if (existingLink) {
        return existingLink as HTMLLinkElement;
      }
    }

    const url = this.buildThemeUrl(config.cdnUrl, config.themeId);
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-theme-css', 'true');
    link.setAttribute('data-theme-id', config.themeId || 'default');

    link.onload = () => {
      console.log(`[ThemeCSS] Loaded theme "${config.themeId || 'default'}" from ${url}`);
    };

    link.onerror = () => {
      console.error(`[ThemeCSS] Failed to load theme CSS from ${url}`);
    };

    shadowRoot.appendChild(link);
    this.injectedRoots.add(shadowRoot);

    return link;
  }

  /**
   * Update or switch the theme CSS for a given shadow root
   * - If a theme link exists and URL differs, update href in-place
   * - If no link exists, inject a new one
   */
  public updateTheme(
    shadowRoot: ShadowRoot,
    config: ThemeCSSConfig
  ): HTMLLinkElement {
    const url = this.buildThemeUrl(config.cdnUrl, config.themeId);

    const existingLink = shadowRoot.querySelector('link[data-theme-css]') as HTMLLinkElement | null;
    if (existingLink) {
      // No-op if already pointing to the same URL
      if (existingLink.href === url) {
        return existingLink;
      }

      existingLink.setAttribute('data-theme-id', config.themeId || 'default');
      existingLink.href = url;
      return existingLink;
    }

    return this.injectIntoShadowRoot(shadowRoot, config);
  }


  /**
   * Preload theme CSS for better performance
   */
  public preload(config: ThemeCSSConfig): HTMLLinkElement {
    const url = this.buildThemeUrl(config.cdnUrl, config.themeId);
    
    const existing = document.head.querySelector(
      `link[rel="preload"][href="${url}"]`
    );
    if (existing) {
      return existing as HTMLLinkElement;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = url;
    link.setAttribute('data-theme-preload', 'true');

    document.head.appendChild(link);
    
    console.log(`[ThemeCSS] Preloading theme "${config.themeId || 'default'}"`);
    
    return link;
  }
}

export const themeCSSInjector = ThemeCSSInjector.getInstance();

