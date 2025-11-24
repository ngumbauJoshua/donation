export function syncCheckoutProp(toggle = false) {
  const widget = document.querySelector('n3o-checkout');
  if (widget) {
    widget.setAttribute('open', String(toggle));
  }
}