'use client'

import { MusicNotesIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'
import { type MusicTrack, resolveTrackCover } from '@/components/apps/music/manifest'

export function MusicCover({ track, alt }: { track: MusicTrack, alt: string }) {
  const [failed, setFailed] = useState(false)
  const src = resolveTrackCover(track)

  if (!src || failed)
    return <MusicNotesIcon className="text-ph-orange dark:text-orange-300" size={58} weight="duotone" />

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="160px"
      className="object-cover"
      onError={() => setFailed(true)}
      unoptimized
    />
  )
}
