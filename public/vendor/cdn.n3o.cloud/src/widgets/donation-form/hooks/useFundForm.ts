import React from 'react';
import { useFormBase } from './useFormBase';
import { CartRequestBuilder } from "../utils/cartRequestBuilder";
import { DonationModalFromProps } from "../types";

export function useFundForm(props: DonationModalFromProps) {
  const base = useFormBase(props);
  
  const handleDonateClick = React.useCallback(async () => {
    const { _internal } = base;
    
    const req = CartRequestBuilder.build({
      designation: _internal.props.designation,
      frequency: base.frequency,
      quantity: base.quantity,
      itemAmount: _internal.getItemAmount(),
      fundDimensions: base.fundDimensions,
      targetCurrency: base.targetCurrency
    });
    
    if (_internal.shouldMakeApiCallForPreview()) {
      await _internal.addToCart(req);
    }
  }, [base]);

  
  return {
    ...base,
    handleDonateClick
  };
}