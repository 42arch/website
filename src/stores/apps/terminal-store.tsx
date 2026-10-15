import type { ReactNode } from 'react'
import { create } from 'zustand'

export interface TerminalLine {
  id: string
  content: ReactNode
}

export const initialTerminalLines: TerminalLine[] = []

interface TerminalState {
  inputVal: string
  lines: TerminalLine[]
  setInputVal: (inputVal: string) => void
  setLines: (lines: TerminalLine[] | ((prev: TerminalLine[]) => TerminalLine[])) => void
  addLines: (newLines: TerminalLine[]) => void
  clearLines: () => void
}

export const useTerminalStore = create<TerminalState>(set => ({
  inputVal: '',
  lines: initialTerminalLines,
  setInputVal: inputVal => set({ inputVal }),
  setLines: next => set(state => ({
    lines: typeof next === 'function' ? next(state.lines) : next,
  })),
  addLines: newLines => set(state => ({
    lines: [...state.lines, ...newLines],
  })),
  clearLines: () => set({ lines: [] }),
}))
