import { DonationAmount } from "../../components/DonationAmount";

interface GoalSelectionProps {
  goals: any[];
  designations: any[];
  selectedGoals: any[];
  onGoalToggle: (goal: any, selected: boolean) => void;
  targetCurrency?: any;
}

export function GoalSelection({ 
  goals, 
  designations, 
  selectedGoals, 
  onGoalToggle,
  targetCurrency
}: GoalSelectionProps) {

  const getDesignationForGoal = (goal: any) => {
    return designations.find(d => d.id === goal.designationId);
  };


  const suggestedAmounts = goals.map((goal) => {
    const designation = getDesignationForGoal(goal);
    return {
      amount: goal.id,
      description: designation?.name
    };
  });

  const handleGoalSelectionChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const currentSelectedIds = selectedGoals.map(goal => goal.id);
      const newSelectedIds = value;
      
      const addedIds = newSelectedIds.filter(id => !currentSelectedIds.includes(id));
      const removedIds = currentSelectedIds.filter(id => !newSelectedIds.includes(id));
      
      addedIds.forEach(id => {
        const goal = goals.find(g => g.id === id);
        if (goal) onGoalToggle(goal, true);
      });
      
      removedIds.forEach(id => {
        const goal = goals.find(g => g.id === id);
        if (goal) onGoalToggle(goal, false);
      });
    } else {
      const goal = goals.find(g => g.id === value);
      if (goal) {
        const isCurrentlySelected = selectedGoals.some(selected => selected.id === goal.id);
        onGoalToggle(goal, !isCurrentlySelected);
      }
    }
  };

  const selectedGoalIds = selectedGoals.map(goal => goal.id);

  return (
    <div className="n3o-widget-crowdfunding-goal-selection">
      <DonationAmount
        suggestedAmounts={suggestedAmounts}
        selectedAmount={selectedGoalIds}
        targetCurrency={targetCurrency}
        onAmountChange={handleGoalSelectionChange}
        multiple={true}
      />
    </div>
  );
}
