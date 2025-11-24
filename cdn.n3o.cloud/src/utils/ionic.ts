export function isIonic(): boolean {
  return !!(
    document.querySelector("ion-app") ||
    (window as any).Ionic ||
    (window as any).toastController
  );
}
