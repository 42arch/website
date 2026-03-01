import { getLocale, getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProjects } from '@/data/projects'
import { resolveLocale } from '@/i18n/config'

export default async function ProjectsPage() {
  const locale = resolveLocale(await getLocale())
  const t = await getTranslations('ProjectsPage')
  const projects = getProjects(locale)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pt-8 pb-14">
      <header className="pixel-fade-in space-y-3">
        <Badge variant="yellow">{t('title')}</Badge>
        <p className="pixel-copy">
          {'> '}
          {t('description')}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {projects.map(project => (
          <Card key={project.name} className="flex h-full flex-col bg-[var(--pixel-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">{project.icon}</span>
                <span>{project.name}</span>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="mt-1 flex flex-wrap gap-2">
                <Badge variant="cyan">{project.type}</Badge>
                {project.wip && <Badge variant="yellow">WIP</Badge>}
                {project.tags.map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="mt-auto flex flex-wrap gap-2">
              {project.liveUrl && (
                <Button asChild variant="cyan" size="sm">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('live')}
                  </Link>
                </Button>
              )}
              {!project.liveUrl && (
                <Button variant="ghost" size="sm" disabled>{t('live')}</Button>
              )}
              {project.repoUrl && (
                <Button asChild variant="yellow" size="sm">
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('source')}
                  </Link>
                </Button>
              )}
              {!project.repoUrl && (
                <Button variant="ghost" size="sm" disabled>{t('source')}</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  )
}
