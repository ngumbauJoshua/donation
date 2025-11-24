import { PublishedFundStructure } from "@n3oltd/karakoram.connect.sdk.types";
import { DesignationType, GiftType, PublishedDesignation, PublishedFeedbackDesignation, PublishedFundDesignation, PublishedFundDimensionValues, } from "@n3oltd/karakoram.platforms.sdk.types";
import { PublishedSponsorshipSchemeFundDimensionOptions } from "@n3oltd/karakoram.sponsorships.sdk.connect";

export function getSuggestedAmounts(
  donationItem: PublishedFeedbackDesignation | PublishedFundDesignation | undefined, 
  giftType: string
) {
  if (!donationItem) {
    return [];
  }

  if ('suggestedAmounts' in donationItem && donationItem.suggestedAmounts) {
    if (giftType !== GiftType.OneTime && giftType !== GiftType.Recurring) {
      throw new Error(`Invalid giftType: ${giftType}. Expected 'oneTime' or 'recurring'.`);  
    }

    if (giftType === GiftType.Recurring) {
      return donationItem.suggestedAmounts.recurring;
    }

    return donationItem.suggestedAmounts.oneTime;
  }

  return [];
}

export function getDonationItem(
  designation: PublishedDesignation
): PublishedFeedbackDesignation | PublishedFundDesignation | undefined {
  if (designation.type === DesignationType.Feedback) {
    return designation.feedback;
  }

  return designation.fund;
}

export function getInitialFundDimensions(
  designation: PublishedDesignation, 
  fundStructure: PublishedFundStructure, 
  initialDimensionValue: PublishedFundDimensionValues | undefined, 
  fundDimensionOptions?: PublishedSponsorshipSchemeFundDimensionOptions) {
  if (!designation.type || !designation?.fundDimensions) {
    return {};
  }

  const fundDimensions = designation?.fundDimensions || {};
  
  const {
    dimension1: fundDimension1 = {},
    dimension2: fundDimension2 = {},
    dimension3: fundDimension3 = {},
    dimension4: fundDimension4 = {},
  } = fundDimensions || {};

  const {
    dimension1: initialDimension1,
    dimension2: initialDimension2,
    dimension3: initialDimension3,
    dimension4: initialDimension4,
  } = initialDimensionValue || {};

  const {
    dimension1Mapping,
    dimension2Mapping,
    dimension3Mapping,
    dimension4Mapping,
  } = fundDimensionOptions || {};

  const dimension1OffValue = fundStructure?.dimension1?.view?.toggle?.offValue;
  const dimension2OffValue = fundStructure?.dimension2?.view?.toggle?.offValue;
  const dimension3OffValue = fundStructure?.dimension3?.view?.toggle?.offValue;
  const dimension4OffValue = fundStructure?.dimension4?.view?.toggle?.offValue;

  return {
    dimension1:
      initialDimension1 ??
      (dimension1Mapping?.enabled ? dimension1Mapping.beneficiaryField : undefined) ??
      fundDimension1.fixed ??
      fundDimension1.suggested ??
      dimension1OffValue,
    dimension2:
      initialDimension2 ??
      (dimension2Mapping?.enabled ? dimension2Mapping.beneficiaryField : undefined) ??
      fundDimension2.fixed ??
      fundDimension2.suggested ??
      dimension2OffValue,
    dimension3:
      initialDimension3 ??
      (dimension3Mapping?.enabled ? dimension3Mapping.beneficiaryField : undefined) ??
      fundDimension3.fixed ??
      fundDimension3.suggested ??
      dimension3OffValue,
    dimension4:
      initialDimension4 ??
      (dimension4Mapping?.enabled ? dimension4Mapping.beneficiaryField : undefined) ??
      fundDimension4.fixed ??
      fundDimension4.suggested ??
      dimension4OffValue,
  };
}
