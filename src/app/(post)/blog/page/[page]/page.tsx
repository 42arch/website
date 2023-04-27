import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { FC } from 'react'
import Pagination from '@/components/pagination'
import PostCard from '@/components/post-card'

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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
        {currentPosts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  )
}

export default BlogPage
