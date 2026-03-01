import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border bg-[var(--pixel-darker)] font-medium uppercase tracking-[0.05em] transition',
  {
    variants: {
      variant: {
        default: 'border-[var(--pixel-border-highlight)] text-[var(--pixel-green)]',
        cyan: 'border-[var(--pixel-cyan)]/70 text-[var(--pixel-cyan)]',
        yellow: 'border-[var(--pixel-yellow)]/70 text-[var(--pixel-yellow)]',
        magenta: 'border-[var(--pixel-magenta)]/70 text-[var(--pixel-magenta)]',
      },
      size: {
        default: 'px-2 py-0.5 text-[8px] leading-none',
        sm: 'px-1.5 py-0.5 text-[7px] leading-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
