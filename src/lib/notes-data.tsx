import type { ReactNode } from 'react'
import * as Twoslash from 'fumadocs-twoslash/ui'
import { MdxCodeBlock } from '@/components/mdx/code-block'
import { notesSource } from '@/lib/source'

export interface NoteMeta {
  slug: string
  title: string
  date: string
  category: string
  intro: string
  content: ReactNode
  tags: string[]
}

export function getNotesList(): NoteMeta[] {
  return notesSource.getPages().map((page) => {
    const Content = page.data.body

    return {
      slug: page.slugs[0],
      title: page.data.title,
      date: page.data.date,
      category: page.data.category,
      intro: page.data.intro,
      content: <Content components={{ ...Twoslash, pre: MdxCodeBlock }} />,
      tags: page.data.tags ?? [],
    }
  })
}
