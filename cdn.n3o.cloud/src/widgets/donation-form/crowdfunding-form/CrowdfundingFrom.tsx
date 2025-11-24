import { FormContainer, Button, DonationFormHeader } from "@n3oltd/n3o-ui-components";
import { useEffect } from "react";

import { GoalSelection } from "./components/GoalSelection";
import { GoalAmountAllocation } from "./components/GoalAmountAllocation";
import { CustomAmountInput, DonationAmount, DonationHeader } from "../components";
import { useTranslation } from "@/i18n";
import { useCrowdfundingStore } from "./stores/crowdfundingStore";
import { useCurrencyObserver } from "@/hooks/CurrencyStore";
import { useSharedCrossWidgetComm } from "@/widgets/hooks/useSharedCrossWidgetComm";
import type { CrowdfundingGoal } from "@/domain/crowdfunding";
import { EVENTS } from "@/utils/events/events";
import { CurrencyConverter } from "@/helpers/CurrencyConverter";
import { DesignationType } from "@n3oltd/karakoram.platforms.sdk.types";
import { CrowdfundingFormProps } from "./types";

export function CrowdfundingForm(props: CrowdfundingFormProps) {
  const { formatMessage } = useTranslation();
  const { designations, crowdfunder } = props;
  const eventBus = useSharedCrossWidgetComm();
  
  const { currency: targetCurrency } = useCurrencyObserver(0);
  
  const {
    selectedGoals,
    goalAmounts,
    amount,
    getTotalAmount,
    getFirstGoal,
    isMultiGoal,
    isFormValid,
    setAmount,
    addGoal,
    removeGoal,
    setGoalAmount,
    setConfig,
  } = useCrowdfundingStore();
  
  //TODO: will be handled when add to cart is implemented
  const isAddingToCart = false;
  
  const firstGoalFromStore = getFirstGoal();
  const firstGoal = firstGoalFromStore || (crowdfunder?.goals?.items?.[0] as CrowdfundingGoal | undefined);
  const totalAmount = getTotalAmount();
  const _isMultiGoal = isMultiGoal();
  const _isFormValid = isFormValid();
  
  useEffect(() => {
    setConfig({
      crowdfunderId: props.crowdfunderId,
      designations,
      fundStructure: null,
      availableGoals: crowdfunder?.goals?.items || [],
    });
  }, [props.crowdfunderId, designations, crowdfunder?.goals?.items, setConfig]);
  
  const handleAmountChange = (value: number) => {
    setAmount(value);
  };
  
  const handleGoalToggle = (goal: CrowdfundingGoal, selected: boolean) => {
    if (selected) {
      addGoal(goal);
    } else {
      removeGoal(goal.id);
    }
  };
  
  const handleGoalAmountChange = (goalId: string, value: number) => {
    setGoalAmount(goalId, value);
  };
  
  const convertAmountToDisplay = (value: number | null | undefined) => {
    if (!targetCurrency) return value;
    return CurrencyConverter.convertAmount(value, targetCurrency);
  };

  const handleDonateClick = () => {
    if (props.preview) return;

    const goalsToPass = _isMultiGoal ? selectedGoals : (firstGoal ? [firstGoal] : []);

    if (goalsToPass.length === 0) {
      return;
    }
    
    eventBus.emit(EVENTS.DONATION_FORM.MODAL_OPEN, {
      crowdfundingForm: {
        formId: props.crowdfunderId,
        crowdfunder,
        selectedGoals: goalsToPass,
        amount: _isMultiGoal ? totalAmount : amount,
        designations,
        targetCurrency
      }
    });
  }

  return (
    <FormContainer>
      {isMultiGoal() ? (
        <>
          <DonationFormHeader className="bg-form-header">
            <DonationFormHeader.Title
              title={formatMessage("donation.form.crowdfunding.goals")}
              description=""
            />
          </DonationFormHeader>
          <div className="flex-1">
            <FormContainer.Body>
              <GoalSelection
                goals={crowdfunder?.goals?.items || []}
                designations={designations}
                selectedGoals={selectedGoals}
                onGoalToggle={handleGoalToggle}
                targetCurrency={targetCurrency}
              />

              {selectedGoals.length > 0 && (
                <GoalAmountAllocation
                  selectedGoals={selectedGoals}
                  goalAmounts={goalAmounts}
                  onGoalAmountChange={handleGoalAmountChange}
                  targetCurrency={targetCurrency}
                  designations={designations}
                />
              )}
            </FormContainer.Body>
          </div>
        </>
      ) : (
        <div className="flex-1 n3o-widget-crowdfunding-form__single-goal">
          <DonationHeader 
            designation={designations[0]}
            onDesignationChange={() => {}}
            hideAction={true}
          />
          
          <FormContainer.Body>
            <DonationAmount
              suggestedAmounts={firstGoal?.suggestedAmounts || []}
              selectedAmount={amount}
              targetCurrency={targetCurrency || undefined}
              onAmountChange={handleAmountChange}
            />

            <CustomAmountInput
              customAmount={amount}
              otherAmount={1}
              targetCurrency={targetCurrency || undefined}
              designationType={DesignationType.Feedback}
              onCustomAmountChange={handleAmountChange}
              onAmountChangeWithQuantity={() => {}}
              convertAmountToDisplay={convertAmountToDisplay}
            />
          </FormContainer.Body>
        </div>
      )}

      <FormContainer.Footer>
        <Button
          onClick={() => handleDonateClick()}
          disabled={isAddingToCart || !_isFormValid || props.preview}
          className="w-full n3o-button-cta"
        >
          {isAddingToCart ? formatMessage('common.processing') : formatMessage('common.donate')}
        </Button>
      </FormContainer.Footer>
    </FormContainer>
  );
}