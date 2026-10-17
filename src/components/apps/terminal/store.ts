import { create } from 'zustand'

export type TerminalListCategory = 'blog' | 'notes' | 'projects' | 'gallery'
export type TerminalListItemKind = 'blog' | 'note' | 'project' | 'album'

export interface TerminalListItem {
  id: string
  kind: TerminalListItemKind
  title: string
  summary: string
  detail?: string
  slug?: string
  albumId?: string
}

export interface TerminalEnvironment {
  browser: string | null
  operatingSystem: string | null
  language: string
}

export type TerminalOutput
  = | { type: 'message', text: string, tone?: 'muted' | 'success' | 'error' }
    | { type: 'help' }
    | { type: 'apps' }
    | { type: 'system', environment: TerminalEnvironment, version: string, stack: readonly string[] }
    | { type: 'list', category: TerminalListCategory, items: TerminalListItem[] }
    | { type: 'filesystem', lines: string[] }

export interface TerminalEntry {
  id: string
  command: string
  output: TerminalOutput
  directory: string
}

interface TerminalState {
  inputVal: string
  entries: TerminalEntry[]
  history: string[]
  currentDirectory: string
  setInputVal: (inputVal: string) => void
  addEntry: (entry: TerminalEntry) => void
  addHistory: (command: string) => void
  setCurrentDirectory: (path: string) => void
  clearEntries: () => void
}

export const useTerminalStore = create<TerminalState>(set => ({
  inputVal: '',
  entries: [],
  history: [],
  currentDirectory: '/Documents',
  setInputVal: inputVal => set({ inputVal }),
  addEntry: entry => set(state => ({ entries: [...state.entries, entry] })),
  addHistory: command => set(state => ({ history: [...state.history, command] })),
  setCurrentDirectory: currentDirectory => set({ currentDirectory }),
  clearEntries: () => set({ entries: [] }),
}))
