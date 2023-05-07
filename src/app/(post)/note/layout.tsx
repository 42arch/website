interface AboutLayoutProps {
  children: React.ReactNode
}

export async function generateMetadata() {
  return {
    title: '42arch | note',
    description:
      "42Arch, Dan's personal site. The collection of notes and records."
  }
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl md:leading-14">
          Notes 🗒️
        </h1>
      </div>
      {children}
    </>
  )
}
