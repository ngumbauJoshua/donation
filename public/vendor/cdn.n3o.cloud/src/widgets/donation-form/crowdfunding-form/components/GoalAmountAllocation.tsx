import { useTranslation } from "@/i18n";
import { Input } from "@n3oltd/n3o-ui-components";

interface GoalAmountAllocationProps {
  selectedGoals: any[];
  goalAmounts: Record<string, number>;
  onGoalAmountChange: (goalId: string, amount: number) => void;
  targetCurrency?: any;
  designations?: any[];
}

export function GoalAmountAllocation({ 
  selectedGoals, 
  goalAmounts, 
  onGoalAmountChange,
  targetCurrency,
  designations = []
}: GoalAmountAllocationProps) {
  const { formatMessage, formatCurrency } = useTranslation();

  const setAmount = (goalId: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0;
    onGoalAmountChange(goalId, numValue);
  };

  const totalAmount = Object.values(goalAmounts).reduce((sum, amount) => sum + amount, 0);

  const getDesignationName = (goal: any) => {
    const designation = designations.find(d => d.id === goal.designationId);
    return designation?.name || `Goal ${goal.id}`;
  };

  return (
    <div className="n3o-widget-crowdfunding-goal-allocation">
      <div className="border-t border-border my-6 n3o-widget-crowdfunding-goal-allocation__divider"></div>
      
      <table className="w-full border-collapse n3o-widget-crowdfunding-goal-allocation__table">
        <thead className="n3o-widget-crowdfunding-goal-allocation__header">
          <tr className="text-left text-sm border-b border-border n3o-widget-crowdfunding-goal-allocation__header-row">
            <th className="pb-3 px-4 text-left text-foreground n3o-widget-crowdfunding-goal-allocation__header-cell">
              {formatMessage("donation.form.crowdfunding.designation")}
            </th>
            <th className="pb-3 px-4 text-right w-32 text-foreground n3o-widget-crowdfunding-goal-allocation__header-cell">
              {formatMessage('common.amount')}
            </th>
          </tr>
        </thead>
        <tbody className="n3o-widget-crowdfunding-goal-allocation__body">
          {selectedGoals.map((goal) => (
            <tr key={goal.id} className="border-b border-border/50 n3o-widget-crowdfunding-goal-allocation__row">
              <td className="py-4 px-4 n3o-widget-crowdfunding-goal-allocation__goal-cell">
                <span className="text-sm font-medium text-foreground n3o-widget-crowdfunding-goal-allocation__goal-name">
                  {getDesignationName(goal)}
                </span>
              </td>
              <td className="py-4 px-4 text-right n3o-widget-crowdfunding-goal-allocation__amount-cell">
                <div className="relative max-w-32 n3o-widget-crowdfunding-goal-allocation__amount-input-wrapper">
                  <Input
                    type="number"
                    className="peer ps-8 pe-3 text-right n3o-widget-crowdfunding-goal-allocation__amount-input"
                    min={0}
                    step="0.01"
                    value={goalAmounts[goal.id] || 0}
                    onChange={(e) => setAmount(goal.id, e.target.value)}
                    placeholder="0.00"
                  />
                  <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50 n3o-widget-crowdfunding-goal-allocation__currency-symbol">
                    {targetCurrency?.symbol || '$'}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="n3o-widget-crowdfunding-goal-allocation__footer">
          <tr className="border-t-2 border-border bg-muted n3o-widget-crowdfunding-goal-allocation__total-row">
            <td className="py-3 px-4 font-semibold text-foreground text-left n3o-widget-crowdfunding-goal-allocation__total-label">
              {formatMessage('donation.form.crowdfunding.totalAmount')}
            </td>
            <td className="py-3 px-4 font-semibold text-foreground text-right n3o-widget-crowdfunding-goal-allocation__total-amount">
              {formatCurrency(totalAmount, targetCurrency?.code || 'USD')}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
