import { BaseFormValidator } from "./BaseFormValidator";
import {
  SponsorshipInitialValues,
  ValidationResult,
} from "@/types/InitialValues";

export class SponsorshipFormInitialValuesValidator extends BaseFormValidator {
  
  public static validateSponsorshipData(
    data: Partial<SponsorshipInitialValues>
  ): ValidationResult<SponsorshipInitialValues> {
    const sanitizedData: SponsorshipInitialValues = {};
    
    if (!data || typeof data !== 'object') {
      return {
        isValid: false,
        sanitizedData: undefined
      };
    }
    
    if (data.sponsorshipQuantity !== undefined) {
      const validatedQuantity = this.validateQuantity(data.sponsorshipQuantity);
      if (validatedQuantity !== undefined) {
        sanitizedData.sponsorshipQuantity = validatedQuantity;
      }
    }
    
    if (data.sponsorshipDuration !== undefined) {
      if (this.isValidObject(data.sponsorshipDuration) && 
          typeof data.sponsorshipDuration.id === 'string' &&
          typeof data.sponsorshipDuration.name === 'string') {
        sanitizedData.sponsorshipDuration = data.sponsorshipDuration;
      }
    }
    
    if (data.sponsorshipComponents !== undefined) {
      if (this.isValidObject(data.sponsorshipComponents)) {
        const sanitizedComponents: Record<string, any> = {};
        for (const [key, component] of Object.entries(data.sponsorshipComponents)) {
          if (this.isValidObject(component) && 
              typeof component.enabled === 'boolean' &&
              typeof component.amount === 'number') {
            const validatedAmount = this.validateAmount(component.amount);
            if (validatedAmount !== undefined) {
              sanitizedComponents[key] = {
                enabled: component.enabled,
                amount: validatedAmount
              };
            }
          }
        }
        if (Object.keys(sanitizedComponents).length > 0) {
          sanitizedData.sponsorshipComponents = sanitizedComponents;
        }
      }
    }
    
    if (data.location !== undefined && typeof data.location === 'string') {
      sanitizedData.location = this.sanitizeInput(data.location);
    }
    
    if (data.selectedBeneficiaries !== undefined && Array.isArray(data.selectedBeneficiaries)) {
      const validBeneficiaries = data.selectedBeneficiaries.filter(beneficiary => 
        this.isValidObject(beneficiary) && 
        typeof beneficiary.id === 'string' &&
        typeof beneficiary.name === 'string'
      );
      if (validBeneficiaries.length > 0) {
        sanitizedData.selectedBeneficiaries = validBeneficiaries;
      }
    }
    
    if (data.alternativeIds !== undefined && Array.isArray(data.alternativeIds)) {
      const validIds = data.alternativeIds.filter(id => 
        typeof id === 'string' && id.trim().length > 0
      ).map(id => id.trim());
      if (validIds.length > 0) {
        sanitizedData.alternativeIds = validIds;
      }
    }
    
    return {
      isValid: Object.keys(sanitizedData).length > 0,
      sanitizedData: Object.keys(sanitizedData).length > 0 ? sanitizedData : undefined
    };
  }
}