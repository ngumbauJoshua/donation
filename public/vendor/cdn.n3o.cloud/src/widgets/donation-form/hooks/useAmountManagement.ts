import React from 'react';
import { PublishedFundDimensionValues } from "@n3oltd/karakoram.connect.sdk.types";
import { GiftType, PublishedDesignation } from "@n3oltd/karakoram.platforms.sdk.types";
import { getOtherAmount } from "../helpers/pricing";
import { useCurrencyObserver } from "../../../hooks/CurrencyStore";

interface UseAmountManagementProps {
  designation: PublishedDesignation;
  fundDimensions: PublishedFundDimensionValues;
  frequency: GiftType;
  initialAmount?: number;
}

interface AmountState {
  amount: number;
  quantity: number;
  otherAmount: ReturnType<typeof getOtherAmount>;
  hasValidAmount: boolean;
}

interface AmountActions {
  setDirectAmount: (value: number) => void;
  setAmountWithQuantity: (totalAmount: number, quantity: number) => void;
  resetToDefault: () => void;
  getItemAmount: () => number;
}

/**
 * Hook responsible for managing all amount-related state and logic
 * 
 * Responsibilities:
 * - Track user-entered amounts and quantities
 * - Calculate amounts from pricing rules
 * - Provide validation for amount state
 * - Handle currency conversions
 */
export function useAmountManagement({ 
  designation, 
  fundDimensions, 
  frequency,
  initialAmount
}: UseAmountManagementProps): AmountState & AmountActions {
  
  const { 
    amount: currencyAmount, 
    setAmount: setCurrencyAmount
  } = useCurrencyObserver(initialAmount || 0);

  const [quantity, setQuantity] = React.useState(1);
  
  const amount = currencyAmount || 0;

  const otherAmount = getOtherAmount(designation, fundDimensions, frequency);


  const hasValidAmount = (() => {
    return Boolean((amount && amount > 0) || (otherAmount?.amount && otherAmount.amount > 0));
  })();

  const setDirectAmount = React.useCallback((value: number) => {
    setCurrencyAmount(value);
    setQuantity(1);
  }, [setCurrencyAmount]);

  const setAmountWithQuantity = React.useCallback((totalAmount: number, newQuantity: number) => {
    setCurrencyAmount(totalAmount);
    setQuantity(newQuantity);
  }, [setCurrencyAmount]);

  const resetToDefault = React.useCallback(() => {
    if (otherAmount?.amount && otherAmount.amount > 0) {
      setCurrencyAmount(otherAmount.amount);
      setQuantity(1);
    }
  }, [otherAmount?.amount, setCurrencyAmount]);

  const getItemAmount = React.useCallback((): number => {
    if (amount && amount > 0) {
      return quantity > 1 ? amount / quantity : amount;
    }
    
    return otherAmount?.amount || 0;
  }, [amount, quantity, otherAmount?.amount]);

  return {
    amount,
    quantity,
    otherAmount,
    hasValidAmount,
    
    setDirectAmount,
    setAmountWithQuantity,
    resetToDefault,
    getItemAmount,
  };
}
