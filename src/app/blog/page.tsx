import { allPosts } from 'content-collections'
import Link from 'next/link'

const isProduction = process.env.NODE_ENV === 'production'

export default async function BlogPage() {
  const posts = allPosts.filter((post) => {
    if (isProduction) {
      return post.published
    }
    return true
  })

  return (
    <div className='pt-4'>
      <h1 className='my-4 text-2xl font-bold text-accent-foreground'>Blog</h1>

      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <section className='mb-6'>
            <h3 className='my-2 text-xl font-medium'>{post.title}</h3>
            <time className='text-sm text-accent-foreground'>{post.date}</time>
          </section>
        </Link>
      ))}
    </div>
  )
}
