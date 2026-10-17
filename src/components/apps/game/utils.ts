export const GRID_SIZE = 18
export const INITIAL_SPEED = 170
export const MIN_SPEED = 70
export const SPEED_STEP = 5

export interface Point { x: number, y: number }
export type Direction = 'up' | 'down' | 'left' | 'right'
export type GameStatus = 'ready' | 'playing' | 'paused' | 'over'

export const directionDeltas: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

export const initialSnake: Point[] = [
  { x: 8, y: 9 },
  { x: 7, y: 9 },
  { x: 6, y: 9 },
]

export function getRandomFood(snake: Point[]): Point | null {
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

export function isOppositeDirection(current: Direction, next: Direction) {
  return (current === 'up' && next === 'down')
    || (current === 'down' && next === 'up')
    || (current === 'left' && next === 'right')
    || (current === 'right' && next === 'left')
}
