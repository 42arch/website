'use client'

import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { notes } from '@/lib/desktop-content'
import { AppPage, AppPageHeading, SmallLabel } from './page-primitives'

export function NotesApp() {
  const [selected, setSelected] = useState<number | null>(null)
  if (selected !== null) {
    const note = notes[selected]
    return (
      <article className="mx-auto min-h-full max-w-[660px] px-[34px] pb-8 pt-7 [&>p:not(.note-intro)]:my-[21px] [&>p:not(.note-intro)]:text-[13px] [&>p:not(.note-intro)]:leading-[2.1] [&>p:not(.note-intro)]:text-[#65736e] max-[850px]:px-6 max-[700px]:px-[23px] max-[700px]:py-6 max-[700px]:[&>p:not(.note-intro)]:text-xs">
        <Button variant="ghost" onClick={() => setSelected(null)}>
          <ArrowLeftIcon data-icon="inline-start" />
          返回随手记
        </Button>
        <div className="mt-[27px] flex gap-[18px] text-[10px] text-[#8b9488]">
          {note.category}
          <span>{note.date}</span>
        </div>
        <h2 className="my-2 mb-[10px] text-[28px] font-medium leading-[1.45] tracking-[-.04em] max-[700px]:text-[25px]">{note.title}</h2>
        <p className="my-4 mb-7 text-[15px] text-[var(--ink)]">{note.intro}</p>
        {note.paragraphs.map(paragraph => <p key={paragraph.slice(0, 15)}>{paragraph}</p>)}
        <div className="mt-[34px] flex items-center gap-[10px] border-t border-[var(--line)] pt-[18px] text-[#8c9a83] [&>span]:text-[10px]">
          ✳
          <span>整理自原站文章 · 节选</span>
        </div>
      </article>
    )
  }
  return (
    <AppPage>
      <AppPageHeading>
        <SmallLabel>FIELD NOTES</SmallLabel>
        <h2>给思考留个位置。</h2>
        <p>写下来，才能在下一次遇见时，看得更清楚。</p>
      </AppPageHeading>
      <div className="border-t border-[var(--line)]">
        {notes.map((note, i) => (
          <button className="flex w-full items-center gap-6 border-b border-[var(--line)] py-[21px] text-left hover:[&>span:nth-child(2)>strong]:text-[var(--blue)] max-[700px]:flex-wrap max-[700px]:gap-3 max-[700px]:py-5" key={note.title} onClick={() => setSelected(i)}>
            <span className="font-mono text-[10px] text-[#929a8e] max-[700px]:w-full max-[700px]:text-[9px]">{note.date}</span>
            <span className="flex-1">
              <SmallLabel>{note.category}</SmallLabel>
              <strong className="my-1.5 block text-base font-medium max-[700px]:text-sm">{note.title}</strong>
              <span className="text-[11px] text-[var(--subtle)] max-[700px]:text-[10px] max-[700px]:leading-[1.6]">{note.intro}</span>
            </span>
            <ArrowUpRightIcon className="shrink-0 text-[#8b998b]" size={20} />
          </button>
        ))}
      </div>
    </AppPage>
  )
}
