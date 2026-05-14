'use client'

import { TerminalIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { useWorkspaceStore } from '@/store/workspace'

interface ActivityEntry {
  timestamp: string
  type: 'commit' | 'deploy' | 'build' | 'note' | 'system'
  message: string
}

const ACTIVITY_LOG: ActivityEntry[] = [
  { timestamp: '2026-05-14 15:30:01', type: 'system', message: 'workspace initialized' },
  { timestamp: '2026-05-14 14:22:17', type: 'commit', message: 'feat: implement portfolio-os workspace layout' },
  { timestamp: '2026-05-14 12:45:33', type: 'build', message: 'build #142 completed successfully' },
  { timestamp: '2026-05-13 23:10:05', type: 'deploy', message: 'deployed to production (v0.4.2)' },
  { timestamp: '2026-05-13 21:30:44', type: 'commit', message: 'refactor: migrate to zustand store architecture' },
  { timestamp: '2026-05-13 18:15:22', type: 'note', message: 'exploring experimental interaction patterns' },
  { timestamp: '2026-05-13 15:08:19', type: 'build', message: 'build #141 completed with warnings' },
  { timestamp: '2026-05-12 22:45:00', type: 'commit', message: 'chore: update design system color tokens' },
  { timestamp: '2026-05-12 20:30:11', type: 'deploy', message: 'deployed to staging (v0.4.1-rc)' },
  { timestamp: '2026-05-12 16:20:33', type: 'system', message: 'dependency audit: 0 vulnerabilities found' },
  { timestamp: '2026-05-12 14:10:05', type: 'commit', message: 'fix: resolve hydration mismatch in theme provider' },
  { timestamp: '2026-05-11 23:55:42', type: 'note', message: 'researching neo-brutalism layout patterns' },
]

const TYPE_COLORS: Record<ActivityEntry['type'], string> = {
  commit: 'text-blue-400',
  deploy: 'text-emerald-400',
  build: 'text-amber-400',
  note: 'text-purple-400',
  system: 'text-os-terminal-fg',
}

const TYPE_PREFIX: Record<ActivityEntry['type'], string> = {
  commit: '[GIT]',
  deploy: '[DEPLOY]',
  build: '[BUILD]',
  note: '[NOTE]',
  system: '[SYS]',
}

export function BottomPanel() {
  const { bottomPanelOpen, bottomPanelHeight } = useWorkspaceStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [visibleEntries, setVisibleEntries] = useState<ActivityEntry[]>([])

  // Simulate entries appearing one by one
  useEffect(() => {
    if (!bottomPanelOpen)
      return
    setVisibleEntries([])
    let i = 0
    const interval = setInterval(() => {
      if (i < ACTIVITY_LOG.length) {
        const idx = i
        setVisibleEntries(prev => [...prev, ACTIVITY_LOG[idx]])
        i++
      }
      else {
        clearInterval(interval)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [bottomPanelOpen])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleEntries])

  return (
    <AnimatePresence initial={false}>
      {bottomPanelOpen && (
        <motion.div
          id="bottom-panel"
          initial={{ height: 0 }}
          animate={{ height: bottomPanelHeight }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex shrink-0 flex-col overflow-hidden border-t border-os-border"
        >
          {/* Panel header */}
          <div className="flex h-7 shrink-0 items-center justify-between border-b border-os-border bg-os-toolbar px-3">
            <div className="flex items-center gap-2">
              <TerminalIcon size={12} className="text-os-terminal-fg" />
              <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground">
                ACTIVITY
              </span>
              <span className="ml-1 rounded-sm bg-os-accent-muted px-1.5 py-0.5 font-mono text-[9px] text-os-accent">
                {ACTIVITY_LOG.length}
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground">
              <div className="size-1.5 rounded-full bg-os-indicator animate-pulse" />
              live
            </div>
          </div>

          {/* Log content */}
          <div
            ref={scrollRef}
            className="os-scrollbar flex-1 overflow-y-auto bg-os-terminal-bg p-3 font-mono text-[11px] leading-relaxed"
          >
            {visibleEntries.map((entry, i) => (
              <motion.div
                key={`${entry.timestamp}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex gap-2"
              >
                <span className="shrink-0 text-os-terminal-fg/50">{entry.timestamp}</span>
                <span className={`shrink-0 font-semibold ${TYPE_COLORS[entry.type]}`}>
                  {TYPE_PREFIX[entry.type]}
                </span>
                <span className="text-os-terminal-fg">{entry.message}</span>
              </motion.div>
            ))}
            {visibleEntries.length > 0 && (
              <div className="mt-1 flex items-center gap-1">
                <span className="text-os-terminal-fg/50">$</span>
                <span className="inline-block h-3.5 w-1.5 animate-pulse bg-os-terminal-fg/70" />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
