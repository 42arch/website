import Image from 'next/image'

export default function Home() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <section className="container grid items-center justify-center gap-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-16 lg:pb-24">
        <Image
          src="/images/hero.svg"
          height={250}
          width={250}
          alt="Hero image"
          priority
        />
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-5xl md:text-6xl">
          What's going on here?
        </h1>
        <p className="max-w-[42rem] leading-normal text-slate-600 dark:text-slate-400 sm:text-xl sm:leading-8">
          I'm building a web app with Next.js 13 and open sourcing everything.
          Follow along as we figure this out together.
        </p>
      </section>
    </div>
  )
}
