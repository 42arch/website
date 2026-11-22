import { ContactApp } from '@/components/apps/contact'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('联系', '合作、机会或随便聊聊，都可以从这里留言。', '/contact')

export default function ContactPage() {
  return <ContactApp />
}
