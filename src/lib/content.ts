export function calculateReadingTime(contents: { content: string }[]) {
  const wordCount = contents.reduce((acc, curr) => {
    // eslint-disable-next-line e18e/prefer-static-regex
    return acc + curr.content.split(/\s+/).length
  }, 0)

  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min read`
}
