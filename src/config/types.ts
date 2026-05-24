// ── Folio OS Site Configuration Types ──

export type ThemePreset =
  | 'graphite' | 'linen' | 'vesper' | 'nord'
  | 'catppuccin' | 'tokyo-night' | 'dracula' | 'github-dark'

export interface SiteInfo {
  name: string
  url: string
  githubRepo?: string
  locale: string
  description: string
  keywords: string[]
  themeColor: string
  backgroundColor: string
  defaultTheme: ThemePreset
}

export interface AuthorInfo {
  name: string
  location: string
  stack: string
  focus: string
  status: string
  role: string
  avatarUrl?: string
}

export interface SocialLinks {
  email?: string
  github?: string
  x?: string
  linkedin?: string
  website?: string
  discord?: string
  [key: string]: string | undefined
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'active' | 'shipped' | 'archived' | 'in-progress'
  stars?: number
  sourceUrl?: string
  tech: string[]
  commits?: number
  url?: string
}

export interface Experiment {
  id: string
  title: string
  description: string
  status: 'running' | 'completed' | 'paused' | 'planned'
  date: string
  category: string
  findings?: string
}

export interface GalleryItem {
  id: string
  title: string
  description: string
  category: string
  color: string
  aspect: 'landscape' | 'portrait' | 'square'
  image?: string
}

export interface OverviewConfig {
  asciiArt?: string
  subtitle: string
  buildTag: string
  stats: Array<{
    label: string
    value: string
    color: string
  }>
  currentFocus: {
    title: string
    description: string
    branch: string
    date: string
    commits: string
  }
}

export interface TerminalConfig {
  shellName: string
  bootMessage: string
  petName: string
  neofetch: {
    osName: string
    kernel: string
    shell: string
    runtime: string
    ui: string
    stateManager: string
  }
}

export interface AboutConfig {
  description: string
  techStackDescription?: string
}

export interface SiteConfig {
  site: SiteInfo
  author: AuthorInfo
  social: SocialLinks
  projects: Project[]
  experiments: Experiment[]
  gallery: GalleryItem[]
  about: AboutConfig
  overview: OverviewConfig
  terminal: TerminalConfig
}
