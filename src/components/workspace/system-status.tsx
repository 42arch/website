'use client'

import {
  ClockIcon,
  LightningIcon,
  WifiHighIcon,
  WifiNoneIcon,
} from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [networkType, setNetworkType] = useState<string>('')

  useEffect(() => {
    if (typeof window === 'undefined')
      return

    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => {
      setIsOnline(false)
      setNetworkType('OFFLINE')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (conn) {
      const updateConnection = () => {
        setNetworkType(conn.effectiveType?.toUpperCase() || '')
      }
      updateConnection()
      conn.addEventListener('change', updateConnection)
      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
        conn.removeEventListener('change', updateConnection)
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-default" title={isOnline ? 'Network Connected' : 'Network Disconnected'}>
      {isOnline ? (
        <span className="text-emerald-500">
          <WifiHighIcon size={13} weight="bold" />
        </span>
      ) : (
        <span className="text-red-500 animate-pulse">
          <WifiNoneIcon size={13} weight="bold" />
        </span>
      )}
      <span>{isOnline ? (networkType || 'ONLINE') : 'OFFLINE'}</span>
    </div>
  )
}

export function BatteryStatus() {
  const [level, setLevel] = useState<number | null>(null)
  const [charging, setCharging] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !('getBattery' in navigator)) {
      setSupported(false)
      return
    }

    let batteryInstance: any = null

    const updateBattery = (battery: any) => {
      setLevel(Math.round(battery.level * 100))
      setCharging(battery.charging)
    }

    const onLevelChange = () => {
      if (batteryInstance)
        updateBattery(batteryInstance)
    }

    const onChargingChange = () => {
      if (batteryInstance)
        updateBattery(batteryInstance)
    }

    ;(navigator as any).getBattery().then((battery: any) => {
      batteryInstance = battery
      updateBattery(battery)

      battery.addEventListener('levelchange', onLevelChange)
      battery.addEventListener('chargingchange', onChargingChange)
    }).catch(() => {
      setSupported(false)
    })

    return () => {
      if (batteryInstance) {
        batteryInstance.removeEventListener('levelchange', onLevelChange)
        batteryInstance.removeEventListener('chargingchange', onChargingChange)
      }
    }
  }, [])

  if (!supported || level === null)
    return null

  const fillBg = level <= 20 ? 'bg-red-500' : level <= 50 ? 'bg-amber-500' : 'bg-emerald-500'

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-default" title={charging ? 'Charging' : 'On Battery'}>
      {charging && (
        <span className="text-amber-500 animate-pulse">
          <LightningIcon size={12} weight="fill" />
        </span>
      )}
      
      <div className="relative w-[18px] h-[9px] border border-muted-foreground/60 rounded-[2px] p-[1px] flex items-center">
        <div 
          className={`h-full rounded-[1px] transition-all duration-300 ${fillBg}`}
          style={{ width: `${level}%` }}
        />
        <div className="absolute -right-[2px] top-[2px] w-[1px] h-[3px] bg-muted-foreground/60 rounded-r-[1px]" />
      </div>
      
      <span>{level}%</span>
    </div>
  )
}

export function LiveClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    function tick() {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
      <ClockIcon size={13} weight="bold" />
      <span>{date}</span>
      <span className="text-os-accent">{time}</span>
    </div>
  )
}

export function SystemStatusGroup() {
  return (
    <div className="flex items-center gap-3">
      <NetworkStatus />
      <div className="h-3 w-px bg-os-border/70" />
      <BatteryStatus />
      <div className="h-3 w-px bg-os-border/70" />
      <LiveClock />
    </div>
  )
}
