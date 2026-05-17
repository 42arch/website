'use client'

import {
  CheckIcon,
  GearIcon,
  MonitorIcon,
  PaletteIcon,
  UserCircleIcon,
} from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { OsCard } from '@/components/ui/os-card'
import { PanelBadge } from '@/components/ui/panel-badge'
import { PanelHeader } from '@/components/ui/panel-header'
import { cn } from '@/lib/utils'

import { useWorkspaceStore } from '@/store/workspace'

export function SettingsPanel() {
  const { theme, setTheme } = useTheme()
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

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { id: 'folio-dark', label: 'Folio Dark', color: 'bg-[#1a1a1a]', desc: 'Classic Graphite' },
                  { id: 'folio-light', label: 'Folio Light', color: 'bg-[#f5f5f0]', desc: 'Warm Ivory' },
                  { id: 'vesper', label: 'Vesper', color: 'bg-[#101010]', desc: 'Shiki High Contrast' },
                  { id: 'nord', label: 'Nord', color: 'bg-[#2e3440]', desc: 'Arctic Frost' },
                  { id: 'rose', label: 'Catppuccin', color: 'bg-[#1e1e2e]', desc: 'Soft Pastel' },
                  { id: 'cobalt', label: 'GitHub Light', color: 'bg-[#ffffff]', desc: 'Classic Light' },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setThemePreset(p.id as any, setTheme)}
                    className={cn(
                      'group relative flex flex-col items-start gap-3 rounded-sm border p-3 text-left transition-all',
                      themePreset === p.id
                        ? 'border-os-accent bg-os-accent-muted/10 ring-1 ring-os-accent/20'
                        : 'border-os-border bg-os-surface hover:border-os-accent/30',
                    )}
                  >
                    <div className={cn('size-4 rounded-full border border-os-border', p.color)} />
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
                ))}
              </div>
            </OsCard>
          </div>
        </section>

        {/* System Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-os-border pb-2">
            <MonitorIcon size={14} className="text-os-accent" />
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground">System Engine</h2>
          </div>

          <OsCard className="divide-y divide-os-border p-0">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">Motion Graphics</h3>
                <p className="text-[11px] text-muted-foreground">Enable interface transitions and micro-animations.</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-os-accent p-1">
                <div className="size-3 rounded-full bg-background ml-auto" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">High Precision Rendering</h3>
                <p className="text-[11px] text-muted-foreground">Use 2x oversampling for sharp typographic textures.</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-os-accent p-1">
                <div className="size-3 rounded-full bg-background ml-auto" />
              </div>
            </div>
          </OsCard>
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
