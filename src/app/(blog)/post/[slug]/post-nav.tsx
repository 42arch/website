'use client'

import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Link from 'next/link'

export default function PostNav({ slug }: { slug: string }) {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  const currentPostIndex = posts.findIndex((post) => {
    return post.slug === slug
  })

  const prevPost = allPosts[currentPostIndex - 1]
  const nextPost = allPosts[currentPostIndex + 1]

  return (
    <>
      <div className="flex items-center justify-between pt-6">
        <div className="w-1/2 text-left pr-4 h-16">
          {prevPost && (
            <Link
              href={prevPost?.slugAsParams}
              title={prevPost.title}
              className="hover:text-primary line-clamp-2">
              Prev: {prevPost.title}
            </Link>
          )}
        </div>
        <div className="w-1/2 text-right pl-4 h-16">
          {nextPost && (
            <Link
              href={nextPost?.slugAsParams}
              title={nextPost.title}
              className="hover:text-primary line-clamp-2">
              Next: {nextPost.title}
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
