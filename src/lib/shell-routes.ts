export const shellAppIds = [
  'finder',
  'bookmarks',
  'projects',
  'gallery',
  'music',
  'terminal',
  'notes',
  'blog',
  'handbook',
  'contact',
  'settings',
  'about',
  'analytics',
  'game',
] as const

export type AppId = (typeof shellAppIds)[number]

export const launchpadAppIds = [
  'bookmarks',
  'blog',
  'projects',
  'notes',
  'gallery',
  'music',
  'handbook',
  'contact',
  'terminal',
  'settings',
  'analytics',
  'game',
] as const satisfies readonly AppId[]

export type LaunchpadAppId = (typeof launchpadAppIds)[number]

export const appAliases: Record<string, AppId> = {
  art: 'gallery',
  artwork: 'gallery',
}

export function isAppId(value: string): value is AppId {
  return (shellAppIds as readonly string[]).includes(value)
}

export function resolveAppId(value: string): AppId | undefined {
  if (isAppId(value))
    return value
  if (value in appAliases)
    return appAliases[value]
  return undefined
}
