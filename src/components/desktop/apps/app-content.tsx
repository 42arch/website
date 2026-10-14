import type { AppId, WallpaperName } from '../app-registry'
import { ContactApp } from './contact-app'
import { GalleryApp } from './gallery-app'
import { NotesApp } from './notes-app'
import { ProjectsApp } from './projects-app'
import { SettingsApp } from './settings-app'
import { WelcomeApp } from './welcome-app'

export function AppContent({ id, onOpen, wallpaper, onWallpaper, onReset }: {
  id: AppId
  onOpen: (id: AppId) => void
  wallpaper: WallpaperName
  onWallpaper: (value: WallpaperName) => void
  onReset: () => void
}) {
  switch (id) {
    case 'home': return <WelcomeApp onOpen={onOpen} />
    case 'projects': return <ProjectsApp />
    case 'notes': return <NotesApp />
    case 'gallery': return <GalleryApp />
    case 'contact': return <ContactApp />
    case 'settings': return <SettingsApp wallpaper={wallpaper} onWallpaper={onWallpaper} onReset={onReset} />
  }
}
