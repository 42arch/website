'use client'

import type { NoteMeta } from '@/components/apps/notes/data'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { staticBlogList } from '@/components/apps/blog/data'
import { useBlogStore } from '@/components/apps/blog/store'
import { useNotesStore } from '@/components/apps/notes/store'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@/components/ui/command'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { profile } from '@/lib/desktop-content'
import { useShellStore } from '@/stores/shell-store'

interface CommandAction {
  tag: string
  label: string
  action: () => void
  keywords?: string[]
}

export function ShellSearch({ notesList }: { notesList: NoteMeta[] }) {
  const router = useRouter()
  const commandPaletteOpen = useShellStore(state => state.commandPaletteOpen)
  const setCommandPaletteOpen = useShellStore(state => state.setCommandPaletteOpen)
  const openWindow = useShellStore(state => state.openWindow)
  const toggleTheme = useShellStore(state => state.toggleTheme)
  const tileWindows = useShellStore(state => state.tileWindows)
  const showToast = useShellStore(state => state.showToast)
  const t = useTranslations('search')
  const tCommon = useTranslations('common')
  const tMenubar = useTranslations('menubar')
  const tDock = useTranslations('dock')
  const [query, setQuery] = useState('')
  const [visualViewport, setVisualViewport] = useState({ width: 0, height: 0, offsetTop: 0 })
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobileViewport = visualViewport.width > 0 && visualViewport.width < 640

  const commandItems: CommandAction[] = [
    { tag: 'SET', label: tMenubar('settings'), action: () => openWindow('settings') },
    { tag: 'FAV', label: tDock('bookmarks'), action: () => openWindow('bookmarks') },
    { tag: 'APP', label: tDock('projects'), action: () => openWindow('projects') },
    { tag: 'NOTE', label: tDock('notes'), action: () => openWindow('notes') },
    { tag: 'BLOG', label: tDock('blog'), action: () => openWindow('blog') },
    { tag: 'ART', label: tDock('gallery'), action: () => openWindow('gallery') },
    { tag: 'MUS', label: tDock('music'), action: () => openWindow('music') },
    { tag: 'CLI', label: tDock('terminal'), action: () => openWindow('terminal') },
    { tag: 'GAME', label: tDock('game'), action: () => openWindow('game') },
    { tag: 'WIKI', label: tDock('handbook'), action: () => openWindow('handbook') },
    { tag: 'MSG', label: tDock('contact'), action: () => openWindow('contact') },
    { tag: 'SYS', label: 'Theme (Light / Dark)', action: () => toggleTheme() },
    { tag: 'WIN', label: tMenubar('tileWindows'), action: () => tileWindows() },
    {
      tag: 'COPY',
      label: `${tMenubar('copyEmail')} (${profile.email})`,
      action: () => {
        navigator.clipboard.writeText(profile.email)
        showToast(`${tCommon('copied')}: ${profile.email}`)
      },
    },
    ...staticBlogList.map(article => ({
      tag: 'BLOG',
      label: `${article.title} (${article.category})`,
      keywords: [article.intro, ...article.tags, article.slug],
      action: () => {
        useBlogStore.getState().setSelectedSlug(article.slug)
        openWindow('blog')
        router.push(`/blog/${article.slug}`)
      },
    })),
    ...notesList.map(note => ({
      tag: 'NOTE',
      label: `${note.title} (${note.category})`,
      keywords: [note.intro, ...note.tags, note.slug],
      action: () => {
        useNotesStore.getState().setSearchQuery(note.title)
        openWindow('notes')
      },
    })),
  ]

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  useEffect(() => {
    if (!commandPaletteOpen)
      return

    setQuery('')
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [commandPaletteOpen])

  useEffect(() => {
    if (!commandPaletteOpen)
      return

    const viewport = window.visualViewport
    function updateViewport() {
      setVisualViewport({
        width: window.innerWidth,
        height: viewport?.height ?? window.innerHeight,
        offsetTop: viewport?.offsetTop ?? 0,
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    viewport?.addEventListener('resize', updateViewport)
    viewport?.addEventListener('scroll', updateViewport)

    return () => {
      window.removeEventListener('resize', updateViewport)
      viewport?.removeEventListener('resize', updateViewport)
      viewport?.removeEventListener('scroll', updateViewport)
    }
  }, [commandPaletteOpen])

  function executeItem(item: CommandAction) {
    setCommandPaletteOpen(false)
    item.action()
  }

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <DialogContent
        className="top-[42%] max-h-[calc(100dvh-1.5rem)] max-w-[calc(100%-1rem)] -translate-y-1/2 gap-0 overflow-hidden p-0 sm:top-24 sm:max-h-[calc(100dvh-8rem)] sm:max-w-lg sm:translate-y-0"
        showCloseButton={false}
        style={isMobileViewport
          ? {
              top: `${visualViewport.offsetTop + visualViewport.height * 0.42}px`,
              maxHeight: `${Math.max(160, visualViewport.height - 24)}px`,
            }
          : undefined}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{t('placeholder')}</DialogTitle>
        </DialogHeader>
        <Command className="min-h-0 max-h-[calc(100dvh-1.5rem)] sm:max-h-96" shouldFilter>
          <CommandInput
            ref={inputRef}
            value={query}
            onValueChange={setQuery}
            placeholder={t('placeholder')}
          />
          <CommandList
            style={isMobileViewport ? { maxHeight: `${Math.min(288, Math.max(120, visualViewport.height - 64))}px` } : undefined}
          >
            <CommandEmpty>{t('noResults')}</CommandEmpty>
            <CommandGroup>
              {commandItems.map(item => (
                <CommandItem
                  key={`${item.tag}-${item.label}`}
                  value={`${item.tag} ${item.label}`}
                  keywords={item.keywords}
                  onSelect={() => executeItem(item)}
                  className="min-h-11 px-3 sm:min-h-0 sm:px-2"
                >
                  <span className="font-mono text-[10px] text-muted-foreground">{item.tag}</span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  <CommandShortcut className="hidden sm:inline">Enter</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
