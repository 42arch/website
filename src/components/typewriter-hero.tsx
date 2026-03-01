'use client'

import { useEffect, useState } from 'react'

const lines = [
  'WELCOME, ADVENTURER.',
  'I BUILD PIXEL-POWERED WEB EXPERIENCES.',
]

export function TypewriterHero() {
  const [displayed, setDisplayed] = useState(lines[0])
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const line = lines[lineIndex]
    if (charIndex > line.length) {
      const pauseTimer = window.setTimeout(() => {
        setLineIndex(current => (current + 1) % lines.length)
        setCharIndex(0)
      }, 1200)
      return () => window.clearTimeout(pauseTimer)
    }

    const typingTimer = window.setTimeout(() => {
      setDisplayed(line.slice(0, charIndex))
      setCharIndex(current => current + 1)
    }, 45)

    return () => window.clearTimeout(typingTimer)
  }, [lineIndex, charIndex])

  return (
    <p className="min-h-[4.5rem] text-[11px] leading-8 text-[var(--pixel-accent)] md:text-xs">
      {displayed}
      <span className="cursor-blink">▋</span>
    </p>
  )
}
