
import type { CrowdfundingGoal, GoalAmounts } from './types';

export class AmountService {
  
  static setGoalAmount(
    goalId: string,
    amount: number,
    selectedGoals: CrowdfundingGoal[],
    currentAmounts: GoalAmounts
  ): GoalAmounts | null {
    if (!selectedGoals.some(g => g.id === goalId)) {
      return null;
    }
    
    if (typeof amount !== 'number' || amount < 0 || !Number.isFinite(amount)) {
      return null;
    }
    
    return {
      ...currentAmounts,
      [goalId]: this.roundAmount(amount)
    };
  }
  
  
  static roundAmount(amount: number): number {
    return Math.round(amount * 100) / 100;
  }
  
  static parseAmount(value: string): number {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
}
