import readingTime from 'reading-time'
export default function getReadingTime(content: string) {
  const contentWithoutSvg = content.replace(/<svg[\s\S]*?<\/svg>/g, '')
  return readingTime(contentWithoutSvg).minutes
}
