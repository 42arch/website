import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
// import remarkSlug from 'remark-slug'
import extractToc from 'remark-extract-toc'
import remarkRehype from 'remark-rehype'
import remarkStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import { rehypePrettyCodeOptions } from './rehypePrettyCode'

export const markdownToHtml = async (content: string) => {
  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, rehypePrettyCodeOptions)
    .use(remarkStringify, { allowDangerousHtml: true })
    .process(content)
  return String(html)
}

export const buildToc = async (content: string) => {
  const builder = unified().use(remarkParse).use(extractToc)
  const node = builder.parse(content)
  const tree = builder.runSync(node)
  return tree
}
