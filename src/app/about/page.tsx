import { getLocale, getTranslations } from 'next-intl/server'
import { StarMascot } from '@/components/star-mascot'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { getProfile, getSkills } from '@/data/profile'
import { resolveLocale } from '@/i18n/config'

export default async function AboutPage() {
  const locale = resolveLocale(await getLocale())
  const t = await getTranslations('AboutPage')
  const profile = getProfile(locale)
  const skills = getSkills(locale)

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5 pt-8 pb-14">
      <Card className="pixel-fade-in bg-[var(--pixel-panel)]">
        <CardContent className="p-5 md:p-6">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <div className="mx-auto">
              <StarMascot size={128} />
            </div>

            <div className="space-y-3">
              <Badge variant="magenta">{t('badge')}</Badge>
              <p className="text-[10px] text-[var(--pixel-cyan)]">{profile.title}</p>
              <p className="pixel-copy">{profile.intro}</p>
              <p className="text-[9px] text-[var(--muted-foreground)]">
                {t('domain')}
                :
                {' '}
                {profile.domain}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[var(--pixel-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--pixel-yellow)]">{t('skillMatrix')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map(skill => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between text-[9px] text-[var(--muted-foreground)]">
                <span>{skill.name}</span>
                <span>{`${skill.level}%`}</span>
              </div>
              <Progress value={skill.level} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-[var(--pixel-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--pixel-green)]">{t('originStory')}</CardTitle>
        </CardHeader>
        <Separator className="bg-[var(--pixel-border)]" />
        <CardContent className="space-y-3 pt-5">
          {profile.story.map(line => (
            <p key={line} className="pixel-copy">{line}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
