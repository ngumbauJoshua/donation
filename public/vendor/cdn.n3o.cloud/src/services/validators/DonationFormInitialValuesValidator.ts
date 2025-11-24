import { FundFormInitialValuesValidator } from "./FundFormInitialValuesValidator";
import { SponsorshipFormInitialValuesValidator } from "./SponsorshipFormInitialValuesValidator";
import {
  DonationFormInitialValues,
  DonationFormValidationResult,
} from "@/types/InitialValues";

export class DonationFormInitialValuesValidator {
  
  public static validateDonationFormData(
    data: Partial<DonationFormInitialValues>
  ): DonationFormValidationResult {
    const fundValidation = FundFormInitialValuesValidator.validateFormData(data);
    
    if (!fundValidation.isValid || !fundValidation.sanitizedData) {
      return fundValidation;
    }
    
    const sanitizedData = { ...fundValidation.sanitizedData };
    
    if (data.sponsorship !== undefined) {
      const sponsorshipValidation = SponsorshipFormInitialValuesValidator.validateSponsorshipData(data.sponsorship);
      if (sponsorshipValidation.isValid && sponsorshipValidation.sanitizedData) {
        sanitizedData.sponsorship = sponsorshipValidation.sanitizedData;
      }
    }
    
    return {
      isValid: Object.values(sanitizedData).filter(Boolean).length > 0,
      sanitizedData
    };
  }
}