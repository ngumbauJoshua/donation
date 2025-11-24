import React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@n3oltd/n3o-ui-components"

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  loader?: React.ReactNode
  blur?: boolean
  overlayClassName?: string
  spinnerClassName?: string
  loadingText?: string
}

export function LoadingOverlay({
  isLoading = false,
  loader,
  blur = true,
  overlayClassName,
  spinnerClassName,
  loadingText,
  className,
  ...props
}: LoadingOverlayProps) {
  if (!isLoading) return null

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center",
        blur && "backdrop-blur-sm",
        overlayClassName ?? "bg-background/80",
        className,
      )}
      {...props}
      role="alert"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        {loader ?? <Loader2 className={cn("h-8 w-8 animate-spin", spinnerClassName ?? "text-primary")} />}
        {loadingText && <p className="text-sm font-medium text-muted-foreground">{loadingText}</p>}
      </div>
    </div>
  )
}

