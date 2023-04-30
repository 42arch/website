import React, { FC } from 'react'
import { Note } from 'contentlayer/generated'
import { format } from 'date-fns'

interface IProps {
  note: Note
}

const NotePad: FC<IProps> = ({ note }) => {
  return (
    <article
      className="prose dark:prose-invert w-full max-w-6xl bg-slate-100 dark:bg-slate-800 border-3 border-black rounded-lg p-8 h-full flex flex-col justify-between
        drop-shadow-light dark:drop-shadow-dark transition-all duration-300 ease-in-out
      ">
      <h3 className="text-xl md:text-2xl">{note.title}</h3>
      <time className="text-xs opacity-80">
        {format(new Date(note.date), 'yyyy-MM-dd')}
      </time>
      <div
        className="pt-4"
        dangerouslySetInnerHTML={{ __html: note.body.html }}
      />
    </article>
  )
}

export default NotePad
