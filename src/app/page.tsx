import { pageMetadata, siteDescription, siteName } from '@/lib/site'

export const metadata = {
  ...pageMetadata(siteName, siteDescription, '/'),
  title: { absolute: siteName },
}

export default function HomePage() {
  return null
}
