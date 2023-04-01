import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import PostTag from './post-tag'

const PostCard: FC<Post> = (post) => {
  return (
    <div className="bg-grey border-red-100">
      <Image
        width={804}
        height={452}
        src="/images/default-cover.jpg"
        alt={post.title}
        className="rounded-md border border-slate-200 bg-slate-200 transition-colors group-hover:border-slate-900"
      />
      <h3 className="mt-4 text-2xl font-bold leading-8 tracking-tight">
        <Link
          href={post.slug}
          className="text-slate-900 dark:text-slate-100 no-underline">
          {post.title}
        </Link>
        <time dateTime={post.date} className="mt-2 block text-sm opacity-80">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
      </h3>
      <div className="prose mt-2 text-base max-w-none text-slate-500 dark:text-slate-400">
        {post.description || '--'}
      </div>
    </div>
  )
}

export default PostCard