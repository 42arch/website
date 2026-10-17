'use client'

import { useEffect, useRef } from 'react'
import { parseMusicManifest } from '@/components/apps/music/manifest'
import { bindMusicAudio, useMusicStore } from '@/components/apps/music/store'

export function MusicAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio)
      return

    const unbind = bindMusicAudio(audio)
    const controller = new AbortController()

    async function loadTracks() {
      try {
        const response = await fetch('/data/music.json', { signal: controller.signal, cache: 'no-store' })
        if (!response.ok)
          throw new Error('Music catalog unavailable')

        const value: unknown = await response.json()
        const tracks = parseMusicManifest(value)
        if (!tracks)
          throw new Error('Invalid music catalog')

        useMusicStore.getState().setTracks(tracks)
      }
      catch {
        if (!controller.signal.aborted)
          useMusicStore.getState().setCatalogError()
      }
    }

    void loadTracks()
    return () => {
      controller.abort()
      unbind()
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      preload="metadata"
      onDurationChange={event => useMusicStore.getState().setProgress(event.currentTarget.currentTime, event.currentTarget.duration)}
      onEnded={() => useMusicStore.getState().handleEnded()}
      onError={() => useMusicStore.getState().setPlaybackError()}
      onPause={() => useMusicStore.getState().setPlaying(false)}
      onPlay={() => useMusicStore.getState().setPlaying(true)}
      onTimeUpdate={event => useMusicStore.getState().setProgress(event.currentTarget.currentTime, event.currentTarget.duration)}
    />
  )
}
