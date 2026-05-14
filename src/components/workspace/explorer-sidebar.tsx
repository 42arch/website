'use client'

import {
  ActivityIcon,
  ArticleIcon,
  CaretDownIcon,
  CaretRightIcon,
  EnvelopeIcon,
  FlaskIcon,
  FolderIcon,
  HouseIcon,
  ImagesIcon,
  NotepadIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { PANEL_CONFIG, useWorkspaceStore } from '@/store/workspace'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number, weight?: 'regular' | 'fill' | 'bold' | 'duotone' }>> = {
  house: HouseIcon,
  folder: FolderIcon,
  flask: FlaskIcon,
  article: ArticleIcon,
  images: ImagesIcon,
  notepad: NotepadIcon,
  activity: ActivityIcon,
  envelope: EnvelopeIcon,
}

interface TreeSection {
  label: string
  items: string[]
  defaultOpen?: boolean
}

const TREE_SECTIONS: TreeSection[] = [
  {
    label: 'WORKSPACE',
    items: ['overview'],
    defaultOpen: true,
  },
  {
    label: 'CONTENT',
    items: ['projects', 'experiments', 'writing', 'gallery'],
    defaultOpen: true,
  },
  {
    label: 'SYSTEM',
    items: ['notes', 'activity', 'contact'],
    defaultOpen: true,
  },
]

function TreeSectionGroup({ section }: { section: TreeSection }) {
  const [open, setOpen] = useState(section.defaultOpen ?? true)
  const pathname = usePathname()
  const activePanel = pathname.split('/')[1] || 'overview'
  const { openTab } = useWorkspaceStore()

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-1 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        {open
          ? <CaretDownIcon size={10} weight="bold" />
          : <CaretRightIcon size={10} weight="bold" />}
        {section.label}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {section.items.map((id) => {
              const config = PANEL_CONFIG[id as keyof typeof PANEL_CONFIG]
              const Icon = ICON_MAP[config.icon]
              const isActive = activePanel === id

              return (
                <Link
                  href={`/${id}`}
                  key={id}
                  id={`nav-${id}`}
                  onClick={() => openTab(id)}
                  className={cn(
                    'group flex w-full items-center gap-2 py-1.5 pl-6 pr-3 text-[12px] transition-all',
                    isActive
                      ? 'bg-os-accent-muted text-foreground font-medium'
                      : 'text-muted-foreground hover:bg-os-accent-muted/50 hover:text-foreground',
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 h-4 w-[2px] bg-os-accent" />
                  )}
                  <Icon size={14} weight={isActive ? 'fill' : 'regular'} />
                  <span>{config.label}</span>
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ExplorerSidebar() {
  const { sidebarOpen, sidebarWidth } = useWorkspaceStore()

  return (
    <AnimatePresence initial={false}>
      {sidebarOpen && (
        <motion.aside
          id="explorer-sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: sidebarWidth, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex shrink-0 flex-col overflow-hidden border-r border-os-border bg-os-sidebar"
        >
          {/* Sidebar header */}
          <div className="flex h-9 items-center px-3 font-mono text-[10px] font-semibold tracking-widest text-muted-foreground border-b border-os-border">
            EXPLORER
          </div>

          {/* Tree sections */}
          <nav className="os-scrollbar flex-1 overflow-y-auto py-2">
            {TREE_SECTIONS.map(section => (
              <TreeSectionGroup key={section.label} section={section} />
            ))}
          </nav>

          {/* Sidebar footer: status */}
          <div className="border-t border-os-border px-3 py-2">
            <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
              <div className="size-1.5 rounded-full bg-os-indicator animate-pulse" />
              <span>system active</span>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
