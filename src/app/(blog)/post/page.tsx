import { allPosts } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import Link from 'next/link'

export default async function PostListPage() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <div className="flex flex-col mx-auto max-w-6xl py-6 px-0 md:px-8 lg:px-24">
      <h1 className="text-2xl font-semibold leading-9 mb-6 md:mb-8">
        All Posts
      </h1>
      <div className="flex flex-col item-center justify-center">
        {posts.map((post, idx) => (
          <div key={idx} className="flex flex-col mb-6 md:mb-8">
            <Link
              href={post.slug}
              className="text-lg tracking-wider cursor-pointer">
              {post.title}
            </Link>
            <p className="prose my-2 text-base max-w-none text-zinc-700 dark:text-zinc-300">
              {post?.description || ''}
            </p>
            <time
              dateTime={post.date}
              className="mt-2 block text-sm text-zinc-700 dark:text-zinc-300 opacity-80">
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </div>
        ))}
      </div>
    </div>
  )
}
