'use client'

import { CheckCircleIcon, CodeIcon, GitBranchIcon } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { PANEL_CONFIG } from '@/store/workspace'

export function StatusBar() {
  const pathname = usePathname()
  const activePanel = pathname.split('/')[1] || 'overview'
  const config = PANEL_CONFIG[activePanel as keyof typeof PANEL_CONFIG] || PANEL_CONFIG.overview

  return (
    <footer
      id="status-bar"
      className="flex h-6 shrink-0 items-center justify-between border-t border-os-border bg-os-toolbar px-3 font-mono text-[10px] text-muted-foreground"
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranchIcon size={11} />
          main
        </span>
        <span className="flex items-center gap-1">
          <CheckCircleIcon size={11} className="text-emerald-400" />
          0 issues
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <CodeIcon size={11} />
          {config.label}
        </span>
        <span>UTF-8</span>
        <span>portfolio-os v0.1.0</span>
      </div>
    </footer>
  )
}
