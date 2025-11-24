import type { CrowdfundingGoal, GoalAmounts, ValidationResult } from './types';

export class GoalService {
  static getMinimumSuggestedAmount(goal: CrowdfundingGoal): number {
    if (!goal.suggestedAmounts?.length) {
      return 0;
    }
    
    const validAmounts = goal.suggestedAmounts
      .map(suggestion => suggestion.amount)
      .filter(amount => typeof amount === 'number' && amount > 0);
    
    return validAmounts.length > 0 ? Math.min(...validAmounts) : 0;
  }
  
  static canAddGoal(goal: CrowdfundingGoal, selectedGoals: CrowdfundingGoal[]): ValidationResult {
    if (!goal?.id) {
      return {
        isValid: false,
        errorCodes: ['error.crowdfunding.goal.missingId']
      };
    }
    
    if (selectedGoals.some(g => g.id === goal.id)) {
      return {
        isValid: false,
        errorCodes: ['error.crowdfunding.goal.duplicate']
      };
    }
    
    return { isValid: true };
  }
  
  static addGoal(
    goal: CrowdfundingGoal,
    currentGoals: CrowdfundingGoal[],
    currentAmounts: GoalAmounts
  ): { goals: CrowdfundingGoal[]; amounts: GoalAmounts } | null {
    const validation = this.canAddGoal(goal, currentGoals);
    
    if (!validation.isValid) {
      return null;
    }
    
    const minimumAmount = this.getMinimumSuggestedAmount(goal);
    
    return {
      goals: [...currentGoals, goal],
      amounts: { ...currentAmounts, [goal.id]: minimumAmount }
    };
  }
  
  static removeGoal(
    goalId: string,
    currentGoals: CrowdfundingGoal[],
    currentAmounts: GoalAmounts
  ): { goals: CrowdfundingGoal[]; amounts: GoalAmounts } {
    const remainingAmounts = { ...currentAmounts };
    delete remainingAmounts[goalId];
    
    return {
      goals: currentGoals.filter(g => g.id !== goalId),
      amounts: remainingAmounts
    };
  }
  
  static calculateTotalAmount(goalAmounts: GoalAmounts): number {
    return Object.values(goalAmounts)
      .filter(amount => typeof amount === 'number' && amount >= 0)
      .reduce((sum, amount) => sum + amount, 0);
  }
}
