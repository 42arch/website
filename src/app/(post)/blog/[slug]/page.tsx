import TableOfContent from '@/components/TOC'
import { getTableOfContents } from '@/lib/toc'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

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

  const toc = await getTableOfContents(post.body.raw)

  return (
    <article className="relative py-2 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-4 xl:gap-20">
      <div className="">
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 ">
            <div className="space-y-20">
              <time
                dateTime={post.date}
                className="text-sm text-slate-700 dark:text-slate-500">
                Published on {format(parseISO(post.date), 'LLLL d, yyyy')}
              </time>
            </div>
            <h1 className="mt-2 inline-block text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
              {post.title}
            </h1>
          </div>
          <hr className="my-4 lg:my-8 border-slate-200 dark:border-slate-700" />
        </header>
        <div className="prose dark:prose-invert max-w-none py-8">
          <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
        </div>
      </div>
      <div className="hidden text-sm lg:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <TableOfContent toc={toc} />
        </div>
      </div>
    </article>
  )
}
