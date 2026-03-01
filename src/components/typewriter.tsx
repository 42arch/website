'use client'

import { useEffect, useState } from 'react'

interface TypewriterProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export function Typewriter({
  texts,
  speed = 80,
  deleteSpeed = 45,
  pauseTime = 1800,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1))
          setCharIndex(current => current + 1)
          return
        }

        setTimeout(() => setIsDeleting(true), pauseTime)
        return
      }

      if (charIndex > 0) {
        setDisplayText(currentText.slice(0, charIndex - 1))
        setCharIndex(current => current - 1)
        return
      }

      setIsDeleting(false)
      setTextIndex(current => (current + 1) % texts.length)
    }, isDeleting ? deleteSpeed : speed)

    return () => window.clearTimeout(timer)
  }, [charIndex, deleteSpeed, isDeleting, pauseTime, speed, textIndex, texts])

  return (
    <span>
      {displayText}
      <span className="pixel-cursor text-[var(--pixel-green)]">_</span>
    </span>
  )
}
