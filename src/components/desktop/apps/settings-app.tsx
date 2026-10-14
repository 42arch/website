'use client'

import type { Locale } from '@/i18n/config'
import type { WallpaperName } from '../app-registry'
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { setUserLocale } from '@/services/locale'
import { AppPage, AppPageHeading, SmallLabel } from './page-primitives'

const wallpapers: { id: WallpaperName, name: Record<Locale, string>, caption: string }[] = [
  { id: 'blue', name: { zh: '晴空蓝', en: 'Open sky' }, caption: 'A quiet morning' },
  { id: 'sage', name: { zh: '鼠尾草绿', en: 'Sage garden' }, caption: 'Into the garden' },
  { id: 'dusk', name: { zh: '暮色紫', en: 'Evening dusk' }, caption: 'After the sunset' },
]

const themes = [
  { id: 'light', name: { zh: '浅色', en: 'Light' }, description: { zh: '清亮纸感', en: 'Soft and airy' } },
  { id: 'dark', name: { zh: '深色', en: 'Dark' }, description: { zh: '夜间桌面', en: 'Easy on the eyes' } },
  { id: 'system', name: { zh: '跟随系统', en: 'System' }, description: { zh: '自动切换', en: 'Match your device' } },
] as const

const languages: { id: Locale, name: string, description: Record<Locale, string> }[] = [
  { id: 'zh', name: '简体中文', description: { zh: '界面语言', en: 'Chinese interface' } },
  { id: 'en', name: 'English', description: { zh: '界面语言', en: 'English interface' } },
]

