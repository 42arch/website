'use client'

import {
  MusicNotesIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  RepeatOnceIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SpeakerHighIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { MusicCover } from '@/components/apps/music/components/music-cover'
import { MusicLyrics } from '@/components/apps/music/components/music-lyrics'
import { useMusicStore } from '@/components/apps/music/store'
import { formatTime } from '@/components/apps/music/utils'
import { ShellWindow } from '@/components/shell/window'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useShellStore } from '@/stores/shell-store'

export function MusicApp() {
  const isOpen = useShellStore(state => state.windows.music.open && !state.windows.music.minimized)

  if (!isOpen)
    return null

  return <MusicAppContent />
}

function MusicAppContent() {
  const t = useTranslations('apps.music')
  const tracks = useMusicStore(state => state.tracks)
  const catalogStatus = useMusicStore(state => state.catalogStatus)
  const selectedTrackId = useMusicStore(state => state.selectedTrackId)
  const isPlaying = useMusicStore(state => state.isPlaying)
  const currentTime = useMusicStore(state => state.currentTime)
  const duration = useMusicStore(state => state.duration)
  const volume = useMusicStore(state => state.volume)
  const loopMode = useMusicStore(state => state.loopMode)
  const error = useMusicStore(state => state.error)
  const playTrack = useMusicStore(state => state.playTrack)
  const togglePlayback = useMusicStore(state => state.togglePlayback)
  const previous = useMusicStore(state => state.previous)
  const next = useMusicStore(state => state.next)
  const seek = useMusicStore(state => state.seek)
  const setVolume = useMusicStore(state => state.setVolume)
  const cycleLoopMode = useMusicStore(state => state.cycleLoopMode)

  const selectedIndex = tracks.findIndex(track => track.id === selectedTrackId)
  const selectedTrack = tracks[selectedIndex]

  return (
    <ShellWindow
      id="music"
      title={t('title')}
      icon={<MusicNotesIcon size={14} weight="regular" className="text-ph-muted" />}
      defaultWidth="min(760px, 94vw)"
      defaultHeight="min(540px, 78vh)"
      defaultLeft={200}
      defaultTop={68}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        {catalogStatus === 'loading'
          ? (
              <div className="flex min-h-0 flex-1 items-center justify-center p-8 text-sm text-ph-muted" role="status">
                {t('loading')}
              </div>
            )
          : tracks.length === 0
            ? (
                <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-6 text-center" role="status">
                  <div className="flex size-16 items-center justify-center rounded-xl border bg-ph-orange/10 text-ph-orange dark:bg-ph-orange/15 dark:text-orange-300">
                    <MusicNotesIcon size={32} weight="duotone" />
                  </div>
                  <h2 className="text-base font-semibold text-ph-ink">{error === 'catalog' ? t('catalogError') : t('emptyTitle')}</h2>
                  <p className="max-w-sm text-xs leading-relaxed text-ph-muted">
                    {error === 'catalog' ? t('catalogErrorDescription') : t('emptyDescription')}
                  </p>
                </div>
              )
            : (
                <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[248px_minmax(0,1fr)] overflow-hidden sm:grid-cols-[minmax(0,250px)_minmax(0,1fr)] sm:grid-rows-1">
                  <section className="flex h-[248px] min-w-0 shrink-0 flex-col items-center justify-center gap-4 border-b p-5 sm:h-auto sm:border-b-0 sm:border-r" aria-label={t('nowPlaying')}>
                    <div className="relative flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-[8px] border bg-ph-orange/10 text-ph-orange shadow-sm dark:bg-ph-orange/15 dark:text-orange-300 sm:size-40">
                      {selectedTrack
                        ? <MusicCover key={selectedTrack.id} track={selectedTrack} alt={t('coverAlt', { title: selectedTrack.title })} />
                        : <MusicNotesIcon size={58} weight="duotone" />}
                    </div>
                    <div className="min-w-0 w-full text-center">
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-ph-muted">{t('nowPlaying')}</p>
                      <h2 className="truncate text-base font-semibold text-ph-ink">{selectedTrack?.title}</h2>
                      <p className="truncate text-xs text-ph-muted">{selectedTrack?.artist}</p>
                      {selectedTrack?.album && <p className="mt-1 truncate text-[11px] text-ph-muted">{selectedTrack.album}</p>}
                    </div>
                  </section>

                  <Tabs defaultValue="playlist" className="flex min-h-0 min-w-0 flex-col gap-0">
                    <div className="flex shrink-0 items-center justify-between border-b px-3 py-2">
                      <TabsList variant="line">
                        <TabsTrigger value="playlist">{t('playlist')}</TabsTrigger>
                        <TabsTrigger value="lyrics">{t('lyrics')}</TabsTrigger>
                      </TabsList>
                      <span className="font-mono text-[11px] text-ph-muted">{t('trackCount', { count: tracks.length })}</span>
                    </div>
                    <TabsContent value="playlist" className="min-h-0 flex-1 overflow-hidden">
                      <ScrollArea className="h-full">
                        <ol className="flex flex-col gap-1 p-2">
                          {tracks.map((track, index) => (
                            <li key={track.id}>
                              <button
                                type="button"
                                aria-label={t('playTrack', { title: track.title })}
                                aria-pressed={track.id === selectedTrackId}
                                onClick={() => playTrack(track.id)}
                                className={cn(
                                  'flex w-full cursor-pointer items-center gap-3 rounded-[6px] px-3 py-2.5 text-left transition-colors hover:bg-ph-orange/10 focus-visible:outline-2 focus-visible:outline-ph-orange dark:hover:bg-ph-orange/15',
                                  track.id === selectedTrackId && 'bg-ph-orange/10 dark:bg-ph-orange/15',
                                )}
                              >
                                <span className="w-5 shrink-0 text-center font-mono text-[11px] text-ph-muted">
                                  {track.id === selectedTrackId && isPlaying ? <MusicNotesIcon size={14} weight="fill" className="mx-auto text-ph-orange dark:text-orange-300" /> : index + 1}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-xs font-medium text-ph-ink">{track.title}</span>
                                  <span className="block truncate text-[11px] text-ph-muted">{track.artist}</span>
                                </span>
                                {track.id === selectedTrackId && <span className="font-mono text-[10px] text-ph-orange dark:text-orange-300">{t('selected')}</span>}
                              </button>
                            </li>
                          ))}
                        </ol>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="lyrics" className="min-h-0 flex-1 overflow-hidden">
                      {selectedTrack && <MusicLyrics trackId={selectedTrack.id} path={selectedTrack.lyrics} currentTime={currentTime} onSeek={seek} canSeek={duration > 0} />}
                    </TabsContent>
                  </Tabs>
                </div>
              )}

        <div className="shrink-0 border-t bg-ph-header/60 px-4 py-3 sm:px-5">
          {error === 'playback' && <p className="mb-2 text-center text-xs text-destructive" role="alert">{t('playbackError')}</p>}
          <div className="flex items-center gap-2 text-[11px] font-mono text-ph-muted">
            <span className="w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              aria-label={t('seek')}
              disabled={!selectedTrack || duration <= 0}
              max={Math.max(duration, 1)}
              min={0}
              onValueChange={value => seek(value[0] ?? 0)}
              step={1}
              value={[Math.min(currentTime, Math.max(duration, 1))]}
            />
            <span className="w-10">{formatTime(duration)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1" />
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t('loopMode', { mode: t(loopMode === 'single' ? 'singleLoop' : 'listLoop') })}
                title={t('loopMode', { mode: t(loopMode === 'single' ? 'singleLoop' : 'listLoop') })}
                onClick={cycleLoopMode}
              >
                {loopMode === 'single'
                  ? <RepeatOnceIcon weight="fill" className="text-ph-orange dark:text-orange-300" />
                  : <RepeatIcon weight="fill" className="text-ph-orange dark:text-orange-300" />}
              </Button>
              <Button type="button" variant="ghost" size="icon" aria-label={t('previous')} disabled={!selectedTrack} onClick={previous}>
                <SkipBackIcon weight="fill" />
              </Button>
              <Button type="button" size="icon-lg" aria-label={isPlaying ? t('pause') : t('play')} disabled={!selectedTrack} onClick={togglePlayback}>
                {isPlaying ? <PauseIcon weight="fill" /> : <PlayIcon weight="fill" />}
              </Button>
              <Button type="button" variant="ghost" size="icon" aria-label={t('next')} disabled={!selectedTrack || (loopMode === 'single' && selectedIndex >= tracks.length - 1)} onClick={next}>
                <SkipForwardIcon weight="fill" />
              </Button>
            </div>
            <div className="flex w-28 shrink-0 items-center gap-2 sm:flex-1 sm:justify-end">
              <SpeakerHighIcon size={16} weight="regular" className="shrink-0 text-ph-muted" aria-hidden="true" />
              <Slider aria-label={t('volume')} max={1} min={0} onValueChange={value => setVolume(value[0] ?? 0)} step={0.01} value={[volume]} className="max-w-24" />
            </div>
          </div>
        </div>
      </div>
    </ShellWindow>
  )
}
