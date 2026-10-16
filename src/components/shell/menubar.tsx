'use client'

import type { Locale } from '@/i18n/config'
import {
  BatteryChargingIcon,
  BatteryHighIcon,
  BatteryLowIcon,
  BatteryMediumIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
  WifiHighIcon,
  WifiSlashIcon,
} from '@phosphor-icons/react'
import { format } from 'date-fns'
import { enUS, zhCN } from 'date-fns/locale'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { setUserLocale } from '@/services/locale'
import { useShellStore } from '@/stores/shell-store'

interface BatteryManager extends EventTarget {
  level: number
  charging: boolean
  addEventListener: (type: string, listener: () => void) => void
  removeEventListener: (type: string, listener: () => void) => void
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>
}

export function ShellMenubar() {
  const activeWindowId = useShellStore(state => state.activeWindowId)
  const windows = useShellStore(state => state.windows)
  const focusWindow = useShellStore(state => state.focusWindow)
  const openWindow = useShellStore(state => state.openWindow)
  const tileWindows = useShellStore(state => state.tileWindows)
  const openAllWindows = useShellStore(state => state.openAllWindows)
  const minimizeAllWindows = useShellStore(state => state.minimizeAllWindows)
  const startMenuOpen = useShellStore(state => state.startMenuOpen)
  const toggleStartMenu = useShellStore(state => state.toggleStartMenu)
  const setStartMenuOpen = useShellStore(state => state.setStartMenuOpen)
  const toggleCommandPalette = useShellStore(state => state.toggleCommandPalette)
  const showToast = useShellStore(state => state.showToast)

  const [dateStr, setDateStr] = useState('')
  const [timeStr, setTimeStr] = useState('')
  const [batteryLevel, setBatteryLevel] = useState(100)
  const [isCharging, setIsCharging] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  const startMenuRef = useRef<HTMLDivElement>(null)
  const locale = useLocale() as Locale
  const t = useTranslations('menubar')
  const tCommon = useTranslations('common')

  async function toggleLocale() {
    const next: Locale = locale === 'zh' ? 'en' : 'zh'
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`
    await setUserLocale(next)
    window.location.reload()
  }

  // Real-time clock & locale-aware date
  useEffect(() => {
    function updateClock() {
      const now = new Date()
      if (locale === 'en') {
        setDateStr(format(now, 'EEE MMM d', { locale: enUS }))
      }
      else {
        setDateStr(format(now, 'M月d日 EEE', { locale: zhCN }))
      }
      setTimeStr(format(now, 'HH:mm'))
    }
    updateClock()
    const timer = setInterval(updateClock, 10000)
    return () => clearInterval(timer)
  }, [locale])

  // Network & Battery status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine)
      const onOnline = () => setIsOnline(true)
      const onOffline = () => setIsOnline(false)
      window.addEventListener('online', onOnline)
      window.addEventListener('offline', onOffline)

      const nav = navigator as NavigatorWithBattery
      if (nav.getBattery) {
        nav.getBattery().then((battery) => {
          setBatteryLevel(Math.round(battery.level * 100))
          setIsCharging(battery.charging)
          const onLevel = () => setBatteryLevel(Math.round(battery.level * 100))
          const onCharge = () => setIsCharging(battery.charging)
          battery.addEventListener('levelchange', onLevel)
          battery.addEventListener('chargingchange', onCharge)
        }).catch(() => {})
      }

      return () => {
        window.removeEventListener('online', onOnline)
        window.removeEventListener('offline', onOffline)
      }
    }
  }, [])

  // Close start menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
        setStartMenuOpen(false)
      }
    }
    if (startMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [startMenuOpen, setStartMenuOpen])

  function copyEmail() {
    navigator.clipboard.writeText('alex@posthog-style.dev')
    showToast('已拷贝个人邮箱: alex@posthog-style.dev')
  }

  const activeWindow = activeWindowId ? windows[activeWindowId] : null
  const activeTitle = activeWindowId === 'about' ? t('aboutThisComputer') : activeWindow?.title ?? 'Starllow.OS'

  const BatteryIcon = isCharging
    ? BatteryChargingIcon
    : batteryLevel < 20
      ? BatteryLowIcon
      : batteryLevel < 60
        ? BatteryMediumIcon
        : BatteryHighIcon

  return (
    <>
      <header className="h-10 sm:h-7 w-full px-3 sm:px-3.5 flex items-center justify-between z-50 shrink-0 text-[13px] sm:text-[12px] bg-[#ECE9DE]/70 dark:bg-[#141720]/70 backdrop-blur-md saturate-[140%] border-b select-none">
        {/* Left: Brand Emblem + Active App Title + macOS Menus */}
        <div className="flex items-center space-x-1 sm:space-x-1">
          {/* Brand Icon Button */}
          <button
            type="button"
            onClick={toggleStartMenu}
            aria-label={t('systemTitle')}
            className="p-1.5 sm:px-2 sm:py-1 rounded-[6px] sm:rounded-[4px] hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-1.5 transition-colors text-ph-ink cursor-pointer"
          >
            <SparkleIcon size={16} weight="fill" className="text-ph-orange sm:w-3.5 sm:h-3.5" />
          </button>

          {/* Active Window Title */}
          <button
            type="button"
            onClick={() => activeWindowId && focusWindow(activeWindowId)}
            className="px-2 py-1 sm:py-0.5 rounded-[6px] sm:rounded-[4px] hover:bg-black/5 dark:hover:bg-white/10 font-bold tracking-tight text-ph-ink transition-colors cursor-pointer text-xs sm:text-[12px]"
          >
            {activeTitle}
          </button>

          {/* macOS Standard Menus (Desktop / Tablet) */}
          <div className="hidden md:flex items-center text-ph-muted font-medium space-x-0.5">
            {/* File Menu */}
            <div className="relative group">
              <button
                type="button"
                className="px-2.5 py-0.5 rounded-[4px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-ph-ink cursor-pointer"
              >
                {t('file')}
              </button>
              <div className="hidden group-hover:block absolute left-0 top-full pt-1 w-52 z-50">
                <div className="bg-[#ECEAE0] dark:bg-[#1E2028] border border-black/15 dark:border-white/10 shadow-xl rounded-md p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => openWindow('projects')}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-ph-orange hover:text-white rounded-[4px] flex justify-between items-center transition-colors cursor-pointer text-ph-ink"
                  >
                    <span>{t('openProjects')}</span>
                    <span className="font-mono text-[10px] opacity-70">⌘2</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openWindow('notes')}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-ph-orange hover:text-white rounded-[4px] flex justify-between items-center transition-colors cursor-pointer text-ph-ink"
                  >
                    <span>{t('openNotes')}</span>
                    <span className="font-mono text-[10px] opacity-70">⌘3</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openWindow('blog')}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-ph-orange hover:text-white rounded-[4px] flex justify-between items-center transition-colors cursor-pointer text-ph-ink"
                  >
                    <span>{t('openBlog')}</span>
                    <span className="font-mono text-[10px] opacity-70">⌘1</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openWindow('gallery')}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-ph-orange hover:text-white rounded-[4px] flex justify-between items-center transition-colors cursor-pointer text-ph-ink"
                  >
                    <span>{t('openGallery')}</span>
                    <span className="font-mono text-[10px] opacity-70">⌘4</span>
                  </button>
                  <div className="my-1 border-t border-black/10 dark:border-white/10" />
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-ph-orange hover:text-white rounded-[4px] flex justify-between items-center transition-colors cursor-pointer text-ph-ink"
                  >
                    <span>{t('copyEmail')}</span>
                    <span className="font-mono text-[10px] opacity-70">⌘E</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Window Menu */}
            <div className="relative group">
              <button
                type="button"
                className="px-2.5 py-0.5 rounded-[4px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-ph-ink cursor-pointer"
              >
                {t('window')}
              </button>
              <div className="hidden group-hover:block absolute left-0 top-full pt-1 w-52 z-50">
                <div className="bg-[#ECEAE0] dark:bg-[#1E2028] border border-black/15 dark:border-white/10 shadow-xl rounded-md p-1 text-xs">
                  <button
                    type="button"
                    onClick={tileWindows}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-ph-orange hover:text-white rounded-[4px] transition-colors cursor-pointer text-ph-ink"
                  >
                    {t('tileWindows')}
                  </button>
                  <button
                    type="button"
                    onClick={openAllWindows}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-ph-orange hover:text-white rounded-[4px] transition-colors cursor-pointer text-ph-ink"
                  >
                    {t('showAllWindows')}
                  </button>
                  <button
                    type="button"
                    onClick={minimizeAllWindows}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-ph-orange hover:text-white rounded-[4px] transition-colors cursor-pointer text-ph-ink"
                  >
                    {t('minimizeAllWindows')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Spotlight ⌘K + Network Signal + Battery Indicator + Language + Date/Clock */}
        <div className="flex items-center space-x-1 sm:space-x-2.5 text-ph-ink">
          {/* Spotlight Search Trigger */}
          <button
            type="button"
            onClick={toggleCommandPalette}
            title={tCommon('search')}
            className="p-1.5 sm:px-2 sm:py-0.5 rounded-[6px] sm:rounded-[4px] hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-1.5 transition-colors cursor-pointer text-ph-ink"
          >
            <MagnifyingGlassIcon size={16} weight="bold" className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden lg:inline text-[11px] font-mono opacity-75">⌘K</span>
          </button>

          {/* Network Signal Icon */}
          <div
            className="p-1.5 sm:p-0 flex items-center cursor-default text-ph-ink/80 hover:text-ph-ink transition-colors"
            title={isOnline ? `${t('network')}: Starllow-5G` : `${t('network')} Offline`}
          >
            {isOnline
              ? <WifiHighIcon size={17} weight="bold" className="sm:w-[15px] sm:h-[15px]" />
              : <WifiSlashIcon size={17} weight="bold" className="text-ph-red sm:w-[15px] sm:h-[15px]" />}
          </div>

          {/* Battery Status Indicator */}
          <div
            className="p-1 sm:p-0 flex items-center gap-1 font-mono text-xs sm:text-[11px] text-ph-ink cursor-default"
            title={`${t('battery')}: ${batteryLevel}% ${isCharging ? '(Charging)' : ''}`}
          >
            <BatteryIcon size={17} weight="regular" className={`sm:w-4 sm:h-4 ${batteryLevel < 20 && !isCharging ? 'text-ph-red' : ''}`} />
            <span className="hidden sm:inline">
              {batteryLevel}
              %
            </span>
          </div>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLocale}
            title={locale === 'zh' ? 'Switch to English' : '切换为简体中文'}
            className="px-2 py-1 sm:px-1.5 sm:py-0.5 rounded-[6px] sm:rounded-[4px] hover:bg-black/5 dark:hover:bg-white/10 text-[11px] sm:text-[10px] font-mono font-semibold transition-colors cursor-pointer border border-black/10 dark:border-white/10 text-ph-ink"
          >
            {locale === 'zh' ? 'EN' : '中'}
          </button>

          {/* Date & Clock */}
          <div className="flex items-center gap-1.5 pl-0.5 sm:pl-1 font-medium text-ph-ink">
            <span className="hidden sm:inline text-[11px]">{dateStr}</span>
            <span className="font-mono text-xs sm:text-[11px]">{timeStr}</span>
          </div>
        </div>
      </header>

      {/* Start Menu Dropdown */}
      {startMenuOpen && (
        <div
          ref={startMenuRef}
          className="fixed top-11 sm:top-8 left-2 sm:left-2.5 w-56 sm:w-52 rounded-[8px] border bg-ph-surface backdrop-blur-[22px] saturate-[145%] shadow-mac dark:shadow-mac-dark z-50 p-1 text-xs select-none"
        >
          <div className="px-3 py-2 sm:px-2.5 sm:py-1.5 border-b border-black/5 dark:border-white/10">
            <div className="font-bold text-ph-ink">{t('systemTitle')}</div>
            <div className="font-mono text-[10px] text-ph-muted">{t('systemVersion')}</div>
          </div>
          <div className="py-1 space-y-0.5">
            <button
              type="button"
              onClick={() => {
                openWindow('about')
                setStartMenuOpen(false)
              }}
              className="w-full text-left px-3 py-2 sm:px-2.5 sm:py-1.5 rounded-[4px] hover:bg-ph-orange hover:text-white flex items-center justify-between transition-colors cursor-pointer text-ph-ink"
            >
              <span>{t('aboutThisComputer')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                openWindow('settings')
                setStartMenuOpen(false)
              }}
              className="w-full text-left px-3 py-2 sm:px-2.5 sm:py-1.5 rounded-[4px] hover:bg-ph-orange hover:text-white flex items-center justify-between transition-colors cursor-pointer font-semibold text-ph-orange"
            >
              <span>{t('settings')}...</span>
              <span className="font-mono text-[10px] opacity-60">⌘,</span>
            </button>
            <div className="my-1 border-t border-black/10 dark:border-white/10" />
            <button
              type="button"
              onClick={() => {
                minimizeAllWindows()
                setStartMenuOpen(false)
              }}
              className="w-full text-left px-3 py-2 sm:px-2.5 sm:py-1.5 rounded-[4px] hover:bg-ph-orange hover:text-white flex items-center justify-between transition-colors cursor-pointer text-ph-ink"
            >
              <span>{t('showDesktop')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
