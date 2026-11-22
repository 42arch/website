import { AnalyticsApp } from '@/components/apps/analytics'
import { noIndexMetadata } from '@/lib/site'

export const metadata = noIndexMetadata

export default function AnalyticsPage() {
  return <AnalyticsApp />
}
