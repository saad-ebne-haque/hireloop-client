"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      duration={4500}
      position="top-right"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-emerald-400" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-rose-400" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group/cn-toast rounded-2xl border border-white/10 bg-[#19191d] text-white shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl",
          title: "text-sm font-semibold text-white",
          description: "text-xs leading-relaxed text-white/65",
          success: "border-emerald-500/30",
          error: "border-rose-500/35",
          info: "border-brand/30",
          warning: "border-amber-400/30",
          closeButton:
            "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
