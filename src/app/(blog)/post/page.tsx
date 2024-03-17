import { allPosts } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import Link from 'next/link'

export default async function PostListPage() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <div className="mx-auto flex max-w-6xl flex-col px-0 py-6 md:px-4 lg:px-12">
      <h1 className="mb-6 text-2xl font-semibold leading-9 md:mb-8">
        All Posts
      </h1>
      <div className="item-center flex flex-col justify-center">
        {posts.map((post, idx) => (
          <div key={idx} className="mb-6 flex flex-col md:mb-8">
            <Link
              href={post.slug}
              className="cursor-pointer text-lg tracking-wider">
              {post.title}
            </Link>
            <p className="prose my-2 max-w-none text-base text-zinc-700 dark:text-zinc-300">
              {post?.description || ''}
            </p>
            <time
              dateTime={post.date}
              className="mt-2 block text-sm text-zinc-700 opacity-80 dark:text-zinc-300">
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </div>
        ))}
      </div>
    </div>
  )
}
