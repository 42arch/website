'use client'

import type { PointerEvent as ReactPointerEvent } from 'react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useShellStore } from '@/stores/shell-store'

type PetPhase = 'idle' | 'walk' | 'happy' | 'drowsy' | 'sleep' | 'stretch'

const lines = ['hello', 'orbit', 'explore', 'rest'] as const
type PetLine = typeof lines[number] | 'awake'

interface Point {
  x: number
  y: number
}

interface DragState {
  pointerId: number
  startPointer: Point
  startPosition: Point
  moved: boolean
}

const walkDuration = 1500
const dockClearance = 72
const inactivityDuration = 30_000
const drowsyDuration = 1200
const sleepDuration = 12_000
const stretchDuration = 1200

function clamp(value: number, max: number) {
  return Math.max(0, Math.min(max, value))
}

export function DesktopPet() {
  const petPosition = useShellStore(state => state.petPosition)
  const setPetPosition = useShellStore(state => state.setPetPosition)
  const t = useTranslations('pet')
  const areaRef = useRef<HTMLDivElement>(null)
  const petRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const currentPositionRef = useRef<Point>({ x: 0, y: 0 })
  const boundsRef = useRef<Point>({ x: 0, y: 0 })
  const initializedRef = useRef(false)
  const suppressClickRef = useRef(false)
  const wokeOnPointerDownRef = useRef(false)
  const phaseRef = useRef<PetPhase>('idle')
  const facingRef = useRef<'left' | 'right'>('right')
  const lineIndexRef = useRef(0)
  const initialPositionRef = useRef(petPosition)
  const restTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scheduleInactivityRef = useRef<() => void>(() => {})
  const reactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [ready, setReady] = useState(false)
  const [phase, setPhase] = useState<PetPhase>('idle')
  const [facing, setFacing] = useState<'left' | 'right'>('right')
  const [speech, setSpeech] = useState<PetLine | null>(null)
  const [speechSide, setSpeechSide] = useState<'left' | 'right'>('right')
  const [speechBelow, setSpeechBelow] = useState(false)

  const changePhase = useCallback((next: PetPhase) => {
    phaseRef.current = next
    setPhase(next)
  }, [])

  const face = useCallback((next: 'left' | 'right') => {
    if (facingRef.current === next)
      return
    facingRef.current = next
    setFacing(next)
  }, [])

  const moveTo = useCallback((position: Point, animated: boolean) => {
    const pet = petRef.current
    if (!pet)
      return

    const point = {
      x: clamp(position.x, boundsRef.current.x),
      y: clamp(position.y, boundsRef.current.y),
    }
    pet.style.transition = animated ? `transform ${walkDuration}ms linear` : 'none'
    pet.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`
    currentPositionRef.current = point
  }, [])

  useEffect(() => {
    const area = areaRef.current
    const pet = petRef.current
    if (!area || !pet)
      return

    function measure() {
      if (!area || !pet)
        return

      const oldBounds = boundsRef.current
      const current = currentPositionRef.current
      const x = initializedRef.current && oldBounds.x > 0 ? current.x / oldBounds.x : initialPositionRef.current.x
      const y = initializedRef.current && oldBounds.y > 0 ? current.y / oldBounds.y : initialPositionRef.current.y
      boundsRef.current = {
        x: Math.max(0, area.clientWidth - pet.offsetWidth),
        y: Math.max(0, area.clientHeight - pet.offsetHeight - dockClearance),
      }
      moveTo({ x: x * boundsRef.current.x, y: y * boundsRef.current.y }, false)
      initializedRef.current = true
      setReady(true)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(area)
    measure()
    return () => observer.disconnect()
  }, [moveTo])

  useEffect(() => {
    if (!initializedRef.current || dragRef.current)
      return

    moveTo({
      x: petPosition.x * boundsRef.current.x,
      y: petPosition.y * boundsRef.current.y,
    }, false)
  }, [moveTo, petPosition.x, petPosition.y])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let roamTimer: ReturnType<typeof setTimeout> | null = null
    let walkTimer: ReturnType<typeof setTimeout> | null = null

    function scheduleRoam() {
      roamTimer = setTimeout(() => {
        if (!document.hidden && !reducedMotion.matches && !dragRef.current && phaseRef.current === 'idle' && initializedRef.current) {
          const current = currentPositionRef.current
          const distance = 45 + Math.random() * 65
          const randomDirection = Math.random() < 0.5 ? -1 : 1
          const direction = (randomDirection < 0 && current.x < 35) || (randomDirection > 0 && boundsRef.current.x - current.x < 35)
            ? -randomDirection
            : randomDirection
          const next = {
            x: clamp(current.x + direction * distance, boundsRef.current.x),
            y: clamp(current.y + (Math.random() - 0.5) * 34, boundsRef.current.y),
          }
          if (next.x !== current.x) {
            face(next.x < current.x ? 'left' : 'right')
            changePhase('walk')
            moveTo(next, true)
            walkTimer = setTimeout(() => {
              if (phaseRef.current === 'walk')
                changePhase('idle')
            }, walkDuration)
          }
        }
        scheduleRoam()
      }, 5500 + Math.random() * 4500)
    }

    function pauseMotion() {
      if (!document.hidden && !reducedMotion.matches)
        return

      const area = areaRef.current
      const pet = petRef.current
      if (area && pet) {
        const areaRect = area.getBoundingClientRect()
        const petRect = pet.getBoundingClientRect()
        moveTo({ x: petRect.left - areaRect.left, y: petRect.top - areaRect.top }, false)
      }
      if (walkTimer)
        clearTimeout(walkTimer)
      if (phaseRef.current === 'walk')
        changePhase('idle')
    }

    document.addEventListener('visibilitychange', pauseMotion)
    reducedMotion.addEventListener('change', pauseMotion)
    scheduleRoam()
    return () => {
      document.removeEventListener('visibilitychange', pauseMotion)
      reducedMotion.removeEventListener('change', pauseMotion)
      if (roamTimer)
        clearTimeout(roamTimer)
      if (walkTimer)
        clearTimeout(walkTimer)
    }
  }, [changePhase, face, moveTo])

  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null
    let lastReset = 0

    function clearInactivity() {
      if (inactivityTimer)
        clearTimeout(inactivityTimer)
      inactivityTimer = null
    }

    function finishRest() {
      changePhase('idle')
      scheduleInactivity()
    }

    function wakeNaturally() {
      changePhase('stretch')
      restTimerRef.current = setTimeout(finishRest, stretchDuration)
    }

    function startRest() {
      if (document.hidden || dragRef.current) {
        scheduleInactivity()
        return
      }

      const area = areaRef.current
      const pet = petRef.current
      if (area && pet) {
        const areaRect = area.getBoundingClientRect()
        const petRect = pet.getBoundingClientRect()
        moveTo({ x: petRect.left - areaRect.left, y: petRect.top - areaRect.top }, false)
      }
      changePhase('drowsy')
      restTimerRef.current = setTimeout(() => {
        changePhase('sleep')
        restTimerRef.current = setTimeout(wakeNaturally, sleepDuration)
      }, drowsyDuration)
    }

    function scheduleInactivity() {
      clearInactivity()
      if (document.hidden || phaseRef.current === 'drowsy' || phaseRef.current === 'sleep' || phaseRef.current === 'stretch')
        return

      inactivityTimer = setTimeout(startRest, inactivityDuration)
      lastReset = Date.now()
    }

    function handleActivity() {
      if (Date.now() - lastReset < 700)
        return
      scheduleInactivity()
    }

    function handleVisibility() {
      if (document.hidden)
        clearInactivity()
      else
        scheduleInactivity()
    }

    scheduleInactivityRef.current = scheduleInactivity
    window.addEventListener('pointermove', handleActivity, { passive: true })
    window.addEventListener('pointerdown', handleActivity, { passive: true })
    window.addEventListener('keydown', handleActivity)
    window.addEventListener('wheel', handleActivity, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)
    scheduleInactivity()

    return () => {
      clearInactivity()
      if (restTimerRef.current)
        clearTimeout(restTimerRef.current)
      scheduleInactivityRef.current = () => {}
      window.removeEventListener('pointermove', handleActivity)
      window.removeEventListener('pointerdown', handleActivity)
      window.removeEventListener('keydown', handleActivity)
      window.removeEventListener('wheel', handleActivity)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [changePhase, moveTo])

  useEffect(() => () => {
    if (reactionTimerRef.current)
      clearTimeout(reactionTimerRef.current)
    if (speechTimerRef.current)
      clearTimeout(speechTimerRef.current)
  }, [])

  function wakeFromRest() {
    if (phaseRef.current !== 'drowsy' && phaseRef.current !== 'sleep')
      return false

    if (restTimerRef.current)
      clearTimeout(restTimerRef.current)
    changePhase('stretch')
    setSpeech('awake')
    setSpeechSide(currentPositionRef.current.x > boundsRef.current.x / 2 ? 'right' : 'left')
    setSpeechBelow(currentPositionRef.current.y < 70)
    if (speechTimerRef.current)
      clearTimeout(speechTimerRef.current)
    speechTimerRef.current = setTimeout(setSpeech, 3600, null)
    restTimerRef.current = setTimeout(() => {
      changePhase('idle')
      scheduleInactivityRef.current()
    }, stretchDuration)
    return true
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.button !== 0)
      return

    const area = areaRef.current
    const pet = petRef.current
    if (!area || !pet)
      return

    if (wakeFromRest()) {
      wokeOnPointerDownRef.current = true
    }

    const areaRect = area.getBoundingClientRect()
    const petRect = pet.getBoundingClientRect()
    const position = {
      x: petRect.left - areaRect.left,
      y: petRect.top - areaRect.top,
    }
    moveTo(position, false)
    if (phaseRef.current === 'walk')
      changePhase('idle')
    dragRef.current = {
      pointerId: event.pointerId,
      startPointer: { x: event.clientX, y: event.clientY },
      startPosition: position,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId)
      return

    const deltaX = event.clientX - drag.startPointer.x
    const deltaY = event.clientY - drag.startPointer.y
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 5)
      return

    drag.moved = true
    const previousX = currentPositionRef.current.x
    moveTo({ x: drag.startPosition.x + deltaX, y: drag.startPosition.y + deltaY }, false)
    const nextX = currentPositionRef.current.x
    if (Math.abs(nextX - previousX) > 1)
      face(nextX < previousX ? 'left' : 'right')
  }

  function finishPointer(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId)
      return

    if (drag.moved) {
      const current = currentPositionRef.current
      setPetPosition({
        x: boundsRef.current.x > 0 ? current.x / boundsRef.current.x : 0,
        y: boundsRef.current.y > 0 ? current.y / boundsRef.current.y : 0,
      })
      suppressClickRef.current = event.type === 'pointerup'
      if (suppressClickRef.current)
        setTimeout(() => { suppressClickRef.current = false }, 0)
    }
    if (wokeOnPointerDownRef.current) {
      if (event.type === 'pointerup')
        setTimeout(() => { wokeOnPointerDownRef.current = false }, 0)
      else
        wokeOnPointerDownRef.current = false
    }
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
  }

  function handleClick() {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    if (wokeOnPointerDownRef.current) {
      wokeOnPointerDownRef.current = false
      return
    }
    if (wakeFromRest())
      return

    const line = lines[lineIndexRef.current % lines.length]
    lineIndexRef.current += 1
    setSpeech(line)
    setSpeechSide(currentPositionRef.current.x > boundsRef.current.x / 2 ? 'right' : 'left')
    setSpeechBelow(currentPositionRef.current.y < 70)
    changePhase('happy')
    if (reactionTimerRef.current)
      clearTimeout(reactionTimerRef.current)
    if (speechTimerRef.current)
      clearTimeout(speechTimerRef.current)
    reactionTimerRef.current = setTimeout(() => {
      if (phaseRef.current === 'happy')
        changePhase('idle')
    }, 1200)
    speechTimerRef.current = setTimeout(setSpeech, 3600, null)
  }

  return (
    <div ref={areaRef} className="absolute inset-0 z-[5] pointer-events-none">
      <div ref={petRef} className={`absolute top-0 left-0 pet-shell ${ready ? 'opacity-100' : 'opacity-0'}`}>
        {speech && (
          <div
            role="status"
            aria-live="polite"
            className={`absolute w-44 rounded-lg border border-ph-border bg-ph-surface px-3 py-2 text-xs leading-relaxed text-ph-ink shadow-mac backdrop-blur-xl ${speechBelow ? 'top-full mt-2' : 'bottom-full mb-2'} ${speechSide === 'right' ? 'right-0' : 'left-0'}`}
          >
            {t(`lines.${speech}`)}
          </div>
        )}
        <button
          type="button"
          aria-label={t('interact')}
          className="block size-full cursor-grab touch-none rounded-md pointer-events-auto active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ph-orange"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointer}
          onPointerCancel={finishPointer}
          onClick={handleClick}
        >
          <span aria-hidden="true" className="pet-sprite block size-full" data-phase={phase} data-facing={facing} />
        </button>
      </div>
    </div>
  )
}
