import { ActivityPanel } from '@/components/panels/activity-panel'

export const metadata = {
  title: 'Activity | Folio OS',
  description: 'Development history — commits, deployments, and system events.',
}

export default function ActivityPage() {
  return <ActivityPanel />
}
