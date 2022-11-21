import MarkdownIt from 'markdown-it'

export const markdownToHtml = async (content: string) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  })
  const html = md.render(content)
  return html
}
