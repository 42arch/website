import { allNotes } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { FC } from 'react'

const BlogPage: FC = () => {
  const notes = allNotes.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl md:leading-14">
          Notes And Thoughts
        </h1>
      </div>
      <ul className="prose dark:prose-invert">
        {notes.map((note, idx) => (
          <div
            dangerouslySetInnerHTML={{ __html: note.body.html }}
            key={idx}></div>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage
