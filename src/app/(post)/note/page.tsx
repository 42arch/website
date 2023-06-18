'use client'
import NotePad from '@/components/note-pad'
import { allNotes } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { FC } from 'react'

const BlogPage: FC = () => {
  const notes = allNotes.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <div className="flex flex-col gap-12 items-center">
      {notes.map((note, index) => (
        <NotePad key={index} note={note} />
        // <span key={index}>111</span>
      ))}
    </div>
  )
}

export default BlogPage
