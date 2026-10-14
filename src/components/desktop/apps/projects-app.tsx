'use client'

import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { GithubLogoIcon } from '@phosphor-icons/react/dist/csr/GithubLogo'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { profile, projects } from '@/lib/desktop-content'
import { Artwork } from '../artwork'
import { AppPage, AppPageHeading, SmallLabel } from './page-primitives'

export function ProjectsApp() {
  const [selected, setSelected] = useState<number | null>(null)
  if (selected !== null) {
    const project = projects[selected]
    return (
      <AppPage className="mx-auto max-w-[800px]">
        <Button variant="ghost" onClick={() => setSelected(null)}>
          <ArrowLeftIcon data-icon="inline-start" />
          所有作品
        </Button>
        <div className="my-[15px] mb-[23px] h-[220px] overflow-hidden rounded-[7px] max-[700px]:h-[180px] [&>div]:h-full [&>div]:[aspect-ratio:auto]"><Artwork variant={project.art} /></div>
        <SmallLabel>{project.category}</SmallLabel>
        <h2 className="my-2 mb-[10px] text-[28px] font-medium leading-[1.45] tracking-[-.04em] max-[700px]:text-[25px]">{project.title}</h2>
        <p className="text-xs leading-[1.9] text-[var(--subtle)]">{project.description}</p>
        <div className="my-5 flex flex-wrap gap-2 text-[10px] text-[var(--subtle)]">{project.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
        <Button asChild size="lg">
          <a href={project.url} target="_blank" rel="noreferrer">
            在 GitHub 查看
            <GithubLogoIcon data-icon="inline-end" />
          </a>
        </Button>
      </AppPage>
    )
  }
  return (
    <AppPage>
      <AppPageHeading>
        <SmallLabel>SELECTED WORK</SmallLabel>
        <h2>把想法做出来。</h2>
        <p>一些工具、一些实验，还有一些持续生长的好奇心。</p>
      </AppPageHeading>
      <div className="grid grid-cols-3 gap-[19px] max-[850px]:gap-3 max-[700px]:grid-cols-1 max-[700px]:gap-[27px]">
        {projects.map((project, i) => (
          <button className="min-w-0 text-left [&>div]:[aspect-ratio:1.25] [&>div]:rounded-md [&>div>svg]:transition-transform [&>div>svg]:duration-500 hover:[&>div>svg]:scale-[1.06] max-[700px]:[&>div]:[aspect-ratio:1.8]" key={project.title} onClick={() => setSelected(i)}>
            <Artwork variant={project.art} />
            <span className="my-[14px] mb-[7px] flex justify-between text-[9px] text-[var(--subtle)]">
              {project.category}
              <ArrowUpRightIcon size={16} />
            </span>
            <strong className="block text-[17px] font-medium tracking-[-.03em] max-[850px]:text-sm max-[700px]:text-xl">{project.title}</strong>
            <span className="mt-[7px] block text-[10px] text-[#8b9488] max-[850px]:text-[9px] max-[700px]:text-[11px]">{project.subtitle}</span>
          </button>
        ))}
      </div>
      <a className="mt-7 inline-flex items-center gap-1.5 text-[11px] text-[var(--blue)]" href={profile.github} target="_blank" rel="noreferrer">
        更多项目在 GitHub
        <ArrowUpRightIcon size={16} />
      </a>
    </AppPage>
  )
}
