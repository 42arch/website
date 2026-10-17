export interface GalleryImage {
  id: string
  title: string
  description: string
  time: string
  src: string
}

export interface GalleryAlbum {
  id: string
  title: string
  description: string
  images: GalleryImage[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isGalleryImage(value: unknown): value is GalleryImage {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.title === 'string'
    && typeof value.description === 'string'
    && typeof value.time === 'string'
    && typeof value.src === 'string'
}

function isGalleryAlbum(value: unknown): value is GalleryAlbum {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.title === 'string'
    && typeof value.description === 'string'
    && Array.isArray(value.images)
    && value.images.every(isGalleryImage)
}

export function parseGalleryAlbums(value: unknown): GalleryAlbum[] | null {
  if (!isRecord(value) || !Array.isArray(value.albums) || !value.albums.every(isGalleryAlbum))
    return null

  return value.albums
}
