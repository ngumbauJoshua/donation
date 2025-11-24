import { BaseFormValidator } from "./BaseFormValidator";
import {
  DonationFormInitialValues,
  DonationFormValidationResult,
} from "@/types/InitialValues";

export class FundFormInitialValuesValidator extends BaseFormValidator {
  
  public static validateFormData(
    data: Partial<DonationFormInitialValues>
  ): DonationFormValidationResult {
    const sanitizedData: DonationFormInitialValues = {};
    
    if (!data || typeof data !== 'object') {
      return {
        isValid: false,
        sanitizedData: undefined
      };
    }
    
    if (data.formId !== undefined) {
      if (typeof data.formId === 'string' && data.formId.trim().length > 0) {
        sanitizedData.formId = data.formId.trim();
      }
    }
    
    if (data.frequency !== undefined) {
      if (this.VALID_GIFT_TYPES.includes(data.frequency)) {
        sanitizedData.frequency = data.frequency;
      }
    }
    
    if (data.amount !== undefined) {
      const validatedAmount = this.validateAmount(data.amount);
      if (validatedAmount !== undefined) {
        sanitizedData.amount = validatedAmount;
      }
    }
    
    if (data.fundDimensions !== undefined) {
      if (this.isValidObject(data.fundDimensions)) {
        sanitizedData.fundDimensions = this.sanitizeStringRecord(data.fundDimensions);
      }
    }
    
    return {
      isValid: Object.values(sanitizedData).filter(Boolean).length > 0,
      sanitizedData
    };
  }
}