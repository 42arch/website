'use client'

import type { Locale } from '@/i18n/config'
import { GearIcon, MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useLocale, useTranslations } from 'next-intl'
import { cartoonWallpapers, useShellStore } from '@/stores/shell-store'
import { ShellWindow } from '@/components/shell/window'
import { setUserLocale } from '@/services/locale'

export function SettingsApp() {
  const wallpaperIndex = useShellStore(state => state.wallpaperIndex)
  const setWallpaperIndex = useShellStore(state => state.setWallpaperIndex)
  const themeMode = useShellStore(state => state.themeMode)
  const setThemeMode = useShellStore(state => state.setThemeMode)
  const soundEnabled = useShellStore(state => state.soundEnabled)
  const toggleSound = useShellStore(state => state.toggleSound)
  const mascotBubbleVisible = useShellStore(state => state.mascotBubbleVisible)
  const toggleMascotBubble = useShellStore(state => state.toggleMascotBubble)
  const widgetsVisible = useShellStore(state => state.widgetsVisible)
  const toggleWidgets = useShellStore(state => state.toggleWidgets)
  const minimizeAllWindows = useShellStore(state => state.minimizeAllWindows)
  const locale = useLocale() as Locale
  const t = useTranslations('apps.settings')

  async function handleLanguageSelect(newLocale: Locale) {
    if (newLocale === locale)
      return
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    await setUserLocale(newLocale)
    window.location.reload()
  }

  const activeWallpaper = cartoonWallpapers[wallpaperIndex] || cartoonWallpapers[0]

  return (
    <ShellWindow
      id="settings"
      title={t('title')}
      defaultWidth="min(680px, 94vw)"
      defaultHeight="min(510px, 76vh)"
      defaultLeft={220}
      defaultTop={60}
      icon={<GearIcon size={14} weight="regular" className="text-ph-muted" />}
      headerRight={<span className="font-mono text-[10px] text-ph-muted">⌘,</span>}
    >
      <div className="flex-1 flex overflow-hidden">
        {/* Left Settings Sidebar */}
        <aside className="hidden sm:flex flex-col justify-between w-44 bg-ph-sidebar border-r border-ph-border-subtle p-3 shrink-0 select-none">
          <div className="space-y-1 text-xs">
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-ph-muted font-semibold">{t('preferences')}</div>
            <a href="#set-wallpaper" className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] bg-black/[0.06] dark:bg-white/[0.08] text-ph-ink font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-ph-orange" />
              <span>{t('wallpaper')}</span>
            </a>
            <a href="#set-appearance" className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] text-ph-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span>{t('appearance')}</span>
            </a>
            <a href="#set-sound" className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] text-ph-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span>{t('soundAndWidgets')}</span>
            </a>
            <a href="#set-language" className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] text-ph-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span>{t('language')}</span>
            </a>
          </div>

          <div className="p-2.5 rounded-[6px] bg-[#DAD7C8]/70 dark:bg-[#1E222E] border border-ph-border-subtle text-[11px]">
            <div className="font-mono text-[10px] text-ph-muted">ACTIVE WALLPAPER</div>
            <div className="font-semibold text-ph-ink mt-0.5">{activeWallpaper.name}</div>
          </div>
        </aside>

        {/* Right Settings Controls */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Section 1: Cartoon Character Wallpapers */}
          <div id="set-wallpaper">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-sm text-ph-ink">{t('wallpaperHeading')}</h3>
                <p className="text-[11px] text-ph-muted">{t('wallpaperDesc')}</p>
              </div>
              <button
                type="button"
                onClick={minimizeAllWindows}
                className="rounded-[5px] border border-ph-border bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/15 px-2.5 py-1 text-[11px] font-medium text-ph-ink transition-all cursor-pointer"
              >
                最小化窗口预览
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 0: Max the Hedgehog */}
              <button
                type="button"
                onClick={() => setWallpaperIndex(0)}
                className={`rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-2.5 text-left transition-all cursor-pointer ${
                  wallpaperIndex === 0 ? 'ring-2 ring-ph-orange' : 'hover:border-ph-border'
                }`}
              >
                <div className="h-16 w-full rounded-[4px] bg-[#EDEAE0] dark:bg-[#181E2E] border border-black/10 dark:border-white/10 mb-2 flex items-center justify-center">
                  <span className="px-2 py-0.5 rounded-[4px] bg-ph-orange text-white font-mono font-bold text-[10px]">MAX</span>
                </div>
                <div className="font-bold text-xs text-ph-ink">刺猬工程师 Max</div>
                <div className="text-[10px] text-ph-muted mt-0.5">阳光山丘与露天代码桌</div>
              </button>

              {/* Card 1: Astro Shiba Inu */}
              <button
                type="button"
                onClick={() => setWallpaperIndex(1)}
                className={`rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-2.5 text-left transition-all cursor-pointer ${
                  wallpaperIndex === 1 ? 'ring-2 ring-ph-orange' : 'hover:border-ph-border'
                }`}
              >
                <div className="h-16 w-full rounded-[4px] bg-[#E5EAF3] dark:bg-[#1D243B] border border-black/10 dark:border-white/10 mb-2 flex items-center justify-center">
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#1D1F27] text-white font-mono font-bold text-[10px]">SHIBA</span>
                </div>
                <div className="font-bold text-xs text-ph-ink">太空柴犬宇航员</div>
                <div className="text-[10px] text-ph-muted mt-0.5">月球边缘节点与环状星</div>
              </button>

              {/* Card 2: Lo-Fi Black Cat */}
              <button
                type="button"
                onClick={() => setWallpaperIndex(2)}
                className={`rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-2.5 text-left transition-all cursor-pointer ${
                  wallpaperIndex === 2 ? 'ring-2 ring-ph-orange' : 'hover:border-ph-border'
                }`}
              >
                <div className="h-16 w-full rounded-[4px] bg-[#E9E4EC] dark:bg-[#221D33] border border-black/10 dark:border-white/10 mb-2 flex items-center justify-center">
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#232634] text-ph-yellow font-mono font-bold text-[10px]">CAT</span>
                </div>
                <div className="font-bold text-xs text-ph-ink">极客黑猫 Coder</div>
                <div className="text-[10px] text-ph-muted mt-0.5">降噪耳机与暮色山谷</div>
              </button>
            </div>
          </div>

          {/* Section 2: Appearance Mode */}
          <div id="set-appearance" className="pt-4 border-t border-ph-border-subtle">
            <h3 className="font-bold text-sm text-ph-ink mb-2.5">{t('appearanceHeading')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-3 flex items-center justify-between transition-all cursor-pointer ${
                  themeMode === 'light' ? 'ring-2 ring-ph-orange' : 'hover:border-ph-border'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[4px] bg-[#EAE8DF] border border-black/15 flex items-center justify-center text-gray-800">
                    <SunIcon size={16} weight="bold" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-xs text-ph-ink">{t('light')}</div>
                    <div className="text-[10px] text-ph-muted">Warm Stone</div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-3 flex items-center justify-between transition-all cursor-pointer ${
                  themeMode === 'dark' ? 'ring-2 ring-ph-orange' : 'hover:border-ph-border'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-[4px] bg-[#161922] border border-white/15 flex items-center justify-center text-ph-yellow">
                    <MoonIcon size={16} weight="fill" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-xs text-ph-ink">{t('dark')}</div>
                    <div className="text-[10px] text-ph-muted">Dark Night</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Section 3: Sound & Widgets Toggles */}
          <div id="set-sound" className="pt-4 border-t border-ph-border-subtle space-y-2">
            <h3 className="font-bold text-sm text-ph-ink mb-2">{t('soundHeading')}</h3>

            {/* Sound Toggle */}
            <div className="rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-ph-ink">{t('soundToggle')}</div>
                <div className="text-[11px] text-ph-muted">{t('soundDesc')}</div>
              </div>
              <button
                type="button"
                onClick={toggleSound}
                className={`px-3 py-1 rounded-[5px] text-xs font-medium transition-all cursor-pointer ${
                  soundEnabled
                    ? 'bg-ph-orange text-white shadow-sm'
                    : 'border border-ph-border bg-white/50 dark:bg-white/10 text-ph-muted'
                }`}
              >
                {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Mascot Bubble Toggle */}
            <div className="rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-ph-ink">{t('mascotToggle')}</div>
              </div>
              <button
                type="button"
                onClick={toggleMascotBubble}
                className={`px-3 py-1 rounded-[5px] text-xs font-medium transition-all cursor-pointer ${
                  mascotBubbleVisible
                    ? 'bg-ph-orange text-white shadow-sm'
                    : 'border border-ph-border bg-white/50 dark:bg-white/10 text-ph-muted'
                }`}
              >
                {mascotBubbleVisible ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Desktop Widgets Toggle */}
            <div className="rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-ph-ink">{t('widgetsToggle')}</div>
              </div>
              <button
                type="button"
                onClick={toggleWidgets}
                className={`px-3 py-1 rounded-[5px] text-xs font-medium transition-all cursor-pointer ${
                  widgetsVisible
                    ? 'bg-ph-orange text-white shadow-sm'
                    : 'border border-ph-border bg-white/50 dark:bg-white/10 text-ph-muted'
                }`}
              >
                {widgetsVisible ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Section 4: Language & Region */}
          <div id="set-language" className="space-y-3 pt-3 border-t border-ph-border-subtle">
            <div>
              <h3 className="font-bold text-sm text-ph-ink">{t('languageHeading')}</h3>
              <p className="text-[11px] text-ph-muted">{t('languageDesc')}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleLanguageSelect('zh')}
                className={`p-3 rounded-[6px] border text-left transition-all cursor-pointer ${
                  locale === 'zh'
                    ? 'border-ph-orange/60 bg-ph-orange/5 ring-1 ring-ph-orange/20 shadow-sm'
                    : 'border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] hover:bg-white/70 dark:hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-ph-ink">简体中文</span>
                  {locale === 'zh' && <span className="w-1.5 h-1.5 rounded-full bg-ph-orange" />}
                </div>
                <div className="text-[10px] text-ph-muted font-mono">zh-CN (默认)</div>
              </button>

              <button
                type="button"
                onClick={() => handleLanguageSelect('en')}
                className={`p-3 rounded-[6px] border text-left transition-all cursor-pointer ${
                  locale === 'en'
                    ? 'border-ph-orange/60 bg-ph-orange/5 ring-1 ring-ph-orange/20 shadow-sm'
                    : 'border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] hover:bg-white/70 dark:hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-ph-ink">English</span>
                  {locale === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-ph-orange" />}
                </div>
                <div className="text-[10px] text-ph-muted font-mono">en-US (International)</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ShellWindow>
  )
}
