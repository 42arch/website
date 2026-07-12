'use client'

import {
  CheckIcon,
  GearIcon,
  PaletteIcon,
  UserCircleIcon,
} from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { OsCard } from '@/components/ui/os-card'
import { PanelBadge } from '@/components/ui/panel-badge'
import { PanelHeader } from '@/components/ui/panel-header'
import { cn } from '@/lib/utils'

import { useWorkspaceStore } from '@/store/workspace'

export function SettingsPanel() {
  const {
    sidebarPosition,
    setSidebarPosition,
    themePreset,
    setThemePreset,
  } = useWorkspaceStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="os-scrollbar h-full overflow-y-auto p-6"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <PanelHeader
          path="system://settings"
          description="Configure your workspace environment and preferences."
          icon={<GearIcon size={14} />}
        />

        {/* Appearance Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-os-border pb-2">
            <PaletteIcon size={14} className="text-os-accent" />
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground">Appearance</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Sidebar Position Card */}
            <OsCard className="space-y-4 p-5">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">Sidebar Position</h3>
                <p className="text-[11px] text-muted-foreground">Choose which side the explorer sidebar should appear.</p>
              </div>

              <div className="flex gap-2">
                {[
                  { id: 'left', label: 'Left' },
                  { id: 'right', label: 'Right' },
                ].map(pos => (
                  <button
                    key={pos.id}
                    onClick={() => setSidebarPosition(pos.id as 'left' | 'right')}
                    className={cn(
                      'flex-1 rounded-sm border py-2 text-[11px] font-medium transition-all',
                      sidebarPosition === pos.id
                        ? 'border-os-accent bg-os-accent-muted/10 text-os-accent'
                        : 'border-os-border bg-os-surface text-muted-foreground hover:border-os-accent/30',
                    )}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </OsCard>

            {/* Color Presets */}
            <OsCard className="col-span-1 space-y-4 p-5 md:col-span-2">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">Workspace Theme</h3>
                <p className="text-[11px] text-muted-foreground">Select a complete visual environment for your workstation.</p>
              </div>

              {(() => {
                const lightPresets = [
                  { id: 'linen', label: 'Linen', color: 'bg-[#f8f6f1]', accent: 'bg-[#b87333]', desc: 'Warm Ivory' },
                  { id: 'github-light', label: 'GitHub Light', color: 'bg-[#ffffff]', accent: 'bg-[#0969da]', desc: 'Official Light' },
                  { id: 'solarized-light', label: 'Solarized Light', color: 'bg-[#fdf6e3]', accent: 'bg-[#268bd2]', desc: 'Retro Solar' },
                  { id: 'nord-light', label: 'Nord Light', color: 'bg-[#eceff4]', accent: 'bg-[#5e81ac]', desc: 'Arctic Light' },
                ]

                const darkPresets = [
                  { id: 'graphite', label: 'Graphite', color: 'bg-[#141414]', accent: 'bg-[#63e2b7]', desc: 'Industrial Cyan' },
                  { id: 'vesper', label: 'Vesper', color: 'bg-[#101010]', accent: 'bg-[#ffc799]', desc: 'Deep Amber' },
                  { id: 'nord', label: 'Nord', color: 'bg-[#2e3440]', accent: 'bg-[#88c0d0]', desc: 'Arctic Frost' },
                  { id: 'catppuccin', label: 'Catppuccin', color: 'bg-[#1e1e2e]', accent: 'bg-[#f5c2e7]', desc: 'Soft Pastel' },
                  { id: 'tokyo-night', label: 'Tokyo Night', color: 'bg-[#1a1b26]', accent: 'bg-[#7aa2f7]', desc: 'Neon Blue' },
                  { id: 'dracula', label: 'Dracula', color: 'bg-[#282a36]', accent: 'bg-[#bd93f9]', desc: 'Classic Purple' },
                  { id: 'github-dark', label: 'GitHub Dark', color: 'bg-[#0d1117]', accent: 'bg-[#58a6ff]', desc: 'Official Dark' },
                ]

                const renderPresetButton = (p: { id: string, label: string, color: string, accent: string, desc: string }) => (
                  <button
                    key={p.id}
                    onClick={() => setThemePreset(p.id as any)}
                    className={cn(
                      'group relative flex flex-col items-start gap-3 rounded-sm border p-3 text-left transition-all w-full',
                      themePreset === p.id
                        ? 'border-os-accent bg-os-accent-muted/10 ring-1 ring-os-accent/20'
                        : 'border-os-border bg-os-surface hover:border-os-accent/30',
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={cn('size-4 rounded-full border border-os-border', p.color)} />
                      <div className={cn('size-2.5 rounded-full', p.accent)} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-foreground">{p.label}</div>
                      <div className="text-[9px] leading-tight text-muted-foreground">{p.desc}</div>
                    </div>
                    {themePreset === p.id && (
                      <div className="absolute top-2 right-2">
                        <CheckIcon size={10} className="text-os-accent" />
                      </div>
                    )}
                  </button>
                )

                return (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Light Themes</h4>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {lightPresets.map(renderPresetButton)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Dark Themes</h4>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {darkPresets.map(renderPresetButton)}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </OsCard>
          </div>
        </section>

        {/* User Info Section */}
        <section className="space-y-4 pb-12">
          <div className="flex items-center gap-2 border-b border-os-border pb-2">
            <UserCircleIcon size={14} className="text-os-accent" />
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground">Kernel Profile</h2>
          </div>

          <OsCard className="flex items-center gap-4 p-5">
            <div className="size-12 rounded-sm bg-os-accent-muted flex items-center justify-center border border-os-accent/20">
              <UserCircleIcon size={24} className="text-os-accent" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">Root User</h3>
              <div className="flex gap-2">
                <PanelBadge>Developer</PanelBadge>
                <PanelBadge>Admin Access</PanelBadge>
              </div>
            </div>
          </OsCard>
        </section>
      </div>
    </motion.div>
  )
}
