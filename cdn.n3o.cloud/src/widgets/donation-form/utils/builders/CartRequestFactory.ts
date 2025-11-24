import { ConnectAddToCartReq } from '@n3oltd/karakoram.cart.sdk.connect';
import { RequestBuilder, CartRequestParams } from './interfaces';
import { FundRequestBuilder } from './FundRequestBuilder';
import { FeedbackRequestBuilder } from './FeedbackRequestBuilder';
import { SponsorshipRequestBuilder } from './SponsorshipRequestBuilder';

/**
 * Factory for creating cart requests using appropriate builders
 */
export class CartRequestFactory {
  private static builders: RequestBuilder<ConnectAddToCartReq, any>[] = [
    new FundRequestBuilder(),
    new FeedbackRequestBuilder(),
    new SponsorshipRequestBuilder(),
    
  ];

  /**
   * Builds a cart request using the appropriate builder
   */
  static buildRequest<TParams>(params: TParams): ConnectAddToCartReq {
    const builder = this.findBuilder(params);
    return builder.build(params);
  }

  /**
   * Builds multiple sponsorship requests for acquired beneficiaries
   */
  static buildSponsorshipRequests(params: Omit<CartRequestParams, 'quantity' | 'itemAmount'> & { 
    acquiredBeneficiaries: any[] 
  }): ConnectAddToCartReq[] {
    const sponsorshipBuilder = new SponsorshipRequestBuilder();
    
    const tempParams: CartRequestParams = {
      ...params,
      quantity: 1,
      itemAmount: 0
    };
    
    if (!sponsorshipBuilder.canHandle(tempParams)) {
      throw new Error('buildSponsorshipRequests can only be used for sponsorship designations');
    }

    if (params.acquiredBeneficiaries.length === 0) {
      throw new Error('At least one acquired beneficiary is required');
    }

    return params.acquiredBeneficiaries.map(beneficiary => 
      sponsorshipBuilder.build({
        ...params,
        quantity: 1,
        itemAmount: 0,
        acquiredBeneficiary: beneficiary
      })
    );
  }

  /**
   * Finds the appropriate builder for the given parameters
   */
  private static findBuilder<TParams>(params: TParams): RequestBuilder<ConnectAddToCartReq, TParams> {
    const builder = this.builders.find(b => b.canHandle(params));
    
    if (!builder) {
      throw new Error(`No builder found for request type. Available builders: ${this.builders.map(b => b.constructor.name).join(', ')}`);
    }
    
    return builder;
  }
}
