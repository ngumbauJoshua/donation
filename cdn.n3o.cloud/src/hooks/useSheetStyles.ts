import { useEffect } from 'react';

export const useSheetStyles = (open: boolean, toggleOpen: (value: React.SetStateAction<boolean>) => void) => {
  useEffect(() => {
    toggleOpen(open);
    
    const checkoutElement = document.querySelector('n3o-checkout');
    
    if (open) {
      document.adoptedStyleSheets = Object.values(window.__styles || {});
      const styleTag = document.createElement('style');
      styleTag.innerHTML = `
        html {
          font-size: unset;
        }
        
        label {
          all: unset
        } 
        
        input[type='text'] {
          all: unset
        }
        
        input[type='email']{
          all: unset
        }
        
        input[type='tel']{
          all: unset
        }
      `;
      checkoutElement?.appendChild(styleTag)
    }

    if (!open) {
      const styles = checkoutElement?.querySelector('style');
      if (styles) {
        checkoutElement?.removeChild(styles)
      }
      document.adoptedStyleSheets[0] = new CSSStyleSheet();
    }
  }, [open, toggleOpen]);
};