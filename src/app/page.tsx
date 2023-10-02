import HeroBox from '@/components/hero-box'
import ThemeToogle from '@/components/theme-toggle'

export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-16 shrink-0"></div>
      <header className="fixed top-0 z-30 w-full backdrop-blur-md">
        <nav className="transition-all duration-500 h-16 px-8 py-3 flex items-center justify-between ">
          <div>42Architect</div>
          <ThemeToogle />
        </nav>
      </header>
      <main className="mt-16 px-8 font-bold text-2xl tracking-tighter">
        <div className="h-[420px] flex justify-between gap-x-16">
          <div className="flex flex-col w-[60%]">
            <p className="text-7xl font-bold leading-tight tracking-tighter mb-10">
              Be <span className="text-sky-500">Curious</span>,{' '}
              <span className="text-sky-500">Read</span> Widely,{' '}
              <span className="text-sky-500">Try</span> New Things.
            </p>
            <p className="text-right text-xl italic px-8 opacity-80">
              -- Aaron Swartz
            </p>
            <p className="text-3xl font-bold text-zinc-700 dark:text-zinc-300 py-4">
              Hi, I'm Dan, A web developer. I'm interested in map (or GIS), data
              visualization, and fullstack development.
            </p>
          </div>
          <div className="w-[40%]">
            <HeroBox />
          </div>
        </div>
        <div className="my-8 text-zinc-700 dark:text-zinc-300">
          <p className="text-center">I build things with</p>
        </div>
      </main>
    </div>
  )
}
