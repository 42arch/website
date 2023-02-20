import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { FC } from 'react'
import PostTag from '@/components/PostTag'

const PostCard: FC<Post> = (post) => {
  return (
    <li className="py-4">
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          <dt></dt>
          <dd className="text-base font-medium leading-6 text-slate-500 dark:text-slate-400">
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
                className="text-slate-900 dark:text-slate-100 no-underline">
                {post.title}
              </Link>
            </h3>
            <div className="flex flex-wrap">
              {post.tags?.map((tag, idx) => (
                <PostTag key={idx} text={tag} />
              ))}
            </div>
          </div>
          <div className="prose max-w-none text-slate-500 dark:text-slate-400">
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
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>
      <ul>
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </ul>
    </div>
  )
}

export default BlogPage
