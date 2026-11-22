import { SettingsApp } from '@/components/apps/settings'
import { noIndexMetadata } from '@/lib/site'

export const metadata = noIndexMetadata

export default function SettingsPage() {
  return <SettingsApp />
}
