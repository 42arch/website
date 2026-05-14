'use client'

import { CalendarIcon, FlaskIcon, LightningIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Experiment {
  id: string
  title: string
  description: string
  status: 'running' | 'completed' | 'paused' | 'planned'
  date: string
  category: string
  findings?: string
}

const EXPERIMENTS: Experiment[] = [
  { id: 'exp-001', title: 'Panel-based Navigation System', description: 'Exploring IDE-inspired navigation patterns for personal websites.', status: 'running', date: '2026-05-14', category: 'UI/UX', findings: 'Panel-based layouts show 40% higher engagement time compared to traditional scroll layouts.' },
  { id: 'exp-002', title: 'GPU-Accelerated Terrain Editing', description: 'Migrating CPU-bound terrain modification to WebGL shaders for real-time brush-based editing at 60fps.', status: 'completed', date: '2026-04-22', category: 'Graphics', findings: 'Achieved 60fps stable with brush radii up to 200px.' },
  { id: 'exp-003', title: 'Voronoi-based River Networks', description: 'Implementing hydrologically accurate river generation using Voronoi diagrams.', status: 'completed', date: '2026-04-21', category: 'Algorithms', findings: 'Flux-based width scaling produces natural-looking rivers.' },
  { id: 'exp-004', title: 'Retina Pixel Rendering', description: 'Custom 2x oversampling for crisp tray icon rendering on macOS HiDPI displays.', status: 'completed', date: '2026-05-11', category: 'Native', findings: 'Manual pixel drawing at 2x eliminates all blurriness on Retina displays.' },
  { id: 'exp-005', title: 'Warm Industrial Color System', description: 'Designing a color token system using warm gray/cream backgrounds with amber accents.', status: 'running', date: '2026-05-14', category: 'Design' },
  { id: 'exp-006', title: 'Command Palette with Fuzzy Search', description: 'Implementing Raycast/Linear-style command palette for keyboard-first navigation.', status: 'planned', date: '2026-05-15', category: 'UI/UX' },
]

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
