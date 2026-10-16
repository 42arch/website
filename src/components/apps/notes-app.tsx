'use client'

import { MagnifyingGlassIcon, NotePencilIcon, XIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { ShellWindow } from '@/components/shell/window'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import type { NoteMeta } from '@/lib/notes-data'
import { useNotesStore } from '@/stores/apps/notes-store'

export function NotesApp({ notesList }: { notesList: NoteMeta[] }) {
  const t = useTranslations('apps.notes')
  const searchQuery = useNotesStore(state => state.searchQuery)
  const setSearchQuery = useNotesStore(state => state.setSearchQuery)
  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase()
    if (!query)
      return notesList

    return notesList.filter(note => [note.title, note.intro, note.category, ...note.tags]
      .some(value => value.toLocaleLowerCase().includes(query)))
  }, [notesList, searchQuery])

  return (
    <ShellWindow
      id="notes"
      title={t('title')}
      badge={t('notesCount', { count: filteredNotes.length })}
      defaultWidth="min(720px, 94vw)"
      defaultHeight="min(600px, 80vh)"
      defaultLeft={170}
      defaultTop={62}
      icon={<NotePencilIcon size={14} weight="regular" className="text-ph-orange" />}
      headerCenter={<span className="hidden text-xs text-ph-muted sm:inline">{t('subtitle')}</span>}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-ph-surface p-4 sm:p-6">
        <InputGroup className="shrink-0">
          <InputGroupAddon>
            <MagnifyingGlassIcon weight="bold" />
          </InputGroupAddon>
          <InputGroupInput
            aria-label={t('searchPlaceholder')}
            className="font-mono"
            onChange={event => setSearchQuery(event.target.value)}
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
          />
          {searchQuery && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label={t('clearSearch')}
                onClick={() => setSearchQuery('')}
                size="icon-xs"
              >
                <XIcon weight="bold" />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>

        <div className="grid content-start gap-3 sm:grid-cols-2">
          {filteredNotes.length > 0
              ? filteredNotes.map(note => (
                <article key={note.slug} className="rounded-lg bg-white/55 p-4 shadow-xs dark:bg-white/[0.035]">
                  <header className="mb-2 flex items-center justify-between gap-3 text-[11px] font-mono">
                    <span className="rounded-full bg-ph-orange/10 px-2 py-0.5 font-medium text-ph-orange">{note.category}</span>
                    <time className="shrink-0 text-ph-muted">{note.date}</time>
                  </header>
                  <h2 className="text-sm font-semibold text-ph-ink">{note.title}</h2>
                  <div className="mt-2 text-xs leading-relaxed text-ph-muted [&_p]:m-0">{note.content}</div>
                  <footer className="mt-3 flex flex-wrap gap-1.5">
                    {note.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] text-ph-muted dark:bg-white/[0.06]">
                        {tag}
                      </span>
                    ))}
                  </footer>
                </article>
              ))
            : (
                <div className="col-span-full flex flex-col items-center justify-center p-12 text-center text-xs text-ph-muted">
                  <NotePencilIcon className="mb-2 opacity-30" size={32} />
                  <p>{t('empty')}</p>
                </div>
              )}
        </div>
      </div>
    </ShellWindow>
  )
}
