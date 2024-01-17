import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '../../lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'tw-fixed tw-top-0 tw-z-[100] tw-flex tw-max-h-screen tw-w-full tw-flex-col-reverse tw-p-4 sm:tw-bottom-0 sm:tw-right-0 sm:tw-top-auto sm:tw-flex-col md:tw-max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'tw-group tw-pointer-events-auto tw-relative tw-flex tw-w-full tw-items-center tw-justify-between tw-space-x-4 tw-overflow-hidden tw-rounded-md tw-border tw-border-zinc-200 tw-p-6 tw-pr-8 tw-shadow-lg tw-transition-all data-[swipe=cancel]:tw-translate-x-0 data-[swipe=end]:tw-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:tw-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:tw-transition-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[swipe=end]:tw-animate-out data-[state=closed]:tw-fade-out-80 data-[state=closed]:tw-slide-out-to-right-full data-[state=open]:tw-slide-in-from-top-full data-[state=open]:sm:tw-slide-in-from-bottom-full dark:tw-border-zinc-800',
  {
    variants: {
      variant: {
        default:
          'tw-border tw-bg-white tw-text-zinc-950 dark:tw-bg-zinc-950 dark:tw-text-zinc-50',
        destructive:
          'tw-destructive tw-group tw-border-red-500 tw-bg-red-500 tw-text-zinc-50 dark:tw-border-red-900 dark:tw-bg-red-900 dark:tw-text-zinc-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'tw-inline-flex tw-h-8 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-zinc-200 tw-bg-transparent tw-px-3 tw-text-sm tw-font-medium tw-ring-offset-white tw-transition-colors hover:tw-bg-zinc-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-zinc-950 focus:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 group-[.destructive]:tw-border-zinc-100/40 group-[.destructive]:hover:tw-border-red-500/30 group-[.destructive]:hover:tw-bg-red-500 group-[.destructive]:hover:tw-text-zinc-50 group-[.destructive]:focus:tw-ring-red-500 dark:tw-border-zinc-800 dark:tw-ring-offset-zinc-950 dark:hover:tw-bg-zinc-800 dark:focus:tw-ring-zinc-300 dark:group-[.destructive]:tw-border-zinc-800/40 dark:group-[.destructive]:hover:tw-border-red-900/30 dark:group-[.destructive]:hover:tw-bg-red-900 dark:group-[.destructive]:hover:tw-text-zinc-50 dark:group-[.destructive]:focus:tw-ring-red-900',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'tw-absolute tw-right-2 tw-top-2 tw-rounded-md tw-p-1 tw-text-zinc-950/50 tw-opacity-0 tw-transition-opacity hover:tw-text-zinc-950 focus:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 group-hover:tw-opacity-100 group-[.destructive]:tw-text-red-300 group-[.destructive]:hover:tw-text-red-50 group-[.destructive]:focus:tw-ring-red-400 group-[.destructive]:focus:tw-ring-offset-red-600 dark:tw-text-zinc-50/50 dark:hover:tw-text-zinc-50',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="tw-h-4 tw-w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('tw-text-sm tw-font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('tw-text-sm tw-opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
