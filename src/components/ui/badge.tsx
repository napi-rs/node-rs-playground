import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'tw-inline-flex tw-items-center tw-rounded-full tw-border tw-border-zinc-200 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-zinc-950 focus:tw-ring-offset-2 dark:tw-border-zinc-800 dark:focus:tw-ring-zinc-300',
  {
    variants: {
      variant: {
        default:
          'tw-border-transparent tw-bg-zinc-900 tw-text-zinc-50 hover:tw-bg-zinc-900/80 dark:tw-bg-lime-400 dark:tw-text-zinc-900 dark:hover:tw-bg-lime-400/80',
        secondary:
          'tw-border-transparent tw-bg-zinc-100 tw-text-zinc-900 hover:tw-bg-zinc-100/80 dark:tw-bg-zinc-800 dark:tw-text-zinc-50 dark:hover:tw-bg-zinc-800/80',
        destructive:
          'tw-border-transparent tw-bg-red-500 tw-text-zinc-50 hover:tw-bg-red-500/80 dark:tw-bg-red-900 dark:tw-text-zinc-50 dark:hover:tw-bg-red-900/80',
        outline: 'tw-text-zinc-950 dark:tw-text-zinc-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
