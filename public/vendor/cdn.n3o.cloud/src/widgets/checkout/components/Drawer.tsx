import React from "react"
import { X } from "lucide-react"
import { Sheet, SheetContent } from "@n3oltd/n3o-ui-components"

type DrawerContextType = {
  close?: () => void
}

const DrawerContext = React.createContext<DrawerContextType>({})

type DrawerRootProps = {
  open: boolean
  close?: () => void
  customClass?: string,
  children:  React.ReactNode
}

export function Drawer({ open, close, children, customClass }: DrawerRootProps) {
  return (
    <DrawerContext.Provider value={{ close }}>
      <Sheet open={open} >
        <SheetContent className="w-full [@media(min-width:1024px)]:w-[50%] [@media(min-width:1200px)]:w-[40%] [@media(min-width:1440px)]:w-[32%] top-[var(--ion-safe-area-top)] h-[calc(100%-var(--ion-safe-area-top,0px)-var(--ion-safe-area-bottom,0px))] border-l p-0 bg-background z-[99999]">
          <div className={`w-full h-full flex flex-col overflow-y-auto ${customClass}`}>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </DrawerContext.Provider>
  )
}

type DrawerHeaderProps = {
  children?: React.ReactNode,
  hideCloseButton?: boolean
}

Drawer.Header = function DrawerHeader({ children, hideCloseButton }: DrawerHeaderProps) {
  const { close } = React.useContext(DrawerContext)

  if (!children && !hideCloseButton && close) {
    return (
      <div className="flex justify-end pr-2 pt-2">
        <button
          onClick={close}
          className="p-1 border rounded-full"
        >
          <X className="h-5 w-5 text-card-foreground hover:text-card-foreground/70" />
        </button>
      </div>
    )
  }

  return (
    <div className="border-b p-5">
      <div className="flex items-center justify-between">
        {children && <h2 className="text-xl font-semibold">{children}</h2>}
        {(!hideCloseButton && close) && (
          <button
            onClick={close}
            className="p-1 border rounded-full"
          >
            <X className="h-5 w-5 text-card-foreground hover:text-card-foreground/70" />
          </button>
        )}
      </div>
    </div>
  )
}

type DrawerContentProps = {
  children: React.ReactNode
}

Drawer.Content = function DrawerContent({ children }: DrawerContentProps) {
  return (
    <div className="flex-1">
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {children}
      </div>
    </div>
  )
}

Drawer.ScrollableContent = function DrawerContent({ children }: DrawerContentProps) {
  return (
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {children}
      </div>
  )
}

type DrawerFooterProps = {
  children: React.ReactNode
}

Drawer.Footer = function DrawerFooter({ children }: DrawerFooterProps) {
  return (
    <div className="border-t p-5 gap-2 flex flex-col">
      {children}
    </div>
  )
}
