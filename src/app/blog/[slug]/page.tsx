import { InlineTOC } from 'fumadocs-ui/components/inline-toc'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blog } from '@/lib/source'

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = blog.getPage([params.slug])

  if (!page)
    notFound()
  const Mdx = page.data.body

  return (
    <>
      <div className="container rounded-xl border py-12 md:px-8 pt-28">
        <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
        <p className="mb-4 ">{page.data.description}</p>
        <Link href="/blog">Back</Link>
      </div>
      <article className="container flex flex-col px-4 py-8">
        <div className="prose min-w-0">
          <InlineTOC items={page.data.toc} className="bg-card" />
          <Mdx components={defaultMdxComponents} />
        </div>
      </article>
    </>
  )
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map(page => ({
    slug: page.slugs[0],
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = blog.getPage([params.slug])
  if (!page)
    notFound()
  return {
    title: page.data.title,
    description: page.data.description,
  }
}
