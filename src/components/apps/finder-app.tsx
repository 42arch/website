'use client'

import type { KeyboardEvent } from 'react'
import type { VirtualFile } from '@/lib/virtual-file-types'
import type { FinderSortKey } from '@/stores/apps/finder-store'
import {
  ArrowLeftIcon,
  CaretRightIcon,
  FileCodeIcon,
  FileTextIcon,
  FolderOpenIcon,
  FolderSimpleIcon,
  ImagesIcon,
  MagnifyingGlassIcon,
  NotePencilIcon,
  RowsIcon,
  SortAscendingIcon,
  SquaresFourIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ShellWindow } from '@/components/shell/window'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { openVirtualFile } from '@/lib/virtual-file-actions'
import { getVirtualDirectoryChildren, listVirtualDirectory } from '@/lib/virtual-file-utils'
import { useFinderStore } from '@/stores/apps/finder-store'
import { useShellStore } from '@/stores/shell-store'

interface FinderAppProps {
  files: VirtualFile[]
}

const sortKeys: FinderSortKey[] = ['name', 'kind', 'modifiedAt', 'size']

function displayName(file: VirtualFile) {
  return file.title ?? file.name
}

function compareFiles(left: VirtualFile, right: VirtualFile, sortKey: FinderSortKey, direction: 'asc' | 'desc') {
  if (left.kind === 'directory' && right.kind !== 'directory')
    return -1
  if (right.kind === 'directory' && left.kind !== 'directory')
    return 1

  const leftValue = sortKey === 'name'
    ? displayName(left)
    : sortKey === 'kind'
      ? left.kind
      : sortKey === 'modifiedAt'
        ? left.modifiedAt ?? ''
        : left.size ?? -1
  const rightValue = sortKey === 'name'
    ? displayName(right)
    : sortKey === 'kind'
      ? right.kind
      : sortKey === 'modifiedAt'
        ? right.modifiedAt ?? ''
        : right.size ?? -1

  const leftMissing = sortKey !== 'name' && sortKey !== 'kind' && (leftValue === '' || leftValue === -1)
  const rightMissing = sortKey !== 'name' && sortKey !== 'kind' && (rightValue === '' || rightValue === -1)
  if (leftMissing || rightMissing)
    return leftMissing === rightMissing
      ? displayName(left).localeCompare(displayName(right), undefined, { numeric: true, sensitivity: 'base' }) * (direction === 'asc' ? 1 : -1)
      : leftMissing ? 1 : -1

  const result = typeof leftValue === 'number' && typeof rightValue === 'number'
    ? leftValue - rightValue
    : String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true, sensitivity: 'base' })

  if (result !== 0)
    return direction === 'asc' ? result : -result

  return displayName(left).localeCompare(displayName(right), undefined, { numeric: true, sensitivity: 'base' }) * (direction === 'asc' ? 1 : -1)
}

function EntryIcon({ file }: { file: VirtualFile }) {
  if (file.kind === 'directory')
    return <FolderSimpleIcon className="shrink-0 text-ph-orange" size={18} weight="fill" />
  if (file.kind === 'image')
    return <ImagesIcon className="shrink-0 text-ph-orange" size={18} />
  if (file.kind === 'note')
    return <NotePencilIcon className="shrink-0 text-ph-orange" size={18} />
  if (file.kind === 'project')
    return <FileCodeIcon className="shrink-0 text-ph-orange" size={18} />
  return <FileTextIcon className="shrink-0 text-ph-orange" size={18} />
}

