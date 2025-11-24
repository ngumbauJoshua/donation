import React from 'react';
import { PublishedFundDimensionValues, PublishedFundStructure } from "@n3oltd/karakoram.connect.sdk.types";
import { GiftType, PublishedDesignation } from "@n3oltd/karakoram.platforms.sdk.types";
import { getInitialFundDimensions } from "../helpers/donationUtils";
import { getOtherAmount } from "../helpers/pricing";
import { PublishedSponsorshipSchemeFundDimensionOptions } from '@n3oltd/karakoram.sponsorships.sdk.connect';

interface UseFundDimensionsProps {
  designation: PublishedDesignation;
  fundStructure: PublishedFundStructure;
  frequency: GiftType;
  initialFundDimensions?: PublishedFundDimensionValues;
  fundDimensionOptions?: PublishedSponsorshipSchemeFundDimensionOptions;
}

/**
 * Hook responsible for managing fund dimensions state and logic
 * 
 * Responsibilities:
 * - Track fund dimension selections
 * - Handle dimension changes
 * - Provide helper to get updated amount when dimensions affect pricing
 * - Leaves quantity handling to the consuming component
 */
export function useFundDimensions({
  designation,
  fundStructure,
  frequency,
  initialFundDimensions,
  fundDimensionOptions
}: UseFundDimensionsProps) {
  
  const [fundDimensions, setFundDimensions] = React.useState<PublishedFundDimensionValues>(
    () => getInitialFundDimensions(designation, fundStructure, initialFundDimensions, fundDimensionOptions)
  );

  const handleFundDimensionChange = React.useCallback((dimension: string, value: string) => {
    const newFundDimensions = { ...fundDimensions, [dimension]: value };
    setFundDimensions(newFundDimensions);
  }, [fundDimensions]);

  return {
    fundDimensions,
    handleFundDimensionChange,
    getUpdatedAmount: React.useCallback((newDimensions?: PublishedFundDimensionValues) => {
      const targetDimensions = newDimensions || fundDimensions;
      const newOtherAmount = getOtherAmount(designation, targetDimensions, frequency);
      return newOtherAmount.amount && newOtherAmount.amount > 0 ? newOtherAmount.amount : null;
    }, [designation, fundDimensions, frequency])
  };
}
