import React, { FC } from 'react'
import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Balancer } from 'react-wrap-balancer'
import PostTag from './post-tag'

const PostCard: FC<Post> = (post) => {
  return (
    <div className="bg-grey flex flex-col">
      <Link href={post.slug}>
        <div className="w-full h-[300px] relative">
          <Image
            fill={true}
            style={{
              objectFit: 'cover'
            }}
            src={post.cover}
            alt={post.title}
            className="rounded-md bg-slate-200 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
          />
        </div>
      </Link>

      <h3 className="mt-4 text-2xl font-bold leading-8 tracking-tight">
        <Link
          href={post.slug}
          className="text-slate-900 dark:text-slate-100 no-underline">
          <Balancer>{post.title}</Balancer>
        </Link>
      </h3>
      <div className="flex flex-wrap">
        {post.tags?.map((tag, idx) => (
          <PostTag key={idx} text={tag} />
        ))}
      </div>
      <p className="prose mt-2 text-base max-w-none text-slate-600 dark:text-slate-400">
        {post.description || '--'}
      </p>
      <time dateTime={post.date} className="mt-2 block text-sm opacity-80">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </div>
  )
}

export default PostCard
