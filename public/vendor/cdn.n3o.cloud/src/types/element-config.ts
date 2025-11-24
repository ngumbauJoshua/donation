import { GiftType } from "@n3oltd/karakoram.platforms.sdk.types";

export enum ElementType {
  DONATION_BUTTON = 'donation-button',
  DONATION_FORM = 'donation-form',
  DONATION_FORM_MODAL = 'donation-form-modal',
  DONATION_FORM_INLINE = 'donation-form-inline',
  CHECKOUT = 'checkout',
  CART_ITEMS_COUNT = 'cart-items-count',
  DONATION_LEADERBOARD = 'donation-leaderboard'
}

export interface DonationFormConfig {
  data: {
    formId?: string;
    fundDimension1?: string;
    fundDimension2?: string;
    fundDimension3?: string;
    fundDimension4?: string;
    amount?: number;
    frequency?: GiftType;
    designation?: string;
  };
  ui: {
    hideDesignation?: boolean;
    hideFundDimension1?: boolean;
    hideFundDimension2?: boolean;
    hideFundDimension3?: boolean;
    hideFundDimension4?: boolean;
    hideAmount?: boolean;
    hideFrequency?: boolean;
  };
}

export interface ElementConfig {
  data: DonationFormConfig['data'];
  ui: DonationFormConfig['ui'];
  metadata: {
    source: 'props' | 'event' | 'commservice';
    priority: 'low' | 'medium' | 'high';
    timestamp: Date;
    elementType: ElementType;
  };
}

export type ElementDataConfig = DonationFormConfig['data'];
export type ElementUIConfig = DonationFormConfig['ui'];
