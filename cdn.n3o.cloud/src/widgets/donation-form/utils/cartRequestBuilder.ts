import { ExtendedCurrency } from "@/helpers/CurrencyConverter";
import { PublishedFundDimensionValues } from "@n3oltd/karakoram.connect.sdk.types";
import { GiftType, PublishedDesignation } from "@n3oltd/karakoram.platforms.sdk.types";
import { ConnectAddToCartReq } from '@n3oltd/karakoram.cart.sdk.connect';
import { PublishedBeneficiary } from "@n3oltd/karakoram.sponsorships.sdk.connect";
import { CartRequestFactory } from './builders';

export interface CustomFieldValue {
  alias: string;
  type: string;
  value: string | boolean | Date | null;
}

interface CartRequestParams {
  designation: PublishedDesignation;
  duration?: string;
  frequency: GiftType;
  quantity: number;
  itemAmount: number;
  fundDimensions: PublishedFundDimensionValues;
  targetCurrency: ExtendedCurrency | null;
  customFields?: CustomFieldValue[];
  sponsorshipComponents?: Record<string, { enabled: boolean; amount: number }>;
  acquiredBeneficiary?: PublishedBeneficiary;
}


export class CartRequestBuilder {
  
  /**
   * Main build method that delegates to the appropriate builder
   */
  static build(params: CartRequestParams): ConnectAddToCartReq {
    return CartRequestFactory.buildRequest(params);
  }

  /**
   * Builds multiple sponsorship cart requests for acquired beneficiaries
   * Each beneficiary gets its own cart item
   */
  static buildSponsorshipRequests(params: Omit<CartRequestParams, 'quantity' | 'itemAmount'> & { 
    acquiredBeneficiaries: PublishedBeneficiary[] 
  }): ConnectAddToCartReq[] {
    return CartRequestFactory.buildSponsorshipRequests(params);
  }

}
