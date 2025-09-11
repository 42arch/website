import type { BlogPost } from '@/lib/types'
import { GlobeIcon } from 'lucide-react'
import Link from 'next/link'
import { GridBackground } from '@/components/grid-background'
import { Badge } from '@/components/ui/badge'
import { getPages } from '@/lib/source'

export default function BlogPage() {
  const posts = getPages()

  console.log(88888888, posts)

  return (
    <>
      <section className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left bg-zinc-50/50 dark:bg-zinc-900/50">
        <GridBackground maxWidthClass="container" />
        <div className="text-center">
          <h1 className="text-3xl font-semibold dark:text-white capitalize">Blog Posts</h1>
          <p className="text-lg text-fd-muted-foreground mt-3 dark:text-gray-300 mb-0">Welcome to our blog where we share our thoughts and ideas.</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        {posts.map(post => (
          <PostItem key={post.data.title} post={post} />
        ))}
      </section>

    </>
  )
}

function PostItem({ post }: { post: BlogPost }) {
  return (
    <div
      key={post.data.title}
      className="group p-4 rounded-xs text-left border bg-background transition-all duration-200 "
    >
      <div className="flex items-start gap-3">
        <div className="text-lg">{post.data.icon}</div>
        <div className="flex-1 min-w-0">
          <Link
            href={post.url}
            className="font-semibold text-base mb-1 transition-colors"
          >
            {post.data.title}
          </Link>

          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{post.data.description}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {post.data.tags?.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
