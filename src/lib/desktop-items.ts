import { isAppId } from '@/lib/shell-routes'
import desktopConfig from '../../public/data/desktop.json'

export const desktopStorageKey = 'starllow-os-desktop-v2'
export const previousDesktopStorageKey = 'starllow-os-desktop-v1'

function isDesktopItem(item: unknown): item is string {
  return typeof item === 'string' && (item.startsWith('/') || isAppId(item))
}

function uniqueItems(value: unknown) {
  if (!Array.isArray(value))
    return null

  return [...new Set(value.filter(isDesktopItem))]
}

function readDefaultDesktopPaths() {
  if (Array.isArray(desktopConfig))
    return uniqueItems(desktopConfig) ?? []

  if (typeof desktopConfig === 'object' && desktopConfig !== null && 'items' in desktopConfig)
    return uniqueItems(desktopConfig.items) ?? []

  return []
}

export const defaultDesktopPaths = readDefaultDesktopPaths()

export function migrateDesktopPaths(storedPaths: string[]) {
  const items = storedPaths.filter(item => !isAppId(item))

  for (const app of defaultDesktopPaths.filter(item => isAppId(item))) {
    if (items.includes(app))
      continue

    const defaultIndex = defaultDesktopPaths.indexOf(app)
    const previous = defaultDesktopPaths.slice(0, defaultIndex).reverse().find(item => items.includes(item))
    const insertAt = previous ? items.indexOf(previous) + 1 : 0
    items.splice(insertAt, 0, app)
  }

  return items
}

export function readStoredDesktopPaths(value: string | null) {
  if (value === null)
    return null

  try {
    return uniqueItems(JSON.parse(value))
  }
  catch {
    return null
  }
}
