import { FundFormInitialValuesValidator } from "./FundFormInitialValuesValidator";
import { SponsorshipFormInitialValuesValidator } from "./SponsorshipFormInitialValuesValidator";
import { FeedbackFormInitialValuesValidator } from "./FeedbackFormInitialValuesValidator";
import { DonationFormInitialValuesValidator } from "./DonationFormInitialValuesValidator";
import { DesignationType } from "@n3oltd/karakoram.platforms.sdk.types";


export class FormValidatorFactory {
  
  /**
   * Creates an appropriate validator instance based on the designation type
   * @param designationType The type of form/designation
   * @returns The appropriate validator class
   */
  public static createValidator(designationType: DesignationType) {
    switch (designationType) {
      case DesignationType.Fund:
        return FundFormInitialValuesValidator;

      case DesignationType.Sponsorship:
        return SponsorshipFormInitialValuesValidator;
      
      case DesignationType.Feedback:
        return FeedbackFormInitialValuesValidator;
      
      default:
        return DonationFormInitialValuesValidator
    }
  }

  /**
   * Get validator for fund forms
   */
  public static getFundValidator() {
    return FundFormInitialValuesValidator;
  }

  /**
   * Get validator for sponsorship forms  
   */
  public static getSponsorshipValidator() {
    return SponsorshipFormInitialValuesValidator;
  }

  /**
   * Get validator for feedback forms
   */
  public static getFeedbackValidator() {
    return FeedbackFormInitialValuesValidator;
  }

  /**
   * Get validator for combined donation forms (fund + sponsorship)
   */
  public static getDonationValidator() {
    return DonationFormInitialValuesValidator;
  }
}