'use client'

import type { TouchEvent } from 'react'
import { ArrowCounterClockwiseIcon, GameControllerIcon, PauseIcon, PlayIcon, TrophyIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ShellWindow } from '@/components/shell/window'
import { Button } from '@/components/ui/button'
import { useShellStore } from '@/stores/shell-store'

const GRID_SIZE = 18
const INITIAL_SPEED = 170
const MIN_SPEED = 70
const SPEED_STEP = 5
const BEST_SCORE_STORAGE_KEY = 'starllow-os-snake-best-v1'

type Point = { x: number, y: number }
type Direction = 'up' | 'down' | 'left' | 'right'
type GameStatus = 'ready' | 'playing' | 'paused' | 'over'

const directionDeltas: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

const initialSnake: Point[] = [
  { x: 8, y: 9 },
  { x: 7, y: 9 },
  { x: 6, y: 9 },
]

function getRandomFood(snake: Point[]): Point | null {
  const freeCells: Point[] = []

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!snake.some(segment => segment.x === x && segment.y === y))
        freeCells.push({ x, y })
    }
  }

  if (freeCells.length === 0)
    return null

  return freeCells[Math.floor(Math.random() * freeCells.length)]
}

function isOppositeDirection(current: Direction, next: Direction) {
  return (current === 'up' && next === 'down')
    || (current === 'down' && next === 'up')
    || (current === 'left' && next === 'right')
    || (current === 'right' && next === 'left')
}

