'use client'

import type { MusicTrack } from '@/components/apps/music/manifest'
import { MusicNotesIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'

export function MusicCover({ track, alt }: { track: MusicTrack, alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed)
    return <MusicNotesIcon className="text-ph-orange dark:text-orange-300" size={58} weight="duotone" />

  return (
    <Image
      src={track.cover ?? `/api/music/artwork/${encodeURIComponent(track.id)}`}
      alt={alt}
      fill
      sizes="160px"
      className="object-cover"
      onError={() => setFailed(true)}
      unoptimized
    />
  )
}
