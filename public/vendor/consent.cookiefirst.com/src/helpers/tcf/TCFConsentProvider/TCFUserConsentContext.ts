import { createContext } from "preact";
import {
  ITCFGatpVendorList,
  ITCFGatpVendor,
  ITCFGlobalVendorList,
  ITCFVendor,
} from "types/tcf";
import type {
  ITCFConsent,
  ITCFGatpList,
  ITCFVendorCategory,
  ITCFVendorList,
  TCFEventStatus,
} from "./types";
import { UNDEFINED } from "constants/primitives";

export interface ITCFConsentContext {
  consentTimestamp: number | null;
  userConsent: ITCFConsent; // current actual user's consent
  baseConsent: ITCFConsent; // pre-selected categories or vendors
  tempConsent: ITCFConsent; // temporary state before user saves their choice
  hasConsented: boolean;
  vendorsList: ITCFVendorList;
  gatpList: ITCFGatpList;
  tcfCountry: string;
  isForcingReconsent: boolean;
  shouldBeLogged: boolean;
  eventStatus: TCFEventStatus;
  triggerTCFConsentUpdate: boolean;
  setConsent: (consent: ITCFConsent) => void;
  isCategoryAccepted: (
    name: ITCFVendorCategory,
    id: number,
    tempConsent: ITCFConsent
  ) => boolean;
  isCategoryLegitimateInterestAccepted: (
    name: ITCFVendorCategory,
    id: number,
    tempConsent: ITCFConsent
  ) => boolean;
  toggleCategory: (
    name: ITCFVendorCategory,
    id: number,
    gvl: ITCFGlobalVendorList
  ) => void;
  setCategoryValue: (
    name: ITCFVendorCategory,
    id: number,
    value: boolean,
    gvl: ITCFGlobalVendorList
  ) => void;
  toggleCategoryLegitimateInterest: (
    name: ITCFVendorCategory,
    id: number,
    gvl: ITCFGlobalVendorList
  ) => void;
  setCategoryLegitimateInterestValue: (
    name: ITCFVendorCategory,
    id: number,
    value: boolean,
    gvl: ITCFGlobalVendorList
  ) => void;
  toggleVendor: (vendor: ITCFVendor, gvl: ITCFGlobalVendorList) => void;
  setVendor: (
    vendor: ITCFVendor,
    value: boolean,
    gvl: ITCFGlobalVendorList
  ) => void;
  toggleVendorLegitimateInterest: (
    vendor: ITCFVendor,
    gvl: ITCFGlobalVendorList
  ) => void;
  setVendorLegitimateInterest: (
    vendor: ITCFVendor,
    value: boolean,
    gvl: ITCFGlobalVendorList
  ) => void;
  isVendorAccepted: (vendor: ITCFVendor) => boolean;
  isVendorLegitimateInterestAccepted: (vendor: ITCFVendor) => boolean;
  toggleGatpVendor: (vendor: ITCFGatpVendor, gatp: ITCFGatpVendorList) => void;
  setGatpVendor: (vendor: ITCFGatpVendor, value: boolean) => void;
  isGatpVendorAccepted: (vendor: ITCFGatpVendor) => boolean;
}

export const TCF_USER_CONSENT_CONTEXT = createContext<
  ITCFConsentContext | undefined
>(UNDEFINED);
export default TCF_USER_CONSENT_CONTEXT;