export function GameApp() {
  const t = useTranslations('apps.game')
  const activeWindowId = useShellStore(state => state.activeWindowId)
  const gameWindow = useShellStore(state => state.windows.game)
  const [status, setStatus] = useState<GameStatus>('ready')
  const [snake, setSnake] = useState<Point[]>(initialSnake)
  const [food, setFood] = useState<Point | null>({ x: 13, y: 9 })
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const directionRef = useRef<Direction>('right')
  const turnQueuedRef = useRef(false)
  const snakeRef = useRef(snake)
  const foodRef = useRef(food)
  const scoreRef = useRef(score)
  const bestScoreRef = useRef(bestScore)
  const swipeStartRef = useRef<Point | null>(null)

  useEffect(() => {
    try {
      const storedBest = Number(window.localStorage.getItem(BEST_SCORE_STORAGE_KEY))
      if (Number.isFinite(storedBest) && storedBest > 0) {
        bestScoreRef.current = storedBest
        setBestScore(storedBest)
      }
    }
    catch {
      // The game remains playable when local storage is unavailable.
    }
  }, [])

  useEffect(() => {
    if (status === 'playing' && (activeWindowId !== 'game' || !gameWindow.open || gameWindow.minimized))
      setStatus('paused')
  }, [activeWindowId, gameWindow.minimized, gameWindow.open, status])

  const turn = useCallback((nextDirection: Direction) => {
    if (status !== 'playing' || turnQueuedRef.current || isOppositeDirection(directionRef.current, nextDirection))
      return

    directionRef.current = nextDirection
    turnQueuedRef.current = true
  }, [status])

  const startGame = useCallback(() => {
    const nextSnake = [...initialSnake]
    const nextFood = getRandomFood(nextSnake)

    directionRef.current = 'right'
    turnQueuedRef.current = false
    snakeRef.current = nextSnake
    foodRef.current = nextFood
    scoreRef.current = 0
    setSnake(nextSnake)
    setFood(nextFood)
    setScore(0)
    setStatus('playing')
  }, [])

  const togglePause = useCallback(() => {
    setStatus(current => current === 'playing' ? 'paused' : current === 'paused' ? 'playing' : current)
  }, [])

  useEffect(() => {
    if (status !== 'playing')
      return

    const speed = Math.max(MIN_SPEED, INITIAL_SPEED - score * SPEED_STEP)
    const interval = window.setInterval(() => {
      const currentSnake = snakeRef.current
      const currentHead = currentSnake[0]
      const delta = directionDeltas[directionRef.current]
      const nextHead = { x: currentHead.x + delta.x, y: currentHead.y + delta.y }
      const currentFood = foodRef.current
      const ateFood = currentFood !== null && nextHead.x === currentFood.x && nextHead.y === currentFood.y
      const bodyToCheck = ateFood ? currentSnake : currentSnake.slice(0, -1)
      const hitWall = nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE
      const hitSnake = bodyToCheck.some(segment => segment.x === nextHead.x && segment.y === nextHead.y)

      turnQueuedRef.current = false

      if (hitWall || hitSnake) {
        setStatus('over')
        return
      }

      const nextSnake = ateFood
        ? [nextHead, ...currentSnake]
        : [nextHead, ...currentSnake.slice(0, -1)]
      snakeRef.current = nextSnake
      setSnake(nextSnake)

      if (ateFood) {
        const nextFood = getRandomFood(nextSnake)
        const nextScore = scoreRef.current + 1
        foodRef.current = nextFood
        scoreRef.current = nextScore
        setFood(nextFood)
        setScore(nextScore)
        if (nextScore > bestScoreRef.current) {
          bestScoreRef.current = nextScore
          try {
            window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(nextScore))
          }
          catch {
            // Keep the updated record in memory when local storage is unavailable.
          }
          setBestScore(nextScore)
        }

        if (!nextFood)
          setStatus('over')
      }
    }, speed)

    return () => window.clearInterval(interval)
  }, [score, status])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { activeWindowId: currentActiveWindowId, windows } = useShellStore.getState()
      const currentGameWindow = windows.game
      const target = event.target
      const targetIsEditable = target instanceof HTMLElement
        && (target.isContentEditable || ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

      if (currentActiveWindowId !== 'game' || !currentGameWindow.open || currentGameWindow.minimized || targetIsEditable)
        return

      const key = event.key.toLowerCase()
      const directions: Record<string, Direction> = {
        arrowup: 'up',
        w: 'up',
        arrowdown: 'down',
        s: 'down',
        arrowleft: 'left',
        a: 'left',
        arrowright: 'right',
        d: 'right',
      }
      const nextDirection = directions[key]

      if (nextDirection && status === 'playing') {
        event.preventDefault()
        turn(nextDirection)
      }
      else if (key === ' ' && (status === 'playing' || status === 'paused')) {
        event.preventDefault()
        togglePause()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [status, togglePause, turn])

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0]
    swipeStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = swipeStartRef.current
    const touch = event.changedTouches[0]
    swipeStartRef.current = null
    if (!start || !touch)
      return

    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 18)
      return

    turn(Math.abs(deltaX) > Math.abs(deltaY)
      ? deltaX > 0 ? 'right' : 'left'
      : deltaY > 0 ? 'down' : 'up')
  }

  const snakePositions = new Map<string, number>(snake.map((segment, index) => [`${segment.x},${segment.y}`, index] as const))
  const statusTitle = status === 'ready'
    ? t('readyTitle')
    : status === 'paused'
      ? t('pausedTitle')
      : t('overTitle')
  const statusDescription = status === 'ready'
    ? t('readyDescription')
    : status === 'paused'
      ? t('pausedDescription')
      : t('overDescription')
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
    const x = index % GRID_SIZE
    const y = Math.floor(index / GRID_SIZE)
    const snakeIndex = snakePositions.get(`${x},${y}`)
    const isFood = food?.x === x && food.y === y

    return (
      <div
        key={`${x},${y}`}
        className="relative flex aspect-square items-center justify-center border border-[#657261]/[0.09]"
      >
        {snakeIndex !== undefined && (
          <span className={`absolute inset-[1px] ${snakeIndex === 0 ? 'rounded-[2px] bg-[#345941] shadow-[inset_1px_1px_0_rgba(255,255,255,0.22)]' : 'rounded-[1px] bg-[#79a477] shadow-[inset_1px_1px_0_rgba(255,255,255,0.25)]'}`} />
        )}
        {isFood && (
          <span className="absolute size-[56%] rounded-[2px] bg-ph-orange shadow-[1px_1px_0_rgba(81,49,29,0.3)]" />
        )}
      </div>
    )
  })

  return (
    <ShellWindow
      id="game"
      title={t('title')}
      icon={<GameControllerIcon size={14} weight="regular" className="text-ph-green" />}
      defaultWidth="min(560px, 94vw)"
      defaultHeight="min(700px, 88vh)"
      defaultLeft={190}
      defaultTop={42}
      headerCenter={<span className="font-mono text-xs font-semibold">{t('windowTitle')}</span>}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center gap-4 overflow-y-auto bg-ph-surface p-4 sm:p-6">
        <div className="flex w-full max-w-[440px] items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-white/55 px-3 py-2 dark:bg-white/[0.04]">
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-ph-muted">{t('score')}</span>
            <span className="ml-auto font-mono text-sm font-bold tabular-nums text-ph-ink">{score}</span>
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-white/55 px-3 py-2 dark:bg-white/[0.04]">
            <TrophyIcon size={13} weight="fill" className="shrink-0 text-ph-orange" />
            <span className="truncate text-[10px] font-mono uppercase tracking-[0.12em] text-ph-muted">{t('best')}</span>
            <span className="ml-auto font-mono text-sm font-bold tabular-nums text-ph-ink">{bestScore}</span>
          </div>
          <Button
            aria-label={status === 'paused' ? t('resume') : t('pause')}
            disabled={status !== 'playing' && status !== 'paused'}
            onClick={togglePause}
            size="icon"
            title={status === 'paused' ? t('resume') : t('pause')}
            variant="outline"
          >
            {status === 'paused' ? <PlayIcon weight="fill" /> : <PauseIcon weight="fill" />}
          </Button>
          <Button
            aria-label={t('restart')}
            onClick={startGame}
            size="icon"
            title={t('restart')}
            variant="outline"
          >
            <ArrowCounterClockwiseIcon weight="bold" />
          </Button>
        </div>

        <div className="w-full max-w-[440px] rounded-xl border border-[#464e3f] bg-[#d5d6c4] p-2 shadow-[0_12px_28px_-18px_rgba(35,48,34,0.8),inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-[#66745f] dark:bg-[#252d25] sm:p-3">
          <div
            aria-label={t('boardLabel')}
            className="relative grid aspect-square w-full touch-none select-none overflow-hidden border border-[#66715f]/30 bg-[#e8e8d8] dark:bg-[#303a30]"
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
            role="img"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          >
            {cells}
            {status !== 'playing' && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f3f0e4]/80 p-5 text-center backdrop-blur-[2px] dark:bg-[#171d17]/82">
                <div className="flex max-w-xs flex-col items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-[14px] bg-[#e5efe1] text-[#426e4a] shadow-sm dark:bg-[#293c2c] dark:text-[#a4c99e]">
                    <GameControllerIcon size={25} weight="duotone" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-base font-semibold text-ph-ink">{statusTitle}</h2>
                    <p className="text-xs leading-relaxed text-ph-muted">{statusDescription}</p>
                  </div>
                  {status === 'over' && (
                    <div className="flex items-center gap-4 font-mono text-xs">
                      <span className="text-ph-muted">{t('score')}: <strong className="text-ph-ink">{score}</strong></span>
                      <span className="text-ph-muted">{t('best')}: <strong className="text-ph-ink">{bestScore}</strong></span>
                    </div>
                  )}
                  {status === 'paused' && (
                    <Button onClick={togglePause} size="sm" type="button">
                      <PlayIcon weight="fill" />
                      {t('resume')}
                    </Button>
                  )}
                  {(status === 'ready' || status === 'over') && (
                    <Button onClick={startGame} size="sm" type="button">
                      {status === 'ready' ? <PlayIcon weight="fill" /> : <ArrowCounterClockwiseIcon weight="bold" />}
                      {status === 'ready' ? t('start') : t('restart')}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-[440px] rounded-lg bg-white/45 px-3 py-2.5 text-center dark:bg-white/[0.035]">
          <p className="text-[11px] leading-relaxed text-ph-muted">{t('keyboardHelp')}</p>
          <p className="mt-1 text-[10px] leading-relaxed text-ph-muted/80">{t('touchHelp')}</p>
        </div>
      </div>
    </ShellWindow>
  )
}
