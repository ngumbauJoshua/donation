import React from 'react';
import { useFormBase } from './useFormBase';
import { CartRequestBuilder } from "../utils/cartRequestBuilder";
import { PublishedBeneficiary, PublishedCommitmentDuration } from "@n3oltd/karakoram.sponsorships.sdk.connect";
import { DonationModalFromProps, SponsorshipComponentState } from "../types";
import useSetState from '@/hooks/useSetState';
import { parsePreviewData } from "../helpers/previewUtils";

export type SponsorshipFormState = {
  sponsorshipQuantity: number;
  sponsorshipDuration: PublishedCommitmentDuration | null;
  sponsorshipComponents: Record<string, SponsorshipComponentState>;
  location: string | null | undefined;
  selectedBeneficiaries: PublishedBeneficiary[];
  alternativeIds?: string[];
}

export function useSponsorshipForm(props: DonationModalFromProps) {
  const schemeId = props.designation?.sponsorship?.scheme?.id;
  const scheme = props.sponsorshipSchemes?.sponsorshipSchemes?.find(s => s.id === schemeId);
  
  const base = useFormBase({
    ...props,
    fundDimensionOptions: scheme?.fundDimensionOptions
  });
  
	
  const initialComponents = () => {
    const components = props.designation?.sponsorship?.components;
    if (components && components.length > 0) {
      const initialState: Record<string, SponsorshipComponentState> = {};

      components.forEach((component) => {
        initialState[component.name!] = {
          enabled: component.required || false,
          amount: component.pricing?.price?.amount || 0,
        };
      });

      return initialState;
    }

    return {};
  }

	const [formState, setFormState] = useSetState<SponsorshipFormState>({
		sponsorshipQuantity: props.initialValues?.sponsorship?.sponsorshipQuantity ?? 1,
		sponsorshipDuration: props.initialValues?.sponsorship?.sponsorshipDuration ?? 
		                   props.designation?.sponsorship?.allowedDurations?.[0] ?? null,
		sponsorshipComponents: props.initialValues?.sponsorship?.sponsorshipComponents ?? initialComponents(),
		location: props.initialValues?.sponsorship?.location ?? undefined,
		selectedBeneficiaries: props.initialValues?.sponsorship?.selectedBeneficiaries ?? [],
		alternativeIds: props.initialValues?.sponsorship?.alternativeIds
	})

  React.useEffect(() => {
    if (props.preview && props.json && formState.selectedBeneficiaries.length === 0) {
      const previewData = parsePreviewData(props.json);
      if (previewData?.previewBeneficiaries) {
        setFormState({ 
          selectedBeneficiaries: previewData.previewBeneficiaries.slice(0, formState.sponsorshipQuantity),
          alternativeIds: previewData.previewBeneficiaries.map((b: any) => b.id) 
        });
      }
    }
  }, [props.preview, props.json, formState.sponsorshipQuantity, formState.selectedBeneficiaries.length, setFormState]);

  


  const handleSponsorshipComponentToggle = React.useCallback((componentName: string, enabled: boolean) => {
  setFormState(prevState => ({
    sponsorshipComponents: {
      ...prevState.sponsorshipComponents,
      [componentName]: {
        ...prevState.sponsorshipComponents[componentName],
        enabled
      }
    }
  }));
}, [setFormState]);

  const handleSponsorshipComponentAmountChange = React.useCallback((componentName: string, amount: number) => {
    setFormState(prevState => ({
      sponsorshipComponents: {
      ...prevState.sponsorshipComponents,
      [componentName]: {
        ...prevState.sponsorshipComponents[componentName],
        amount
      }
    }
    }));
  }, [setFormState]);


  const replaceBeneficiary = React.useCallback((oldBeneficiaryId: string, newBeneficiary: PublishedBeneficiary) => {
    setFormState(prev => ({
      ...prev,
      selectedBeneficiaries: prev.selectedBeneficiaries.map(b => b.id === oldBeneficiaryId ? newBeneficiary : b)
    }));
  }, [setFormState]);

  const handleDonateClick = React.useCallback(async () => {
    const { _internal } = base;
    
    const req = CartRequestBuilder.build({
      designation: _internal.props.designation,
      frequency: base.frequency,
      quantity: base.quantity,
      itemAmount: _internal.getItemAmount(),
      fundDimensions: base.fundDimensions,
      targetCurrency: base.targetCurrency,
      sponsorshipComponents: formState.sponsorshipComponents,
    });
    
    if (_internal.shouldMakeApiCallForPreview()) {
      await _internal.addToCart(req);
    }
  }, [base, formState.sponsorshipComponents]);

  
  return {
    ...base,
		formState,
    
    handleSponsorshipComponentToggle,
    handleSponsorshipComponentAmountChange,
		setFormState,
    replaceBeneficiary,
    
    handleDonateClick,
    
    schemeId,
    scheme,
    allowedDurations: props.designation?.sponsorship?.allowedDurations || [],
    components: props.designation?.sponsorship?.components || []
  };
}