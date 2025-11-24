import { ExtendedCurrency } from "../../../helpers/CurrencyConverter";
import { DonationAmountOptions } from "@n3oltd/n3o-ui-components";
import { CurrencyConverter } from "../../../helpers/CurrencyConverter";

interface DonationAmountProps {
  suggestedAmounts: any[];
  selectedAmount: any | any[];
  targetCurrency: ExtendedCurrency | undefined;
  onAmountChange: (value: any | any[]) => void;
  multiple?: boolean;
}

export function DonationAmount({ 
  suggestedAmounts, 
  selectedAmount, 
  targetCurrency, 
  onAmountChange,
  multiple = false
}: DonationAmountProps) {
  
  const convertAmountToDisplay = (amount: any | null | undefined) => {
    if (!targetCurrency || typeof amount !== "number") return amount;

    return CurrencyConverter.convertAmount(amount, targetCurrency);
  };

  const displayAmounts = suggestedAmounts.map((handle: any) => ({
    ...handle,
    amount: convertAmountToDisplay(handle.amount)
  }));

  const hasDescription = displayAmounts.some(handle => handle.description);
  const isNumber = displayAmounts.every(handle => typeof handle.amount === 'number');

  const renderAmount = () => {
    return displayAmounts.map((handle: any) => (
        <DonationAmountOptions.Option 
          key={handle.amount}
          value={handle.amount} 
          label={isNumber ? `${targetCurrency?.symbol || ''}${handle.amount}` : handle.description}
          description={isNumber && hasDescription ? handle.description : undefined}
        />
      ));
  }

  return (
    <DonationAmountOptions.Container
      selected={selectedAmount}
      onChange={onAmountChange}
      multiple={multiple}
    >
      {hasDescription ? renderAmount() : (
        <DonationAmountOptions.Grid>
          {renderAmount()}
        </DonationAmountOptions.Grid>
      )}
    </DonationAmountOptions.Container>
  );
}
