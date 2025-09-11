'use client'

import type { HTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { Airplay, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useLayoutEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const themes = [
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
  {
    key: 'system',
    icon: Airplay,
    label: 'System theme',
  },
]

const itemVariants = cva(
  'relative size-6.5 rounded-full p-1.5 text-muted-foreground',
  {
    variants: {
      active: {
        true: 'text-accent-foreground bg-accent',
        false: 'text-muted-foreground',
      },
    },
  },
)

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  mode?: 'light-dark' | 'light-dark-system'
}) {
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const container = cn(
    'relative inline-flex items-center rounded-full p-1 ring-1 ring-border',
    className,
  )

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  const handleChangeTheme = async (theme: Theme) => {
    function update() {
      setTheme(theme)
    }

    if (document.startViewTransition && theme !== resolvedTheme) {
      // Get the toggle button position for the ripple effect
      const toggleButton = document.querySelector('[data-theme-toggle]')
      if (toggleButton) {
        const rect = toggleButton.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        // Set the mask position for the ripple effect
        document.documentElement.style.setProperty(
          '--theme-toggle-x',
          `${x}px`,
        )
        document.documentElement.style.setProperty(
          '--theme-toggle-y',
          `${y}px`,
        )

        // Add a class to identify this is a theme toggle transition
        document.documentElement.classList.add('theme-toggle-transition')
        document.documentElement.style.viewTransitionName = 'root'
        await document.startViewTransition(update).finished
        document.documentElement.style.viewTransitionName = ''
        document.documentElement.classList.remove('theme-toggle-transition')
      }
    }
    else {
      update()
    }
  }

  const value = mounted
    ? mode === 'light-dark'
      ? resolvedTheme
      : currentTheme
    : null

  return (
    <div
      className={container}
      onClick={() => {
        if (mode !== 'light-dark')
          return
        handleChangeTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
      data-theme-toggle=""
      aria-label={mode === 'light-dark' ? 'Toggle Theme' : undefined}
      {...props}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = value === key
        if (mode === 'light-dark' && key === 'system')
          return null

        return (
          <button
            type="button"
            key={key}
            className={itemVariants({ active: isActive })}
            onClick={() => {
              if (mode === 'light-dark')
                return
              handleChangeTheme(key as Theme)
            }}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-full bg-accent"
                layout
                transition={{
                  type: 'spring',
                  duration: mode === 'light-dark' ? 1.5 : 1,
                }}
              />
            )}
            <Icon
              className="relative m-auto size-full"
              fill="currentColor"
            />
          </button>
        )
      })}
    </div>
  )
}
