'use client'

import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { staticNotesList } from '@/lib/notes-data'
import { useNotesStore } from '@/stores/apps/notes-store'
import { useShellStore } from '@/stores/shell-store'

interface CommandItem {
  tag: string
  label: string
  action: () => void
  keywords?: string
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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commandItems: CommandItem[] = [
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
      keywords: `${note.intro} ${note.tags.join(' ')} ${note.slug}`,
      action: () => {
        useNotesStore.getState().setSelectedSlug(note.slug)
        openWindow('notes')
        router.push(`/notes/${note.slug}`)
      },
    })),
  ]

  const filtered = commandItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
    || item.tag.toLowerCase().includes(query.toLowerCase())
    || (item.keywords && item.keywords.toLowerCase().includes(query.toLowerCase())),
  )

  // Global shortcut (⌘K / Ctrl+K / Escape)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
      else if (e.key === 'Escape' && commandPaletteOpen) {
        e.preventDefault()
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  // Focus input on open
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [commandPaletteOpen])

  function executeItem(item: CommandItem) {
    setCommandPaletteOpen(false)
    item.action()
  }

  function handleInputKeyDown(e: ReactKeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1))
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1))
    }
    else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault()
      executeItem(filtered[selectedIndex])
    }
  }

  if (!commandPaletteOpen)
    return null

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget)
          setCommandPaletteOpen(false)
      }}
      className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-start justify-center pt-24 px-4 select-none"
    >
      <div className="w-full max-w-lg rounded-[8px] border border-ph-border bg-ph-surface/95 backdrop-blur-[22px] saturate-[145%] shadow-mac dark:shadow-mac-dark overflow-hidden">
        {/* Search Input Bar */}
        <div className="px-4 py-3 border-b border-ph-border-subtle flex items-center gap-3">
          <MagnifyingGlassIcon size={16} weight="bold" className="text-ph-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={t('placeholder')}
            className="w-full bg-transparent text-xs sm:text-sm focus:outline-none text-ph-ink font-mono"
          />
          <kbd
            onClick={() => setCommandPaletteOpen(false)}
            className="cursor-pointer px-1.5 py-0.5 text-[10px] font-mono text-ph-muted bg-black/5 dark:bg-white/10 rounded-[4px] hover:bg-black/10 transition-colors"
          >
            {t('esc')}
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-1.5 max-h-72 overflow-y-auto space-y-0.5 text-xs">
          {filtered.length > 0
            ? (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex
                  return (
                    <button
                      key={item.tag + item.label}
                      type="button"
                      onClick={() => executeItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3 py-2 rounded-[6px] flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-ph-orange text-white'
                          : 'text-ph-ink hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-1.5 py-0.5 rounded-[4px] font-mono text-[10px] font-semibold ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-black/5 dark:bg-white/10 text-ph-muted'
                          }`}
                        >
                          {item.tag}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-60 ml-2 shrink-0">Enter</span>
                    </button>
                  )
                })
              )
            : (
                <div className="p-4 text-ph-muted text-center text-xs">
                  {t('noResults')}
                </div>
              )}
        </div>
      </div>
    </div>
  )
}
