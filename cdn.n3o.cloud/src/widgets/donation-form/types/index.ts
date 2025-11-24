import { ElementDataConfig, ElementUIConfig } from "@/types/element-config";
import { PublishedFundStructure } from "@n3oltd/karakoram.connect.sdk.types";
import { PublishedDesignation } from "@n3oltd/karakoram.platforms.sdk.types";
import { PublishedSponsorshipSchemes } from "@n3oltd/karakoram.sponsorships.sdk.connect";
import { DonationFormInitialValues } from "@/types/InitialValues";
import { PreviewProps } from "@/types/preview";

export type DonationFormModalProps = {
  open: boolean;
  formId: string;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  className?: string;
  container?: Element | DocumentFragment | null;
  search?: boolean;
  initialValues?: DonationFormInitialValues;
  uiConfig?: ElementUIConfig;
  mode?: (typeof DonationFormMode)[keyof typeof DonationFormMode];
} & PreviewProps;

export type DonationModalFromProps = {
  formId: string;
  mode?: (typeof DonationFormMode)[keyof typeof DonationFormMode];
  fundStructure: PublishedFundStructure;
  designation: PublishedDesignation;
  sponsorshipSchemes?: PublishedSponsorshipSchemes;
  onDesignationChange: (open: boolean) => void;
  onAddToCartSuccess?: () => void;
  initialValues?: DonationFormInitialValues;
  uiConfig?: ElementUIConfig;
} & PreviewProps;

export type Currency = {
  code: string;
  symbol: string;
  rate?: number;
}

export type PublishedFundStructureKey =
  | "dimension1"
  | "dimension2"
  | "dimension3"
  | "dimension4";

export type DonationFormInlineProps = {
  formId?: string;
  crowdfunderId?: string;
  dataConfig?: ElementDataConfig;
  uiConfig?: ElementUIConfig;
} & PreviewProps;

export type SponsorshipComponentState = {
    enabled: boolean;
    amount: number;
};

export const  DonationFormMode = {
  inline: 'inline',
  modal: 'modal',
} as const;