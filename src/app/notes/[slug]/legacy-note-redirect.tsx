'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export function LegacyNoteRedirect() {
  const params = useParams<{ slug: string }>()

  useEffect(() => {
    if (params.slug)
      window.location.replace(`/blog/${params.slug}`)
  }, [params.slug])

  return null
}
