'use client'

import type { FormEvent, KeyboardEvent } from 'react'
import type { TerminalEntry, TerminalEnvironment, TerminalListCategory, TerminalListItem, TerminalOutput } from '@/components/apps/terminal/store'
import type { AppId } from '@/lib/shell-routes'
import type { VirtualFile } from '@/lib/virtual-file-types'
import { TerminalWindowIcon } from '@phosphor-icons/react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useBlogStore } from '@/components/apps/blog/store'
import { useGalleryStore } from '@/components/apps/gallery/store'
import { useNotesStore } from '@/components/apps/notes/store'
import { useProjectsStore } from '@/components/apps/projects/store'
import { useTerminalStore } from '@/components/apps/terminal/store'
import { fileName, listEntries, sortedChildren, tokenizeCommand, treeOutput } from '@/components/apps/terminal/utils'
import { ShellWindow } from '@/components/shell/window'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { appVersion, technologyStack } from '@/lib/app-info'
import { detectClientEnvironment } from '@/lib/client-environment'
import { launchpadAppIds } from '@/lib/shell-routes'
import { captureTelemetryEvent } from '@/lib/telemetry'
import { openVirtualFile } from '@/lib/virtual-file-actions'
import { findVirtualFile, normalizeVirtualPath } from '@/lib/virtual-file-utils'
import { useShellStore } from '@/stores/shell-store'

