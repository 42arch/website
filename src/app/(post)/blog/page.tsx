import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { FC } from 'react'
import PostCard from '@/components/post-card'

const BlogPage: FC = () => {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}

export default BlogPage
