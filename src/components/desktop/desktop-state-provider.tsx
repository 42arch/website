'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { DesktopWindowState } from './desktop-types'
import { createContext, useContext, useState } from 'react'
import { usePathname } from 'next/navigation'
import { isAppId } from '@/lib/desktop-routes'

interface DesktopState {
  windows: DesktopWindowState[]
  setWindows: Dispatch<SetStateAction<DesktopWindowState[]>>
}

const DesktopStateContext = createContext<DesktopState | null>(null)

export function DesktopStateProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [windows, setWindows] = useState<DesktopWindowState[]>(() => {
    const appId = pathname.split('/')[1]
    return appId && isAppId(appId)
      ? [{ id: appId, x: 0, y: 0, minimized: false, maximized: false }]
      : []
  })

  return (
    <DesktopStateContext.Provider value={{ windows, setWindows }}>
      {children}
    </DesktopStateContext.Provider>
  )
}

export function useDesktopState() {
  const state = useContext(DesktopStateContext)
  if (!state)
    throw new Error('useDesktopState must be used inside DesktopStateProvider')
  return state
}
