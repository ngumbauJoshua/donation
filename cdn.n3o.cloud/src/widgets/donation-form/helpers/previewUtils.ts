import { PublishedDonationForm } from "@n3oltd/karakoram.platforms.sdk.types";
import { PublishedFundStructure, PublishedOrganizationInfo } from "@n3oltd/karakoram.connect.sdk.types";
import { PublishedBeneficiary, PublishedSponsorshipSchemes } from "@n3oltd/karakoram.sponsorships.sdk.connect";

export interface PreviewData {
  publishedForm?: PublishedDonationForm | null;
  fundStructure?: PublishedFundStructure | null;
  orgInfo?: PublishedOrganizationInfo | null;
  currencies?: any | null;
  sponsorshipSchemes?: PublishedSponsorshipSchemes | null;
  previewBeneficiaries?: PublishedBeneficiary[] | null;
}

export function parsePreviewData(json?: string): PreviewData | null {
  if (!json) return null;
  
  try {
    const data = JSON.parse(json);
    return data;
  } catch (error) {
    console.warn('Invalid preview JSON data:', error);
    return null;
  }
}


export function shouldMakeApiCall(preview: boolean | undefined): boolean {
  return !preview;
}