export function TerminalApp({ files }: { files: VirtualFile[] }) {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('apps.terminal')
  const tDock = useTranslations('dock')
  const tGallery = useTranslations('apps.gallery')
  const inputVal = useTerminalStore(state => state.inputVal)
  const entries = useTerminalStore(state => state.entries)
  const history = useTerminalStore(state => state.history)
  const currentDirectory = useTerminalStore(state => state.currentDirectory)
  const setInputVal = useTerminalStore(state => state.setInputVal)
  const addEntry = useTerminalStore(state => state.addEntry)
  const addHistory = useTerminalStore(state => state.addHistory)
  const setCurrentDirectory = useTerminalStore(state => state.setCurrentDirectory)
  const clearEntries = useTerminalStore(state => state.clearEntries)
  const activeWindowId = useShellStore(state => state.activeWindowId)
  const isOpen = useShellStore(state => state.windows.terminal.open && !state.windows.terminal.minimized)
  const openWindow = useShellStore(state => state.openWindow)
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const historyDraftRef = useRef('')
  const nextEntryIdRef = useRef(0)
  const [historyCursor, setHistoryCursor] = useState(-1)
  const [environment, setEnvironment] = useState<TerminalEnvironment | null>(null)

  useEffect(() => {
    setEnvironment(detectClientEnvironment())
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [entries])

  useEffect(() => {
    if (activeWindowId === 'terminal' && isOpen)
      inputRef.current?.focus()
  }, [activeWindowId, isOpen])

  function getCurrentEnvironment() {
    return environment ?? detectClientEnvironment()
  }

  function resetAppState(appId: AppId) {
    if (appId === 'blog') {
      useBlogStore.getState().setSearchQuery('')
      useBlogStore.getState().setSelectedCategory('all')
    }
    else if (appId === 'notes') {
      useNotesStore.getState().setSearchQuery('')
    }
    else if (appId === 'projects') {
      useProjectsStore.getState().setFilter('all')
      useProjectsStore.getState().setSelectedProjectTitle(null)
    }
    else if (appId === 'gallery') {
      useGalleryStore.getState().setActiveAlbumId(null)
      useGalleryStore.getState().setActiveImageIndex(null)
    }
  }

  function openApp(appId: AppId) {
    resetAppState(appId)
    openWindow(appId)
  }

  function openListItem(category: TerminalListCategory, result: TerminalListItem) {
    if (category === 'blog' && result.slug) {
      useBlogStore.getState().setSearchQuery('')
      useBlogStore.getState().setSelectedCategory('all')
      useBlogStore.getState().setSelectedSlug(result.slug)
      openWindow('blog')
      router.push(`/blog/${result.slug}`)
      return
    }

    if (category === 'notes') {
      useNotesStore.getState().setSearchQuery(result.title)
      openWindow('notes')
      return
    }

    if (category === 'projects') {
      useProjectsStore.getState().setFilter('all')
      useProjectsStore.getState().setSelectedProjectTitle(result.title)
      openWindow('projects')
      return
    }

    useGalleryStore.getState().setActiveAlbumId(result.albumId ?? null)
    useGalleryStore.getState().setActiveImageIndex(null)
    openWindow('gallery')
  }

  function appendEntry(command: string, output: TerminalOutput, directory = currentDirectory) {
    addEntry({
      id: `terminal-${Date.now()}-${nextEntryIdRef.current++}`,
      command,
      output,
      directory,
    })
  }

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim()
    if (!command)
      return

    addHistory(command)
    historyDraftRef.current = ''
    setHistoryCursor(-1)

    const [rawVerb, ...args] = tokenizeCommand(command)
    const verb = rawVerb.toLocaleLowerCase()
    let commandType = verb
    let success = true
    let output: TerminalOutput
    let appToOpen: AppId | null = null
    let fileToOpen: VirtualFile | null = null

    if (verb === 'help' && args.length === 0) {
      output = { type: 'help' }
    }
    else if (verb === 'apps' && args.length === 0) {
      output = { type: 'apps' }
    }
    else if (verb === 'system' && args.length === 0) {
      output = {
        type: 'system',
        environment: getCurrentEnvironment(),
        version: appVersion,
        stack: technologyStack,
      }
    }
    else if (verb === 'clear' && args.length === 0) {
      clearEntries()
      captureTelemetryEvent('terminal_command', { command_type: 'clear', status: 'success' })
      return
    }
    else if (verb === 'open') {
      commandType = 'open'
      const target = args[0]
      const matchedApp = target === 'finder' ? 'finder' : launchpadAppIds.find(appId => appId === target)
      if (args.length !== 1) {
        success = false
        output = { type: 'message', text: t('usage', { command: 'open <appId|path>' }), tone: 'error' }
      }
      else {
        const targetPath = normalizeVirtualPath(target, currentDirectory)
        const targetFile = targetPath === '/' ? null : findVirtualFile(files, targetPath)
        if (targetPath === '/' || targetFile?.kind === 'directory') {
          output = { type: 'filesystem', lines: sortedChildren(files, targetPath).map(file => `${file.name}${file.kind === 'directory' ? '/' : ''}`) }
        }
        else if (targetFile) {
          fileToOpen = targetFile
          output = { type: 'message', text: t('fileOpened', { name: fileName(targetFile) }), tone: 'success' }
        }
        else if (matchedApp) {
          appToOpen = matchedApp
          output = { type: 'message', text: t('appOpened', { app: tDock(matchedApp) }), tone: 'success' }
        }
        else {
          success = false
          output = { type: 'message', text: t('fileNotFound', { path: target }), tone: 'error' }
        }
      }
    }
    else if (verb === 'pwd') {
      commandType = 'pwd'
      if (args.length !== 0) {
        success = false
        output = { type: 'message', text: t('usage', { command: 'pwd' }), tone: 'error' }
      }
      else {
        output = { type: 'filesystem', lines: [currentDirectory] }
      }
    }
    else if (verb === 'cd') {
      commandType = 'cd'
      if (args.length > 1) {
        success = false
        output = { type: 'message', text: t('usage', { command: 'cd [path]' }), tone: 'error' }
      }
      else {
        const targetPath = normalizeVirtualPath(args[0] ?? '/Documents', currentDirectory)
        const targetFile = targetPath === '/' ? null : findVirtualFile(files, targetPath)
        if (targetPath !== '/' && targetFile?.kind !== 'directory') {
          success = false
          output = { type: 'message', text: targetFile ? t('notDirectory', { path: args[0] ?? targetPath }) : t('fileNotFound', { path: args[0] ?? targetPath }), tone: 'error' }
        }
        else {
          setCurrentDirectory(targetPath)
          output = { type: 'filesystem', lines: [targetPath] }
        }
      }
    }
    else if (verb === 'ls' || verb === 'tree') {
      commandType = verb
      if (args.length > 1) {
        success = false
        output = { type: 'message', text: t('usage', { command: `${verb} [path]` }), tone: 'error' }
      }
      else {
        const targetPath = normalizeVirtualPath(args[0] ?? currentDirectory, currentDirectory)
        const targetFile = targetPath === '/' ? null : findVirtualFile(files, targetPath)
        if (targetPath !== '/' && targetFile?.kind !== 'directory') {
          success = false
          output = { type: 'message', text: targetFile ? t('notDirectory', { path: args[0] ?? targetPath }) : t('fileNotFound', { path: args[0] ?? targetPath }), tone: 'error' }
        }
        else if (verb === 'ls') {
          output = { type: 'filesystem', lines: sortedChildren(files, targetPath).map(file => `${file.name}${file.kind === 'directory' ? '/' : ''}`) }
        }
        else {
          output = { type: 'filesystem', lines: treeOutput(files, targetPath) }
        }
      }
    }
    else if (verb === 'cat') {
      commandType = 'cat'
      if (args.length !== 1) {
        success = false
        output = { type: 'message', text: t('usage', { command: 'cat <file>' }), tone: 'error' }
      }
      else {
        const targetPath = normalizeVirtualPath(args[0], currentDirectory)
        const targetFile = findVirtualFile(files, targetPath)
        if (!targetFile) {
          success = false
          output = { type: 'message', text: t('fileNotFound', { path: args[0] }), tone: 'error' }
        }
        else if (targetFile.kind === 'directory') {
          success = false
          output = { type: 'message', text: t('cannotReadDirectory', { path: args[0] }), tone: 'error' }
        }
        else if (targetFile.content === undefined) {
          success = false
          output = { type: 'message', text: t('notTextFile', { path: args[0] }), tone: 'error' }
        }
        else {
          output = { type: 'filesystem', lines: targetFile.content.replace(/\n$/, '').split('\n') }
        }
      }
    }
    else if (['blog', 'notes', 'projects', 'gallery'].includes(verb) && args[0]?.toLocaleLowerCase() === 'list') {
      commandType = `${verb}_list`
      const category = verb as TerminalListCategory
      if (args.length !== 1) {
        success = false
        output = { type: 'message', text: t('usage', { command: `${verb} list` }), tone: 'error' }
      }
      else {
        output = { type: 'list', category, items: listEntries(category, files, count => tGallery('imageCount', { count })) }
        success = true
      }
    }
    else {
      success = false
      commandType = 'unknown'
      output = { type: 'message', text: t('unknownCommand', { command }), tone: 'error' }
    }

    appendEntry(command, output)
    captureTelemetryEvent('terminal_command', {
      command_type: commandType,
      status: success ? 'success' : 'failure',
    })

    if (fileToOpen)
      openVirtualFile(fileToOpen, router)
    else if (appToOpen)
      openApp(appToOpen)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    runCommand(inputVal)
    setInputVal('')
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp' && history.length > 0) {
      event.preventDefault()
      if (historyCursor === -1) {
        historyDraftRef.current = inputVal
        const nextCursor = history.length - 1
        setHistoryCursor(nextCursor)
        setInputVal(history[nextCursor])
        return
      }

      const nextCursor = Math.max(0, historyCursor - 1)
      setHistoryCursor(nextCursor)
      setInputVal(history[nextCursor])
    }
    else if (event.key === 'ArrowDown' && historyCursor !== -1) {
      event.preventDefault()
      const nextCursor = historyCursor + 1
      if (nextCursor >= history.length) {
        setHistoryCursor(-1)
        setInputVal(historyDraftRef.current)
      }
      else {
        setHistoryCursor(nextCursor)
        setInputVal(history[nextCursor])
      }
    }
  }

  function handleOutputAction(category: TerminalListCategory, item: TerminalListItem) {
    openListItem(category, item)
  }

  function renderOutput(entry: TerminalEntry) {
    const { output } = entry

    if (output.type === 'message') {
      return <p className={output.tone === 'error' ? 'text-destructive' : output.tone === 'success' ? 'text-primary' : 'text-muted-foreground'}>{output.text}</p>
    }

    if (output.type === 'filesystem') {
      return <pre className="max-w-full whitespace-pre-wrap break-words font-mono text-inherit">{output.lines.join('\n')}</pre>
    }

    if (output.type === 'help') {
      const commands = [
        ['help', t('helpCommand')],
        ['apps', t('appsCommand')],
        ['system', t('systemCommand')],
        ['open <appId|path>', t('openCommand')],
        ['pwd', t('pwdCommand')],
        ['ls [path]', t('lsCommand')],
        ['tree [path]', t('treeCommand')],
        ['cd [path]', t('cdCommand')],
        ['cat <file>', t('catCommand')],
        ['blog list', t('blogListCommand')],
        ['notes list', t('notesListCommand')],
        ['projects list', t('projectsListCommand')],
        ['gallery list', t('galleryListCommand')],
        ['clear', t('clearCommand')],
      ]

      return (
        <div className="max-w-3xl space-y-2">
          <p className="text-primary">{t('helpTitle')}</p>
          <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {commands.map(([name, description]) => (
              <div key={name} className="grid min-w-0 grid-cols-[minmax(12rem,auto)_1fr] gap-3">
                <code className="text-primary">{name}</code>
                <span className="text-muted-foreground">{description}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (output.type === 'apps') {
      return (
        <div className="max-w-3xl space-y-2">
          <p className="text-primary">{t('appsTitle')}</p>
          <p className="text-muted-foreground">{t('appsDescription')}</p>
          <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {launchpadAppIds.map(appId => (
              <button
                key={appId}
                className="flex min-w-0 items-center gap-3 rounded-sm py-0.5 text-left hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onClick={() => runCommand(`open ${appId}`)}
                type="button"
              >
                <span className="w-24 shrink-0 text-primary">{appId}</span>
                <span className="truncate text-muted-foreground">{tDock(appId)}</span>
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (output.type === 'system') {
      const rows = [
        [t('operatingSystem'), output.environment.operatingSystem ?? t('unknown')],
        [t('browser'), output.environment.browser ?? t('unknown')],
        [t('language'), output.environment.language || locale],
        [t('version'), `Starllow OS v${output.version}`],
      ]

      return (
        <div className="max-w-3xl space-y-2">
          <p className="text-primary">{t('systemTitle')}</p>
          <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {rows.map(([label, value]) => (
              <div key={label} className="flex min-w-0 justify-between gap-4">
                <span className="text-primary">{label}</span>
                <span className="truncate text-muted-foreground">{value}</span>
              </div>
            ))}
            <div className="flex flex-wrap gap-x-2 sm:col-span-2">
              <span className="text-primary">{t('stack')}</span>
              <span className="text-muted-foreground">{output.stack.join(' · ')}</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-3xl space-y-2">
        <p className="text-muted-foreground">
          {output.items.length > 0
            ? t('listFound', { count: output.items.length, category: tDock(output.category) })
            : t('listEmpty', { category: tDock(output.category) })}
        </p>
        {output.items.length > 0 && (
          <div className="space-y-1">
            {output.items.map((item, index) => (
              <button
                key={item.id}
                className="group w-full min-w-0 py-1 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onClick={() => handleOutputAction(output.category, item)}
                type="button"
              >
                <span className="flex min-w-0 items-baseline gap-2">
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                    .
                  </span>
                  <span className="truncate text-primary group-hover:underline">{item.title}</span>
                  {item.detail && <span className="hidden truncate text-muted-foreground sm:inline">{item.detail}</span>}
                </span>
                <span className="block pl-8 leading-4 text-muted-foreground">{item.summary}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <ShellWindow
      id="terminal"
      title={t('title')}
      icon={<TerminalWindowIcon size={14} weight="regular" className="text-ph-muted" />}
      defaultWidth="min(760px, 94vw)"
      defaultHeight="min(590px, 82vh)"
      defaultLeft={150}
      defaultTop={46}
      headerCenter={(
        <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
          starllow:
          {currentDirectory}
        </span>
      )}
    >
      <div className="dark scheme-dark flex min-h-0 flex-1 flex-col bg-background font-mono text-xs text-foreground">
        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-3 p-3 text-xs leading-5 sm:p-4">
            <div className="max-w-3xl space-y-0.5 border-b border-border/60 pb-3">
              <p className="text-primary">{t('welcomeTitle')}</p>
              <p className="pt-0.5 text-muted-foreground">
                {t('examplesTitle')}
                :
                {' '}
                <span className="text-foreground">help</span>
                ,
                <span className="text-foreground">pwd</span>
                ,
                <span className="text-foreground">ls</span>
                ,
                <span className="text-foreground">tree</span>
                ,
                <span className="text-foreground">cd</span>
                ,
                <span className="text-foreground">cat</span>
                ,
                <span className="text-foreground">open</span>
              </p>
            </div>

            {entries.map((entry) => {
              const output = renderOutput(entry)
              return (
                <div key={entry.id} className="space-y-1.5">
                  <div className="flex min-w-0 items-start gap-2">
                    <span className="shrink-0 text-primary">
                      starllow:
                      {entry.directory}
                      {' '}
                      %
                    </span>
                    <span className="break-all text-foreground">{entry.command}</span>
                  </div>
                  <div className="pl-0 sm:pl-5">{output}</div>
                </div>
              )
            })}
            <form className="flex min-w-0 items-center gap-2" onSubmit={handleSubmit}>
              <span className="shrink-0 text-primary">
                starllow:
                {currentDirectory}
                {' '}
                %
              </span>
              <Input
                ref={inputRef}
                aria-label={t('inputLabel')}
                autoComplete="off"
                className="h-6 min-w-0 flex-1 rounded-none border-0 bg-transparent px-0 py-0 text-xs shadow-none outline-none placeholder:text-muted-foreground/60 focus-visible:border-0 focus-visible:ring-0"
                onChange={(event) => {
                  setInputVal(event.target.value)
                  setHistoryCursor(-1)
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={t('inputPlaceholder')}
                spellCheck={false}
                value={inputVal}
              />
            </form>
            <div ref={endRef} />
          </div>
        </ScrollArea>
      </div>
    </ShellWindow>
  )
}
