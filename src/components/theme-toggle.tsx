'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { useMounted } from '@/hooks/useMounted'

const className =
  'm-1 cursor-pointer text-lg text-gray-600 hover:text-gray-500 dark:text-light dark:hover:text-gray-400'

const ThemeToogle = () => {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  const themeMap: Record<string, JSX.Element> = {
    light: <FiSun className={className} />,
    dark: <FiMoon className={className} />,
    system: <FiMonitor className={className} />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          {mounted && theme && themeMap[theme]}
          <span className="sr-only">Toggle theme</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <FiSun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <FiMoon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <FiMonitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToogle
