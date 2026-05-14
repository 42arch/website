import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface PanelBadgeProps {
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function PanelBadge({ children, icon, className }: PanelBadgeProps) {
  return (
    <span className={cn(
      "flex items-center gap-1 rounded-sm border border-os-border bg-os-surface px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground",
      className
    )}>
      {icon}
      {children}
    </span>
  )
}
