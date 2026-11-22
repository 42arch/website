import { jsonLdScript } from '@/lib/site'

export function JsonLd({ data }: { data: unknown }) {
  return <script dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }} type="application/ld+json" />
}
