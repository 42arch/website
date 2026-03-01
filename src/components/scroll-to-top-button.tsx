'use client'

import { Button } from '@/components/ui/button'

interface ScrollToTopButtonProps {
  label: string
}

export function ScrollToTopButton({ label }: ScrollToTopButtonProps) {
  function onClick() {
    const container = document.getElementById('site-scroll-root')

    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      return
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button type="button" variant="yellow" size="sm" onClick={onClick}>
      {label}
    </Button>
  )
}
