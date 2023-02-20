interface AboutLayoutProps {
  children: React.ReactNode
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="container mx-auto max-w-5xl py-6 lg:py-10">
      <div className="container">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl md:leading-14">
            About Me
          </h1>
        </div>
        {children}
      </div>
    </div>
  )
}
