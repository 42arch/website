import MarkdownIt from 'markdown-it'
import * as shiki from 'shiki'

export const markdownToHtml = async (content: string) => {
  const highlighter = await shiki.getHighlighter({
    theme: 'nord'
  })

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code, lang) => {
      return highlighter.codeToHtml(code, { lang })
    }
  })
  const html = md.render(content)
  return html
}
