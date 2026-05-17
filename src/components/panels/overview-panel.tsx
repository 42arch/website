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

interface RecentWritingProps {
  title: string
  description: string
  url: string
  date: string
  tags: string[]
}

function RecentWriting({ title, description, url, date, tags }: RecentWritingProps) {
  const { openTab } = useWorkspaceStore()
  return (
    <Link
      href={url}
      onClick={() => openTab('writing')}
      className="group flex flex-col gap-2 rounded-sm border border-os-border bg-os-surface p-4 text-left transition-all hover:border-os-accent/30 hover:bg-os-accent-muted/30"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground group-hover:text-os-accent transition-colors">{title}</h3>
        {date && <span className="font-mono text-[9px] text-muted-foreground">{date}</span>}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {tags.map(tag => (
            <span key={tag} className="rounded-sm border border-os-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

export interface OverviewPanelProps {
  recentWritings?: RecentWritingProps[]
}

function HeroSection() {
  const asciiArt = `
███████╗ ██████╗ ██╗     ██╗ ██████╗      ██████╗ ███████╗
██╔════╝██╔═══██╗██║     ██║██╔═══██╗    ██╔═══██╗██╔════╝
█████╗  ██║   ██║██║     ██║██║   ██║    ██║   ██║███████╗
██╔══╝  ██║   ██║██║     ██║██║   ██║    ██║   ██║╚════██║
██║     ╚██████╔╝███████╗██║╚██████╔╝    ╚██████╔╝███████║
╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝      ╚═════╝ ╚══════╝
  `.trim()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative mb-8 flex min-h-[240px] flex-col items-center justify-center overflow-hidden rounded-sm border border-os-border bg-os-surface/50 p-12 backdrop-blur-sm"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-os-accent/5 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--os-accent-muted),transparent_70%)] opacity-30" />

      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(var(--os-border) 1px, transparent 1px), linear-gradient(90deg, var(--os-border) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />

      {/* ASCII Art with Depth Layering */}
      <div className="relative">
        {/* Deep Depth Layer */}
        <pre className="pointer-events-none absolute left-[4px] top-[4px] z-0 select-none font-mono text-[7px] leading-none text-os-accent/5 transition-all duration-700 sm:text-[9px] md:text-[11px] lg:text-[13px] group-hover:left-[6px] group-hover:top-[6px] group-hover:opacity-10">
          {asciiArt}
        </pre>
        {/* Mid Depth Layer */}
        <pre className="pointer-events-none absolute left-[2px] top-[2px] z-0 select-none font-mono text-[7px] leading-none text-os-accent/20 transition-all duration-700 sm:text-[9px] md:text-[11px] lg:text-[13px] group-hover:left-[3px] group-hover:top-[3px] group-hover:opacity-30">
          {asciiArt}
        </pre>
        {/* Main Text Layer */}
        <pre className="pointer-events-none relative z-10 select-none font-mono text-[7px] leading-none text-os-accent transition-all duration-700 sm:text-[9px] md:text-[11px] lg:text-[13px] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:drop-shadow-[0_0_15px_var(--os-accent-muted)]">
          {asciiArt}
        </pre>
        {/* Top Highlight (Glow Overlay) */}
        <pre className="pointer-events-none absolute inset-0 z-20 select-none font-mono text-[7px] opacity-0 leading-none text-white/20 transition-all duration-700 blur-[1px] sm:text-[9px] md:text-[11px] lg:text-[13px] group-hover:opacity-40">
          {asciiArt}
        </pre>
      </div>

      {/* Decorative elements */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-os-border to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60">
            System Executive Environment
          </span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-os-border to-transparent" />
        </div>
        <div className="font-mono text-[8px] uppercase tracking-widest text-os-accent/40">
          Build 0x4F53_2026 // Status: Optimal
        </div>
      </div>

      {/* Corners */}
      <div className="absolute left-4 top-4 size-4 border-l border-t border-os-border/40" />
      <div className="absolute right-4 top-4 size-4 border-r border-t border-os-border/40" />
      <div className="absolute bottom-4 left-4 size-4 border-b border-l border-os-border/40" />
      <div className="absolute bottom-4 right-4 size-4 border-b border-r border-os-border/40" />

      {/* Scanning Line */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute left-0 z-20 h-1 w-full bg-gradient-to-r from-transparent via-os-accent/10 to-transparent"
      />
    </motion.div>
  )
}

export function OverviewPanel({ recentWritings = [] }: OverviewPanelProps) {
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
            An experimental, high-fidelity developer workspace and portfolio, designed as a digital operating system.
          </p>
        </div>

        <HeroSection />

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
          {/* Left: Recent Writings */}
          <div className="lg:col-span-3 space-y-3">
            <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              RECENT WRITINGS
            </div>
            {recentWritings.length > 0
              ? (
                  recentWritings.map(post => (
                    <RecentWriting
                      key={post.url}
                      title={post.title}
                      description={post.description}
                      url={post.url}
                      date={post.date}
                      tags={post.tags}
                    />
                  ))
                )
              : (
                  <div className="flex flex-col items-center justify-center rounded-sm border border-os-border bg-os-surface/40 p-8 text-center">
                    <span className="font-mono text-[11px] text-muted-foreground">No recent writings found.</span>
                  </div>
                )}
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
