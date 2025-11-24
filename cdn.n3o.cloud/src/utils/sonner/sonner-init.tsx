import { createRoot } from 'react-dom/client';
import { Toaster, toast } from 'sonner';

declare global {
  interface Window {
    toast: typeof toast;
  }
}

let sonnerInitialized = false;

export const initializeSonner = (): void => {
  // Only initialize if not in Ionic environment
  if (!sonnerInitialized && !document.querySelector('ion-app') && !(window as any).Ionic) {
    const toasterContainer = document.createElement('div');
    toasterContainer.id = 'sonner-toaster';
    document.body.appendChild(toasterContainer);
    
    const root = createRoot(toasterContainer);
    root.render(
      <Toaster 
        position="bottom-right"
        richColors
        closeButton
        expand={true}
        visibleToasts={10}
      />
    );
    
    window.toast = toast;
    sonnerInitialized = true;
  }
};