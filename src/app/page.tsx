import HeroBox from '@/components/hero-box'
import ThemeToogle from '@/components/theme-toggle'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FiMail } from 'react-icons/fi'
import { SiGithub, SiStackblitz } from 'react-icons/si'
import LogoGrid from './logo-grid'

function SocialIcon({ icon, href }: { icon: ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-full w-8 h-8 p-2 duration-300 text-base bg-zinc-800 text-white hover:opacity-80 dark:bg-white dark:text-zinc-800 flex items-center justify-center ">
      {icon}
    </Link>
  )
}

export default async function Page() {
  return (
    <div className="flex flex-col">
      <div className="h-16 shrink-0"></div>
      <header className="fixed top-0 z-30 w-full backdrop-blur-md">
        <nav className="transition-all duration-500 h-16 px-16 py-3 flex items-center justify-between ">
          <div>42Architect</div>
          <ThemeToogle />
        </nav>
      </header>
      <main className="mt-16 px-16 font-bold text-2xl tracking-tighter mb-12">
        <div className="flex justify-between gap-x-16 mb-8">
          <div className="flex flex-col w-[60%]">
            <p className="text-6xl font-bold leading-tight tracking-normal mb-10">
              Be <span className="text-sky-500">Curious</span>,{' '}
              <span className="text-sky-500">Read</span> Widely,{' '}
              <span className="text-sky-500">Try</span> New Things.
            </p>
            <p className="text-3xl font-bold tracking-wide text-zinc-800 dark:text-zinc-300 mb-8">
              Hi👋, I'm Dan, A web developer. I'm interested in map (or GIS),
              data visualization, and fullstack development.
            </p>
            <div className="text-zinc-800 dark:text-zinc-300">
              <div className="flex items-center gap-6 mb-4">
                <SocialIcon icon={<FiMail />} href="rend42@163.com" />
                <SocialIcon icon={<SiGithub />} href="www.github.com" />
                <SocialIcon icon={<SiStackblitz />} href="www.stackblitz.com" />
                <Link
                  href="/blog"
                  className="text-base tracking-wide rounded border-2 border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-zinc-800 py-1 px-7 duration-300">
                  Blog
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[40%]">
            <HeroBox />
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <LogoGrid />
        </div>
      </main>
    </div>
  )
}
