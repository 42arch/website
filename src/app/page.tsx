import Link from 'next/link'
import { ReactNode } from 'react'
import { FiMail } from 'react-icons/fi'
import { SiGithub, SiStackblitz } from 'react-icons/si'
import { City3D } from './city-3d'

function SocialIcon({ icon, href }: { icon: ReactNode; href: string }) {
  return (
    <Link
      href={href}
      target="__blank"
      className="rounded-full w-8 h-8 p-2 duration-300 text-base bg-zinc-800 text-white hover:opacity-80 dark:bg-white dark:text-zinc-800 flex items-center justify-center">
      {icon}
    </Link>
  )
}

export default async function Page() {
  return (
    <>
      <City3D />
      <section className="absolute pointer-events-none text-light w-full bg-transparent h-1/2 translate-y-1/2 z-10">
        <h1 className="text-4xl lg:text-8xl text-center leading-relaxed font-bold">
          Welcome To City 42.
        </h1>
        <h4 className="text-sm text-center text-zinc-600 mt-4">
          -- This is dan's personal website, reach more from below. --
        </h4>
        <div className="flex items-center justify-center gap-6 mt-8 pointer-events-auto">
          <SocialIcon icon={<FiMail />} href="mailto:rend42@163.com" />
          <SocialIcon
            icon={<SiGithub />}
            href="https://www.github.com/42arch"
          />
          <SocialIcon
            icon={<SiStackblitz />}
            href="https://stackblitz.com/@42arch"
          />
          <Link
            href="/post"
            className="text-semibold tracking-wide py-1 px-8 rounded border-2 border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-zinc-800 duration-300">
            Blog
          </Link>
        </div>
      </section>
    </>
  )
}
