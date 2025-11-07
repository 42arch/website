import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
import { Calendar } from 'lucide-react'
import React from 'react'
import { getMDXComponents } from '@/components/mdx-component'

interface SinglePostProps {
  page: any
  category?: string
  lastModified?: Date
  tags?: string[]
  // getCategoryBySlug: (slug: string) => any
}

export function SinglePost({
  page,
  category,
  lastModified,
  tags,
}: SinglePostProps) {
  const MDX = page.data.body

  return (
    <>
      <div className="relative container border-b border-main px-4 pb-4 pt-14 lg:py-8 lg:px-6 text-left">
        {category && (
          <div className="mb-4 text-sm font-medium">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 capitalize">
                {category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {lastModified?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        )}
        <DocsTitle className="text-left text-2xl flex items-center gap-2">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="text-left mb-3 mt-3 text-base text-muted-foreground">
          {page.data.description}
        </DocsDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags?.length
            && tags?.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
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
          className: 'relative pt-0',
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
    </>
  )
}
