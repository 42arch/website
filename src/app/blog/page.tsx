import Datetime from '@/components/datetime'
import { allPosts } from 'content-collections'
import { Clock, Hash } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

const isProduction = process.env.NODE_ENV === 'production'

export default async function BlogPage() {
  const t = await getTranslations('blog')
  const posts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((post) => {
      if (isProduction) {
        return post.published
      }
      return true
    })

  return (
    <div className='pt-4'>
      <h1 className='my-4 text-center text-2xl font-bold text-accent-foreground'>
        {t('all')}
      </h1>

      <ul className=''>
        {posts.map((post) => (
          <li key={post.slug} className='pb-4 focus-visible:!shadow-none'>
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='flex flex-col rounded-lg p-4 transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground'
            >
              <h3 className='break-words text-xl font-medium'>{post.title}</h3>
              <div className='relative mt-3 space-y-2'></div>
              <div className='flex select-none flex-col flex-wrap gap-1 text-xs font-light text-muted-foreground md:flex-row md:items-center md:gap-4'>
                <div className='flex items-center space-x-1 '>
                  <Clock size={12} className='mt-[2px]' />
                  <Datetime time={post.date} />
                </div>

                <div className='flex items-center space-x-1'>
                  <Hash size={10} className='mt-[2px]' />
                  <div className='flex items-center'>
                    <span className='truncate underline underline-offset-2'>
                      {post.category}
                    </span>
                    <span className='mx-1'>/</span>
                    {post.tags.map((t, idx, arr) => (
                      <span
                        key={t}
                        className='mr-1 truncate underline underline-offset-2'
                      >
                        {t}
                        {idx !== arr.length - 1 && <span>,</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
