import { SiTailwindcss, SiNextdotjs, SiVercel } from 'react-icons/si'

export const SiteFooter = () => {
  return (
    <footer className="container">
      <div className="flex flex-col items-center justify-between gap-0 text-sm leading-loose text-slate-600 dark:text-slate-400 border-t border-t-slate-200 py-10 dark:border-t-slate-700 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0 text-center">
          <p className="truncate flex items-center text-sm leading-loose">
            <span>Built with</span> <SiNextdotjs className="mx-2" /> and{' '}
            <SiTailwindcss className="mx-2" />, Deployed on{' '}
            <SiVercel className="mx-2" /> .
          </p>
        </div>
        <p className="truncate">
          The source code is available on{' '}
          <a
            href={'https://github.com/42arch/website'}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4">
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
