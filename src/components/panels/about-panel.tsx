'use client'

import { InfoIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { siteConfig } from '@/config'
import pkg from '../../../package.json'

function getVersion(name: string): string {
  const raw = (pkg.dependencies as any)[name] || (pkg.devDependencies as any)[name]
  if (!raw) return 'unknown'
  return raw.replace(/[\^~]/, '')
}

const TECH_ITEMS = [
  { name: 'Next.js', pkgName: 'next' },
  { name: 'React', pkgName: 'react' },
  { name: 'TypeScript', pkgName: 'typescript' },
  { name: 'Tailwind CSS', pkgName: 'tailwindcss' },
  { name: 'Zustand', pkgName: 'zustand' },
  { name: 'Motion', pkgName: 'motion' },
  { name: 'Fumadocs', pkgName: 'fumadocs-ui' },
]

export function AboutPanel() {
  const { about, site } = siteConfig

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="os-scrollbar h-full overflow-y-auto p-6"
    >
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <InfoIcon size={14} className="text-os-accent" />
            <h1 className="font-heading text-lg font-bold tracking-tight">workspace://about</h1>
          </div>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">Detailed system information and technology stack metrics.</p>
        </div>

        {/* Section 1: Intro */}
        <div className="space-y-3">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            WEBSITE INTRODUCTION
          </div>
          <div className="relative overflow-hidden rounded-sm border border-os-border bg-os-surface p-5 space-y-4">
            {/* Grid background effect */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{ backgroundImage: 'linear-gradient(var(--os-border) 1px, transparent 1px), linear-gradient(90deg, var(--os-border) 1px, transparent 1px)', backgroundSize: '15px 15px' }}
            />
            <p className="relative z-10 text-xs leading-relaxed text-foreground/90">
              {about.description}
            </p>

            <div className="relative z-10 grid grid-cols-2 gap-4 pt-2 border-t border-os-border/40 font-mono text-[10px]">
              <div>
                <span className="text-muted-foreground block uppercase">System Architecture</span>
                <span className="text-foreground font-medium mt-0.5 block">{site.name} Workspace</span>
              </div>
              <div>
                <span className="text-muted-foreground block uppercase">Open Source License</span>
                <span className="text-foreground font-medium mt-0.5 block">MIT License</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Tech Stack */}
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              WEBSITE TECHNOLOGY STACK
            </div>
            {about.techStackDescription && (
              <p className="text-[11px] text-muted-foreground">{about.techStackDescription}</p>
            )}
          </div>

          <div className="rounded-sm border border-os-border bg-os-surface/50 p-5 font-mono text-xs space-y-3">
            {/* Header row */}
            <div className="flex justify-between border-b border-os-border/40 pb-2 mb-3 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
              <span>Core Dependency</span>
              <span>Version</span>
            </div>

            {/* System version */}
            <div className="flex items-center gap-2">
              <span className="text-foreground font-medium min-w-[120px]">Workspace OS</span>
              <span className="flex-1 border-b border-dashed border-os-border/30 h-3" />
              <span className="text-os-accent font-semibold">{pkg.version}</span>
            </div>

            {/* Dynamic dependencies */}
            {TECH_ITEMS.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="text-foreground font-medium min-w-[120px]">{item.name}</span>
                <span className="flex-1 border-b border-dashed border-os-border/30 h-3" />
                <span className="text-os-accent font-semibold">{getVersion(item.pkgName)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