export function FinderApp({ files }: FinderAppProps) {
  const router = useRouter()
  const t = useTranslations('apps.finder')
  const currentWindow = useShellStore(state => state.windows.finder)
  const currentPreferences = useFinderStore(state => state.preferences)
  const setView = useFinderStore(state => state.setView)
  const toggleSort = useFinderStore(state => state.toggleSort)
  const resetDirectoryPreferences = useFinderStore(state => state.resetDirectoryPreferences)
  const [currentPath, setCurrentPath] = useState('/Documents')
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState<string[]>(['/Documents'])
  const [historyIndex, setHistoryIndex] = useState(0)
  const preference = currentPreferences[currentPath] ?? { view: 'list' as const, sortKey: 'name' as const, sortDirection: 'asc' as const }
  const isGrid = preference.view === 'grid'

  useEffect(() => {
    resetDirectoryPreferences()
  }, [resetDirectoryPreferences])

  useEffect(() => {
    if (!currentWindow?.open) {
      setCurrentPath('/Documents')
      setSelectedPath(null)
      setQuery('')
      setHistory(['/Documents'])
      setHistoryIndex(0)
    }
  }, [currentWindow?.open])

  const visibleFiles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const source = normalizedQuery
      ? listVirtualDirectory(files, currentPath).filter(file => [file.name, file.title, file.summary, file.category, ...(file.tags ?? []), file.path]
          .some(value => value?.toLocaleLowerCase().includes(normalizedQuery)))
      : getVirtualDirectoryChildren(files, currentPath)

    return [...source].sort((left, right) => compareFiles(left, right, preference.sortKey, preference.sortDirection))
  }, [currentPath, files, preference.sortDirection, preference.sortKey, query])

  const breadcrumbs = useMemo(() => {
    const segments = currentPath.split('/').filter(Boolean)
    return segments.map((segment, index) => ({
      name: segment,
      path: `/${segments.slice(0, index + 1).join('/')}`,
    }))
  }, [currentPath])

  function navigate(path: string, recordHistory = true) {
    setCurrentPath(path)
    setSelectedPath(null)
    setQuery('')
    if (!recordHistory)
      return
    const nextHistory = [...history.slice(0, historyIndex + 1), path]
    setHistory(nextHistory)
    setHistoryIndex(nextHistory.length - 1)
  }

  function navigateBack() {
    if (historyIndex <= 0)
      return
    const nextIndex = historyIndex - 1
    setHistoryIndex(nextIndex)
    navigate(history[nextIndex], false)
  }

  function openEntry(file: VirtualFile) {
    if (file.kind === 'directory') {
      navigate(file.path)
      return
    }
    openVirtualFile(file, router)
  }

  function handleEntryKeyDown(event: KeyboardEvent<HTMLButtonElement>, file: VirtualFile) {
    if (event.key === 'Enter') {
      event.preventDefault()
      openEntry(file)
    }
  }

  const selectedFile = files.find(file => file.path === selectedPath)

  return (
    <ShellWindow
      id="finder"
      title={t('title')}
      icon={<FolderOpenIcon className="text-ph-orange" size={14} />}
      defaultWidth="min(1040px, 96vw)"
      defaultHeight="min(700px, 86vh)"
      defaultLeft={80}
      defaultTop={32}
      headerCenter={<span className="hidden font-mono text-xs text-ph-muted sm:inline">{selectedFile ? displayName(selectedFile) : t('title')}</span>}
    >
      <div className="flex min-h-0 flex-1 bg-ph-surface-body text-ph-ink">
        <aside aria-label={t('locations')} className="flex w-32 shrink-0 flex-col gap-1 border-r bg-ph-sidebar/70 p-2 sm:w-48 sm:p-3">
          <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ph-muted">{t('favorites')}</p>
          {(['Documents', 'Pictures'] as const).map((location) => {
            const active = currentPath === `/${location}` || currentPath.startsWith(`/${location}/`)
            const Icon = location === 'Documents' ? FolderSimpleIcon : ImagesIcon
            return (
              <button
                key={location}
                type="button"
                onClick={() => navigate(`/${location}`)}
                aria-current={active ? 'page' : undefined}
                className={`flex min-w-0 items-center gap-2 rounded-md px-2 py-2 text-left text-xs transition-colors ${active ? 'bg-ph-orange/10 font-medium text-ph-orange' : 'text-ph-muted hover:bg-black/[0.04] hover:text-ph-ink dark:hover:bg-white/[0.06]'}`}
              >
                <Icon className="shrink-0" size={17} />
                <span className="truncate">{t(location === 'Documents' ? 'documents' : 'pictures')}</span>
              </button>
            )
          })}
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 flex-wrap items-center gap-2 border-b bg-ph-surface px-3 py-2 sm:px-4">
            <Button aria-label={t('back')} disabled={historyIndex === 0} onClick={navigateBack} size="icon-sm" variant="ghost">
              <ArrowLeftIcon />
            </Button>
            <nav aria-label={t('path')} className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden text-xs">
              {breadcrumbs.map((crumb, index) => (
                <span className="flex min-w-0 items-center gap-1" key={crumb.path}>
                  {index > 0 && <CaretRightIcon className="shrink-0 text-ph-muted" size={12} />}
                  <button
                    type="button"
                    className={`truncate rounded px-1 py-1 hover:bg-ph-orange/10 ${index === breadcrumbs.length - 1 ? 'font-medium text-ph-ink' : 'text-ph-muted'}`}
                    onClick={() => navigate(crumb.path)}
                  >
                    {crumb.name === 'Documents'
                      ? t('documents')
                      : crumb.name === 'Pictures'
                        ? t('pictures')
                        : files.find(file => file.path === crumb.path)?.name ?? crumb.name}
                  </button>
                </span>
              ))}
            </nav>
            <ToggleGroup
              aria-label={t('view')}
              type="single"
              value={preference.view}
              onValueChange={value => value && setView(currentPath, value as 'list' | 'grid')}
              size="sm"
              variant="outline"
            >
              <ToggleGroupItem aria-label={t('listView')} value="list"><RowsIcon /></ToggleGroupItem>
              <ToggleGroupItem aria-label={t('gridView')} value="grid"><SquaresFourIcon /></ToggleGroupItem>
            </ToggleGroup>
            <InputGroup className="order-last basis-full sm:order-none sm:ml-2 sm:max-w-56 sm:basis-auto">
              <InputGroupAddon><MagnifyingGlassIcon /></InputGroupAddon>
              <InputGroupInput aria-label={t('search')} onChange={event => setQuery(event.target.value)} placeholder={t('search')} value={query} />
            </InputGroup>
          </div>

          {isGrid
            ? (
                <ScrollArea className="min-h-0 flex-1">
                  {visibleFiles.length > 0
                    ? (
                        <div className="grid content-start grid-cols-2 gap-2 p-3 sm:grid-cols-3 sm:gap-3 sm:p-5 md:grid-cols-4 lg:grid-cols-5">
                          {visibleFiles.map(file => (
                            <button
                              key={file.path}
                              type="button"
                              onClick={() => setSelectedPath(file.path)}
                              onDoubleClick={() => openEntry(file)}
                              onKeyDown={event => handleEntryKeyDown(event, file)}
                              aria-pressed={selectedPath === file.path}
                              className={`group flex min-w-0 flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ph-orange ${selectedPath === file.path ? 'bg-ph-orange/10 ring-1 ring-ph-orange/25' : 'hover:bg-black/[0.035] dark:hover:bg-white/[0.05]'}`}
                            >
                              {file.kind === 'image' && file.src
                                ? <img alt="" className="aspect-square w-full rounded-md object-cover" loading="lazy" src={file.src} />
                                : <span className="flex aspect-square w-full items-center justify-center rounded-md bg-ph-sidebar"><EntryIcon file={file} /></span>}
                              <span className="w-full truncate text-xs">{displayName(file)}</span>
                            </button>
                          ))}
                        </div>
                      )
                    : <div className="p-10 text-center text-sm text-ph-muted">{t('empty')}</div>}
                </ScrollArea>
              )
            : (
                <ScrollArea className="min-h-0 flex-1">
                  <div className="min-w-[560px]">
                    <div className="sticky top-0 z-10 grid grid-cols-[minmax(220px,1fr)_100px_130px_82px] items-center border-b bg-ph-surface/95 px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-ph-muted backdrop-blur sm:grid-cols-[minmax(260px,1fr)_130px_160px_100px] sm:px-4">
                      {sortKeys.map(sortKey => (
                        <button
                          key={sortKey}
                          type="button"
                          onClick={() => toggleSort(currentPath, sortKey)}
                          className={`flex min-w-0 items-center gap-1 text-left hover:text-ph-ink ${preference.sortKey === sortKey ? 'text-ph-ink' : ''}`}
                        >
                          <span className="truncate">{t(sortKey === 'kind' ? 'kindLabel' : sortKey)}</span>
                          {preference.sortKey === sortKey && <SortAscendingIcon className={preference.sortDirection === 'desc' ? 'rotate-180' : ''} size={12} />}
                        </button>
                      ))}
                    </div>
                    {visibleFiles.length > 0
                      ? visibleFiles.map(file => (
                          <button
                            key={file.path}
                            type="button"
                            onClick={() => setSelectedPath(file.path)}
                            onDoubleClick={() => openEntry(file)}
                            onKeyDown={event => handleEntryKeyDown(event, file)}
                            aria-pressed={selectedPath === file.path}
                            className={`grid w-full grid-cols-[minmax(220px,1fr)_100px_130px_82px] items-center border-b border-ph-ink/5 px-3 py-2.5 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ph-orange sm:grid-cols-[minmax(260px,1fr)_130px_160px_100px] sm:px-4 ${selectedPath === file.path ? 'bg-ph-orange/10' : 'hover:bg-black/[0.025] dark:hover:bg-white/[0.04]'}`}
                          >
                            <span className="flex min-w-0 items-center gap-2.5 pr-3">
                              <EntryIcon file={file} />
                              <span className="truncate">{displayName(file)}</span>
                            </span>
                            <span className="truncate pr-3 text-ph-muted">{t(`kind.${file.kind}`)}</span>
                            <span className="truncate pr-3 text-ph-muted">{file.modifiedAt ?? '—'}</span>
                            <span className="text-right tabular-nums text-ph-muted">{file.size === null ? '—' : t('byteSize', { size: file.size })}</span>
                          </button>
                        ))
                      : <div className="p-10 text-center text-sm text-ph-muted">{t('empty')}</div>}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}

          <footer className="flex shrink-0 items-center justify-between gap-3 border-t bg-ph-surface px-3 py-2 text-[10px] text-ph-muted sm:px-4">
            <span>{t('itemCount', { count: visibleFiles.length })}</span>
            <span className="max-w-[60%] truncate">{query ? t('searchScope') : currentPath}</span>
          </footer>
        </section>
      </div>
    </ShellWindow>
  )
}
