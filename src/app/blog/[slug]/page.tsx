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

  // return allDocs.map((doc) => ({
  //   slug: doc.slugAsParams.split('/')
  // }))
}

export default async function Page({ params }: IProps) {
  const slug = params?.slug
  const post = allPosts.find((post) => {
    console.log('fffxxxx', post.slug, slug)
    return post.slug === `blog/${slug}`
  })

  if (!post) {
    return <div>not found</div>
  }

  return (
    <>
      <article className="mx-auto max-w-2xl py-2">
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
      </article>
    </>
  )
}
