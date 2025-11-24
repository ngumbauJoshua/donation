export const EVENTS = {
  CHECKOUT: {
    checkoutOpen: 'n3o:cart:checkout:open',    
    checkoutClose: 'n3o:cart:checkout:close',    
  },
  CART: {
    refresh: 'n3o:cart-count:refresh', 
    requstCart: 'n3o:cart:request'
  },
  DONATION_FORM: {
    MODAL_OPEN: 'n3o:donation-form:modal:open',
    MODAL_CLOSE: 'n3o:donation-form:modal:close',
    HYDRATE: 'n3o:donation-form:hydrate'
  }
}