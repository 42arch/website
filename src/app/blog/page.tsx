import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { FC } from 'react'

const PostCard: FC<Post> = (post) => {
  return (
    <li className="py-4">
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          <dt></dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={post.date} className="block text-sm">
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </dd>
        </dl>
        <div className="space-y-3 xl:col-span-3">
          <div>
            <h3 className="text-2xl font-bold leading-8 tracking-tight">
              <Link
                href={post.slug}
                className="text-gray-900 dark:text-gray-100 no-underline">
                {post.title}
              </Link>
            </h3>
            <div className="flex flex-wrap">
              {post.tags?.map((tag, idx) => (
                <Link
                  key={idx}
                  href="/"
                  className="mr-3 text-sm font-medium uppercase no-underline text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
            {post.description || '--'}
          </div>
        </div>
      </article>
    </li>
  )
}

const BlogPage: FC = () => {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <ul>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </ul>
  )
}

export default BlogPage
