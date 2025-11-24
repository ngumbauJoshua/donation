import { FormContainer, Button } from "@n3oltd/n3o-ui-components";

import { DonationHeader } from "./DonationHeader";
import { DonationFrequency } from "./DonationFrequency";
import { DonationAmount } from "./DonationAmount";
import { CustomAmountInput } from "./CustomAmountInput";
import { FundDimension } from "./FundDimension";
import { useTranslation } from "@/i18n";
import { useFundForm } from "../hooks/useFundForm";
import { CurrencyConverter } from "../../../helpers/CurrencyConverter";
import { shouldShowSuggestedAmount } from "../helpers/pricing";
import { getSuggestedAmounts } from "../helpers/donationUtils";
import { DonationModalFromProps, PublishedFundStructureKey } from "../types";
import { DesignationType } from "@n3oltd/karakoram.platforms.sdk.types";

export function FundForm(props: DonationModalFromProps) {
  const { formatMessage } = useTranslation();
  const { uiConfig } = props;
  
  const {
    frequency,
    amount,
    customAmount,
    fundDimensions,
    otherAmount,
    targetCurrency,
    donationItem,
    isAddingToCart,
    isFormValid,
    handleFrequencyChange,
    handleAmountChange,
    handleAmountChangeWithQuantity,
    handleCustomAmountChange,
    handleFundDimensionChange,
    handleDonateClick,
  } = useFundForm(props);

  const convertAmountToDisplay = (amount: number | null | undefined) => {
    if (!targetCurrency) return amount;
    return CurrencyConverter.convertAmount(amount, targetCurrency);
  };

  const suggestedAmounts = getSuggestedAmounts(donationItem, frequency) || [];

  const renderFundDimension = (dimension: PublishedFundStructureKey) => {
    const { fundStructure, designation } = props;
    const fundDimension = fundStructure[dimension];
    const designationFundDimension = designation?.fundDimensions?.[dimension];

    return (
      <FundDimension
        key={dimension}
        dimension={dimension}
        fundDimension={fundDimension}
        designationFundDimension={designationFundDimension}
        fundDimensions={fundDimensions}
        onFundDimensionChange={handleFundDimensionChange}
      />
    );
  };

  return (
    <FormContainer>
      <div className="flex-1"> 
        <DonationHeader 
          designation={props.designation}
          onDesignationChange={props.onDesignationChange}
          hideAction={props.preview || uiConfig?.hideDesignation}
        />
        
        <FormContainer.Body>
          {!uiConfig?.hideFrequency && (
            <DonationFrequency
              frequency={frequency}
              giftTypes={props.designation.giftTypes}
              onFrequencyChange={handleFrequencyChange}
            />
          )}

          {!uiConfig?.hideAmount && shouldShowSuggestedAmount(props.designation, fundDimensions) && (
            <DonationAmount
              suggestedAmounts={suggestedAmounts}
              selectedAmount={amount}
              targetCurrency={targetCurrency || undefined}
              onAmountChange={handleAmountChange}
            />
          )}

          {!uiConfig?.hideAmount && otherAmount && (
            <CustomAmountInput
              customAmount={customAmount}
              otherAmount={otherAmount}
              targetCurrency={targetCurrency || undefined}
              designationType={DesignationType.Feedback}
              onCustomAmountChange={handleCustomAmountChange}
              onAmountChangeWithQuantity={handleAmountChangeWithQuantity}
              convertAmountToDisplay={convertAmountToDisplay}
            />
          )}

          {!uiConfig?.hideFundDimension1 && renderFundDimension('dimension1')}
          {!uiConfig?.hideFundDimension2 && renderFundDimension('dimension2')}
          {!uiConfig?.hideFundDimension3 && renderFundDimension('dimension3')}
          {!uiConfig?.hideFundDimension4 && renderFundDimension('dimension4')}
        </FormContainer.Body>
      </div>
      
      <FormContainer.Footer>
        <Button 
          onClick={() => handleDonateClick()}
          disabled={isAddingToCart || !isFormValid || props.preview}
          className="w-full n3o-button-cta"
        >
          {isAddingToCart ? formatMessage('common.processing') : formatMessage('common.donate')}
        </Button>
      </FormContainer.Footer>
    </FormContainer>
  );
}