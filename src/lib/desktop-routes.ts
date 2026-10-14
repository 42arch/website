export const desktopAppIds = ['home', 'projects', 'notes', 'gallery', 'contact', 'settings'] as const

export type AppId = typeof desktopAppIds[number]

export function isAppId(value: string): value is AppId {
  return (desktopAppIds as readonly string[]).includes(value)
}
