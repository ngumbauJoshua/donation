
import type { CrowdfundingGoal, GoalAmounts, ValidationResult } from './types';
import { GoalService } from './goal-service';

export class ValidationService {
  static validateAmount(amount: number): ValidationResult {
    if (typeof amount !== 'number') {
      return {
        isValid: false,
        errorCodes: ['crowdfunding.amount.error.invalid']
      };
    }
    
    if (amount < 0) {
      return {
        isValid: false,
        errorCodes: ['crowdfunding.amount.error.negative']
      };
    }
    
    if (!Number.isFinite(amount)) {
      return {
        isValid: false,
        errorCodes: ['crowdfunding.amount.error.infinite']
      };
    }
    
    return { isValid: true };
  }
  
  static validateSingleGoalForm(amount: number): ValidationResult {
    if (amount <= 0) {
      return {
        isValid: false,
        errorCodes: ['crowdfunding.amount.error.required']
      };
    }
    
    return { isValid: true };
  }
  
  static validateMultiGoalForm(
    selectedGoals: CrowdfundingGoal[],
    goalAmounts: GoalAmounts
  ): ValidationResult {
    if (selectedGoals.length === 0) {
      return {
        isValid: false,
        errorCodes: ['crowdfunding.goals.error.required']
      };
    }
    
    const totalAmount = GoalService.calculateTotalAmount(goalAmounts);
    
    if (totalAmount <= 0) {
      return {
        isValid: false,
        errorCodes: ['crowdfunding.totalAmount.error.required']
      };
    }
    
    return { isValid: true };
  }
  
  static validateForm(
    isMultiGoal: boolean,
    amount: number,
    selectedGoals: CrowdfundingGoal[],
    goalAmounts: GoalAmounts
  ): ValidationResult {
    return isMultiGoal
      ? this.validateMultiGoalForm(selectedGoals, goalAmounts)
      : this.validateSingleGoalForm(amount);
  }
  
  static validateFundDimension(
    value: string,
    options?: string[]
  ): ValidationResult {
    if (!value || value.trim() === '') {
      return {
        isValid: false,
        errorCodes: ['crowdfunding.fundDimension.error.required']
      };
    }
    
    if (options && options.length > 0 && !options.includes(value)) {
      return {
        isValid: false,
        errorCodes: ['crowdfunding.fundDimension.error.invalidOption']
      };
    }
    
    return { isValid: true };
  }
}
