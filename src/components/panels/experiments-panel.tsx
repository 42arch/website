'use client'

import { CalendarIcon, FlaskIcon, LightningIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { siteConfig } from '@/config'
import type { Experiment } from '@/config/types'
import { cn } from '@/lib/utils'

const EXPERIMENTS = siteConfig.experiments

const STATUS_MAP: Record<Experiment['status'], { color: string, label: string, pulse: boolean }> = {
  running: { color: 'bg-emerald-400', label: 'RUNNING', pulse: true },
  completed: { color: 'bg-blue-400', label: 'COMPLETED', pulse: false },
  paused: { color: 'bg-amber-400', label: 'PAUSED', pulse: false },
  planned: { color: 'bg-zinc-400', label: 'PLANNED', pulse: false },
}

export function ExperimentsPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <FlaskIcon size={14} className="text-os-accent" />
            <h1 className="font-heading text-lg font-bold tracking-tight">workspace://experiments</h1>
          </div>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">Research log — documenting technical explorations and findings.</p>
        </div>
        <div className="space-y-3">
          {EXPERIMENTS.map((exp, i) => {
            const st = STATUS_MAP[exp.status]
            return (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.05 }} className="rounded-sm border border-os-border bg-os-surface">
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 shrink-0"><div className={cn('size-2 rounded-full', st.color, st.pulse && 'animate-pulse')} /></div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-muted-foreground">{exp.id}</span>
                      <span className="rounded-sm bg-os-accent-muted px-1.5 py-0.5 font-mono text-[9px] text-os-accent">{st.label}</span>
                      <span className="rounded-sm border border-os-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{exp.category}</span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground">{exp.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-muted-foreground">
                    <CalendarIcon size={10} />
                    {exp.date}
                  </span>
                </div>
                {exp.findings && (
                  <div className="border-t border-os-border bg-background/50 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <LightningIcon size={12} className="mt-0.5 shrink-0 text-os-accent" weight="fill" />
                      <div>
                        <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">FINDINGS</span>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-foreground">{exp.findings}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
