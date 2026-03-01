import process from 'node:process'
import { getTranslations } from 'next-intl/server'
import { LastBuild } from '@/components/last-build'
import { LocaleToggle } from '@/components/locale-toggle'
import { ThemeToggle } from '@/components/theme-toggle'

export async function PixelFooter() {
  const year = new Date().getFullYear()
  const t = await getTranslations('Footer')
  const rawBuildTime = process.env.buildTime
  const buildTime = rawBuildTime ? Number(rawBuildTime) : Number.NaN

  return (
    <footer className="pixel-footer-shell border-t-4 border-[var(--pixel-border-highlight)] bg-[var(--pixel-darker)] px-4 py-5">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 text-[10px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                className="underline-offset-2 transition-colors hover:text-[var(--pixel-cyan)] hover:underline"
                href="https://dashboard.openpanel.dev/share/overview/a571gO"
                target="_blank"
                rel="noreferrer"
              >
                {t('track')}
              </a>
              <a
                className="underline-offset-2 transition-colors hover:text-[var(--pixel-cyan)] hover:underline"
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
              >
                {t('sitemap')}
              </a>
              <a
                className="underline-offset-2 transition-colors hover:text-[var(--pixel-cyan)] hover:underline"
                href="/feed.xml"
                target="_blank"
                rel="noreferrer"
              >
                {t('rss')}
              </a>
            </p>
            <div className="text-center md:text-left">
              <LastBuild buildTime={buildTime} label={t('lastBuild')} />
            </div>
          </div>

          <div className="space-y-1 text-center md:text-right">
            <p>
              <a
                className="transition-colors hover:text-[var(--pixel-yellow)]"
                href="https://icp.gov.moe/?keyword=20254242"
                target="_blank"
                rel="noreferrer"
              >
                {t('icp')}
              </a>
            </p>
            <p className="text-[var(--muted-foreground)]">{t('copyrightSimple', { year })}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>

        <p className="text-center text-[var(--muted-foreground)]">
          <a
            className="underline-offset-2 transition-colors hover:text-[var(--pixel-cyan)] hover:underline"
            href="https://github.com/42arch/website"
            target="_blank"
            rel="noreferrer"
          >
            {t('builtWith')}
          </a>
        </p>
      </div>
    </footer>
  )
}
