import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface PanelHeaderProps {
  path: string
  description?: string
  icon?: ReactNode
  children?: ReactNode
  className?: string
}

export function PanelHeader({ path, description, icon, children, className }: PanelHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <div className="flex items-center gap-2">
          {icon && <div className="text-os-accent">{icon}</div>}
          <h1 className="font-heading text-lg font-bold tracking-tight">{path}</h1>
        </div>
        {description && (
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
