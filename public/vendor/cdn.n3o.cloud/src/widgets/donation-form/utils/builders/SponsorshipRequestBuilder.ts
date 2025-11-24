import { 
  ConnectAddToCartReq, 
  AllocationType, 
  TransactionType, 
  NewCommitmentReq, 
  SponsorshipCommitmentType,
  CommitmentOptionsReq,
  FundDimensionValues 
} from '@n3oltd/karakoram.cart.sdk.connect';
import { DesignationType, GiftType } from "@n3oltd/karakoram.platforms.sdk.types";
import { Currency } from "@n3oltd/karakoram.connect.sdk.types";
import { DesignationRequestBuilder, CartRequestParams } from './interfaces';
import { CartRequestAnalytics } from './CartRequestAnalytics';
import { PublishedBeneficiary } from '@n3oltd/karakoram.sponsorships.sdk.connect';
import { PublishedFundStructureKey } from '../../types';

/**
 * Builder for Sponsorship designation requests
 */
export class SponsorshipRequestBuilder implements DesignationRequestBuilder {
  
  canHandle(params: CartRequestParams): boolean {
    return params.designation?.type === DesignationType.Sponsorship;
  }

  validate(params: CartRequestParams): void {
    if (!params.designation?.type) {
      throw new Error('Designation type is required');
    }
    
    if (params.designation.type !== DesignationType.Sponsorship) {
      throw new Error('SponsorshipRequestBuilder can only handle Sponsorship designations');
    }
    
    if (!params.designation.sponsorship?.scheme?.id) {
      throw new Error('Sponsorship scheme ID is required');
    }
    
    if (!params.duration) {
      throw new Error('Duration is required for sponsorship');
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
    const commitment = this.buildCommitment(params);
    const perBeneficiaryTotal = this.calculatePerBeneficiaryTotal(commitment, params);
    
    const fundDimensions = this.backFillFromBeneficiary(params.fundDimensions, params.acquiredBeneficiary!)
    
    return {
      type: transactionType,
      quantity: 1, // Always 1 per beneficiary
      item: {
        tags,
        type: AllocationType.Sponsorship,
        fundDimensions: fundDimensions,
        sponsorship: {
          beneficiaryReference: params.acquiredBeneficiary?.reference || '',
          scheme: params.designation.sponsorship?.scheme?.id || '',
          commitment: commitment,
        },
        value: {
          currency: params.targetCurrency?.code as Currency,
          amount: perBeneficiaryTotal,
        }
      }
    };
  }

  /**
   * Builds commitment details for sponsorship
   */
  private buildCommitment(params: CartRequestParams): NewCommitmentReq {
    const commitmentType = params.frequency === GiftType.OneTime 
      ? SponsorshipCommitmentType.FixedTerm 
      : SponsorshipCommitmentType.OpenEnded;

    return {
      options: {
        type: commitmentType,
        duration: params.frequency === GiftType.OneTime ? params.duration : undefined
      } as CommitmentOptionsReq,
      fundDimensions: params.fundDimensions,
      components: Object.entries(params.sponsorshipComponents || {})
        .filter(([, comp]) => comp.enabled)
        .map(([name, component]) => ({
          name: name,
          monthlyValue: {
            amount: component.amount,
            currency: params.targetCurrency?.code as Currency
          },
          quantity: 1
        })),
    };
  }

  /**
   * Calculates total amount per beneficiary
   */
  private calculatePerBeneficiaryTotal(commitment: NewCommitmentReq, params: CartRequestParams): number {
    const durationValue = Number(params.duration!.replace(/_/g, ''));
    const monthlyTotal = commitment.components?.reduce((sum, comp) => sum + (comp.monthlyValue?.amount || 0), 0) || 0;
    return monthlyTotal * durationValue;
  }

  /**
   * Backfills fund dimensions from beneficiary data
   */
  private backFillFromBeneficiary(dimensions: FundDimensionValues, beneficiary: PublishedBeneficiary): FundDimensionValues {
    const updatedDimensions: FundDimensionValues = {...dimensions };

    for (const key in dimensions) {
      const value = dimensions[key as PublishedFundStructureKey];
      
      if (!value || !value.includes('beneficiary')) {
        updatedDimensions[key as PublishedFundStructureKey] = value;
        continue;
      }

      if (value.includes('beneficiary')) {
        const parts = value.split(/(?<=beneficiary)/i);
        
        if (parts.length < 2) {
          updatedDimensions[key as PublishedFundStructureKey] = (beneficiary as any)[key] || null;
          continue;
        }

        const field = parts[1].charAt(0).toLowerCase() + parts[1].slice(1);
        updatedDimensions[key as PublishedFundStructureKey] = (beneficiary as any)[field] || null;
      }
    }

    return updatedDimensions;
  }
}
