import { loader } from 'fumadocs-core/source'
import { createMDXSource } from 'fumadocs-mdx'
import { blog } from './../../.source'

export const { getPage, getPages, pageTree } = loader({
  baseUrl: '/blog',
  source: createMDXSource(blog),
})

const posts = getPages()

export type Posts = typeof posts

const tags = new Set<string>()
for (const post of posts) {
  if (post.data.tags) {
    for (const tag of post.data.tags) {
      tags.add(tag)
    }
  }
}

export const tagsList = Array.from(tags).sort()
