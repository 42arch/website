import type { VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap border-2 text-[10px] uppercase tracking-[0.08em] transition disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default: 'border-[var(--pixel-border-highlight)] bg-[var(--pixel-card)] text-[var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5',
        green: 'border-[var(--pixel-green)] bg-[var(--pixel-card)] text-[var(--pixel-green)] shadow-[3px_3px_0_rgba(0,255,136,0.28)] hover:-translate-x-0.5 hover:-translate-y-0.5',
        cyan: 'border-[var(--pixel-cyan)] bg-[var(--pixel-card)] text-[var(--pixel-cyan)] shadow-[3px_3px_0_rgba(0,204,255,0.28)] hover:-translate-x-0.5 hover:-translate-y-0.5',
        yellow: 'border-[var(--pixel-yellow)] bg-[var(--pixel-card)] text-[var(--pixel-yellow)] shadow-[3px_3px_0_rgba(255,204,0,0.28)] hover:-translate-x-0.5 hover:-translate-y-0.5',
        magenta: 'border-[var(--pixel-magenta)] bg-[var(--pixel-card)] text-[var(--pixel-magenta)] shadow-[3px_3px_0_rgba(255,68,204,0.28)] hover:-translate-x-0.5 hover:-translate-y-0.5',
        ghost: 'border-[var(--pixel-border)] bg-[var(--pixel-darker)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
      },
      size: {
        default: 'h-9 px-3.5',
        sm: 'h-8 px-3 text-[9px]',
        lg: 'h-10 px-4.5 text-[11px]',
        icon: 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
