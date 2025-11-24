import { PublishedBeneficiary } from "@n3oltd/karakoram.sponsorships.sdk.connect";
import { SponsorshipFormState } from "../hooks/useSponsorshipForm";

export const calculateCost = (formState: SponsorshipFormState) => {
  const { selectedBeneficiaries, sponsorshipComponents, sponsorshipDuration } = formState;

  if (selectedBeneficiaries.length === 0) {
    return null;
  }

  let total = 0;
  let min = Infinity;
  let max = -Infinity;

  for (const { availableComponents } of selectedBeneficiaries) {
    if (!availableComponents) continue;

    let componentTotal = 0;
    for (const comp of availableComponents) {
      if (comp.price?.locked) {
        componentTotal += comp.price.amount || 0;
      } else {
        const selectedComp = sponsorshipComponents[comp.name!];
        if (selectedComp?.enabled) {
          componentTotal += selectedComp.amount || 0;
        }
      }
    }

    total += componentTotal;
    min = Math.min(min, componentTotal);
    max = Math.max(max, componentTotal);
  }

  const hasDiffMinMax = min !== max;
  const grandTotal = total * (sponsorshipDuration?.months || 0);

  return {
    total: grandTotal,
    hasDiffMinMax,
    min,
    max,
  };
};

export const calculateCostPerBeneficiary = (beneficiary: PublishedBeneficiary, formState: SponsorshipFormState) => {
  const { sponsorshipComponents, sponsorshipDuration } = formState;

  if (!beneficiary || !sponsorshipComponents || !sponsorshipDuration) {
    return null;
  }

  let componentTotal = 0;
  for (const comp of beneficiary.availableComponents || []) {
    if (comp.price?.locked) {
      componentTotal += comp.price.amount || 0;
    } else {
      const selectedComp = sponsorshipComponents[comp.name!];
      if (selectedComp?.enabled) {
        componentTotal += selectedComp.amount || 0;
      }
    }
  }

  const totalCost = componentTotal * (sponsorshipDuration?.months || 0);
  
  return totalCost;
};