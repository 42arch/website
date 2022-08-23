import remarkToc from 'remark-toc'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkPrism from 'remark-prism'
import rehypePrism from 'rehype-prism-plus'

export const markdownToHtml = async (content: string): Promise<string> => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkToc, { tight: true, ordered: true, heading: '目录' })
    .use(remarkRehype)
    // .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypePrism)
    // .use(remarkPrism)
    .process(content)
    return String(result)
}
