'use client'

import type { TerminalLine } from '@/stores/apps/terminal-store'
import { TerminalWindowIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { ShellWindow } from '@/components/shell/window'
import { captureTelemetryEvent } from '@/lib/telemetry'
import { useTerminalStore } from '@/stores/apps/terminal-store'

export function TerminalApp() {
  const t = useTranslations('apps.terminal')
  const inputVal = useTerminalStore(state => state.inputVal)
  const lines = useTerminalStore(state => state.lines)
  const setInputVal = useTerminalStore(state => state.setInputVal)
  const addLines = useTerminalStore(state => state.addLines)
  const clearLines = useTerminalStore(state => state.clearLines)

  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function runCmd(rawCmd: string) {
    const cmd = rawCmd.trim().toLowerCase()
    if (!cmd)
      return

    const newLines: TerminalLine[] = [
      {
        id: `${Date.now()}-cmd`,
        content: (
          <div className="flex items-center gap-1.5">
            <span className="text-ph-green font-semibold">alex@MacBook-Pro ~ %</span>
            <span className="text-white">{rawCmd}</span>
          </div>
        ),
      },
    ]

    if (cmd === 'help') {
      newLines.push({
        id: `${Date.now()}-out`,
        content: (
          <div className="p-2.5 bg-white/5 rounded-[6px] border border-white/10 text-gray-300 space-y-1 my-1">
            <div><span className="text-ph-yellow font-semibold">neofetch</span> — 查看 macOS 磨砂系统架构配置</div>
            <div><span className="text-ph-yellow font-semibold">skills</span>   — 打印全栈技术栈熟练度</div>
            <div><span className="text-ph-yellow font-semibold">clear</span>    — 清空终端屏幕</div>
          </div>
        ),
      })
    }
    else if (cmd === 'neofetch') {
      newLines.push({
        id: `${Date.now()}-out`,
        content: (
          <pre className="text-ph-orange leading-tight my-1 font-mono text-xs">
            {`       /\\      alex@macOS-Frosted-Edition
      /  \\     --------------------------
     / /\\ \\    Surface: Matte Frosted Acrylic (Blur 22px)
    / /__\\ \\   Icons: 100% Bespoke Vector SVGs
   /________\\  Palette: Warm Stone (#EAE6DA)
               Font: SF Pro / Plus Jakarta Sans`}
          </pre>
        ),
      })
    }
    else if (cmd === 'skills') {
      newLines.push({
        id: `${Date.now()}-out`,
        content: (
          <div className="space-y-1 text-gray-300 my-1 font-mono text-xs">
            <div>TypeScript / React  [<span className="text-ph-green">██████████████████░░</span>] 95%</div>
            <div>Rust / Go Backend   [<span className="text-ph-yellow">████████████████░░░░</span>] 85%</div>
            <div>Design Systems & UI [<span className="text-ph-orange">███████████████████░</span>] 94%</div>
          </div>
        ),
      })
    }
    else if (cmd === 'clear') {
      clearLines()
      captureTelemetryEvent('terminal_command', { cmd })
      return
    }
    else {
      newLines.push({
        id: `${Date.now()}-out`,
        content: <div className="text-red-400">zsh: command not found: {rawCmd}</div>,
      })
    }

    addLines(newLines)
    captureTelemetryEvent('terminal_command', { cmd })

    setTimeout(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!inputVal)
      return
    const cmd = inputVal
    setInputVal('')
    runCmd(cmd)
  }

  return (
    <ShellWindow
      id="terminal"
      title={t('title')}
      icon={<TerminalWindowIcon size={14} weight="regular" className="text-ph-muted" />}
      defaultWidth="min(640px, 92vw)"
      defaultHeight="min(420px, 70vh)"
      defaultLeft={220}
      defaultTop={88}
      headerCenter={(
        <div className="font-mono text-xs text-ph-ink flex items-center gap-1.5">
          <span>alex — -zsh — 80×24</span>
        </div>
      )}
    >
      <div className="flex-1 flex flex-col bg-[#12141A] text-gray-200 font-mono text-xs overflow-hidden select-text">
        {/* Quick Commands Toolbar */}
        <div className="bg-[#161820] border-b border-white/5 px-3.5 py-1.5 flex items-center gap-1.5 flex-wrap shrink-0">
          <span className="text-gray-500 text-[11px]">{t('quickCmds')}</span>
          <button
            type="button"
            onClick={() => runCmd('help')}
            className="px-2 py-0.5 rounded-[4px] bg-white/5 text-gray-300 hover:bg-ph-orange hover:text-white transition-colors cursor-pointer"
          >
            help
          </button>
          <button
            type="button"
            onClick={() => runCmd('neofetch')}
            className="px-2 py-0.5 rounded-[4px] bg-white/5 text-ph-green hover:bg-ph-orange hover:text-white transition-colors cursor-pointer"
          >
            neofetch
          </button>
          <button
            type="button"
            onClick={() => runCmd('skills')}
            className="px-2 py-0.5 rounded-[4px] bg-white/5 text-gray-300 hover:bg-ph-orange hover:text-white transition-colors cursor-pointer"
          >
            skills
          </button>
          <button
            type="button"
            onClick={() => runCmd('clear')}
            className="px-2 py-0.5 rounded-[4px] bg-white/5 text-gray-400 hover:bg-white/15 transition-colors cursor-pointer"
          >
            clear
          </button>
        </div>

        {/* Console Log Area */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto space-y-2 cursor-text"
        >
          <div className="text-gray-500">{t('lastLogin')}</div>
          <div className="text-gray-400">
            {t('hint')}
          </div>
          {lines.map(line => (
            <div key={line.id}>{line.content}</div>
          ))}

          {/* Prompt Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
            <span className="text-ph-green font-semibold shrink-0">alex@MacBook-Pro ~ %</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              autoComplete="off"
              spellCheck="false"
              placeholder={t('inputPlaceholder')}
              className="w-full bg-transparent text-white focus:outline-none font-mono text-xs"
            />
          </form>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </ShellWindow>
  )
}
