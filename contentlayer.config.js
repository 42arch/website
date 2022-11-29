import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { rehypePrettyCodeOptions } from './lib/rehypePrettyCode'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true
    },
    slug: {
      type: 'string',
      description: 'The slug of the post',
      required: true
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the post',
      required: false
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'The tags of the post',
      required: false
    },
    category: {
      type: 'string',
      description: 'The category of the post',
      required: false
    },
    coverImage: {
      type: 'string',
      description: 'The coverImage of the post',
      required: false
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `${post._raw.flattenedPath}`
    }
  }
}))

export default makeSource({
  contentDirPath: '_posts',
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[(rehypePrettyCode, rehypePrettyCodeOptions)]]
  }
})
