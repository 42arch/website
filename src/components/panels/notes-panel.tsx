'use client'

import { CalendarIcon, NotepadIcon, PlusIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'

interface Note {
  id: string
  title: string
  content: string
  date: Date
  category?: string
}

interface NotesPanelProps {
  notes: Note[]
}

export function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <NotepadIcon size={14} className="text-os-accent" />
              <h1 className="font-heading text-lg font-bold tracking-tight">workspace://notes</h1>
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">Quick observations, decisions, and technical notes.</p>
          </div>
          <button className="flex items-center gap-1 rounded-sm border border-os-border bg-os-surface px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-os-accent/40 hover:text-foreground">
            <PlusIcon size={11} />
            {' '}
            New Note
          </button>
        </div>
        <div className="space-y-2">
          {notes.length === 0
            ? (
                <div className="py-20 text-center">
                  <p className="font-mono text-xs text-muted-foreground">No notes found.</p>
                </div>
              )
            : (
                notes.map((note, i) => (
                  <motion.div key={note.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: i * 0.04 }} className="rounded-sm border border-os-border bg-os-surface p-4 space-y-2 hover:border-os-accent/30 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {note.category && (
                          <span className="rounded-sm border border-os-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{note.category}</span>
                        )}
                        <h3 className="text-sm font-medium text-foreground">{note.title}</h3>
                      </div>
                      <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                        <CalendarIcon size={10} />
                        {new Date(note.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="prose prose-xs dark:prose-invert text-muted-foreground max-w-none">
                      {note.content}
                    </div>
                  </motion.div>
                ))
              )}
        </div>
      </div>
    </motion.div>
  )
}
