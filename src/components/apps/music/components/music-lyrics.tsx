'use client'

import type { LyricLine } from '@/components/apps/music/lrc'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { parseLrc } from '@/components/apps/music/lrc'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface LyricsResult {
  trackId: string
  path: string
  status: 'ready' | 'error'
  lines: LyricLine[]
}

interface MusicLyricsProps {
  trackId: string
  path?: string
  currentTime: number
  onSeek: (time: number) => void
  canSeek: boolean
}

export function MusicLyrics({ trackId, path, currentTime, onSeek, canSeek }: MusicLyricsProps) {
  const t = useTranslations('apps.music')
  const [result, setResult] = useState<LyricsResult | null>(null)
  const activeLineRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!path)
      return

    const lyricsPath = path
    const controller = new AbortController()

    async function loadLyrics() {
      try {
        const response = await fetch(lyricsPath, { signal: controller.signal })
        if (!response.ok)
          throw new Error('Lyrics unavailable')

        const lines = parseLrc(await response.text())
        if (!controller.signal.aborted)
          setResult({ trackId, path: lyricsPath, status: 'ready', lines })
      }
      catch {
        if (!controller.signal.aborted)
          setResult({ trackId, path: lyricsPath, status: 'error', lines: [] })
      }
    }

    void loadLyrics()
    return () => controller.abort()
  }, [path, trackId])

  const currentResult = result?.trackId === trackId && result.path === path ? result : null
  const lines = currentResult?.lines ?? []
  let activeIndex = -1
  for (let index = 0; index < lines.length; index++) {
    if (lines[index].time > currentTime)
      break
    activeIndex = index
  }

  useEffect(() => {
    if (activeIndex >= 0)
      activeLineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeIndex])

  if (!path)
    return <div className="flex h-full items-center justify-center p-5 text-center text-xs text-ph-muted">{t('noLyrics')}</div>

  if (!currentResult)
    return <div className="flex h-full items-center justify-center p-5 text-center text-xs text-ph-muted" role="status">{t('lyricsLoading')}</div>

  if (currentResult.status === 'error')
    return <div className="flex h-full items-center justify-center p-5 text-center text-xs text-destructive" role="alert">{t('lyricsError')}</div>

  if (lines.length === 0)
    return <div className="flex h-full items-center justify-center p-5 text-center text-xs text-ph-muted">{t('noLyrics')}</div>

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-3 px-4 py-8 text-center">
        {lines.map((line, index) => (
          <button
            key={`${line.time}-${index}`}
            ref={index === activeIndex ? activeLineRef : null}
            type="button"
            disabled={!canSeek}
            aria-current={index === activeIndex ? 'true' : undefined}
            aria-label={t('seekToLyric', { lyric: line.text || t('instrumental') })}
            onClick={() => onSeek(line.time)}
            className={cn(
              'rounded px-2 py-1 leading-relaxed transition-colors focus-visible:outline-2 focus-visible:outline-ph-orange enabled:cursor-pointer disabled:cursor-default',
              index === activeIndex ? 'bg-ph-orange/10 text-base font-semibold text-ph-ink dark:bg-ph-orange/15' : 'text-sm text-ph-muted hover:text-ph-ink',
            )}
          >
            {line.text || '♪'}
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
