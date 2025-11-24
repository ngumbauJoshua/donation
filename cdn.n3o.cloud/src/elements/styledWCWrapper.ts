import r2wc from "@r2wc/react-to-web-component";

import  '@n3oltd/n3o-ui-components/dist/index.css';
import   '@/index.css';

import { applyTheme, Theme } from '@utils/theme';
import configuiration from '@/configuration.json';
import { PublishedBuildConfiguration } from "@n3oltd/karakoram.connect.sdk.types";

applyTheme((configuiration as PublishedBuildConfiguration).themes?.default as Theme);

declare global {
  interface Window {
    __styles: Record<string, CSSStyleSheet>;
  }
}

export const r2wcStyled = <Props extends object>(
  Component: Parameters<typeof r2wc<Props>>[0],
  options?: Parameters<typeof r2wc<Props>>[1]
) => {
  const WebComponent = r2wc<Props>(Component, { shadow: 'open', ...options });

  class WebComponentWithStyle extends WebComponent {
    connectedCallback() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      super.connectedCallback();
      // @ts-expect-error might be undefined
      const shadowRoot = this.container as ShadowRoot;
      //document.adoptedStyleSheets = Object.values(window.__styles || {});
      
      shadowRoot.adoptedStyleSheets = Object.values(window.__styles || {});
      window.addEventListener('vite:css-injected-by-js', () => {
        //document.adoptedStyleSheets = Object.values(window.__styles || {});
        shadowRoot.adoptedStyleSheets = Object.values(window.__styles || {});
      });
    }
  }

  return WebComponentWithStyle;
};