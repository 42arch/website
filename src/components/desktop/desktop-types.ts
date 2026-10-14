import type { AppId } from './app-registry'

export interface DesktopWindowState {
  id: AppId
  x: number
  y: number
  minimized: boolean
  maximized: boolean
}
