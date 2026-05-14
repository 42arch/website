import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface OsCardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export function OsCard({ children, className, hoverable = true }: OsCardProps) {
  return (
    <div className={cn(
      'rounded-sm border border-os-border bg-os-surface transition-all',
      hoverable && 'hover:border-os-accent/30',
      className
    )}>
      {children}
    </div>
  )
}
