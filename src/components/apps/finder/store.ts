import { create } from 'zustand'

export type FinderView = 'list' | 'grid'
export type FinderSortKey = 'name' | 'kind' | 'modifiedAt' | 'size'
export type FinderSortDirection = 'asc' | 'desc'

export interface FinderDirectoryPreference {
  view: FinderView
  sortKey: FinderSortKey
  sortDirection: FinderSortDirection
}

interface FinderState {
  preferences: Record<string, FinderDirectoryPreference>
  requestedPath: string | null
  setView: (path: string, view: FinderView) => void
  toggleSort: (path: string, sortKey: FinderSortKey) => void
  resetDirectoryPreferences: () => void
  requestPath: (path: string) => void
  clearRequestedPath: () => void
}

const storageKey = 'starllow-os-finder-preferences-v1'
const defaultPreference: FinderDirectoryPreference = {
  view: 'list',
  sortKey: 'name',
  sortDirection: 'asc',
}

function getStoredPreferences(): Record<string, FinderDirectoryPreference> {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '{}')
    if (typeof value !== 'object' || value === null || Array.isArray(value))
      return {}

    return Object.fromEntries(Object.entries(value).flatMap(([path, preference]) => {
      if (typeof preference !== 'object' || preference === null)
        return []

      const entry = preference as Record<string, unknown>
      return [[path, {
        view: entry.view === 'grid' ? 'grid' : 'list',
        sortKey: ['name', 'kind', 'modifiedAt', 'size'].includes(String(entry.sortKey)) ? entry.sortKey as FinderSortKey : 'name',
        sortDirection: entry.sortDirection === 'desc' ? 'desc' : 'asc',
      } satisfies FinderDirectoryPreference]]
    }))
  }
  catch {
    return {}
  }
}

function savePreferences(preferences: Record<string, FinderDirectoryPreference>) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(preferences))
  }
  catch {
    // Keep preferences in memory when local storage is unavailable.
  }
}

export const useFinderStore = create<FinderState>((set, get) => ({
  preferences: {},
  requestedPath: null,
  setView: (path, view) => {
    const preferences = { ...get().preferences, [path]: { ...(get().preferences[path] ?? defaultPreference), view } }
    set({ preferences })
    savePreferences(preferences)
  },
  toggleSort: (path, sortKey) => {
    const current = get().preferences[path] ?? defaultPreference
    const preferences: Record<string, FinderDirectoryPreference> = {
      ...get().preferences,
      [path]: {
        ...current,
        sortKey,
        sortDirection: current.sortKey === sortKey && current.sortDirection === 'asc' ? 'desc' : 'asc',
      },
    }
    set({ preferences })
    savePreferences(preferences)
  },
  resetDirectoryPreferences: () => {
    const preferences = getStoredPreferences()
    set({ preferences })
  },
  requestPath: path => set({ requestedPath: path }),
  clearRequestedPath: () => set({ requestedPath: null }),
}))
