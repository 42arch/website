'use client'
import NotePad from '@/components/note-pad'
import { allNotes } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Masonry } from 'react-plock'
import { FC } from 'react'

const BlogPage: FC = () => {
  const notes = allNotes.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <Masonry
      items={notes}
      config={{
        columns: [1, 2],
        gap: [24, 24],
        media: [1024, 1280]
      }}
      render={(item, idx) => <NotePad key={idx} note={item} />}
    />
  )
}

export default BlogPage
