import { HandbookApp } from '@/components/apps/handbook'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('工作手册', '关于交付、手艺和把事情做清楚的工作原则。', '/handbook')

export default function HandbookPage() {
  return <HandbookApp />
}
