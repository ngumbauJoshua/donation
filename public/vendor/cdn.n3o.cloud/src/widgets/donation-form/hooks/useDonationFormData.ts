import React from "react";
import { useGetFile } from "../../../hooks/useGetFile";
import { useCurrencies } from "../../../hooks/useCurrencies";
import { shouldMakeApiCall, parsePreviewData } from "../helpers/previewUtils";
import { PublishedFileKind, PublishedFundStructure, ConnectSubscriptionFile, PublishedOrganizationInfo } from "@n3oltd/karakoram.connect.sdk.types";
import { PublishedDonationForm } from "@n3oltd/karakoram.platforms.sdk.types";
import { PublishedSponsorshipSchemes } from "@n3oltd/karakoram.sponsorships.sdk.connect";

interface UseDonationFormDataProps {
  formId?: string;
  crowdfunderId?: string;
  preview?: boolean;
  json?: string;
  enabled?: boolean;
  includeOrgInfo?: boolean;
  includeSchemes?: boolean;
}

interface DonationFormData {
  publishedForm: PublishedDonationForm | null;
  fundStructure: PublishedFundStructure | null;
  orgInfo: PublishedOrganizationInfo | null;
  sponsorshipSchemes: PublishedSponsorshipSchemes | null;
  crowdfunder: any;
  currencies: any; 
  currentCurrency: any;
  setCurrency: (currency: any) => void;
  isLoading: boolean;
  hasError: Error | null;
  error: any;
}

export function useDonationFormData({
  formId,
  crowdfunderId,
  json,
  preview = false,
  enabled = true,
  includeOrgInfo = false,
  includeSchemes = false
}: UseDonationFormDataProps): DonationFormData {
  const shouldFetchData = enabled && shouldMakeApiCall(preview);
  
  const {
    data: publishedForm,
    loading: publishedFormLoading,
    error: publishedFormError
  } = useGetFile<PublishedDonationForm>(
    PublishedFileKind.Element,
    formId!,
    { enabled: shouldFetchData && !!formId }
  );

  const {
    data: publishedFundStructure,
    loading: fundStructureLoading,
    error: fundStructureError
  } = useGetFile<PublishedFundStructure>(
    PublishedFileKind.Subscription,
    ConnectSubscriptionFile.FundStructure,
    { enabled: shouldFetchData }
  );

  const {
    data: orgInfo,
    loading: orgInfoLoading,
    error: orgInfoError
  } = useGetFile<PublishedOrganizationInfo>(
    PublishedFileKind.Subscription,
    ConnectSubscriptionFile.OrganizationInfo,
    { enabled: shouldFetchData && includeOrgInfo }
  );
  
  const {
    data: sponsorshipSchemes,
    loading: sponsorshipSchemesLoading,
    error: sponsorshipSchemesError
  } = useGetFile<PublishedSponsorshipSchemes>(
    PublishedFileKind.Subscription,
    ConnectSubscriptionFile.SponsorshipSchemes,
    { enabled: shouldFetchData && includeSchemes }
  );
  
  const {
    data: crowdfunder,
    loading: crowdfunderLoading,
    error: crowdfunderError
  } = useGetFile<any>(
    `crowdfunding/${crowdfunderId}`,
    'index',
    { enabled: shouldFetchData && !!crowdfunderId }
  );

  const previewData = React.useMemo(() => {
    if (preview && json) {
      return parsePreviewData(json);
    }
    return null;
  }, [preview, json]);


  const {
    currencies,
    currenciesLoading,
    currenciesError,
    currentCurrency,
    setCurrency
  } = useCurrencies({ enabled: shouldFetchData, currencies: previewData?.currencies, preview });

  const formData = preview ? previewData?.publishedForm : publishedForm;
  const fundStructure = preview ? previewData?.fundStructure : publishedFundStructure;
  const organizationInfo = preview ? previewData?.orgInfo : orgInfo;
  const schemes = preview ? previewData?.sponsorshipSchemes : sponsorshipSchemes;

  const isLoading = !preview && (
    publishedFormLoading || 
    fundStructureLoading || 
    currenciesLoading || 
    (includeOrgInfo && orgInfoLoading) ||
    (includeSchemes && sponsorshipSchemesLoading) ||
    (!!crowdfunderId && crowdfunderLoading)
    
  );
  
  const hasError: Error | null = !preview
    ? (publishedFormError as Error) ||
      (fundStructureError as Error) ||
      (currenciesError as Error) ||
      (includeOrgInfo ? (orgInfoError as Error) : null) ||
      (includeSchemes ? (sponsorshipSchemesError as Error) : null) ||
      (crowdfunderId ? (crowdfunderError as Error) : null) ||
      null
    : null;

  const error = preview ? null : {
    publishedFormError,
    fundStructureError,
    currenciesError,
    orgInfoError: includeOrgInfo ? orgInfoError : null,
    sponsorshipSchemesError: includeSchemes ? sponsorshipSchemesError : null
  };

  return {
    publishedForm: formData || null,
    fundStructure: fundStructure || null,
    orgInfo: organizationInfo || null,
    currencies: currencies || null,
    sponsorshipSchemes: schemes || null,
    currentCurrency: currentCurrency,
    crowdfunder,
    setCurrency,
    isLoading,
    hasError,
    error
  };
} 