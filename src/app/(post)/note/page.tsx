import { allNotes } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { FC } from 'react'

const BlogPage: FC = () => {
  const notes = allNotes.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <ul className="prose dark:prose-invert">
      {notes.map((note, idx) => (
        <div
          dangerouslySetInnerHTML={{ __html: note.body.html }}
          key={idx}></div>
      ))}
    </ul>
  )
}

export default BlogPage
