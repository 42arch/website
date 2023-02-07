import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
// import Link from 'next/link'
// import { FiChevronLeft } from 'react-icons/fi'

interface IProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<IProps['params'][]> {
  return allPosts.map((post) => ({
    slug: post.slug
  }))
}

export default async function Page({ params }: IProps) {
  const slug = params?.slug
  const post = allPosts.find((post) => {
    return post.slug === `blog/${slug}`
  })

  if (!post) {
    return <div>not found</div>
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <article>
        {/* <Link
          href="/blog"
          className="absolute top-14 -left-[200px] hidden items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900 xl:inline-flex">
          <FiChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link> */}

        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <div className="prose dark:prose-invert">
            <div className="mb-6 text-center">
              <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
              <time dateTime={post.date} className="text-sm text-slate-600">
                {format(parseISO(post.date), 'LLLL d, yyyy')}
              </time>
            </div>
            <div
              className="cl-post-body"
              dangerouslySetInnerHTML={{ __html: post.body.html }}
            />
          </div>
        </div>
      </article>
    </div>
  )
}
