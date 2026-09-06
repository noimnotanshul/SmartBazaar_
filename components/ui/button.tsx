import * as React from "react"
import { clsx } from "clsx"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline"
  size?: "sm" | "default"
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-lg font-semibold transition disabled:opacity-50",
        variant === "default" &&
          "bg-[#FF6B00] text-white hover:bg-[#E65C00]",
        variant === "outline" &&
          "border border-gray-300 bg-white hover:bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700",
        size === "default" && "h-11 px-4 text-sm",
        size === "sm" && "h-9 px-3 text-xs",
        className
      )}
      {...props}
    />
  )
}
