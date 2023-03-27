import { allNotes } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { FC } from 'react'

const BlogPage: FC = () => {
  const notes = allNotes.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <div className="w-full mx-auto prose dark:prose-invert columns-1 md:columns-2 gap-10">
      {notes.map((note, idx) => (
        <article key={idx} className="w-full mb-6">
          <div dangerouslySetInnerHTML={{ __html: note.body.html }} key={idx} />
        </article>
      ))}
    </div>
  )
}

export default BlogPage
