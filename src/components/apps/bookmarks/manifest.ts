export type BookmarkCategory = 'search' | 'video' | 'reference' | 'development'

export interface BookmarkSite {
  id: string
  name: string
  url: string
  category: BookmarkCategory
}

const bookmarkCategories = new Set<BookmarkCategory>(['search', 'video', 'reference', 'development'])

export function parseBookmarks(value: unknown): BookmarkSite[] | null {
  if (!Array.isArray(value))
    return null

  const ids = new Set<string>()
  const bookmarks: BookmarkSite[] = []

  for (const item of value) {
    if (typeof item !== 'object' || item === null)
      return null

    const bookmark = item as Record<string, unknown>
    if (
      typeof bookmark.id !== 'string' || !bookmark.id.trim()
      || typeof bookmark.name !== 'string' || !bookmark.name.trim()
      || typeof bookmark.url !== 'string' || !bookmark.url.trim()
      || typeof bookmark.category !== 'string' || !bookmarkCategories.has(bookmark.category as BookmarkCategory)
      || ids.has(bookmark.id)
    ) {
      return null
    }

    try {
      const url = new URL(bookmark.url)
      if (url.protocol !== 'http:' && url.protocol !== 'https:')
        return null
    }
    catch {
      return null
    }

    ids.add(bookmark.id)
    bookmarks.push({
      id: bookmark.id,
      name: bookmark.name,
      url: bookmark.url,
      category: bookmark.category as BookmarkCategory,
    })
  }

  return bookmarks
}
