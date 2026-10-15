'use client'

import { useShellStore } from '@/stores/shell-store'

export function ShellToast() {
  const toastMessage = useShellStore(state => state.toastMessage)

  if (!toastMessage)
    return null

  return (
    <div className="fixed top-9 right-4 z-50 pointer-events-none transition-all duration-200 animate-in fade-in slide-in-from-right-4">
      <div className="rounded-[6px] border border-ph-border bg-ph-surface/95 backdrop-blur-md px-3.5 py-2 shadow-mac dark:shadow-mac-dark text-ph-ink text-xs flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ph-orange" />
        <span className="font-medium">{toastMessage}</span>
      </div>
    </div>
  )
}
