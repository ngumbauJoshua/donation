import { ConnectAddToCartReq, AllocationType, TransactionType } from '@n3oltd/karakoram.cart.sdk.connect';
import { DesignationType, GiftType } from "@n3oltd/karakoram.platforms.sdk.types";
import { Currency } from "@n3oltd/karakoram.connect.sdk.types";
import { DesignationRequestBuilder, CartRequestParams } from './interfaces';
import { CartRequestAnalytics } from './CartRequestAnalytics';

/**
 * Builder for Fund designation requests
 */
export class FundRequestBuilder implements DesignationRequestBuilder {
  
  canHandle(params: CartRequestParams): boolean {
    return params.designation?.type === DesignationType.Fund;
  }

  validate(params: CartRequestParams): void {
    if (!params.designation?.type) {
      throw new Error('Designation type is required');
    }
    
    if (params.designation.type !== DesignationType.Fund) {
      throw new Error('FundRequestBuilder can only handle Fund designations');
    }
    
    if (!params.targetCurrency?.code) {
      throw new Error('Target currency is required');
    }
  }

  build(params: CartRequestParams): ConnectAddToCartReq {
    this.validate(params);
    
    const transactionType = params.frequency === GiftType.OneTime 
      ? TransactionType.Donation 
      : TransactionType.RegularGiving;
    
    const tags = CartRequestAnalytics.captureAndGetTags(params.designation);
    
    return {
      type: transactionType,
      quantity: params.quantity,
      item: {
        tags,
        type: AllocationType.Fund,
        fundDimensions: params.fundDimensions,
        fund: {
          donationItem: params.designation.fund?.item?.id,
        },
        value: {
          amount: params.itemAmount,
          currency: params.targetCurrency?.code as Currency,
        }
      }
    };
  }
}
