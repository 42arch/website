export const shellAppIds = [
  'readme',
  'projects',
  'gallery',
  'terminal',
  'notes',
  'handbook',
  'contact',
  'settings',
  'design',
  'analytics',
] as const

export type AppId = (typeof shellAppIds)[number]

export const appAliases: Record<string, AppId> = {
  home: 'readme',
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
