import { notFound } from 'next/navigation'
import { getPage, getPages } from '@/lib/source'
import { SinglePost } from './single-post'

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = getPage([params.slug])

  if (!page)
    notFound()

  return (
    <div className="container blog border-b border-main">
      <SinglePost page={page} category="" tags={page.data.tags} />
    </div>
  )
}

export function generateStaticParams(): { slug: string }[] {
  return getPages().map(page => ({
    slug: page.slugs[0],
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = getPage([params.slug])
  if (!page)
    notFound()
  return {
    title: page.data.title,
    description: page.data.description,
  }
}
