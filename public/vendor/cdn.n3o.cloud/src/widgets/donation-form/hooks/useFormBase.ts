import React from 'react';
import { useAddToCart } from "./useAddToCart";
import { useAmountManagement } from "./useAmountManagement";
import { useFormValidation } from "./useFormValidation";
import { useFundDimensions } from "./useFundDimensions";
import { 
  FormValidatorFactory, 
} from "@/services/validators";
import { AnalyticsService } from '@/services/AnalyticsService';
import { useCurrencyObserver } from "../../../hooks/CurrencyStore";
import { getDonationItem } from "../helpers/donationUtils";
import { getOtherAmount } from "../helpers/pricing";
import { shouldMakeApiCall } from "../helpers/previewUtils";
import { GiftType } from "@n3oltd/karakoram.platforms.sdk.types";
import { PublishedSponsorshipSchemeFundDimensionOptions } from "@n3oltd/karakoram.sponsorships.sdk.connect";
import { DonationModalFromProps } from "../types";

interface UseFormBaseProps extends DonationModalFromProps {
  fundDimensionOptions?: PublishedSponsorshipSchemeFundDimensionOptions;
}

/**
 * Base hook containing all common functionality shared across different form types
 * 
 * Provides:
 * - Currency management
 * - Amount and quantity management  
 * - Fund dimensions management
 * - Form validation
 * - Cart operations
 * - Hydration handling
 * - Common event handlers
 */
export function useFormBase(props: UseFormBaseProps) {
  const { designation, fundStructure, onAddToCartSuccess, initialValues, fundDimensionOptions } = props;
  const donationItem = getDonationItem(designation);
  
  const { currency: targetCurrency, isConverting } = useCurrencyObserver(0);
  
  const getInitialFrequency = (): GiftType => {
    if (initialValues?.frequency) {
      return initialValues.frequency;
    }
    return designation.suggestedGiftType || GiftType.OneTime;
  };
  
  const [frequency, setFrequency] = React.useState(getInitialFrequency);
  const [isHydrated, setIsHydrated] = React.useState(false);

  const fundDimensionsManager = useFundDimensions({
    designation,
    fundStructure,
    frequency,
    initialFundDimensions: initialValues?.fundDimensions,
    fundDimensionOptions: fundDimensionOptions || {}
  });

  const amountManager = useAmountManagement({
    designation,
    fundDimensions: fundDimensionsManager.fundDimensions,
    frequency,
    initialAmount: initialValues?.amount
  });
  
  const { isFormValid } = useFormValidation({
    hasValidAmount: amountManager.hasValidAmount,
    frequency,
    fundDimensions: fundDimensionsManager.fundDimensions,
    fundStructure,
    designation
  });
  
  const { addToCart, isAddingToCart, cartError } = useAddToCart({
    onSuccess: () => {
      onAddToCartSuccess?.();
      AnalyticsService.reinitializeSession();
    }
  });

  React.useEffect(() => {
    if (initialValues && !isHydrated) {

      const validationResult = FormValidatorFactory.getDonationValidator().validateDonationFormData(initialValues);
      
      if (validationResult.isValid && validationResult.sanitizedData) {
        const data = validationResult.sanitizedData;
        
        if (data.frequency && data.frequency !== frequency) {
          setFrequency(data.frequency);
        }
        
        if (data.amount && data.amount > 0) {
          amountManager.setDirectAmount(data.amount);
        }
        
        if (data.fundDimensions) {
          Object.entries(data.fundDimensions).forEach(([dimension, value]) => {
            fundDimensionsManager.handleFundDimensionChange(dimension, value as string);
          });
        }
        
        setIsHydrated(true);
      }
    }
  }, [initialValues, isHydrated, frequency, amountManager, fundDimensionsManager]);
  
  React.useEffect(() => {
    if (amountManager.otherAmount?.amount && amountManager.otherAmount.amount > 0 && amountManager.amount === 0) {
      amountManager.setDirectAmount(amountManager.otherAmount.amount);
    }
  }, [amountManager]);

  const handleFrequencyChange = React.useCallback((value: string) => {
    const newFrequency = value as GiftType;
    setFrequency(newFrequency);
    
    const newOtherAmount = getOtherAmount(designation, fundDimensionsManager.fundDimensions, newFrequency);
    if (newOtherAmount.amount && newOtherAmount.amount > 0) {
      const currentQuantity = amountManager.quantity;
      const totalAmount = newOtherAmount.amount * currentQuantity;
      amountManager.setAmountWithQuantity(totalAmount, currentQuantity);
    }
  }, [designation, fundDimensionsManager.fundDimensions, amountManager]);

  const handleFundDimensionChange = React.useCallback((dimension: string, value: string) => {
    fundDimensionsManager.handleFundDimensionChange(dimension, value);
    
    const newFundDimensions = { ...fundDimensionsManager.fundDimensions, [dimension]: value };
    const updatedAmount = fundDimensionsManager.getUpdatedAmount(newFundDimensions);
    
    if (updatedAmount) {
      const currentQuantity = amountManager.quantity;
      const totalAmount = updatedAmount * currentQuantity;
      amountManager.setAmountWithQuantity(totalAmount, currentQuantity);
    }
  }, [fundDimensionsManager, amountManager]);

  const handleAmountChange = React.useCallback((amount: number) => {
    AnalyticsService.setSuggestedAmountUsed(true);
    amountManager.setDirectAmount(amount);
  }, [amountManager]);

  const handleCustomAmountChange = React.useCallback((amount: number) => {
    AnalyticsService.setSuggestedAmountUsed(false);
    amountManager.setDirectAmount(amount);
  }, [amountManager]);


  const shouldMakeApiCallForPreview = React.useCallback(() => {
    return shouldMakeApiCall(props.preview);
  }, [props.preview]);

  return {
    frequency,
    amount: amountManager.amount,
    customAmount: amountManager.amount,
    quantity: amountManager.quantity,
    fundDimensions: fundDimensionsManager.fundDimensions,
    otherAmount: amountManager.otherAmount,
    targetCurrency,
    donationItem,
    isConverting,
    isAddingToCart,
    cartError,
    isFormValid,
    
    handleFrequencyChange,
    handleAmountChange,
    handleAmountChangeWithQuantity: amountManager.setAmountWithQuantity,
    handleCustomAmountChange,
    handleFundDimensionChange,
    
    _internal: {
      addToCart,
      shouldMakeApiCallForPreview,
      props,
      getItemAmount: amountManager.getItemAmount
    }
  };
}