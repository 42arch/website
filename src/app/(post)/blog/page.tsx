import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { FC } from 'react'
import PostCard from '@/components/PostCard'

const BlogPage: FC = () => {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10">
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </div>
  )
}

export default BlogPage
