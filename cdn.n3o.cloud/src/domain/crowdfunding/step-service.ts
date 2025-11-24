
import { PublishedFundStructure } from '@n3oltd/karakoram.connect.sdk.types';
import { PublishedDesignation } from '@n3oltd/karakoram.platforms.sdk.types';
import type {
  CrowdfundingStep,
  CrowdfundingGoal,
  FundDimensions
} from './types';
import { SUMMARY_STEP_ID } from './types';


export class StepService {

  static goalNeedsInput(
    goal: CrowdfundingGoal,
    designation: PublishedDesignation,
    fundStructure: PublishedFundStructure
  ): boolean {
    return Object.entries(fundStructure).some(([dimensionKey, fundDimension]) => {
      if (!fundDimension?.isActive) return false;
      
      const designationFundDimension = (designation.fundDimensions as any)?.[dimensionKey];
      if (!designationFundDimension) return false;
      
      // Skip if already set on goal
      if (goal.fundDimensions?.[dimensionKey]) return false;
      
      // Skip if fixed value
      if (designationFundDimension.fixed) return false;
      
      // Skip if only one option (auto-select)
      if (designationFundDimension.options?.length === 1) return false;
      
      return true;
    });
  }
  
  /**
   * Extract auto-fillable fund dimensions for a goal
   */
  static extractAutoFillableDimensions(
    goal: CrowdfundingGoal,
    designation: PublishedDesignation,
    fundStructure: PublishedFundStructure
  ): Record<string, string> {
    const dimensions: Record<string, string> = {};
    
    Object.entries(fundStructure).forEach(([dimensionKey, fundDimension]) => {
      if (!fundDimension?.isActive) return;
      
      const designationFundDimension = (designation.fundDimensions as any)?.[dimensionKey];
      if (!designationFundDimension) return;
      
      // Use goal's existing value
      if (goal.fundDimensions?.[dimensionKey]) {
        dimensions[dimensionKey] = goal.fundDimensions[dimensionKey];
      }
      // Use fixed value
      else if (designationFundDimension.fixed) {
        dimensions[dimensionKey] = designationFundDimension.fixed;
      }
      // Auto-select single option
      else if (designationFundDimension.options?.length === 1) {
        dimensions[dimensionKey] = designationFundDimension.options[0];
      }
    });
    
    return dimensions;
  }
  
  /**
   * Generate steps for multi-goal crowdfunding form
   */
  static generateSteps(
    selectedGoals: CrowdfundingGoal[],
    designations: PublishedDesignation[],
    fundStructure: PublishedFundStructure | null
  ): { steps: CrowdfundingStep[]; initialFundDimensions: FundDimensions } {
    if (!designations?.length || !fundStructure || !selectedGoals?.length) {
      return {
        steps: [{ id: SUMMARY_STEP_ID, title: '' }],
        initialFundDimensions: {}
      };
    }
    
    const stepsNeedingInput: CrowdfundingStep[] = [];
    const initialFundDimensions: FundDimensions = {};
    
    selectedGoals.forEach((goal, index) => {
      const designation = designations.find(d => d.id === goal.designationId);
      if (!designation) return;
      
      const autoFillDimensions = this.extractAutoFillableDimensions(
        goal,
        designation,
        fundStructure
      );
      
      if (Object.keys(autoFillDimensions).length > 0) {
        initialFundDimensions[goal.id] = autoFillDimensions;
      }
      
      if (this.goalNeedsInput(goal, designation, fundStructure)) {
        stepsNeedingInput.push({
          id: goal.id,
          goalId: goal.id,
          designationId: goal.designationId,
          title: designation.name || '',
          index,
          totalGoals: selectedGoals.length
        });
      }
    });
    
    return {
      steps: [...stepsNeedingInput, { id: SUMMARY_STEP_ID, title: '' }],
      initialFundDimensions
    };
  }
  
  /**
   * Check if a step is valid (all required dimensions filled)
   */
  static isStepValid(
    step: CrowdfundingStep,
    fundDimensions: FundDimensions,
    designation: PublishedDesignation | undefined,
    fundStructure: PublishedFundStructure | null
  ): boolean {

    if (step.id === SUMMARY_STEP_ID) return true;
    
    if (!designation || !fundStructure) return false;
    
    const stepFundDimensions = fundDimensions[step.id] || {};
    
    for (const [dimensionKey, fundDimension] of Object.entries(fundStructure)) {
      if (!fundDimension?.isActive) continue;
      
      const designationFundDimension = (designation.fundDimensions as any)?.[dimensionKey];
      if (!designationFundDimension) continue;
      
      // Skip if fixed or auto-selected
      if (designationFundDimension.fixed) continue;
      if (designationFundDimension.options?.length === 1) continue;
      
      // Check if value is set
      const dimensionValue = stepFundDimensions[dimensionKey];
      if (!dimensionValue || dimensionValue.trim() === '') {
        return false;
      }
    }
    
    return true;
  }
}
