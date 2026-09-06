import * as React from "react"
import { clsx } from "clsx"

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-[#FF6B00] dark:bg-zinc-900 dark:border-zinc-700",
        className
      )}
      {...props}
    />
  )
}
