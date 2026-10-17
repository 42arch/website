'use client'

import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/config'
import {
  ArrowCounterClockwiseIcon,
  DesktopIcon,
  GearIcon,
  MoonIcon,
  SunIcon,
  TranslateIcon,
} from '@phosphor-icons/react'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { WallpaperScene } from '@/components/shell/wallpaper-scene'
import { ShellWindow } from '@/components/shell/window'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { setUserLocale } from '@/services/locale'
import { useShellStore, wallpaperScenes } from '@/stores/shell-store'

type SettingsSection = 'appearance' | 'desktop' | 'language'

export function SettingsApp() {
  const wallpaperIndex = useShellStore(state => state.wallpaperIndex)
  const setWallpaperIndex = useShellStore(state => state.setWallpaperIndex)
  const themeMode = useShellStore(state => state.themeMode)
  const setThemeMode = useShellStore(state => state.setThemeMode)
  const widgetsVisible = useShellStore(state => state.widgetsVisible)
  const toggleWidgets = useShellStore(state => state.toggleWidgets)
  const petVisible = useShellStore(state => state.petVisible)
  const setPetVisible = useShellStore(state => state.setPetVisible)
  const minimizeAllWindows = useShellStore(state => state.minimizeAllWindows)
  const restorePreferences = useShellStore(state => state.restorePreferences)
  const showToast = useShellStore(state => state.showToast)
  const settingsOpen = useShellStore(state => state.windows.settings.open && !state.windows.settings.minimized)
  const { setTheme } = useTheme()
  const locale = useLocale() as Locale
  const t = useTranslations('apps.settings')
  const [activeSection, setActiveSection] = useState<SettingsSection>('appearance')
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)

  useEffect(() => {
    if (!settingsOpen)
      setActiveSection('appearance')
  }, [settingsOpen])

  const sections: { id: SettingsSection, label: string, icon: ReactNode }[] = [
    { id: 'appearance', label: t('appearance'), icon: <SunIcon /> },
    { id: 'desktop', label: t('desktop'), icon: <DesktopIcon /> },
    { id: 'language', label: t('language'), icon: <TranslateIcon /> },
  ]

  async function handleLanguageSelect(newLocale: Locale) {
    if (newLocale === locale)
      return

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    await setUserLocale(newLocale)
    window.location.reload()
  }

  function handleRestorePreferences() {
    restorePreferences()
    setTheme('light')
    setRestoreDialogOpen(false)
    showToast(t('restoreDone'))
  }

  function handlePreviewDesktop() {
    minimizeAllWindows()
    showToast(t('previewDone'))
  }

  function updateActiveSection(value: string) {
    if (value === 'appearance' || value === 'desktop' || value === 'language')
      setActiveSection(value)
  }

  return (
    <ShellWindow
      id="settings"
      title={t('title')}
      defaultWidth="min(900px, 95vw)"
      defaultHeight="min(680px, 86vh)"
      defaultLeft={160}
      defaultTop={42}
      icon={<GearIcon size={14} weight="regular" className="text-ph-muted" />}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-ph-surface-body text-ph-ink">
        <Tabs
          orientation="vertical"
          value={activeSection}
          onValueChange={updateActiveSection}
          className="flex min-h-0 flex-1 flex-col gap-0 sm:flex-row"
        >
          <div className="shrink-0 border-b bg-ph-sidebar p-3 sm:hidden">
            <Select value={activeSection} onValueChange={updateActiveSection}>
              <SelectTrigger aria-label={t('sectionNavigation')} className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sections.map(section => (
                    <SelectItem key={section.id} value={section.id}>{section.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <TabsList aria-label={t('sectionNavigation')} className="hidden h-auto w-52 shrink-0 flex-col items-stretch justify-start gap-1 rounded-none border-r bg-ph-sidebar p-3 sm:flex">
            <div className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ph-muted">
              {t('preferences')}
            </div>
            {sections.map(section => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="h-auto flex-none justify-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs text-ph-muted data-[state=active]:bg-ph-orange/10 data-[state=active]:font-semibold data-[state=active]:text-ph-orange"
              >
                <span data-icon="inline-start" className="flex size-4 items-center justify-center">{section.icon}</span>
                <span>{section.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
              <TabsContent value="appearance" className="mt-0 flex flex-col gap-5">
                <header>
                  <h2 className="text-lg font-semibold tracking-tight">{t('appearanceHeading')}</h2>
                  <p className="mt-1 text-xs text-ph-muted">{t('appearanceDesc')}</p>
                </header>

                <Card className="bg-ph-sidebar">
                  <CardHeader>
                    <CardTitle>{t('themeHeading')}</CardTitle>
                    <CardDescription>{t('themeDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ToggleGroup
                      type="single"
                      value={themeMode}
                      onValueChange={(value) => {
                        if (value === 'light' || value === 'dark') {
                          setThemeMode(value)
                          setTheme(value)
                        }
                      }}
                      variant="outline"
                      className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
                      aria-label={t('themeHeading')}
                    >
                      <ToggleGroupItem value="light" className="h-auto justify-start gap-3 p-3 text-left">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-ph-surface text-ph-orange">
                          <SunIcon />
                        </span>
                        <span className="text-left">
                          <span className="block font-semibold">{t('light')}</span>
                          <span className="mt-0.5 block text-[11px] text-ph-muted">{t('lightDesc')}</span>
                        </span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="dark" className="h-auto justify-start gap-3 p-3 text-left">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-ph-surface text-ph-ink">
                          <MoonIcon />
                        </span>
                        <span className="text-left">
                          <span className="block font-semibold">{t('dark')}</span>
                          <span className="mt-0.5 block text-[11px] text-ph-muted">{t('darkDesc')}</span>
                        </span>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </CardContent>
                </Card>

                <Card className="bg-ph-sidebar">
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <CardTitle>{t('wallpaperHeading')}</CardTitle>
                        <CardDescription>{t('wallpaperDesc')}</CardDescription>
                      </div>
                      <Button type="button" onClick={handlePreviewDesktop} variant="outline" size="sm">
                        {t('previewDesktop')}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ToggleGroup
                      type="single"
                      value={String(wallpaperIndex)}
                      onValueChange={(value) => {
                        const index = Number(value)
                        if (value && Number.isInteger(index) && index >= 0 && index < wallpaperScenes.length)
                          setWallpaperIndex(index)
                      }}
                      variant="outline"
                      className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
                      aria-label={t('wallpaperHeading')}
                    >
                      {wallpaperScenes.map((scene, index) => (
                        <ToggleGroupItem key={scene.id} value={String(index)} className="h-auto w-full flex-col items-stretch gap-2 p-2.5 text-left">
                          <span className="relative block aspect-video w-full overflow-hidden rounded-md bg-ph-surface">
                            <WallpaperScene index={index} />
                          </span>
                          <span>
                            <span className="flex items-center justify-between gap-2">
                              <span className="font-semibold">{t(`wallpapers.${scene.id}.name`)}</span>
                              <Badge variant="secondary">{scene.theme === 'light' ? t('wallpapers.lightRecommended') : t('wallpapers.darkRecommended')}</Badge>
                            </span>
                            <span className="mt-0.5 block text-[11px] text-ph-muted">{t(`wallpapers.${scene.id}.description`)}</span>
                          </span>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="desktop" className="mt-0 flex flex-col gap-5">
                <header>
                  <h2 className="text-lg font-semibold tracking-tight">{t('desktopHeading')}</h2>
                  <p className="mt-1 text-xs text-ph-muted">{t('desktopDesc')}</p>
                </header>
                <Card className="bg-ph-sidebar">
                  <CardContent className="flex flex-col gap-1 pt-4">
                    <div className="flex items-center justify-between gap-5 rounded-lg px-1 py-3">
                      <div>
                        <div className="text-sm font-medium">{t('petToggle')}</div>
                        <p className="mt-1 text-xs text-ph-muted">{t('petDesc')}</p>
                      </div>
                      <Switch checked={petVisible} onCheckedChange={setPetVisible} aria-label={t('petToggle')} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between gap-5 rounded-lg px-1 py-3">
                      <div>
                        <div className="text-sm font-medium">{t('widgetsToggle')}</div>
                        <p className="mt-1 text-xs text-ph-muted">{t('widgetsDesc')}</p>
                      </div>
                      <Switch checked={widgetsVisible} onCheckedChange={toggleWidgets} aria-label={t('widgetsToggle')} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="language" className="mt-0 flex flex-col gap-5">
                <header>
                  <h2 className="text-lg font-semibold tracking-tight">{t('languageHeading')}</h2>
                  <p className="mt-1 text-xs text-ph-muted">{t('languageDesc')}</p>
                </header>
                <Card className="bg-ph-sidebar">
                  <CardContent className="pt-4">
                    <ToggleGroup
                      type="single"
                      value={locale}
                      onValueChange={(value) => {
                        if (value === 'zh' || value === 'en')
                          void handleLanguageSelect(value)
                      }}
                      variant="outline"
                      className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
                      aria-label={t('languageHeading')}
                    >
                      <ToggleGroupItem value="zh" className="h-auto justify-start p-3 text-left">
                        <span>
                          <span className="block font-semibold">{t('chinese')}</span>
                          <span className="mt-0.5 block text-[11px] text-ph-muted">zh-CN</span>
                        </span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="en" className="h-auto justify-start p-3 text-left">
                        <span>
                          <span className="block font-semibold">{t('english')}</span>
                          <span className="mt-0.5 block text-[11px] text-ph-muted">en-US</span>
                        </span>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            <Separator />
            <footer className="flex shrink-0 items-center justify-between gap-3 bg-ph-sidebar px-4 py-3">
              <span className="text-[11px] text-ph-muted">{t('autoSaved')}</span>
              <Button type="button" variant="ghost" size="sm" onClick={() => setRestoreDialogOpen(true)}>
                <ArrowCounterClockwiseIcon data-icon="inline-start" />
                {t('restore')}
              </Button>
            </footer>
          </div>
        </Tabs>

        <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>{t('restoreTitle')}</DialogTitle>
              <DialogDescription>{t('restoreDesc')}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRestoreDialogOpen(false)}>{t('cancel')}</Button>
              <Button type="button" variant="destructive" onClick={handleRestorePreferences}>{t('restoreConfirm')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ShellWindow>
  )
}
