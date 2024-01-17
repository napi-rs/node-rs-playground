import * as React from 'react'

import { cn } from '../../lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-zinc-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-white placeholder:tw-text-zinc-500 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-zinc-950 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 dark:tw-border-zinc-800 dark:tw-bg-zinc-950 dark:tw-ring-offset-zinc-950 dark:placeholder:tw-text-zinc-400 dark:focus-visible:tw-ring-zinc-300',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
