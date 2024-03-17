import Image from 'next/image'
import Link from 'next/link'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

interface Props {
  data: {
    name: string
    intro: string
    tag: string[]
    site: string
    repo: string
  }
}

export default function Project({ data }: Props) {
  return (
    <div className="flex shrink-0 grow-0 basis-[260px] flex-col items-center justify-evenly rounded-lg bg-zinc-200 p-4 dark:bg-zinc-800 md:basis-[320px]">
      <>
        <Image
          className="rounded-t-lg"
          width={320}
          height={80}
          src="/images/project-cover.jpg"
          alt={data.name}
        />
        <div className="border-b border-zinc-300 border-opacity-80 p-2 dark:border-zinc-700">
          <h3 className="mb-2 text-lg font-semibold md:text-xl">{data.name}</h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 md:text-base">
            {data.intro}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 p-2 pt-4">
          {data.tag.map((t) => (
            <span
              key={t}
              className="rounded-full bg-zinc-700 px-2 py-1 text-xs text-zinc-300 dark:bg-zinc-300 dark:text-zinc-700">
              {t}
            </span>
          ))}
        </div>
        <div className="flex justify-between gap-8 p-2">
          <Link href={data.site!} target="__blank">
            <FiExternalLink
              className="cursor-pointer text-lg hover:opacity-60"
              height={36}
              width={36}
            />
          </Link>

          <Link href={data.repo} target="__blank">
            <FiGithub
              className="cursor-pointer text-lg hover:opacity-60"
              height={36}
              width={36}
            />
          </Link>
        </div>
      </>
    </div>
  )
}
