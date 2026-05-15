'use client'

import { GitBranchIcon, RocketLaunchIcon, TerminalIcon, WrenchIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface LogEntry {
  timestamp: string
  type: 'commit' | 'deploy' | 'build' | 'system' | 'note'
  message: string
  hash?: string
  branch?: string
}

const ACTIVITY_DATA: LogEntry[] = [
  { timestamp: '2026-05-14 15:30', type: 'commit', message: 'feat: implement folio-os workspace layout', hash: 'a3f2c1d', branch: 'main' },
  { timestamp: '2026-05-14 14:22', type: 'build', message: 'build #142 completed successfully (12.3s)' },
  { timestamp: '2026-05-14 12:45', type: 'deploy', message: 'deployed to production (v0.4.2)' },
  { timestamp: '2026-05-13 23:10', type: 'commit', message: 'refactor: migrate to zustand store architecture', hash: 'b7e4f2a', branch: 'main' },
  { timestamp: '2026-05-13 21:30', type: 'system', message: 'dependency audit: 0 vulnerabilities found' },
  { timestamp: '2026-05-13 18:15', type: 'note', message: 'exploring experimental interaction patterns for workspace UI' },
  { timestamp: '2026-05-13 15:08', type: 'build', message: 'build #141 completed with 2 warnings' },
  { timestamp: '2026-05-12 22:45', type: 'commit', message: 'chore: update design system color tokens', hash: 'c9d1e3f', branch: 'feat/colors' },
  { timestamp: '2026-05-12 20:30', type: 'deploy', message: 'deployed to staging (v0.4.1-rc)' },
  { timestamp: '2026-05-12 16:20', type: 'commit', message: 'fix: resolve hydration mismatch in theme provider', hash: 'd2a8b4c', branch: 'main' },
  { timestamp: '2026-05-11 23:55', type: 'note', message: 'researching neo-brutalism layout patterns' },
  { timestamp: '2026-05-11 19:30', type: 'build', message: 'build #140 completed successfully (11.8s)' },
  { timestamp: '2026-05-11 15:00', type: 'commit', message: 'feat: add retina 2x rendering for tray icons', hash: 'e5f7a9b', branch: 'main' },
  { timestamp: '2026-05-10 22:10', type: 'deploy', message: 'deployed to production (v0.4.0)' },
  { timestamp: '2026-05-10 20:00', type: 'system', message: 'node_modules cache cleared, full rebuild triggered' },
]

const TYPE_CONFIG: Record<LogEntry['type'], { icon: typeof GitBranchIcon, color: string, prefix: string }> = {
  commit: { icon: GitBranchIcon, color: 'text-blue-400', prefix: 'GIT' },
  deploy: { icon: RocketLaunchIcon, color: 'text-emerald-400', prefix: 'DEPLOY' },
  build: { icon: WrenchIcon, color: 'text-amber-400', prefix: 'BUILD' },
  system: { icon: TerminalIcon, color: 'text-purple-400', prefix: 'SYS' },
  note: { icon: TerminalIcon, color: 'text-zinc-400', prefix: 'NOTE' },
}

export function ActivityPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div>
          <h1 className="font-heading text-lg font-bold tracking-tight">workspace://activity</h1>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">Development history — commits, deployments, and system events.</p>
        </div>
        <div className="space-y-0">
          {ACTIVITY_DATA.map((entry, i) => {
            const cfg = TYPE_CONFIG[entry.type]
            const Icon = cfg.icon
            return (
              <motion.div key={`${entry.timestamp}-${i}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15, delay: i * 0.03 }} className="group flex items-start gap-3 border-l-2 border-os-border py-3 pl-4 pr-2 transition-colors hover:border-l-os-accent hover:bg-os-accent-muted/30">
                <Icon size={13} className={cn('mt-0.5 shrink-0', cfg.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn('font-mono text-[9px] font-semibold', cfg.color)}>
                      [
                      {cfg.prefix}
                      ]
                    </span>
                    <span className="text-xs text-foreground truncate">{entry.message}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                    <span>{entry.timestamp}</span>
                    {entry.hash && <span className="text-os-accent">{entry.hash}</span>}
                    {entry.branch && (
                      <span>
                        on
                        {entry.branch}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
