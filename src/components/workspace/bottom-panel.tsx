'use client'

import type { TerminalLine } from '@/lib/terminal'
import { TerminalIcon, XIcon } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  executeCommand,
  getBootLines,

} from '@/lib/terminal'
import { useWorkspaceStore } from '@/store/workspace'

export function BottomPanel() {
  const { bottomPanelOpen, openTab, setThemePreset, setBottomPanelOpen } = useWorkspaceStore()
  const { setTheme } = useTheme()

  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [booted, setBooted] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Boot sequence
  useEffect(() => {
    if (!bottomPanelOpen || booted)
      return
    const bootLines = getBootLines()
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const idx = i
        setLines(prev => [...prev, bootLines[idx]])
        i++
      }
      else {
        clearInterval(interval)
        setBooted(true)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [bottomPanelOpen, booted])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  // Focus input on click
  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  // Command context
  const addLines = useCallback((newLines: TerminalLine[]) => {
    setLines(prev => [...prev, ...newLines])
  }, [])

  const clearLines = useCallback(() => {
    setLines([])
  }, [])

  // Submit command
  const handleSubmit = useCallback(() => {
    if (!input.trim())
      return

    // Push to history
    setCommandHistory(prev => [input, ...prev].slice(0, 50))
    setHistoryIndex(-1)

    executeCommand(input, {
      openTab,
      setThemePreset,
      setTheme,
      addLines,
      clearLines,
    })

    setInput('')
  }, [input, openTab, setThemePreset, setTheme, addLines, clearLines])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
      else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
    else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      clearLines()
    }
  }, [handleSubmit, commandHistory, historyIndex, clearLines])

  // Render a single terminal line
  const renderLine = (line: TerminalLine) => {
    switch (line.type) {
      case 'ascii':
        return (
          <pre className="text-os-accent text-[7px] leading-none sm:text-[9px] md:text-[10px] select-none">
            {line.content}
          </pre>
        )
      case 'input':
        return (
          <div className="flex gap-2">
            <span className="shrink-0 text-os-accent">❯</span>
            <span className="text-os-terminal-fg">{line.content}</span>
          </div>
        )
      case 'output':
        return <div className="text-os-terminal-fg whitespace-pre">{line.content}</div>
      case 'error':
        return (
          <div className="text-red-400 whitespace-pre">
            ✗
            {line.content}
          </div>
        )
      case 'system':
        return <div className="text-os-terminal-fg/60 whitespace-pre">{line.content || '\u00A0'}</div>
      default:
        return <div className="text-os-terminal-fg">{line.content}</div>
    }
  }

  return (
    <div
      id="bottom-panel"
      className="flex h-full w-full shrink-0 flex-col overflow-hidden border-t border-os-border"
    >
      {/* Panel header */}
      <div className="flex h-7 shrink-0 items-center justify-between border-b border-os-border bg-os-toolbar px-3">
        <div className="flex items-center gap-2">
          <TerminalIcon size={12} className="text-os-terminal-fg" />
          <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground">
            TERMINAL
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground">
          <div className="size-1.5 rounded-full bg-os-indicator animate-pulse" />
          folio-sh
          <button
            onClick={() => setBottomPanelOpen(false)}
            className="ml-1 flex size-5 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-os-accent-muted hover:text-foreground"
            title="Close Terminal"
          >
            <XIcon size={11} weight="bold" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={scrollRef}
        onClick={handleContainerClick}
        className="os-scrollbar flex-1 cursor-text overflow-y-auto bg-os-terminal-bg p-3 font-mono text-[11px] leading-relaxed"
      >
        {/* Rendered lines */}
        {lines.map(line => (
          <div key={line.id}>
            {renderLine(line)}
          </div>
        ))}

        {/* Active input line */}
        {booted && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="shrink-0 text-os-accent">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-os-terminal-fg outline-none caret-os-accent placeholder:text-os-terminal-fg/20"
              placeholder={lines.length <= 7 ? 'type a command...' : ''}
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  )
}
