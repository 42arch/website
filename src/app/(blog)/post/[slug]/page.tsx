import { Mdx } from '@/components/mdx'
import TableOfContent from '@/components/table-of-content'
import { getTableOfContents } from '@/lib/toc'
import { allPosts } from 'contentlayer/generated'
import { parseISO, format } from 'date-fns'
import Link from 'next/link'
import ScrollBar from './scrollbar'
import PostNav from './post-nav'

function BackTo() {
  return (
    <Link
      href="/post"
      className="no-underline mb-4 inline-flex items-center justify-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2">
          <path strokeDasharray="14" strokeDashoffset="14" d="M19 12H5.5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.3s"
              values="14;0"
            />
          </path>
          <path
            strokeDasharray="8"
            strokeDashoffset="8"
            d="M5 12L10 17M5 12L10 7">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.3s"
              dur="0.2s"
              values="8;0"
            />
          </path>
        </g>
      </svg>
      See All Posts
    </Link>
  )
}

interface PageProps {
  params: {
    slug: string
  }
}

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export default async function PostPage({ params: { slug } }: PageProps) {
  const currentPostIndex = allPosts.findIndex((post) => {
    return post.slug === `post/${slug}`
  })
  const post = allPosts[currentPostIndex]

  // const prevPost = allPosts[currentPostIndex - 1]
  // const nextPost = allPosts[currentPostIndex + 1]

  if (!post) {
    return <div>Post Not Found</div>
  }

  const toc = await getTableOfContents(post.body.raw)

  return (
    <>
      <ScrollBar />
      <article className="mx-auto max-w-7xl py-6 px-0 md:px-8 lg:px-24">
        <header className="">
          <div className="space-y-4">
            <div className="space-y-20">
              <time
                dateTime={post.date}
                className="text-sm text-zinc-700 dark:text-zinc-300 opacity-80">
                Published on {format(parseISO(post.date), 'LLLL d, yyyy')}
              </time>
            </div>
            <h2 className="inline-block w-full mt-8 tracking-wide text-2xl md:text-3xl lg:text-4xl font-bold">
              {post.title}
            </h2>
          </div>
          <hr className="my-4 lg:my-8 border-zinc-300 dark:border-zinc-700" />
        </header>
        <main className="pb-4 lg:flex lg:flex-row">
          <section className="lg:w-[calc(100%-14rem)]">
            <Mdx code={post.body.code} />
            <p className="text-center pt-6 opacity-80 text-lg">-- EOF --</p>
            <PostNav slug={post.slug} />
            <div className="block lg:hidden">
              <BackTo />
            </div>
          </section>

          <section className="hidden text-lg lg:block lg:w-48 lg:ml-8">
            <div className="sticky top-16 -mt-10 overflow-y-auto pt-10">
              <TableOfContent toc={toc} />
              <div className="mt-8 text-right">
                <BackTo />
              </div>
            </div>
          </section>
        </main>
      </article>
    </>
  )
}
