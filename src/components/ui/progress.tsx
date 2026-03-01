'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'
import { cn } from '@/lib/utils'

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        'relative h-4 w-full overflow-hidden border-2 border-[var(--pixel-border-highlight)] bg-[#0d1524]',
        className,
      )}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full bg-[repeating-linear-gradient(90deg,var(--pixel-green),var(--pixel-green)_8px,var(--pixel-cyan)_8px,var(--pixel-cyan)_16px)] transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
