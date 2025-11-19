import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
import { ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import GiscusContent from '@/components/giscus-content'
import { getMDXComponents } from '@/components/mdx-component'
import { Badge } from '@/components/ui/badge'
import formateDate from '@/lib/date'

interface SinglePostProps {
  page: any
  category?: string
  date: Date
  lastModified?: Date
  tags?: string[]
}

export function SinglePost({
  page,
  category,
  date,
  lastModified,
  tags,
}: SinglePostProps) {
  const MDX = page.data.body

  return (
    <>
      <div className="relative container border-b border-main px-4 pb-4 pt-14 lg:py-8 lg:px-6 text-left">
        <div className="mb-4 text-sm text-muted-foreground ">
          <div className="flex flex-wrap gap-3">
            {
              category && (
                <Badge variant="secondary" className="inline-flex items-center gap-1.5 capitalize text-muted-foreground">
                  {category}
                </Badge>
              )
            }
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formateDate(date)}
            </span>
          </div>
        </div>
        <DocsTitle className="text-left text-2xl">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="text-left mb-3 mt-3 text-base text-muted-foreground">
          {page.data.description}
        </DocsDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags?.length
            && tags?.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="inline-flex items-center gap-1.5 capitalize text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
        </div>
      </div>

      <DocsLayout
        nav={{ enabled: false }}
        tree={{
          name: 'Tree',
          children: [],
        }}
        sidebar={{ enabled: false, prefetch: false, tabs: false }}
        containerProps={{
          className: 'relative pt-0 border-b border-main',
        }}
      >
        <DocsPage
          toc={page.data.toc}
          full={false}
          lastUpdate={lastModified}
          footer={{
            enabled: false,
          }}
          tableOfContent={{
            style: 'normal',
            single: true,
            footer: (
              <Link href="/blog" className="mt-3 text-fd-muted-foreground hover:text-fd-primary flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to posts
              </Link>
            ),
          }}
          container={{
            className: 'pe-0 relative max-w-full flex',
          }}
          article={{
            className: 'border-r border-main pb-16 tracking-tighter',
          }}
        >
          <DocsBody className="text-sm">
            <MDX components={getMDXComponents()} />
          </DocsBody>
        </DocsPage>
      </DocsLayout>

      <GiscusContent />
    </>
  )
}
