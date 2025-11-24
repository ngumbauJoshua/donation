import { create, StateCreator } from 'zustand';

import {
  CrowdfundingGoal,
  GoalAmounts,
  FundDimensions,
  CrowdfundingStep,
  GoalService,
  AmountService,
  ValidationService,
  StepService,
} from '@/domain/crowdfunding';
import { PublishedDesignation } from '@n3oltd/karakoram.platforms.sdk.types';
import { PublishedFundStructure } from '@n3oltd/karakoram.connect.sdk.types';

interface GoalSliceState {
  selectedGoals: CrowdfundingGoal[];
  goalAmounts: GoalAmounts;
}

interface GoalSlice extends GoalSliceState {
  addGoal: (goal: CrowdfundingGoal) => void;
  removeGoal: (goalId: string) => void;
  setGoalAmount: (goalId: string, amount: number) => void;
  clearGoals: () => void;
}

const createGoalSlice: StateCreator<CrowdfundingStore, [], [], GoalSlice> = (set, get) => ({
  selectedGoals: [],
  goalAmounts: {},

  addGoal: (goal) => {
    const { selectedGoals, goalAmounts } = get();

    const result = GoalService.addGoal(goal, selectedGoals, goalAmounts);
    if (result) {
      set({
        selectedGoals: result.goals,
        goalAmounts: result.amounts,
      });
    }
  },

  removeGoal: (goalId) => {
    const { selectedGoals, goalAmounts } = get();

    const result = GoalService.removeGoal(goalId, selectedGoals, goalAmounts);
    set({
      selectedGoals: result.goals,
      goalAmounts: result.amounts,
    });
  },

  setGoalAmount: (goalId, amount) => {
    const { selectedGoals, goalAmounts } = get();

    const newAmounts = AmountService.setGoalAmount(goalId, amount, selectedGoals, goalAmounts);
    if (newAmounts) {
      set({ goalAmounts: newAmounts });
    }
  },

  clearGoals: () => {
    set({ selectedGoals: [], goalAmounts: {} });
  },
});

interface AmountSliceState {
  amount: number;
}

interface AmountSlice extends AmountSliceState {
  setAmount: (amount: number) => void;
}

const createAmountSlice: StateCreator<CrowdfundingStore, [], [], AmountSlice> = (set) => ({
  amount: 0,

  setAmount: (amount) => {
    const validation = ValidationService.validateAmount(amount);
    if (validation.isValid) {
      set({ amount: AmountService.roundAmount(amount) });
    }
  },
});

interface MetadataSliceState {
  comment: string;
  isAnonymous: boolean;
}

interface MetadataSlice extends MetadataSliceState {
  setComment: (comment: string) => void;
  setIsAnonymous: (isAnonymous: boolean) => void;
  clearMetadata: () => void;
}

const createMetadataSlice: StateCreator<CrowdfundingStore, [], [], MetadataSlice> = (set) => ({
  comment: '',
  isAnonymous: false,
  setComment: (comment) => set({ comment }),
  setIsAnonymous: (isAnonymous) => set({ isAnonymous }),
  clearMetadata: () => set({ comment: '', isAnonymous: false }),
});

interface FundDimensionsSliceState {
  fundDimensions: FundDimensions;
}

interface FundDimensionsSlice extends FundDimensionsSliceState {
  setFundDimension: (stepId: string, dimension: string, value: string) => void;
  initializeFundDimensions: (dimensions: FundDimensions) => void;
}

const createFundDimensionsSlice: StateCreator<CrowdfundingStore, [], [], FundDimensionsSlice> = (
  set,
  get
) => ({
  fundDimensions: {},

  setFundDimension: (stepId, dimension, value) => {
    const { fundDimensions } = get();
    set({
      fundDimensions: {
        ...fundDimensions,
        [stepId]: {
          ...fundDimensions[stepId],
          [dimension]: value,
        },
      },
    });
  },

  initializeFundDimensions: (dimensions) => {
    const { fundDimensions } = get();
    set({
      fundDimensions: { ...fundDimensions, ...dimensions },
    });
  },
});

interface ConfigSliceState {
  crowdfunderId: string | null;
  designations: PublishedDesignation[];
  fundStructure: PublishedFundStructure | null;
  availableGoals: CrowdfundingGoal[];
}

interface ConfigSlice extends ConfigSliceState {
  setConfig: (config: Partial<ConfigSliceState>) => void;
  isMultiGoal: () => boolean;
  getFirstGoal: () => CrowdfundingGoal | undefined;
}

const createConfigSlice: StateCreator<CrowdfundingStore, [], [], ConfigSlice> = (set, get) => ({
  crowdfunderId: null,
  designations: [],
  fundStructure: null,
  availableGoals: [],
  
  setConfig: (config) => {
    set(config);
    
    
  },
  
  isMultiGoal: () => {
    const { availableGoals } = get();
    return Array.isArray(availableGoals) && availableGoals.length > 1;
  },
  
  getFirstGoal: () => {
    const { availableGoals } = get();
    return Array.isArray(availableGoals) ? availableGoals[0] : undefined;
  },
});

type CrowdfundingStore = GoalSlice &
  AmountSlice &
  MetadataSlice &
  FundDimensionsSlice &
  ConfigSlice & {
    getTotalAmount: () => number;
    isFormValid: () => boolean;

    computeSteps: () => CrowdfundingStep[];
    isStepValid: (stepId: string) => boolean;

    reset: () => void;
  };

export function createCrowdfundingStore() {
  return create<CrowdfundingStore>()(
      (set, get, store) => ({
        ...createGoalSlice(set, get, store),
        ...createAmountSlice(set, get, store),
        ...createMetadataSlice(set, get, store),
        ...createFundDimensionsSlice(set, get, store),
        ...createConfigSlice(set, get, store),

        getTotalAmount: () => {
          const { goalAmounts } = get();
          return GoalService.calculateTotalAmount(goalAmounts);
        },

        isFormValid: () => {
          const { isMultiGoal, amount, selectedGoals, goalAmounts } = get();
          const validation = ValidationService.validateForm(
            isMultiGoal(),
            amount,
            selectedGoals,
            goalAmounts
          );
          return validation.isValid;
        },

        computeSteps: () => {
          const { selectedGoals, designations, fundStructure, initializeFundDimensions } = get();

          const { steps, initialFundDimensions } = StepService.generateSteps(
            selectedGoals,
            designations,
            fundStructure
          );

          if (Object.keys(initialFundDimensions).length > 0) {
            initializeFundDimensions(initialFundDimensions);
          }

          return steps;
        },

        isStepValid: (stepId) => {
          const { fundDimensions, designations, fundStructure, selectedGoals } = get();

          const goal = selectedGoals.find((g) => g.id === stepId);
          const designation = designations.find((d) => d.id === goal?.designationId);
          const step = { id: stepId, title: '' };

          return StepService.isStepValid(step, fundDimensions, designation, fundStructure);
        },

        reset: () => {
          get().clearGoals();
          get().clearMetadata();
          set({
            amount: 0,
            fundDimensions: {},
            crowdfunderId: null,
            availableGoals: [],
          });
        },
      }),
  );
}

export const useCrowdfundingStore = createCrowdfundingStore();
