import type { BlogPost } from '@/lib/types'
import { format } from 'date-fns'
import Link from 'next/link'
import { GridBackground } from '@/components/grid-background'
import { Badge } from '@/components/ui/badge'
import { getPages } from '@/lib/source'

export default function BlogPage() {
  const posts = getPages()

  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <div className="relative flex w-full flex-col items-center overflow-x-hidden">
        <GridBackground maxWidthClass="container" columns={1} />

        <section className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left ">
          <div className="text-center">
            <h1 className="text-3xl font-semibold dark:text-white capitalize">Blog Posts</h1>
            <p className="text-lg text-fd-muted-foreground mt-3 dark:text-gray-300 mb-0">Welcome to our blog where we share our thoughts and ideas.</p>
          </div>
        </section>

        <section className="relative container max-w-1/2 px-4 py-8 lg:py-12 lg:px-8 text-left">
          <div className="flex flex-col gap-6">
            {posts.map(post => (
              <PostItem key={post.data.title} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function PostItem({ post }: { post: BlogPost }) {
  return (
    <div
      key={post.data.title}
      className="group flex flex-col gap-2 p-5 bg-white border-b border-dashed dark:bg-zinc-900 transition-all duration-200"
    >
      <div className="flex gap-3 mb-1 items-center">
        <Link
          href={post.url}
          className="font-semibold text-lg hover:opacity-70 transition-colors truncate"
        >
          {post.data.title}
        </Link>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{post.data.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {post.data.tags?.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <p className="text-sm mt-2 text-muted-foreground whitespace-nowrap">
        {format(
          post.data.date instanceof Date ? post.data.date : new Date(post.data.date),
          'yyyy-MM-dd',
        )}
      </p>
    </div>
  )
}
