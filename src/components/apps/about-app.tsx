'use client'

import type { ReactNode } from 'react'
import { ArrowSquareOutIcon, CodeIcon, GithubLogoIcon, InfoIcon, MonitorIcon, TranslateIcon } from '@phosphor-icons/react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { ShellWindow } from '@/components/shell/window'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import packageJson from '../../../package.json'

interface ClientEnvironment {
  browser: string | null
  operatingSystem: string | null
  language: string
}

function detectClientEnvironment(): ClientEnvironment {
  const { language, userAgent } = window.navigator
  let browser: string | null = null
  let operatingSystem: string | null = null

  if (/Edg\//.test(userAgent))
    browser = 'Microsoft Edge'
  else if (/OPR\//.test(userAgent))
    browser = 'Opera'
  else if (/Firefox\//.test(userAgent))
    browser = 'Mozilla Firefox'
  else if (/Chrome\//.test(userAgent))
    browser = 'Google Chrome'
  else if (/Safari\//.test(userAgent))
    browser = 'Safari'

  if (/Windows NT/.test(userAgent))
    operatingSystem = 'Windows'
  else if (/Android/.test(userAgent))
    operatingSystem = 'Android'
  else if (/iPhone|iPad|iPod/.test(userAgent))
    operatingSystem = 'iOS / iPadOS'
  else if (/Macintosh|Mac OS X/.test(userAgent))
    operatingSystem = 'macOS'
  else if (/Linux/.test(userAgent))
    operatingSystem = 'Linux'

  return { browser, operatingSystem, language }
}

function InfoRow({ icon, label, value }: { icon: ReactNode, label: string, value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] items-start gap-3 text-xs">
      <dt className="flex items-center gap-2 text-ph-muted">
        {icon}
        {label}
      </dt>
      <dd className="break-words text-right font-medium text-ph-ink">{value}</dd>
    </div>
  )
}

const technologyStack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand']

export function AboutApp() {
  const t = useTranslations('apps.about')
  const locale = useLocale()
  const [environment, setEnvironment] = useState<ClientEnvironment | null>(null)

  useEffect(() => {
    setEnvironment(detectClientEnvironment())
  }, [])

  const pendingValue = t('detecting')

  return (
    <ShellWindow
      id="about"
      title={t('title')}
      icon={<InfoIcon size={14} weight="regular" className="text-ph-muted" />}
      defaultWidth="min(650px, 94vw)"
      defaultHeight="min(520px, 78vh)"
      defaultLeft={180}
      defaultTop={72}
    >
      <div className="grid min-h-0 min-w-0 flex-1 content-start auto-rows-max gap-4 overflow-y-auto p-3 sm:p-5">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-ph-orange/10 text-ph-orange">
              <MonitorIcon size={28} weight="duotone" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base font-semibold">Starllow OS</CardTitle>
              <CardDescription>{t('tagline')}</CardDescription>
            </div>
            <Badge variant="secondary" className="font-mono">v{packageJson.version}</Badge>
          </CardHeader>
        </Card>

        <div className="grid auto-rows-max gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon size={15} weight="regular" className="text-ph-orange" />
                {t('environmentTitle')}
              </CardTitle>
              <CardDescription>{t('environmentDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <dl>
                <div className="flex flex-col gap-3">
                  <InfoRow
                    icon={<MonitorIcon size={14} weight="regular" />}
                    label={t('operatingSystem')}
                    value={environment ? environment.operatingSystem ?? t('unknown') : pendingValue}
                  />
                  <Separator />
                  <InfoRow
                    icon={<InfoIcon size={14} weight="regular" />}
                    label={t('browser')}
                    value={environment ? environment.browser ?? t('unknown') : pendingValue}
                  />
                  <Separator />
                  <InfoRow
                    icon={<TranslateIcon size={14} weight="regular" />}
                    label={t('language')}
                    value={environment?.language ?? locale}
                  />
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CodeIcon size={15} weight="regular" className="text-ph-orange" />
                {t('technologyTitle')}
              </CardTitle>
              <CardDescription>{t('technologyDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {technologyStack.map(technology => (
                <Badge key={technology} variant="outline">{technology}</Badge>
              ))}
            </CardContent>
            <CardFooter className="justify-start">
              <Button asChild variant="outline" size="sm">
                <a href={packageJson.repository.url} target="_blank" rel="noreferrer">
                  <GithubLogoIcon data-icon="inline-start" weight="regular" />
                  {t('sourceCode')}
                  <ArrowSquareOutIcon data-icon="inline-end" weight="regular" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ShellWindow>
  )
}
