'use client'

import type { NoteMeta } from '@/components/apps/notes/data'
import type { AppId } from '@/lib/shell-routes'
import type { VirtualFile } from '@/lib/virtual-file-types'
import { AboutApp } from '@/components/apps/about'
import { AnalyticsApp } from '@/components/apps/analytics'
import { BlogApp } from '@/components/apps/blog'
import { BookmarksApp } from '@/components/apps/bookmarks'
import { ContactApp } from '@/components/apps/contact'
import { FinderApp } from '@/components/apps/finder'
import { GalleryApp } from '@/components/apps/gallery'
import { GameApp } from '@/components/apps/game'
import { HandbookApp } from '@/components/apps/handbook'
import { MusicApp } from '@/components/apps/music'
import { NotesApp } from '@/components/apps/notes'
import { ProjectsApp } from '@/components/apps/projects'
import { SettingsApp } from '@/components/apps/settings'
import { TerminalApp } from '@/components/apps/terminal'

export function AppWindows({ exclude, notesList, virtualFiles }: { exclude: AppId | null, notesList: NoteMeta[], virtualFiles: VirtualFile[] }) {
  return (
    <>
      {exclude !== 'finder' && <FinderApp files={virtualFiles} />}
      {exclude !== 'bookmarks' && <BookmarksApp />}
      {exclude !== 'projects' && <ProjectsApp />}
      {exclude !== 'gallery' && <GalleryApp />}
      {exclude !== 'music' && <MusicApp />}
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
