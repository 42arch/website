import ThemeSwitch from '@/components/theme-switch'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FiMail } from 'react-icons/fi'
import { SiGithub, SiStackblitz } from 'react-icons/si'
import nextIcon from '../../public/thirteen.svg'
import LogoGrid from './logo-grid'
import ProjectGallery from './project-gallery'

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      direction="ltr"
      width="180"
      height="80"
      viewBox="675.40 1011.92 191.10 132.84"
      strokeLinecap="round"
      strokeLinejoin="round">
      <defs />
      <g transform="matrix(1, 0, 0, 1, 631.95, 623.72)" opacity="1">
        <g>
          <defs>
            <mask id="shape_PBB2TyTIsZb1sjbhHpWH0_clip">
              <rect
                x="-24.54524498385696"
                y="320.20"
                width="327.10"
                height="268.84"
                fill="white"
              />
              <path
                d="M 208.46 459.63 L 202.55 489.04 L 180.03 469.22"
                fill="none"
                stroke="none"
              />
            </mask>
          </defs>
          <g mask="url(#shape_PBB2TyTIsZb1sjbhHpWH0_clip)">
            <rect
              x="-100"
              y="-100"
              width="327.10"
              height="268.84"
              fill="transparent"
              stroke="none"
            />
            <path
              d="M75.45475501614305,436.2394213187969 A79.75249419974568 79.75 0 0 1 202.55,489.0440309763436"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeDasharray="none"
              strokeDashoffset="none"
            />
          </g>
          <path
            d="M 208.46 459.63 L 202.55 489.04 L 180.03 469.22"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
        </g>
      </g>
    </svg>
  )
}

function SocialIcon({ icon, href }: { icon: ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-full w-8 h-8 p-2 duration-300 text-base bg-zinc-800 text-white hover:opacity-80 dark:bg-white dark:text-zinc-800 flex items-center justify-center">
      {icon}
    </Link>
  )
}

export default async function Page() {
  return (
    <div className="flex flex-col px-6 md:px-10 lg:px-16">
      <header className="h-20 pt-6 pb-2 flex justify-between items-center">
        <Link href="/">
          <Image priority src={nextIcon} alt="" />
        </Link>
        <ThemeSwitch />
      </header>
      <main className="py-8">
        <section className="flex flex-col justify-around gap-8 lg:flex-row md:gap-10 lg:gap-12">
          <div className="w-full lg:w-[60%] lg:max-w-[720px]">
            <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl mb-4">
              I’m Dana Parker, a digital artist residing and crafting artwork in
              Amsterdam.
            </h1>
            <h2 className="text-zinc-700 dark:text-zinc-300 mb-8">
              I was born in Portugal and studied graphic design at the Gerrit
              Rietveld Academie in Amsterdam. I have worked in branding and web
              design studios as an art director. 站酷仓耳 站酷仓耳 站酷仓耳;
            </h2>
            <div className="flex items-center gap-6 mb-4">
              <SocialIcon icon={<FiMail />} href="rend42@163.com" />
              <SocialIcon icon={<SiGithub />} href="www.github.com" />
              <SocialIcon icon={<SiStackblitz />} href="www.stackblitz.com" />
              <Link
                href="/blog"
                className="text-semibold tracking-wide rounded border-2 border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-zinc-800 py-1 px-7 duration-300">
                Blog
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-[40%] lg:max-w-[420px]">
            <div className="h-20 flex items-center -translate-y-2 -translate-x-16 text-zinc-700 dark:text-zinc-300">
              <span className="font-handwrite text-2xl translate-x-16 translate-y-2">
                drag this
              </span>
              <Arrow />
            </div>
            <LogoGrid />
          </div>
        </section>
        <section className="w-full">
          <ProjectGallery />
        </section>
      </main>
    </div>
  )
}
