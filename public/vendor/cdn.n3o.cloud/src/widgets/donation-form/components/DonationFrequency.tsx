import { GiftType } from "@n3oltd/karakoram.platforms.sdk.types";
import { DonationFrequencyOptions } from "@n3oltd/n3o-ui-components";
import { useTranslation } from "@/i18n";

interface DonationFrequencyProps {
  frequency: string;
  giftTypes: string[] | undefined;
  onFrequencyChange: (value: string) => void;
}

export function DonationFrequency({ frequency, giftTypes, onFrequencyChange }: DonationFrequencyProps) {
  const { formatMessage } = useTranslation();

  const frequencyOptions = giftTypes?.map((type: string) => ({
    value: type,
    label: type === GiftType.OneTime ? formatMessage('common.oneTime') : formatMessage('common.recurring') 
  })) || [];

  return (
    <DonationFrequencyOptions
      value={frequency}
      onChange={onFrequencyChange}
      options={frequencyOptions}
    />
  );
}
