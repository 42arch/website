import { Note } from 'contentlayer/generated'
import React, { FC } from 'react'

interface IProps {
  note: Note
}

const NotePad: FC<IProps> = ({ note }) => {
  return (
    <article className=" border-white border-dashed my-6 flex flex-col items-start rounded-md border border-b-4 border-slate-900 p-4">
      <div className="">{note.title}</div>
      <div
        className="pt-4"
        dangerouslySetInnerHTML={{ __html: note.body.html }}
      />
    </article>
  )
}

export default NotePad
