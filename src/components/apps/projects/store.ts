import { create } from 'zustand'

export type ProjectFilter = 'all' | 'shipped' | 'in-progress' | 'archived'

interface ProjectsState {
  filter: ProjectFilter
  selectedProjectTitle: string | null
  setFilter: (filter: ProjectFilter) => void
  setSelectedProjectTitle: (title: string | null) => void
}

export const useProjectsStore = create<ProjectsState>(set => ({
  filter: 'all',
  selectedProjectTitle: null,
  setFilter: filter => set({ filter }),
  setSelectedProjectTitle: title => set({ selectedProjectTitle: title }),
}))
