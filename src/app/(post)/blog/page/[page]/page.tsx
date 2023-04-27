import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { FC } from 'react'
import Pagination from '@/components/pagination'
import PostCard from '@/components/PostCard'

interface IProps {
  params: {
    page: string
  }
}

const BlogPage: FC<IProps> = ({ params }) => {
  const PAGE_SIZE = 6
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  const currentPage = Number(params.page)

  const currentPosts = posts.slice(
    PAGE_SIZE * (currentPage - 1),
    PAGE_SIZE * currentPage
  )
  const totalPages = Math.ceil(posts.length / PAGE_SIZE)

  return (
    <div className="container py-6 lg:py-10">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
        {currentPosts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}

export default BlogPage
