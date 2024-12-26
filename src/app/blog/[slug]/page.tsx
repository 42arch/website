import { allPosts } from 'content-collections'
import { notFound } from 'next/navigation'
import Markdown from '@/components/markdown'
import Link from 'next/link'
import Article from '@/components/article'

type Props = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path
  }))
}

export default function Post({ params: { slug } }: Props) {
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) {
    return notFound()
  }

  return (
    <div className='pt-4 md:pt-8'>
      <div>
        <Link href='/blog' className='text-balance text-sm hover:underline'>
          All Posts
        </Link>
      </div>
      <header className='border-b border-dashed'>
        <h2 className='mt-2 text-balance text-2xl font-bold md:mt-5'>
          {post.title}
        </h2>
        <div className='flex pb-4 pt-3'>
          <span className='text-sm text-accent-foreground'>{post.date}</span>
        </div>
      </header>
      <Article className='my-6'>
        <Markdown code={post.content.mdx} />
      </Article>
      <div className='flex'></div>
    </div>
  )
}
