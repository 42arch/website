'use client'

import { MDXContent } from '@content-collections/mdx/react'
import { Internship } from '../Internship'
import MarkdownImage from './image'
import '@code-hike/mdx/styles'

interface Props {
  code: string
}

export default function Markdown({ code }: Props) {
  return (
    <MDXContent
      code={code}
      components={{
        Internship,
        img: MarkdownImage
      }}
    />
  )
}
