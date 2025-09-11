export interface BlogPost {
  slugs?: string[]
  data: {
    date: Date
    tags?: string[]
    series?: string
    seriesPart?: number
    [key: string]: any
  }
  [key: string]: any
}
