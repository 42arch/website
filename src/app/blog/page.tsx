import type { BlogPost } from '@/lib/types'
import Link from 'next/link'
import SectionIndicator from '@/components/section-indicator'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import formateDate from '@/lib/date'
import { getPages } from '@/lib/source'

export default function BlogPage() {
  const posts = getPages()
  const sortedPosts = posts.filter(post => !post.data.draft).sort((a, b) => {
    return b.data.date.getTime() - a.data.date.getTime()
  })

  return (
    <div className="flex flex-1 flex-col text-center border-b border-main">
      <div className="w-full h-20 border-b border-main"></div>
      <div className="relative flex flex-col items-center justify-center">
        <SectionIndicator title="Posts" className="border-b border-main" />
        <div className="w-full flex flex-col">
          {
            sortedPosts.map(post => <PostItem key={post.path} post={post} />)
          }
        </div>
      </div>
      <div className="w-full h-20"></div>
    </div>
  )
}

function PostItem({ post }: { post: BlogPost }) {
  return (
    <div
      className="group flex flex-col gap-1 py-4 px-8 border-b border-main"
    >
      <span className="text-xs text-left text-muted-foreground whitespace-nowrap">
        {formateDate(post.data.date)}
      </span>
      <div className="flex gap-3 mb-1 items-center">
        <Link
          href={post.url}
          className="font-medium text-base hover:opacity-70 transition-colors truncate"
        >
          {post.data.title}
        </Link>
      </div>
      <p className="text-xs text-left text-muted-foreground line-clamp-3 mb-2">{post.data.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        <Badge variant="secondary" className="text-xs text-muted-foreground">
          {post.data.category}
        </Badge>

        <Separator orientation="vertical" className="h-4" />

        {post.data.tags?.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs text-muted-foreground">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
