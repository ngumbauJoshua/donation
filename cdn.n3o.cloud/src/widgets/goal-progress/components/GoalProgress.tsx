import { cn, Progress } from "@n3oltd/n3o-ui-components"
import { ReactNode } from "react"

type GoalProgressRootProps = {
  children: ReactNode
  className?: string
}

function Root({ children, className }: GoalProgressRootProps) {
  return <div className={cn("space-y-6 n3o-widget-goal-progress", className)}>{children}</div>
}

type AmountProps = {
  children: ReactNode
  className?: string
}

function Amount({ children, className }: AmountProps) {
  return <div className={cn("space-y-2 text-center n3o-widget-goal-progress__amount", className)}>{children}</div>
}

type AmountValueProps = {
  children: ReactNode
  className?: string
}

function AmountValue({ children, className }: AmountValueProps) {
  return <div className={cn("font-bold n3o-widget-goal-progress__amount-value", className)}>{children}</div>
}

type AmountLabelProps = {
  children: ReactNode
  className?: string
}

function AmountLabel({ children, className }: AmountLabelProps) {
  return <p className={cn("n3o-widget-goal-progress__amount-label", className)}>{children}</p>
}

type ProgressSectionProps = {
  children?: ReactNode
  amountRaised: number
  goalAmount: number
  className?: string
  progressClassName?: string
}

function ProgressSection({
  children,
  amountRaised,
  goalAmount,
  className,
  progressClassName,
}: ProgressSectionProps) {
  const percentage = goalAmount > 0 ? (amountRaised / goalAmount) * 100 : 0
  return (
    <div className={cn("space-y-3 n3o-widget-goal-progress__progress-section", className)}>
      <Progress value={percentage} className={cn("n3o-widget-goal-progress__progress-bar", progressClassName)} />
      {children}
    </div>
  )
}

type StatsProps = {
  children: ReactNode
  className?: string
}

function Stats({ children, className }: StatsProps) {
  return <p className={cn("text-center text-sm n3o-widget-goal-progress__stats", className)}>{children}</p>
}

export const GoalProgress = {
  Root,
  Amount,
  AmountValue,
  AmountLabel,
  Progress: ProgressSection,
  Stats,
}