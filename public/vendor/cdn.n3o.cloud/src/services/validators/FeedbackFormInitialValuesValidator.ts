import { BaseFormValidator } from "./BaseFormValidator";
import {
  ValidationResult,
} from "@/types/InitialValues";

export type FeedbackFormData = {
  customFieldValues?: Array<Record<string, any>>;
}

export class FeedbackFormInitialValuesValidator extends BaseFormValidator {
  
  public static validateFeedbackData(
    data: Partial<FeedbackFormData>
  ): ValidationResult<FeedbackFormData> {
    const sanitizedData: FeedbackFormData = {customFieldValues: []};
    
    if (!data || typeof data !== 'object') {
      return {
        isValid: false,
        sanitizedData: undefined
      };
    }
    
    
    
    return {
      isValid: Object.keys(sanitizedData).length > 0,
      sanitizedData: Object.keys(sanitizedData).length > 0 ? sanitizedData : undefined
    };
  }
}