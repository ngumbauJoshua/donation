import React from "react";
import { Repeat } from "lucide-react";
import { Button, InfoDisplayCard } from "@n3oltd/n3o-ui-components";
import { useTranslation } from "@/i18n";
import { BeneficiarySearchModal } from "./BeneficiarySearchModal";
import { PublishedBeneficiary } from "@n3oltd/karakoram.sponsorships.sdk.connect";
import { calculateCostPerBeneficiary } from "../../helpers/sponsorshipCost";
import { SponsorshipFormState } from "../../hooks/useSponsorshipForm";
import { convertAmountToDisplay, ExtendedCurrency } from "@/helpers/CurrencyConverter";

type Props = {
  alternativeIds: string[];
  formState: SponsorshipFormState;
  schemeId?: string;
  selectedBeneficiaries: PublishedBeneficiary[];
  targetCurrency: ExtendedCurrency | null
  replaceBeneficiary: (oldBeneficiaryId: string, newBeneficiary: PublishedBeneficiary) => void;
  preview?: boolean;
};

export const BeneficiaryListStep = ({
  alternativeIds,
  formState,
  schemeId,
  selectedBeneficiaries,
  targetCurrency,
  replaceBeneficiary,
  preview = false,
}: Props) => {

  
  const [changeBeneficiary, setChangeBeneficiary] = React.useState<boolean>(false);
  const [beneficiaryToChangeId, setBeneficiaryToChangeId] = React.useState<string | null>(null);

  const { formatMessage, formatCurrency } = useTranslation();

  const handleChangeBeneficiary = (value: boolean) => {
    setChangeBeneficiary(value);
  } 

  const handleReplaceBeneficiary = (newBeneficiary: PublishedBeneficiary) => {
    if (beneficiaryToChangeId) {
      replaceBeneficiary(beneficiaryToChangeId, newBeneficiary);
      setChangeBeneficiary(false);
      setBeneficiaryToChangeId(null);
    }
  }

  return (
    <div className="flex-1">
      <h2>{formatMessage("donation.form.sponsorship.sponsoring")}</h2>
      
      <ul className="space-y-2">
        {selectedBeneficiaries.map((b) => (
          <InfoDisplayCard className="w-full" key={b.id}>
            <InfoDisplayCard.Content>
              <InfoDisplayCard.Title className="text-lg font-semibold">
                {b.name}
              </InfoDisplayCard.Title>
              <InfoDisplayCard.Description className="text-sm">
                {formatMessage('donation.form.sponsorship.years.old', {gender: b.individual?.gender || '', years: b.individual?.age || ''})}
              </InfoDisplayCard.Description>
              <InfoDisplayCard.Description className="text-sm">
                <span> {formatCurrency(convertAmountToDisplay(calculateCostPerBeneficiary(b, formState), targetCurrency) || 0, targetCurrency?.code!)} </span>
              </InfoDisplayCard.Description>
            </InfoDisplayCard.Content>
            {!preview && (
              <InfoDisplayCard.Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="accent-primary-foreground"
                  onClick={() => {
                    setBeneficiaryToChangeId(b.id!);
                    handleChangeBeneficiary(true);
                  }}
                >
                  <Repeat /> {formatMessage('common.change')}
                </Button>
              </InfoDisplayCard.Badge>
            )}
          </InfoDisplayCard>
        ))}
      </ul>
      
      {changeBeneficiary ? (
        <BeneficiarySearchModal
          formState={formState}
          targetCurrency={targetCurrency}
          handleBack={() => handleChangeBeneficiary(false)} 
          onBeneficiarySelect={handleReplaceBeneficiary} 
          schemeId={schemeId!}
          alternativeIds={alternativeIds} />
      ) : null}
    </div>
  );
};
