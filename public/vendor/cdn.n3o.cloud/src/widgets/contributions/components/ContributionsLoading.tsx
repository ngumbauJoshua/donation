import { cn, Skeleton } from "@n3oltd/n3o-ui-components"

type ContributionsLoadingProps = {
  className?: string
  tabCount?: number // e.g., 2 or 3
  activeIndex?: number // which tab is "active" in the skeleton
  itemCount?: number // how many list items to render
  showSeparator?: boolean // show the mid-list blurb row
  showBadgeOnSecond?: boolean // show a small badge on second tab skeleton
}

export function ContributionsLoading({
  className,
  tabCount = 2,
  activeIndex = -1,
  itemCount = 6,
  showSeparator = true,
  showBadgeOnSecond = true,
}: ContributionsLoadingProps) {
  const tabs = Array.from({ length: tabCount })

  return (
    <div className={cn("bg-card rounded-lg border shadow-sm p-4 n3o-widget-contributions-loading", className)}>
      {/* Tabs bar skeleton - unified container header */}
      <div className="w-full flex rounded-none border-b border-border bg-transparent p-0 overflow-visible relative n3o-widget-contributions-loading__tabs">
        {tabs.map((_, i) => (
          <div
            key={i}
            className={cn(
              // equal-width tabs
              "relative flex-1 basis-0 text-center px-0 py-2 rounded-none n3o-widget-contributions-loading__tab",
              // maintain consistent height; no real border on trigger, only underline below
              "data-[state=active]:after:bg-primary",
              // ensure no background/shadow shifts if these classes are present in real tabs
              "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
            )}
          >
            <div className="mx-auto inline-flex items-center gap-2 n3o-widget-contributions-loading__tab-content">
              <Skeleton className="h-4 w-28 n3o-widget-contributions-loading__tab-text" aria-hidden />
              {showBadgeOnSecond && i === 1 ? <Skeleton className="h-5 w-6 rounded-full n3o-widget-contributions-loading__tab-badge" aria-hidden /> : null}
            </div>
            {i === activeIndex ? (
              <div
                className="
                  absolute inset-x-0 -bottom-[1px] h-0.5
                  bg-primary
                "
                aria-hidden
              />
            ) : null}
          </div>
        ))}
      </div>

      {/* List skeleton items */}
      <div className="divide-y divide-border n3o-widget-contributions-loading__list">
        {Array.from({ length: itemCount }).map((_, idx) => (
          <div key={idx} className="flex min-w-0 items-start gap-4 py-4 sm:items-center n3o-widget-contributions-loading__list-item">
            {/* Avatar */}
            <Skeleton className="h-10 w-10 rounded-full shrink-0 n3o-widget-contributions-loading__avatar" />

            {/* Content (name/message) */}
            <div className="flex-1 min-w-0 pr-2 sm:pr-0 n3o-widget-contributions-loading__content">
              <Skeleton className="h-4 w-40 n3o-widget-contributions-loading__name" />
              <div className='mt-2 n3o-widget-contributions-loading__message'>
                <Skeleton className='h-3 w-56' />
              </div>
            </div>

            {/* Meta (amount + gift aid on same row, time below) */}
            <div className="ml-auto flex shrink-0 flex-col items-end gap-1 text-right n3o-widget-contributions-loading__meta">
              <div className="flex items-center justify-end gap-2 n3o-widget-contributions-loading__amount-row">
                <Skeleton className="h-4 w-16 n3o-widget-contributions-loading__amount" />
                <Skeleton className="h-3 w-24 n3o-widget-contributions-loading__gift-aid" />
              </div>
              <Skeleton className="h-3 w-20 n3o-widget-contributions-loading__time" />
            </div>
          </div>
        ))}

        {showSeparator && (
          <div className="py-4 n3o-widget-contributions-loading__separator">
            <Skeleton className="h-4 w-3/4 n3o-widget-contributions-loading__separator-text" />
          </div>
        )}
      </div>
    </div>
  )
}
