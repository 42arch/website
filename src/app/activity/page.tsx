import { ActivityPanel } from '@/components/panels/activity-panel'

export const metadata = {
  title: 'Activity',
  description: 'Development history — commits, deployments, and system events.',
}

export default function ActivityPage() {
  return <ActivityPanel />
}
