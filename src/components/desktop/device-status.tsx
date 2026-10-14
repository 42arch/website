'use client'

import { BatteryChargingIcon } from '@phosphor-icons/react/dist/csr/BatteryCharging'
import { BatteryHighIcon } from '@phosphor-icons/react/dist/csr/BatteryHigh'
import { BatteryLowIcon } from '@phosphor-icons/react/dist/csr/BatteryLow'
import { BatteryMediumIcon } from '@phosphor-icons/react/dist/csr/BatteryMedium'
import { WifiHighIcon } from '@phosphor-icons/react/dist/csr/WifiHigh'
import { WifiSlashIcon } from '@phosphor-icons/react/dist/csr/WifiSlash'
import { useEffect, useState } from 'react'

type BatteryManagerLike = EventTarget & {
  charging: boolean
  level: number
}

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManagerLike>
}

export function DeviceStatus() {
  const [online, setOnline] = useState(true)
  const [battery, setBattery] = useState<{ level: number, charging: boolean } | null>(null)

  useEffect(() => {
    setOnline(navigator.onLine)

    function updateOnline() {
      setOnline(navigator.onLine)
    }

    window.addEventListener('online', updateOnline)
    window.addEventListener('offline', updateOnline)

    let batteryManager: BatteryManagerLike | undefined
    let disposed = false
    function updateBattery() {
      if (batteryManager)
        setBattery({ level: batteryManager.level, charging: batteryManager.charging })
    }

    const getBattery = (navigator as NavigatorWithBattery).getBattery
    if (getBattery) {
      getBattery.call(navigator).then((manager) => {
        if (disposed)
          return
        batteryManager = manager
        updateBattery()
        batteryManager.addEventListener('levelchange', updateBattery)
        batteryManager.addEventListener('chargingchange', updateBattery)
      }).catch(() => {
        if (!disposed)
          setBattery(null)
      })
    }

    return () => {
      disposed = true
      window.removeEventListener('online', updateOnline)
      window.removeEventListener('offline', updateOnline)
      batteryManager?.removeEventListener('levelchange', updateBattery)
      batteryManager?.removeEventListener('chargingchange', updateBattery)
    }
  }, [])

  const BatteryIcon = battery?.charging
    ? BatteryChargingIcon
    : battery && battery.level < 0.2
      ? BatteryLowIcon
      : battery && battery.level < 0.6
        ? BatteryMediumIcon
        : BatteryHighIcon

  return (
    <div className="flex items-center gap-3 text-[#465a69] dark:text-[#c4d0d1] max-[700px]:gap-[9px]" aria-label="设备状态">
      <span className={`inline-flex min-w-[18px] items-center justify-center gap-1 font-mono text-[9px]${online ? '' : ' text-[#a65f50]'}`} title={online ? '网络已连接' : '当前处于离线状态'} aria-label={online ? '网络已连接' : '网络已断开'}>
        {online ? <WifiHighIcon size={16} weight="regular" /> : <WifiSlashIcon size={16} weight="regular" />}
      </span>
      <span className={`inline-flex min-w-[18px] items-center justify-center gap-1 font-mono text-[9px]${battery && battery.level < 0.2 && !battery.charging ? ' text-[#ad664d]' : ''}`} title={battery ? `${battery.charging ? '正在充电' : '电池电量'} · ${Math.round(battery.level * 100)}%` : '浏览器未提供电池状态'} aria-label={battery ? `${battery.charging ? '正在充电，' : ''}电池剩余 ${Math.round(battery.level * 100)}%` : '电池状态不可用'}>
        <BatteryIcon size={17} weight="regular" />
        <span>{battery ? `${Math.round(battery.level * 100)}%` : '—'}</span>
      </span>
    </div>
  )
}
