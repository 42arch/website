'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { PixelIcon } from '@/components/pixel-icon'
import { StarMascot } from '@/components/star-mascot'
import { Typewriter } from '@/components/typewriter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function HomeHero() {
  const t = useTranslations('HomeHero')

  return (
    <section className="pixel-fade-in flex flex-col items-center gap-8 py-8 text-center md:py-14">
      <StarMascot />

      <div className="space-y-4">
        <Badge variant="cyan">{t('booting')}</Badge>
        <h1 className="text-xl leading-8 text-pixel-green md:text-3xl">{t('title')}</h1>
        <div className="mx-auto min-h-8 text-[12px] text-pixel-yellow md:text-base">
          <Typewriter
            texts={[t('line1'), t('line2'), t('line3')]}
          />
        </div>
      </div>

      <Card className="w-full max-w-2xl bg-pixel-panel text-left md:text-center">
        <CardContent className="p-5">
          <p className="pixel-copy">
            {'> '}
            {t('intro1')}
            {t('intro2') && (
              <>
                <br />
                {t('intro2')}
              </>
            )}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="green" size="lg">
          <Link href="/projects" className="inline-flex items-center gap-1.5">
            <PixelIcon name="chart-network" size={13} />
            {t('viewProjects')}
          </Link>
        </Button>
        <Button asChild variant="cyan" size="lg">
          <Link href="/blog" className="inline-flex items-center gap-1.5">
            <PixelIcon name="bookmark" size={13} />
            {t('readBlog')}
          </Link>
        </Button>
      </div>
    </section>
  )
}
