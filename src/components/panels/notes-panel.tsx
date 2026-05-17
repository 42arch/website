'use client'

import { CalendarIcon, NotepadIcon, PlusIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { OsCard } from '@/components/ui/os-card'
import { PanelBadge } from '@/components/ui/panel-badge'
import { PanelHeader } from '@/components/ui/panel-header'
import { useWorkspaceStore } from '@/store/workspace'

interface Note {
  id: string
  url: string
  title: string
  content: string
  date: Date
  category?: string
}

interface NotesPanelProps {
  notes: Note[]
}

export function NotesPanel({ notes }: NotesPanelProps) {
  const { openTab } = useWorkspaceStore()

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          <PanelHeader
            path="workspace://notes"
            description="Quick observations, decisions, and technical notes."
            icon={<NotepadIcon size={14} />}
          />
          <button className="flex items-center gap-1 rounded-sm border border-os-border bg-os-surface px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-os-accent/40 hover:text-foreground shrink-0">
            <PlusIcon size={11} />
            New Note
          </button>
        </div>

        <div className="space-y-2">
          {notes.length === 0
            ? (
                <div className="py-20 text-center border border-dashed border-os-border rounded-sm">
                  <p className="font-mono text-xs text-muted-foreground">No notes found.</p>
                </div>
              )
            : (
                notes.map((note, i) => (
                  <motion.div key={note.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: i * 0.04 }}>
                    <Link href={note.url} onClick={() => openTab(`notes/${note.id}`)}>
                      <OsCard className="p-4 cursor-pointer group">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {note.category && (
                                <PanelBadge>{note.category}</PanelBadge>
                              )}
                              <h3 className="text-sm font-medium text-foreground group-hover:text-os-accent transition-colors">{note.title}</h3>
                            </div>
                            <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                              <CalendarIcon size={10} />
                              {new Date(note.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </OsCard>
                    </Link>
                  </motion.div>
                ))
              )}
        </div>
      </div>
    </motion.div>
  )
}
