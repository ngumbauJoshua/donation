import { PublishedFundDimensionValues, PublishedPricing, PublishedPricingRule} from '@n3oltd/karakoram.connect.sdk.types'
import { DesignationType, GiftType, PublishedDesignation, PublishedDesignationDonationItem } from "@n3oltd/karakoram.platforms.sdk.types"
export function shouldShowSuggestedAmount(
  designation: PublishedDesignation,
  selectedDimensions: PublishedFundDimensionValues
): boolean {
  if(designation.type === DesignationType.Feedback || designation.type === DesignationType.Sponsorship) {
    return false;
  }

  const hasOneTimeAmounts =  !!(designation.fund?.suggestedAmounts?.oneTime && designation.fund?.suggestedAmounts?.oneTime?.length > 0);
  const hasRecurringAmounts = !!(designation.fund?.suggestedAmounts?.recurring && designation.fund?.suggestedAmounts?.recurring?.length > 0);
  const hasAmounts = designation.suggestedGiftType === GiftType.OneTime ? hasOneTimeAmounts : hasRecurringAmounts;

  // Show price handles if:
  // 1. There are suggested amounts available AND
  // 2. The item does NOT have a price
  return hasAmounts && !_hasPrice(selectedDimensions, designation.fund?.item);
}

function _hasPrice(selectedDimensions: PublishedFundDimensionValues, item?: PublishedDesignationDonationItem): boolean {
  return !!item?.pricing?.price?.amount || !!matchingPricingRule(selectedDimensions, item?.pricing?.rules);
}

export function shouldShowCustomAmountField(pricing: PublishedPricing){
  return !pricing;
}


export function matchingPricingRule(selectedDimensions: PublishedFundDimensionValues  | undefined,
                              rules: PublishedPricingRule[] | undefined){
  return rules?.find((r) => {
      return (
        (r.fundDimensions?.dimension1
          ? r.fundDimensions?.dimension1 === selectedDimensions?.dimension1
          : true) &&
        (r.fundDimensions?.dimension2
          ? r.fundDimensions?.dimension2 === selectedDimensions?.dimension2
          : true) &&
        (r.fundDimensions?.dimension3
          ? r.fundDimensions?.dimension3 === selectedDimensions?.dimension3
          : true) &&
        (r.fundDimensions?.dimension4
          ? r.fundDimensions?.dimension4 === selectedDimensions?.dimension4
          : true)
      );
    });
}

export function getOtherAmount(designation: PublishedDesignation, selectedDimensions: PublishedFundDimensionValues, giftType: GiftType) {
  
  const isFundTypeAndOneTimeGift = designation.type === DesignationType.Fund && giftType === GiftType.OneTime;
  const isFundTypeAndRecurringGift = designation.type === DesignationType.Fund && giftType === GiftType.Recurring;

  const hasOneTimeSuggestedAmounts =  !!designation.fund?.suggestedAmounts?.oneTime?.length;
  const hasRecurringSuggestedAmounts =  !!designation.fund?.suggestedAmounts?.recurring?.length;
  
  if (isFundTypeAndOneTimeGift && hasOneTimeSuggestedAmounts) {
    return {
      amount: null,
      locked: false
    }   
  }

  if (isFundTypeAndRecurringGift && hasRecurringSuggestedAmounts) {
    return {
      locked: false
    }   
  }

  const pricing = getPricing(designation);

  if(!pricing){
    return {
      locked: false
    } 
  }

  const matchingRule = matchingPricingRule(selectedDimensions, pricing.rules);

  if (matchingRule) {
    return {
      amount: matchingRule.price?.amount,
      locked: matchingRule.price?.locked || false
    };
  }

  return {
    amount: pricing.price?.amount,
    locked: pricing.price?.locked || false
  };
}

export function getPricing(designation: PublishedDesignation): PublishedPricing | undefined{
  if (designation.type === DesignationType.Fund) {
    return designation.fund?.item?.pricing;
  }

  if (designation.type === DesignationType.Feedback) {
    return designation.feedback?.pricing; 
  }

  if (designation.type === DesignationType.Sponsorship) {
    //TODO: sponsorship pricing is not yet implemented
    return designation.sponsorship?.components?.find((c) => c.name)?.pricing; 
  }

}