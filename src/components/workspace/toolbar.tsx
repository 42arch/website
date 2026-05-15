'use client'

import {
  ClockIcon,
  ColumnsIcon,
  CommandIcon,
  ListIcon,
  MagnifyingGlassIcon,
  SidebarIcon,
  TerminalIcon,
} from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

import { ModeToggle } from '@/components/mode-toggle'
import { useIsMobile } from '@/lib/use-mobile'
import { useWorkspaceStore } from '@/store/workspace'

function LiveClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    function tick() {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
      <ClockIcon size={13} weight="bold" />
      <span>{date}</span>
      <span className="text-os-accent">{time}</span>
    </div>
  )
}

export function Toolbar() {
  const { 
    toggleSidebar, 
    toggleBottomPanel, 
    toggleCommandPalette, 
    toggleSidebarPosition,
    sidebarOpen, 
    bottomPanelOpen 
  } = useWorkspaceStore()
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <header
        id="os-toolbar"
        className="flex h-12 shrink-0 items-center justify-between border-b border-os-border bg-os-toolbar px-3"
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="font-semibold tracking-wider text-foreground">FOLIO-OS</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">workspace</span>
        </div>

        {/* Right: Command Palette trigger + Theme */}
        <div className="flex items-center gap-1">
          <ModeToggle />
          <button
            id="mobile-command-palette-btn"
            onClick={toggleCommandPalette}
            className="flex size-9 items-center justify-center rounded-sm text-muted-foreground transition-colors active:bg-os-accent-muted active:text-foreground"
            title="Navigate"
          >
            <ListIcon size={18} weight="bold" />
          </button>
        </div>
      </header>
    )
  }

  return (
    <header
      id="os-toolbar"
      className="flex h-10 shrink-0 items-center justify-between border-b border-os-border bg-os-toolbar px-3"
    >
      {/* Left Section */}
      <div className="flex items-center gap-1">
        <button
          id="toggle-sidebar-btn"
          onClick={toggleSidebar}
          className="flex size-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-os-accent-muted hover:text-foreground"
          title="Toggle Explorer"
        >
          <SidebarIcon size={15} weight={sidebarOpen ? 'fill' : 'regular'} />
        </button>
        <button
          id="toggle-terminal-btn"
          onClick={toggleBottomPanel}
          className="flex size-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-os-accent-muted hover:text-foreground"
          title="Toggle Activity Panel"
        >
          <TerminalIcon size={15} weight={bottomPanelOpen ? 'fill' : 'regular'} />
        </button>

        <div className="mx-2 h-4 w-px bg-os-border" />

        {/* Breadcrumb-style title */}
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="font-semibold tracking-wider text-foreground">FOLIO-OS</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">workspace</span>
        </div>
      </div>

      {/* Center: Command Palette trigger */}
      <button
        id="open-command-palette-btn"
        onClick={toggleCommandPalette}
        className="hidden sm:flex items-center gap-2 rounded-sm border border-os-border bg-os-surface px-3 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:border-os-accent/30 hover:text-foreground"
      >
        <CommandIcon size={12} />
        <span>Search workspace...</span>
        <kbd className="ml-4 rounded border border-os-border bg-background px-1 py-0.5 font-mono text-[10px] leading-none">⌘K</kbd>
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <LiveClock />
        <div className="mx-1 h-4 w-px bg-os-border" />
        <div className="flex items-center gap-1">
          <button
            onClick={toggleSidebarPosition}
            className="flex size-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-os-accent-muted hover:text-foreground"
            title="Switch Sidebar Side"
          >
            <ColumnsIcon size={14} />
          </button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
