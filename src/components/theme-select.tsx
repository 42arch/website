'use client'

import useMounted from '@/hooks/use-mounted'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) return

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => {
        if (theme === 'light') {
          setTheme('dark')
        } else {
          setTheme('light')
        }
      }}
    >
      {mounted && (
        <>
          {theme === 'light' ? (
            <span className='i-line-md-sun-rising-loop h-5 w-5' />
          ) : (
            <span className='i-line-md-moon-rising-alt-loop h-5 w-5'></span>
          )}
        </>
      )}
    </Button>
  )
}
