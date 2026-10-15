import { format } from 'date-fns'

export interface TelemetryEvent {
  id: string
  name: string
  props: Record<string, string | number | boolean>
  timestamp: string
}

type TelemetryListener = (event: TelemetryEvent) => void

const listeners = new Set<TelemetryListener>()
const recentLogs: TelemetryEvent[] = []
let sessionCounter = 12 // Initial baseline matching posthog.html

export function subscribeTelemetry(listener: TelemetryListener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getTelemetryHistory(): readonly TelemetryEvent[] {
  return recentLogs
}

export function getSessionEventCount(): number {
  return sessionCounter
}

export function captureTelemetryEvent(name: string, props: Record<string, string | number | boolean> = {}) {
  sessionCounter++

  const timeStr = format(new Date(), 'HH:mm:ss')

  const event: TelemetryEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    props,
    timestamp: timeStr,
  }

  recentLogs.unshift(event)
  if (recentLogs.length > 50) {
    recentLogs.pop()
  }

  listeners.forEach((listener) => {
    try {
      listener(event)
    }
    catch {
      // Ignore individual listener failures
    }
  })

  return event
}
