'use client'

import type { AppId } from '@/lib/shell-routes'
import { AboutApp } from '@/components/apps/about-app'
import { AnalyticsApp } from '@/components/apps/analytics-app'
import { BlogApp } from '@/components/apps/blog-app'
import { ContactApp } from '@/components/apps/contact-app'
import { FinderApp } from '@/components/apps/finder-app'
import { GalleryApp } from '@/components/apps/gallery-app'
import { GameApp } from '@/components/apps/game-app'
import { HandbookApp } from '@/components/apps/handbook-app'
import { NotesApp } from '@/components/apps/notes-app'
import { ProjectsApp } from '@/components/apps/projects-app'
import { SettingsApp } from '@/components/apps/settings-app'
import { TerminalApp } from '@/components/apps/terminal-app'
import type { NoteMeta } from '@/lib/notes-data'
import type { VirtualFile } from '@/lib/virtual-file-types'

export function AppWindows({ exclude, notesList, virtualFiles }: { exclude: AppId | null, notesList: NoteMeta[], virtualFiles: VirtualFile[] }) {
  return (
    <>
      {exclude !== 'finder' && <FinderApp files={virtualFiles} />}
      {exclude !== 'projects' && <ProjectsApp />}
      {exclude !== 'gallery' && <GalleryApp />}
      {exclude !== 'terminal' && <TerminalApp files={virtualFiles} />}
      {exclude !== 'notes' && <NotesApp notesList={notesList} />}
      {exclude !== 'blog' && <BlogApp />}
      {exclude !== 'handbook' && <HandbookApp />}
      {exclude !== 'contact' && <ContactApp />}
      {exclude !== 'settings' && <SettingsApp />}
      {exclude !== 'about' && <AboutApp />}
      {exclude !== 'analytics' && <AnalyticsApp />}
      <GameApp />
    </>
  )
}
