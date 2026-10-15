'use client'

import type { AppId } from '@/lib/shell-routes'
import { AnalyticsApp } from '@/components/apps/analytics-app'
import { ContactApp } from '@/components/apps/contact-app'
import { DesignApp } from '@/components/apps/design-app'
import { GalleryApp } from '@/components/apps/gallery-app'
import { HandbookApp } from '@/components/apps/handbook-app'
import { NotesApp } from '@/components/apps/notes-app'
import { ProjectsApp } from '@/components/apps/projects-app'
import { ReadmeApp } from '@/components/apps/readme-app'
import { SettingsApp } from '@/components/apps/settings-app'
import { TerminalApp } from '@/components/apps/terminal-app'

export function AppWindows({ exclude }: { exclude: AppId | null }) {
  return (
    <>
      {exclude !== 'readme' && <ReadmeApp />}
      {exclude !== 'projects' && <ProjectsApp />}
      {exclude !== 'gallery' && <GalleryApp />}
      {exclude !== 'terminal' && <TerminalApp />}
      {exclude !== 'notes' && <NotesApp />}
      {exclude !== 'handbook' && <HandbookApp />}
      {exclude !== 'contact' && <ContactApp />}
      {exclude !== 'settings' && <SettingsApp />}
      {exclude !== 'design' && <DesignApp />}
      {exclude !== 'analytics' && <AnalyticsApp />}
    </>
  )
}
