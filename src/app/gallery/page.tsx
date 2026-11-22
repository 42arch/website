import { GalleryApp } from '@/components/apps/gallery'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('画册', '自然、建筑与静物的图片集。', '/gallery')

export default function GalleryPage() {
  return <GalleryApp />
}
