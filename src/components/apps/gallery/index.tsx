'use client'

import { ArrowLeftIcon, ArrowRightIcon, ImagesIcon, XIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import type { GalleryAlbum } from '@/components/apps/gallery/data'
import { parseGalleryAlbums } from '@/components/apps/gallery/data'
import { useGalleryStore } from '@/components/apps/gallery/store'
import { ShellWindow } from '@/components/shell/window'
import { Button } from '@/components/ui/button'

export function GalleryApp() {
  const t = useTranslations('apps.gallery')
  const [albums, setAlbums] = useState<GalleryAlbum[]>([])
  const [catalogStatus, setCatalogStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const activeAlbumId = useGalleryStore(state => state.activeAlbumId)
  const activeImageIndex = useGalleryStore(state => state.activeImageIndex)
  const setActiveAlbumId = useGalleryStore(state => state.setActiveAlbumId)
  const setActiveImageIndex = useGalleryStore(state => state.setActiveImageIndex)
  const activeAlbum = albums.find(album => album.id === activeAlbumId)
  const activeImage = activeAlbum && activeImageIndex !== null ? activeAlbum.images[activeImageIndex] : undefined
  const filteredAlbums = albums
  const filteredImages = activeAlbum?.images.map((image, index) => ({ image, index }))

  useEffect(() => {
    const controller = new AbortController()

    async function loadAlbums() {
      try {
        const response = await fetch('/data/gallery.json', { signal: controller.signal, cache: 'no-store' })
        if (!response.ok)
          throw new Error('Gallery catalog unavailable')

        const value: unknown = await response.json()
        const result = parseGalleryAlbums(value)
        if (!result)
          throw new Error('Invalid gallery catalog')

        setAlbums(result)
        setCatalogStatus('ready')
      }
      catch {
        if (!controller.signal.aborted)
          setCatalogStatus('error')
      }
    }

    void loadAlbums()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!activeAlbum || activeImageIndex === null)
      return

    const imageCount = activeAlbum.images.length

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveImageIndex(null)
      }
      else if (event.key === 'ArrowLeft') {
        setActiveImageIndex(index => index === null ? null : (index - 1 + imageCount) % imageCount)
      }
      else if (event.key === 'ArrowRight') {
        setActiveImageIndex(index => index === null ? null : (index + 1) % imageCount)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeAlbum, activeImageIndex])

  return (
    <ShellWindow
      id="gallery"
      title={t('title')}
      defaultWidth="min(900px, 94vw)"
      defaultHeight="min(700px, 84vh)"
      defaultLeft={100}
      defaultTop={38}
      icon={<ImagesIcon size={14} weight="regular" className="text-ph-orange" />}
    >
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-ph-surface-body text-ph-ink">
        <main className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {catalogStatus === 'loading'
            ? <p className="py-12 text-center text-sm text-ph-muted" role="status">{t('loading')}</p>
            : catalogStatus === 'error'
              ? <p className="py-12 text-center text-sm text-ph-muted" role="alert">{t('loadError')}</p>
              : activeAlbum
            ? (
                <>
                  <div className="mb-5 flex items-start gap-3">
                    <Button variant="ghost" size="icon" className="-ml-2 size-9 shrink-0" aria-label={t('backToAlbums')} onClick={() => { setActiveAlbumId(null); setActiveImageIndex(null) }}>
                      <ArrowLeftIcon size={18} />
                    </Button>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-ph-muted">{t('albumLabel')}</p>
                      <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{activeAlbum.title}</h2>
                      <p className="mt-1 text-sm text-ph-muted">{activeAlbum.description}</p>
                    </div>
                  </div>

                  <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                    {filteredImages?.map(({ image, index }) => (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl bg-ph-sidebar text-left shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ph-orange"
                      >
                        <img src={image.src} alt={image.title} className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]" />
                        <span className="block px-3.5 py-3">
                          <span className="block text-sm font-medium">{image.title}</span>
                          <span className="mt-1 block text-xs leading-relaxed text-ph-muted">{image.description}</span>
                          <time className="mt-2 block text-[11px] text-ph-muted/80">{image.time}</time>
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )
            : (
                <>
                  <header className="mb-6 sm:mb-8">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-ph-muted">{t('eyebrow')}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{t('heading')}</h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ph-muted">{t('subtitle')}</p>
                  </header>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredAlbums.map((album) => {
                      const cover = album.images[0]
                      return (
                        <button
                          key={album.id}
                          type="button"
                          onClick={() => { setActiveAlbumId(album.id); setActiveImageIndex(null) }}
                          className="group overflow-hidden rounded-2xl bg-ph-sidebar text-left shadow-sm transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ph-orange"
                        >
                          <div className="overflow-hidden">
                            <img src={cover.src} alt={album.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
                          </div>
                          <span className="flex items-end justify-between gap-3 p-4">
                            <span>
                              <span className="block text-base font-semibold">{album.title}</span>
                              <span className="mt-1 block text-xs text-ph-muted">{album.description}</span>
                            </span>
                            <span className="shrink-0 text-xs text-ph-muted">{t('imageCount', { count: album.images.length })}</span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
        </main>

        {activeAlbum && activeImage && activeImageIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.title}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-7"
            onClick={() => setActiveImageIndex(null)}
          >
            <Button variant="ghost" size="icon" className="absolute right-3 top-3 z-10 size-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white" aria-label={t('closeViewer')} onClick={() => setActiveImageIndex(null)}>
              <XIcon size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white sm:left-5" aria-label={t('previousImage')} onClick={(event) => { event.stopPropagation(); setActiveImageIndex((activeImageIndex - 1 + activeAlbum.images.length) % activeAlbum.images.length) }}>
              <ArrowLeftIcon size={20} />
            </Button>
            <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center" onClick={event => event.stopPropagation()}>
              <img src={activeImage.src} alt={activeImage.title} className="min-h-0 max-h-[65vh] max-w-full rounded-lg object-contain shadow-2xl" />
              <div className="mt-4 text-center text-white">
                <h3 className="text-base font-medium">{activeImage.title}</h3>
                <p className="mt-1 text-sm text-white/70">{activeImage.description}</p>
                <time className="mt-1 block text-xs text-white/55">{activeImage.time}</time>
                <p className="mt-2 text-xs tabular-nums text-white/55">
                  {activeImageIndex + 1}
                  {' '}
                  /
                  {' '}
                  {activeAlbum.images.length}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white sm:right-5" aria-label={t('nextImage')} onClick={(event) => { event.stopPropagation(); setActiveImageIndex((activeImageIndex + 1) % activeAlbum.images.length) }}>
              <ArrowRightIcon size={20} />
            </Button>
          </div>
        )}
      </div>
    </ShellWindow>
  )
}
