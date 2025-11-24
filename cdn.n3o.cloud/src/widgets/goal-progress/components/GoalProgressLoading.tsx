import { Skeleton } from "@n3oltd/n3o-ui-components";
import { GoalProgress } from "./GoalProgress";

export function GoalProgressLoading() {
  return (
    <GoalProgress.Root className="p-4 bg-primary-foreground n3o-widget-goal-progress-loading">
      <GoalProgress.Amount>
        <Skeleton className="h-12 w-48 mx-auto mb-2 n3o-widget-goal-progress-loading__amount-skeleton" />
        
        <Skeleton className="h-5 w-64 mx-auto n3o-widget-goal-progress-loading__label-skeleton" />
      </GoalProgress.Amount>

      <div className="space-y-3 n3o-widget-goal-progress-loading__progress-section">
        <Skeleton className="h-2 w-full rounded-full n3o-widget-goal-progress-loading__progress-bar" />
        
        <Skeleton className="h-4 w-56 mx-auto n3o-widget-goal-progress-loading__stats" />
      </div>
    </GoalProgress.Root>
  );
}