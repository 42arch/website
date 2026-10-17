'use client'

import { useEffect, useRef } from 'react'
import { wallpaperScenes } from '@/stores/shell-store'

interface WallpaperSceneProps {
  index: number
  className?: string
  interactive?: boolean
}

export function WallpaperScene({ index, className, interactive = false }: WallpaperSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!interactive)
      return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let pointerX = 0
    let pointerY = 0

    function applyParallax() {
      frame = 0

      const scene = sceneRef.current
      if (!scene)
        return

      scene.style.setProperty('--parallax-x', `${pointerX * 3}px`)
      scene.style.setProperty('--parallax-y', `${pointerY * 2}px`)
    }

    function scheduleParallax() {
      if (!frame)
        frame = window.requestAnimationFrame(applyParallax)
    }

    function handlePointerMove(event: PointerEvent) {
      if (reducedMotion.matches)
        return

      pointerX = (event.clientX / window.innerWidth - 0.5) * 2
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2
      scheduleParallax()
    }

    function resetParallax() {
      pointerX = 0
      pointerY = 0
      scheduleParallax()
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerup', resetParallax)
    window.addEventListener('pointercancel', resetParallax)
    window.addEventListener('pointerleave', resetParallax)
    window.addEventListener('blur', resetParallax)
    reducedMotion.addEventListener('change', resetParallax)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', resetParallax)
      window.removeEventListener('pointercancel', resetParallax)
      window.removeEventListener('pointerleave', resetParallax)
      window.removeEventListener('blur', resetParallax)
      reducedMotion.removeEventListener('change', resetParallax)
      window.cancelAnimationFrame(frame)
    }
  }, [interactive])

  const sceneName = wallpaperScenes[index]?.id ?? 'hills'

  return (
    <div
      ref={sceneRef}
      className={`wallpaper-scene wallpaper-scene--${sceneName} relative h-full w-full overflow-hidden ${className ?? ''}`}
      data-interactive={interactive ? 'true' : undefined}
    >
      <div className="wallpaper-scene__image" aria-hidden="true" />
    </div>
  )
}
