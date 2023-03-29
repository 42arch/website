import React, { FC } from 'react'
import { Note } from 'contentlayer/generated'
import { format } from 'date-fns'

interface IProps {
  note: Note
}

const NotePad: FC<IProps> = ({ note }) => {
  return (
    <article
      className="prose dark:prose-invert bg-amber-100 dark:bg-slate-800 border-3 border-black rounded-lg p-4 h-full flex flex-col justify-between
        drop-shadow-light dark:drop-shadow-dark
      "
      style={{
        transition: 'all',
        transitionDuration: '.5s',
        animation: 'ease-in-out'
      }}>
      <h3 className="text-lg md:text-xl">{note.title}</h3>
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
