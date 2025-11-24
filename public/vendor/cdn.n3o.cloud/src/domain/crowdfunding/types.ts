// Constants
export const SUMMARY_STEP_ID = 'summary' as const;

export interface CrowdfundingGoal {
  id: string;
  designationId: string;
  suggestedAmounts: SuggestedAmount[];
  fundDimensions?: Record<string, string>;
}

export interface SuggestedAmount {
  amount: number;
  description: string;
}

export interface GoalAmounts {
  [goalId: string]: number;
}

export interface FundDimensions {
  [stepId: string]: {
    [dimensionKey: string]: string;
  };
}

export interface CrowdfundingStep {
  id: string;
  goalId?: string;
  designationId?: string;
  title: string;
  index?: number;
  totalGoals?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errorCodes?: string[];
}