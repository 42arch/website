export type Tag = {
  label: string,
  total: number
}

export type PostMetaData = {
  title: string
  slug: string
  date: number
  category: string
  tags: string[]
  excerpt: string
  coverImage: string
}