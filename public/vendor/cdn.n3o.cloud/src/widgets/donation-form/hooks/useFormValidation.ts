import React from 'react';
import { PublishedFundDimensionValues, PublishedFundStructure } from "@n3oltd/karakoram.connect.sdk.types";
import { GiftType, PublishedDesignation, } from "@n3oltd/karakoram.platforms.sdk.types";
import { PublishedFundStructureKey } from "../types";

interface UseFormValidationProps {
  hasValidAmount: boolean;
  frequency: GiftType | null;
  fundDimensions: PublishedFundDimensionValues;
  fundStructure: PublishedFundStructure;
  designation: PublishedDesignation;
}

/**
 * Hook responsible for form validation logic
 * 
 * Responsibilities:
 * - Validate amount requirements
 * - Validate frequency selection
 * - Validate required fund dimensions
 * - Provide overall form validity state
 */
export function useFormValidation({
  hasValidAmount,
  frequency,
  fundDimensions,
  fundStructure,
  designation
}: UseFormValidationProps) {
  
  const isFormValid = React.useMemo(() => {
    if (!hasValidAmount) {
      return false;
    }

    if (!frequency) {
      return false;
    }

    const activeDimensions = ['dimension1', 'dimension2', 'dimension3', 'dimension4'].filter(dim => {
      const dimensionKey = dim as PublishedFundStructureKey;
      const fundDim = fundStructure[dimensionKey];
      const designationFundDim = designation?.fundDimensions?.[dimensionKey];
      
      // A dimension is active and requires user input if:
      // 1. It exists in fund structure and is marked as active
      // 2. It's not fixed (handled by designation) - fixed values don't need user input
      // 3. It has more than one option available for selection
      const isActive = fundDim?.isActive;
      const isFixed = !!designationFundDim?.fixed;
      const hasMultipleOptions = !designationFundDim?.options?.length || designationFundDim.options.length >= 2;
      
      return isActive && !isFixed && hasMultipleOptions;
    });

    for (const dimension of activeDimensions) {
      const dimensionKey = dimension as PublishedFundStructureKey;
      const dimensionValue = fundDimensions[dimensionKey];
      
      if (!dimensionValue || dimensionValue.trim() === '') {
        return false;
      }
    }

    return true;
  }, [hasValidAmount, frequency, fundDimensions, fundStructure, designation]);

  return {
    isFormValid
  };
}
