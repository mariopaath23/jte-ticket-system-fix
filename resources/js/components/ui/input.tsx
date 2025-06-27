import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-gray-300 dark:border-gray-600 file:text-foreground placeholder:text-gray-500 dark:placeholder:text-gray-400 selection:bg-blue-500 selection:text-white flex h-9 w-full min-w-0 rounded-md border bg-white dark:bg-gray-700 px-3 py-1 text-base text-gray-900 dark:text-white shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-blue-500 dark:focus-visible:border-blue-400 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-400/20 focus-visible:ring-[3px]",
        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-400/20 aria-invalid:border-red-500 dark:aria-invalid:border-red-400",
        className
      )}
      {...props}
    />
  )
}

export { Input }
