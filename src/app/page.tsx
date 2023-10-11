import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FiMail } from 'react-icons/fi'
import { SiGithub, SiStackblitz } from 'react-icons/si'
import nextIcon from '../../public/thirteen.svg'

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
      </header>
      <main className="pt-8">
        <section className="flex flex-col justify-between gap-8 lg:flex-row md:gap-10 lg:gap-12">
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
          <div className="w-full lg:w-[40%] lg:max-w-[420px]">xxx</div>
        </section>
      </main>
    </div>
  )
}
