'use client'

import dynamic from 'next/dynamic'

const DynamicMermaid = dynamic(
  () => import('@/components/mermaid').then(mod => mod.Mermaid),
  { ssr: false }
)

export function Mermaid(props: { chart: string }) {
  return <DynamicMermaid {...props} />
}
