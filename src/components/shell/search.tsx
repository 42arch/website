'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@/components/ui/command'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { staticNotesList } from '@/lib/notes-data'
import { useNotesStore } from '@/stores/apps/notes-store'
import { useShellStore } from '@/stores/shell-store'

interface CommandAction {
  tag: string
  label: string
  action: () => void
  keywords?: string[]
}

export function ShellSearch() {
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
  const inputRef = useRef<HTMLInputElement>(null)

  const commandItems: CommandAction[] = [
    { tag: 'SET', label: tMenubar('settings'), action: () => openWindow('settings') },
    { tag: 'DOC', label: tDock('readme'), action: () => openWindow('readme') },
    { tag: 'APP', label: tDock('projects'), action: () => openWindow('projects') },
    { tag: 'NOTE', label: tDock('notes'), action: () => openWindow('notes') },
    { tag: 'ART', label: tDock('gallery'), action: () => openWindow('gallery') },
    { tag: 'CLI', label: tDock('terminal'), action: () => openWindow('terminal') },
    { tag: 'WIKI', label: tDock('handbook'), action: () => openWindow('handbook') },
    { tag: 'MSG', label: tDock('contact'), action: () => openWindow('contact') },
    { tag: 'SYS', label: 'Theme (Light / Dark)', action: () => toggleTheme() },
    { tag: 'WIN', label: tMenubar('tileWindows'), action: () => tileWindows() },
    {
      tag: 'COPY',
      label: `${tMenubar('copyEmail')} (alex@posthog-style.dev)`,
      action: () => {
        navigator.clipboard.writeText('alex@posthog-style.dev')
        showToast(`${tCommon('copied')}: alex@posthog-style.dev`)
      },
    },
    ...staticNotesList.map(note => ({
      tag: 'NOTE',
      label: `${note.title} (${note.category})`,
      keywords: [note.intro, ...note.tags, note.slug],
      action: () => {
        useNotesStore.getState().setSelectedSlug(note.slug)
        openWindow('notes')
        router.push(`/notes/${note.slug}`)
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

  function executeItem(item: CommandAction) {
    setCommandPaletteOpen(false)
    item.action()
  }

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <DialogContent className="top-24 max-w-lg translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-lg" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>{t('placeholder')}</DialogTitle>
        </DialogHeader>
        <Command className="max-h-96" shouldFilter>
          <CommandInput
            ref={inputRef}
            value={query}
            onValueChange={setQuery}
            placeholder={t('placeholder')}
          />
          <CommandList>
            <CommandEmpty>{t('noResults')}</CommandEmpty>
            <CommandGroup>
              {commandItems.map(item => (
                <CommandItem
                  key={`${item.tag}-${item.label}`}
                  value={`${item.tag} ${item.label}`}
                  keywords={item.keywords}
                  onSelect={() => executeItem(item)}
                >
                  <span className="font-mono text-[10px] text-muted-foreground">{item.tag}</span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  <CommandShortcut>Enter</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