export function SettingsApp({ wallpaper, onWallpaper, onReset }: {
  wallpaper: WallpaperName
  onWallpaper: (value: WallpaperName) => void
  onReset: () => void
}) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const [isChangingLocale, startTransition] = useTransition()
  const copy = locale === 'zh'
    ? {
        eyebrow: 'PREFERENCES / 01',
        title: '让桌面更像你。',
        description: '选择舒适的语言与光线，其他细节也可以慢慢调整。',
        language: '语言',
        appearance: '外观',
        wallpaper: '桌面壁纸',
        help: '桌面小贴士',
        tipOne: '单击图标打开窗口，拖动标题栏调整位置。',
        tipTwo: '双击标题栏放大窗口，黄色按钮收起到 Dock。',
        tipThree: '⌘ / Ctrl + K 快速查找应用；Esc 收起当前窗口。',
        reset: '整理桌面',
        languageDescription: '更改界面的显示语言',
        appearanceDescription: '选择你偏好的显示方式',
        wallpaperDescription: '每种颜色都有一点不同的天气。',
      }
    : {
        eyebrow: 'PREFERENCES / 01',
        title: 'Make this desktop yours.',
        description: 'Choose the language and appearance that feel right.',
        language: 'Language',
        appearance: 'Appearance',
        wallpaper: 'Wallpaper',
        help: 'A few desktop tips',
        tipOne: 'Click an icon to open it; drag a title bar to move a window.',
        tipTwo: 'Double-click a title bar to expand. The yellow button minimizes.',
        tipThree: 'Use ⌘ / Ctrl + K to find an app, or Esc to minimize the front window.',
        reset: 'Reset desktop',
        languageDescription: 'Choose the language used across the interface.',
        appearanceDescription: 'Choose how the desktop looks on this device.',
        wallpaperDescription: 'Each color comes with a different kind of weather.',
      }

  function changeLocale(value: string) {
    if (value === locale || (value !== 'zh' && value !== 'en'))
      return

    startTransition(async () => {
      await setUserLocale(value)
      router.refresh()
    })
  }

  return (
    <AppPage className="[&_h3]:text-xs [&_h3]:font-medium">
      <AppPageHeading>
        <SmallLabel>{copy.eyebrow}</SmallLabel>
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
      </AppPageHeading>

      <section className="mt-1 border-t border-[var(--line)] pt-[18px]" aria-labelledby="settings-language-title">
        <div className="flex items-start justify-between gap-[18px]">
          <div>
            <h3 id="settings-language-title">{copy.language}</h3>
            <p className="mt-1 text-[10px] leading-[1.7] text-[var(--subtle)]">{copy.languageDescription}</p>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--line)] px-2 py-1 text-[9px] text-[var(--subtle)]">{locale === 'zh' ? '简体中文' : 'English'}</span>
        </div>
        <ToggleGroup
          className="mt-3 flex w-full gap-2 [&>button]:relative [&>button]:flex [&>button]:min-h-[49px] [&>button]:min-w-0 [&>button]:flex-1 [&>button]:flex-col [&>button]:items-start [&>button]:justify-center [&>button]:gap-[3px] [&>button]:rounded-[7px] [&>button]:border [&>button]:border-[var(--line)] [&>button]:bg-[color-mix(in_srgb,var(--paper)_85%,transparent)] [&>button]:px-3 [&>button]:py-2 [&>button]:text-left [&>button:hover]:bg-[var(--paper-muted)] [&>button[data-state=on]]:border-[var(--blue)] [&>button[data-state=on]]:bg-[color-mix(in_srgb,var(--blue)_10%,var(--paper))] [&>button[data-state=on]]:text-[var(--ink)] [&>button>span:first-child]:text-[11px] [&>button>span:first-child]:font-medium [&>button>small]:text-[9px] [&>button>small]:text-[var(--subtle)]"
          type="single"
          variant="outline"
          value={locale}
          disabled={isChangingLocale}
          onValueChange={changeLocale}
          aria-label={copy.language}
        >
          {languages.map(language => (
            <ToggleGroupItem key={language.id} value={language.id} aria-label={language.name}>
              <span>{language.name}</span>
              <small>{language.description[locale]}</small>
              {locale === language.id && <CheckIcon className="absolute right-2 top-2 text-[var(--blue)]" size={15} aria-hidden="true" />}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>

      <section className="mt-1 border-t border-[var(--line)] pt-[18px]" aria-labelledby="settings-appearance-title">
        <div className="flex items-start justify-between gap-[18px]">
          <div>
            <h3 id="settings-appearance-title">{copy.appearance}</h3>
            <p className="mt-1 text-[10px] leading-[1.7] text-[var(--subtle)]">{copy.appearanceDescription}</p>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--line)] px-2 py-1 text-[9px] text-[var(--subtle)]">{themes.find(option => option.id === theme)?.name[locale] ?? themes[2].name[locale]}</span>
        </div>
        <ToggleGroup
          className="mt-3 flex w-full gap-2 [&>button]:relative [&>button]:flex [&>button]:min-h-[55px] [&>button]:min-w-0 [&>button]:flex-1 [&>button]:flex-col [&>button]:items-start [&>button]:justify-center [&>button]:gap-[3px] [&>button]:rounded-[7px] [&>button]:border [&>button]:border-[var(--line)] [&>button]:bg-[color-mix(in_srgb,var(--paper)_85%,transparent)] [&>button]:px-3 [&>button]:py-2 [&>button]:text-left [&>button:hover]:bg-[var(--paper-muted)] [&>button[data-state=on]]:border-[var(--blue)] [&>button[data-state=on]]:bg-[color-mix(in_srgb,var(--blue)_10%,var(--paper))] [&>button[data-state=on]]:text-[var(--ink)] [&>button>span:first-child]:text-[11px] [&>button>span:first-child]:font-medium [&>button>small]:text-[9px] [&>button>small]:text-[var(--subtle)]"
          type="single"
          variant="outline"
          value={theme ?? 'system'}
          onValueChange={(value) => {
            if (value === 'light' || value === 'dark' || value === 'system')
              setTheme(value)
          }}
          aria-label={copy.appearance}
        >
          {themes.map(option => (
            <ToggleGroupItem key={option.id} value={option.id} aria-label={option.name[locale]}>
              <span>{option.name[locale]}</span>
              <small>{option.description[locale]}</small>
              {theme === option.id && <CheckIcon className="absolute right-2 top-2 text-[var(--blue)]" size={15} aria-hidden="true" />}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>

      <section className="mt-1 border-t border-[var(--line)] pt-[18px]" aria-labelledby="settings-wallpaper-title">
        <div className="flex items-start justify-between gap-[18px]">
          <div>
            <h3 id="settings-wallpaper-title">{copy.wallpaper}</h3>
            <p className="mt-1 text-[10px] leading-[1.7] text-[var(--subtle)]">{copy.wallpaperDescription}</p>
          </div>
        </div>
        <ToggleGroup className="my-[15px] mb-[26px] grid w-full grid-cols-3 gap-[18px] max-[700px]:gap-[10px]" type="single" value={wallpaper} onValueChange={value => value && onWallpaper(value as WallpaperName)} aria-label={copy.wallpaper}>
          {wallpapers.map(option => (
            <ToggleGroupItem key={option.id} className="flex w-full min-w-0 flex-col items-stretch border-0 bg-transparent p-0 text-left hover:bg-transparent hover:text-[var(--ink)] data-[state=on]:bg-transparent" value={option.id} aria-label={option.name[locale]}>
              <span className={`mb-[10px] grid h-[85px] place-items-center rounded-md border-[3px] border-[var(--paper)] text-[#f6f9f1] outline outline-1 outline-transparent ${option.id === 'blue' ? 'bg-[#9bb2c7]' : option.id === 'sage' ? 'bg-[#afc0a9]' : 'bg-[#aaa1bc]'} ${wallpaper === option.id ? 'outline-[var(--blue)]' : ''} max-[700px]:h-[62px]`}>{wallpaper === option.id && <CheckIcon size={22} />}</span>
              <strong className="block text-[11px] font-medium">{option.name[locale]}</strong>
              <span className="mt-1 block text-[9px] text-[#8a9489] max-[700px]:text-[7px]">{option.caption}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>

      <div className="mb-[22px] border-t border-[var(--line)] pt-5 [&>p]:mt-2 [&>p]:text-[11px] [&>p]:text-[var(--subtle)] [&_kbd]:rounded-[3px] [&_kbd]:border [&_kbd]:border-[var(--line)] [&_kbd]:bg-[var(--paper-muted)] [&_kbd]:px-1 [&_kbd]:py-0.5 [&_kbd]:text-[10px] max-[700px]:[&>p]:text-[10px] max-[700px]:[&>p]:leading-[1.8]">
        <h3>{copy.help}</h3>
        <p>{copy.tipOne}</p>
        <p>{copy.tipTwo}</p>
        <p>{copy.tipThree}</p>
      </div>
      <Button variant="outline" onClick={onReset}>{copy.reset}</Button>
    </AppPage>
  )
}
