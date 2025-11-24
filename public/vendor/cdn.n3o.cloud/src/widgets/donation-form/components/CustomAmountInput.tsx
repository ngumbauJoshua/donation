import { CurrencyInput, CounterInput } from "@n3oltd/n3o-ui-components";
import { useTranslation } from "@/i18n";
import { ExtendedCurrency } from "../../../helpers/CurrencyConverter";
import { DesignationType } from "@n3oltd/karakoram.platforms.sdk.types";

interface CustomAmountInputProps {
  customAmount: number;
  otherAmount: any;
  targetCurrency: ExtendedCurrency | undefined;
  onCustomAmountChange: (value: number) => void;
  designationType: DesignationType;
  onAmountChangeWithQuantity: (totalAmount: number, quantity: number) => void;
  convertAmountToDisplay: (amount: number | null | undefined) => number | null | undefined;
}

export function CustomAmountInput({
  customAmount,
  otherAmount,
  targetCurrency,
  designationType,
  onCustomAmountChange,
  onAmountChangeWithQuantity,
  convertAmountToDisplay
}: CustomAmountInputProps) {
  const { formatCurrency } = useTranslation();

  const shouldShowAmountInput = designationType === DesignationType.Feedback && otherAmount || otherAmount && !otherAmount.locked;

  if (shouldShowAmountInput) {
    return (
      <CurrencyInput.Root
        onChange={onCustomAmountChange}
        value={customAmount}
      >
        <CurrencyInput.Container>
          <CurrencyInput.LeftAddon className="font-bold">{targetCurrency?.symbol || ''}</CurrencyInput.LeftAddon>
          <CurrencyInput.Input min={1} className="pr-12" disabled={otherAmount.locked} />
          <CurrencyInput.RightAddon>{targetCurrency?.code || ''}</CurrencyInput.RightAddon>
        </CurrencyInput.Container>
      </CurrencyInput.Root>
    );
  }

  return (
    <CounterInput
      defaultValue={1}
      min={1}
      onChange={(quantity: number) => {
        const convertedBaseAmount = convertAmountToDisplay(otherAmount.amount) || 0;
        const totalAmount = quantity * convertedBaseAmount;
        onAmountChangeWithQuantity(totalAmount, quantity);
      }}
    >
      <CounterInput.Controls>
        <CounterInput.DecreaseButton />
        <CounterInput.Display>
          {(quantity: number) => (
            <>
              {formatCurrency(quantity * (convertAmountToDisplay(otherAmount.amount) || 0), targetCurrency?.code || '')}
            </>
          )}
        </CounterInput.Display>
        <CounterInput.IncreaseButton />
      </CounterInput.Controls>
    </CounterInput>
  );
}
