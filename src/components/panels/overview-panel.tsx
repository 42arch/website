'use client'

import {
  ArrowRightIcon,
  CalendarIcon,
  CodeIcon,
  FlaskIcon,
  FolderIcon,
  GitBranchIcon,
  LightningIcon,
  RocketLaunchIcon,
  TerminalIcon,
  TrendUpIcon,
} from '@phosphor-icons/react'
import { motion } from 'motion/react'
import Link from 'next/link'

import { useWorkspaceStore } from '@/store/workspace'

function StatusBadge({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex items-center gap-2 rounded-sm border border-os-border bg-os-surface px-3 py-2">
      <div className={`size-2 rounded-full ${color}`} />
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="ml-auto font-mono text-xs font-medium text-foreground">{value}</span>
    </div>
  )
}

function QuickAction({ icon: Icon, label, panelId }: {
  icon: React.ComponentType<{ size?: number, weight?: 'regular' | 'fill' | 'bold' | 'duotone', className?: string }>
  label: string
  panelId: string
}) {
  const { openTab } = useWorkspaceStore()
  return (
    <Link
      href={`/${panelId}`}
      onClick={() => openTab(panelId)}
      className="group flex items-center gap-2 rounded-sm border border-os-border bg-os-surface px-3 py-2.5 text-left transition-all hover:border-os-accent/40 hover:bg-os-accent-muted"
    >
      <Icon size={14} className="text-muted-foreground group-hover:text-os-accent" />
      <span className="text-xs text-foreground">{label}</span>
      <ArrowRightIcon size={10} className="ml-auto text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  )
}

function FeaturedProject({ title, description, tags, status }: {
  title: string
  description: string
  tags: string[]
  status: string
}) {
  const { openTab } = useWorkspaceStore()
  return (
    <Link
      href="/projects"
      onClick={() => openTab('projects')}
      className="group flex flex-col gap-2 rounded-sm border border-os-border bg-os-surface p-4 text-left transition-all hover:border-os-accent/30 hover:bg-os-accent-muted/30"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <span className="rounded-sm bg-os-accent-muted px-1.5 py-0.5 font-mono text-[9px] text-os-accent">{status}</span>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <span key={tag} className="rounded-sm border border-os-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

export function OverviewPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="os-scrollbar h-full overflow-y-auto p-6"
    >
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TerminalIcon size={14} className="text-os-accent" />
            <h1 className="font-heading text-lg font-bold tracking-tight">workspace://overview</h1>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            当前正在探索实验性交互系统与可视化工具。
          </p>
        </div>

        {/* Status Grid */}
        <div>
          <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            SYSTEM STATUS
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <StatusBadge label="uptime" value="99.9%" color="bg-emerald-400" />
            <StatusBadge label="projects" value="8" color="bg-blue-400" />
            <StatusBadge label="commits" value="1,247" color="bg-amber-400" />
            <StatusBadge label="deployments" value="42" color="bg-purple-400" />
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left: Featured Projects */}
          <div className="lg:col-span-3 space-y-3">
            <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              FEATURED MODULES
            </div>
            <FeaturedProject
              title="Fantasy Map Generator"
              description="Procedural terrain generation engine with real-time elevation editing, river networks, and climate simulation."
              tags={['TypeScript', 'WebGL', 'Zustand']}
              status="ACTIVE"
            />
            <FeaturedProject
              title="Folio OS"
              description="Experimental workspace interface inspired by developer tools and operating systems. Interactive panel-based navigation."
              tags={['Next.js', 'Motion', 'Tailwind']}
              status="IN PROGRESS"
            />
            <FeaturedProject
              title="Network Stats Monitor"
              description="Retina-optimized macOS tray application for real-time network throughput monitoring with custom pixel-rendered indicators."
              tags={['Swift', 'macOS', 'AppKit']}
              status="SHIPPED"
            />
          </div>

          {/* Right: Quick Actions & Current Focus */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                QUICK ACCESS
              </div>
              <div className="space-y-1">
                <QuickAction icon={FolderIcon} label="Browse projects" panelId="projects" />
                <QuickAction icon={FlaskIcon} label="View experiments" panelId="experiments" />
                <QuickAction icon={CodeIcon} label="Read writing" panelId="writing" />
                <QuickAction icon={RocketLaunchIcon} label="Activity log" panelId="activity" />
              </div>
            </div>

            {/* Current Focus */}
            <div>
              <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                CURRENT FOCUS
              </div>
              <div className="rounded-sm border border-os-border bg-os-surface p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <LightningIcon size={14} className="text-os-accent" weight="fill" />
                  <span className="text-xs font-medium text-foreground">Workspace Interface</span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Building a developer workspace inspired by IDE and operating system aesthetics. Focusing on panel-based navigation, high information density, and experimental interactions.
                </p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <GitBranchIcon size={11} />
                    main
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon size={11} />
                    Week 20, 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendUpIcon size={11} />
                    +34 commits
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div>
              <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                METADATA
              </div>
              <div className="space-y-1">
                {[
                  ['location', 'Shanghai, CN'],
                  ['stack', 'TypeScript / React / Swift'],
                  ['focus', 'Interactive Systems'],
                  ['status', 'Open to collaboration'],
                ].map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between rounded-sm border border-os-border bg-os-surface px-3 py-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{key}</span>
                    <span className="font-mono text-[11px] text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
