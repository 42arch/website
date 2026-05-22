'use client'

import {
  ActivityIcon,
  ArticleIcon,
  CaretDownIcon,
  CaretRightIcon,
  EnvelopeIcon,
  FileTextIcon,
  FlaskIcon,
  FolderIcon,
  GearIcon,
  HouseIcon,
  ImagesIcon,
  InfoIcon,
  NotepadIcon,
  RssIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { notes, writing } from '@/lib/source'
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
  info: InfoIcon,
  rss: RssIcon,
  envelope: EnvelopeIcon,
  gear: GearIcon,
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
    items: ['projects', 'experiments', 'writing', 'notes', 'gallery'],
    defaultOpen: true,
  },
  {
    label: 'SYSTEM',
    items: ['about', 'rss', 'contact', 'settings'],
    defaultOpen: true,
  },
]

function DirectoryItem({ id, config, isActive }: { id: string, config: any, isActive: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const { openTab } = useWorkspaceStore()
  const pathname = usePathname()

  // Get real children from Fumadocs source
  const children = id === 'writing'
    ? writing.getPages().map(p => ({ id: `writing/${p.slugs.join('/')}`, label: p.data.title }))
    : id === 'notes'
      ? notes.getPages().map(p => ({ id: `notes/${p.slugs.join('/')}`, label: p.data.title }))
      : []

  const hasChildren = children.length > 0
  const Icon = ICON_MAP[config.icon]

  return (
    <div className="relative">
      <div className="flex flex-col">
        {/* Main Item */}
        <Link
          href={`/${id}`}
          id={`nav-${id}`}
          onClick={() => {
            if (hasChildren) {
              setExpanded(!expanded)
            }
            openTab(id)
          }}
          className={cn(
            'group relative flex w-full items-center gap-2 py-1.5 pl-6 pr-3 text-[12px] transition-all',
            isActive && !expanded
              ? 'bg-os-accent-muted text-foreground font-medium'
              : 'text-muted-foreground hover:bg-os-accent-muted/50 hover:text-foreground',
          )}
        >
          {isActive && !expanded && (
            <div className="absolute left-0 h-4 w-[2px] bg-os-accent" />
          )}

          <div className="flex items-center gap-2 flex-1">
            {hasChildren && (
              <span className="absolute left-2.5">
                {expanded ? <CaretDownIcon size={10} /> : <CaretRightIcon size={10} />}
              </span>
            )}
            {Icon && <Icon size={14} weight={isActive ? 'fill' : 'regular'} />}
            <span className="truncate">{config.label}</span>
          </div>
        </Link>

        {/* Children (Files) */}
        <AnimatePresence initial={false}>
          {expanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="overflow-hidden border-l border-os-border ml-7 mt-0.5 mb-1"
            >
              {children.map((child) => {
                const isChildActive = pathname.slice(1) === child.id
                return (
                  <Link
                    key={child.id}
                    href={`/${child.id}`}
                    onClick={() => openTab(child.id)}
                    className={cn(
                      'group flex w-full items-center gap-2 py-1.5 pl-3 pr-3 text-[11px] transition-colors',
                      isChildActive
                        ? 'text-os-accent font-medium'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <FileTextIcon size={12} className="shrink-0 opacity-70" />
                    <span className="truncate">{child.label}</span>
                  </Link>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function TreeSectionGroup({ section }: { section: TreeSection }) {
  const [open, setOpen] = useState(section.defaultOpen ?? true)
  const pathname = usePathname()
  const activePanel = pathname.split('/')[1] || 'overview'

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
              const isActive = activePanel === id

              // Custom Directory rendering for writing and notes
              if (id === 'writing' || id === 'notes') {
                return <DirectoryItem key={id} id={id} config={config} isActive={isActive} />
              }

              const Icon = ICON_MAP[config.icon]
              return (
                <Link
                  href={id === 'overview' ? '/' : `/${id}`}
                  key={id}
                  id={`nav-${id}`}
                  onClick={() => useWorkspaceStore.getState().openTab(id)}
                  className={cn(
                    'group relative flex w-full items-center gap-2 py-1.5 pl-6 pr-3 text-[12px] transition-all',
                    isActive
                      ? 'bg-os-accent-muted text-foreground font-medium'
                      : 'text-muted-foreground hover:bg-os-accent-muted/50 hover:text-foreground',
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 h-4 w-[2px] bg-os-accent" />
                  )}
                  {Icon && <Icon size={14} weight={isActive ? 'fill' : 'regular'} />}
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
  return (
    <aside
      id="explorer-sidebar"
      className="flex h-full w-full flex-col overflow-hidden border-r border-os-border bg-os-sidebar"
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
    </aside>
  )
}
