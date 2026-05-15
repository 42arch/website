'use client'

import type { ReactNode } from 'react'
import { ArrowLeftIcon, CalendarIcon, TagIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import Link from 'next/link'

interface NoteDetailPanelProps {
  title: string
  date: Date
  tags: string[]
  children: ReactNode
}

export function NoteDetailPanel({ title, date, tags, children }: NoteDetailPanelProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/notes" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-os-accent transition-colors">
            <ArrowLeftIcon size={12} />
            cd ../
          </Link>

          <div className="space-y-3">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                <CalendarIcon size={12} />
                {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground bg-os-surface border border-os-border px-2 py-0.5 rounded-sm">
                    <TagIcon size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-os-border" />

        {/* Content */}
        <div className="prose text-sm md:prose-base max-w-none text-muted-foreground font-sans
          prose-headings:text-foreground prose-headings:font-heading prose-headings:font-bold
          prose-strong:text-foreground
          prose-a:text-os-accent prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-os-accent prose-blockquote:bg-os-accent-muted/5 prose-blockquote:py-1 prose-blockquote:text-foreground/80
          prose-code:font-mono prose-code:text-os-accent prose-code:bg-os-accent-muted/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:font-mono prose-pre:bg-os-terminal-bg prose-pre:border prose-pre:border-os-border prose-pre:rounded-sm
          prose-ol:marker:text-os-accent prose-ul:marker:text-os-accent
          prose-hr:border-os-border"
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}
