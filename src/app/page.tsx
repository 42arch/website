import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

type Project = {
  name: string
  icon: string
  wip?: boolean
  description: string
  link: string
  source: string
}

const projects: Project[] = [
  {
    name: 'Playground',
    icon: 'i-fluent-emoji-circus-tent',
    description:
      'Our experimental demos and examples',
    link: 'https://playground.starllow.com',
    source: 'https://github.com/42arch/playground'
  },
  {
    name: 'geojson.io for vscode',
    icon: 'i-fluent-emoji-globe-showing-europe-africa',
    description:
      'An extension that helps user to create, edit, and preview geojson data in VSCode.',
    link: 'https://marketplace.visualstudio.com/items?itemName=swallow.geojson-io-for-vscode',
    source: 'https://github.com/42arch/geojson.io-for-vscode'
  },
  {
    name: '宝可梦中文图鉴',
    icon: 'i-fluent-emoji-cat-face',
    description: '快速查询，随时了解你的宝可梦伙伴！',
    link: 'https://pokedex.starllow.com',
    source: 'https://github.com/42arch/pokedex-zh'
  },
  {
    name: 'geoflow',
    wip: true,
    icon: 'i-fluent-emoji-toolbox',
    description: 'Lightweight spatial analysis workflow. Working in progress',
    link: '',
    source: ''
  }
]

function ProjectItem({ name, icon, description, link, wip }: Project) {
  return (
    <a
      className={cn(
        'rounded-md bg-accent px-4 py-3 transition-colors ',
        wip
          ? 'pointer-events-none cursor-not-allowed text-muted-foreground'
          : 'cursor-pointer hover:bg-secondary'
      )}
      href={wip ? '' : link}
      target='_blank'
      rel='noreferrer'
    >
      <div className={cn('flex h-full items-center')}>
        <span className={cn('inline-block h-8 w-8', icon)}></span>
        <div className='ml-2 flex grow flex-col gap-1 w-[calc(100%-32px)]'>
          <span className='text-left'>{name}</span>
          <span className='text-left text-xs text-accent-foreground'>{description}</span>
        </div>
      </div>
    </a>
  )
}

type Member = {
  name: string
  realname?: string
  bio?: string
  avatar: string
  email?: string
  github?: string
  x?: string
  bsky?: string
}

const members: Member[] = [
  {
    name: '42arch',
    realname: 'Ren Dan',
    bio: "The first and the only member of the lab.",
    email: 'rend42@163.com',
    avatar: 'https://avatars.githubusercontent.com/u/20656708?v=4',
    github: 'https://github.com/42arch',
    bsky: 'https://42arch.bsky.social'
  }
]

function MemberItem({ name, avatar, realname, bio, email, github, bsky }: Member) {
  const socialCss =
    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700'
  return (
    <div className='rounded-md bg-accent px-4 py-3 transition-colors'>
      <div className='flex flex-row items-center gap-4'>
        <Image
          src={avatar}
          alt={name}
          width={42}
          height={42}
          className='rounded-full object-cover'
        />
        <div className='truncate'>
          <span> {name}</span>
          {realname && <span className='ml-1 text-xs'>({realname})</span>}
        </div>
      </div>

      <div className='text-sm mt-3 text-accent-foreground'>
        <p>{bio}</p>
      </div>

      <div className='mt-3 flex flex-wrap gap-4'>
        {email && (
          <a href={`mailto:${email}`} className={socialCss}>
            <span className='i-lucide-mail h-4 w-4'></span>
          </a>
        )}
        {github && (
          <a
            className={socialCss}
            href={github}
            target='_blank'
            rel='noreferrer'
          >
            <span className='i-lucide-github h-4 w-4'></span>
          </a>
        )}
        {bsky && (
          <a className={socialCss} href={bsky} target='_blank' rel='noreferrer'>
            <span className='i-logos-bluesky h-4 w-4'></span>
          </a>
        )}
      </div>
    </div>
  )
}

export default async function IndexPage() {
  const t = await getTranslations('index')

  return (
    <section className='relative overflow-clip bg-gradient-to-t px-4 py-12 sm:px-6 md:mx-auto md:max-w-[1248px]'>
      <section className='flex w-full flex-col items-center '>
        <h1 className='mb-8 mt-2 text-center text-4xl font-bold'>
          {t('title')}
        </h1>
        <Image
          src='/starllow.webp'
          alt='starllow'
          width={300}
          height={300}
          className='rounded-md object-cover'
        />
      </section>

      <section className='mt-8 flex w-full flex-col items-center '>
        <h2 className='my-2 w-full text-left text-xl font-semibold text-accent-foreground'>
          {t('projects')}
        </h2>
        <div className='mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
          {projects.map((item) => (
            <ProjectItem key={item.name} {...item} />
          ))}
        </div>
      </section>

      <section className='mt-8 flex w-full flex-col items-center '>
        <h2 className='my-2 w-full text-left text-xl font-semibold text-accent-foreground'>
          {t('contact')}
        </h2>
        <div className='mt-2 flex w-full flex-col gap-4'>
          {members.map((item) => (
            <MemberItem key={item.name} {...item} />
          ))}
        </div>
      </section>
    </section>
  )
}
