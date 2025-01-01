import { defineCollection, defineConfig } from '@content-collections/core'
import { promisify } from 'node:util'
import { exec as syncExec } from 'node:child_process'
import { compileMDX } from '@content-collections/mdx'
import path from 'path'
import remarkGfm from 'remark-gfm'
import { remarkCodeHike } from '@code-hike/mdx'
import rehypeSlug from 'rehype-slug'
import getReadingTime from '@/lib/reading-time'

const postDirectory = 'src/content/posts'
const exec = promisify(syncExec)

async function lastModificationDate(filePath: string) {
  const { stdout } = await exec(
    `git log -1 --format=%ai -- ${path.join(postDirectory, filePath)}`
  )
  if (stdout) {
    return new Date(stdout.trim()).toISOString()
  }
  return new Date().toISOString()
}

const posts = defineCollection({
  name: 'posts',
  directory: postDirectory,
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    published: z.boolean().nullable(),
    summary: z.string().nullable(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    lang: z.enum(['en', 'zh-CN']),
    author: z.string()
  }),
  transform: async (post, ctx) => {
    const mdx = await compileMDX(ctx, post, {
      files: (appender) => {
        const directory = path.join(
          postDirectory,
          post._meta.directory,
          'components'
        )
        appender.directory('./components', directory)
      },
      remarkPlugins: [
        remarkGfm,
        [
          remarkCodeHike,
          {
            theme: 'light-plus',
            showExpandButton: false,
            showCopyButton: true,
            autoImport: true,
            autoLink: true,
            lineNumbers: true
          }
        ]
      ],
      rehypePlugins: [rehypeSlug]
    })

    // const lastModification = await ctx.cache(
    //   post._meta.filePath,
    //   lastModificationDate
    // )

    return {
      ...post,
      slug: post._meta.fileName.replace('.mdx', ''),
      readingTime: getReadingTime(post.content),
      content: {
        mdx,
        raw: post.content
      }
    }
  }
})

export default defineConfig({
  collections: [posts]
})
