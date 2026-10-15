import { create } from 'zustand'

export type ProjectFilter = 'all' | 'ai' | 'oss' | 'saas'

interface ProjectsState {
  filter: ProjectFilter
  setFilter: (filter: ProjectFilter) => void
}

export const useProjectsStore = create<ProjectsState>(set => ({
  filter: 'all',
  setFilter: filter => set({ filter }),
}))
