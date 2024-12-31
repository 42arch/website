import { allPosts } from 'content-collections'
import { notFound } from 'next/navigation'
import Markdown from '@/components/markdown'
import Link from 'next/link'
import Article from '@/components/article'
import Datetime from '@/components/datetime'
import { getTranslations } from 'next-intl/server'

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

export default async function Post({ params: { slug } }: Props) {
  const t = await getTranslations('blog')
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) {
    return notFound()
  }

  return (
    <div className='pt-4 md:pt-8'>
      <div>
        <Link
          href='/blog'
          className='text-balance text-sm text-accent-foreground hover:underline hover:underline-offset-2'
        >
          {t('all')}
        </Link>
      </div>
      <header className='border-b border-dashed'>
        <h1 className='mt-2 text-balance text-2xl font-bold md:mt-5'>
          {post.title}
        </h1>
        <div className='flex flex-col gap-1 pb-4 pt-3 text-xs text-muted-foreground md:flex-row md:justify-between md:gap-4'>
          <span>
            {t('published')} <Datetime time={post.date} />
          </span>
          <span>
            {t('reading-time')}{' '}
            <span>
              {Math.ceil(post.readingTime)} {t('minutes')}
            </span>
          </span>
        </div>
      </header>
      <Article className='my-6'>
        <Markdown code={post.content.mdx} />
      </Article>
      <div className='flex flex-col gap-1 border-t border-dashed py-4 text-xs text-muted-foreground md:flex'>
        <span>
          {t('category')}: <span className='ml-2'>{post.category}</span>
        </span>
        <span>
          {t('tags')}:{' '}
          <span className='ml-2'>
            {post.tags.map((t, idx, arr) => (
              <span
                key={t}
                className='mr-1 truncate underline underline-offset-2'
              >
                {t}
                {idx !== arr.length - 1 && <span>,</span>}
              </span>
            ))}
          </span>
        </span>
      </div>
    </div>
  )
}
