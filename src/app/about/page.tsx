import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('nav')

  return (
    <div className='p-4'>
      <h1 className='my-4 text-2xl font-bold text-accent-foreground'>
        {t('about')}
      </h1>

      <div className='prose dark:prose-invert'>
        <p className='text-sm'>
          This website is build with Next.js, TailwindCSS and
          Content-Collections. Deployed on Vercel and Proxyed by Cloudflare.
        </p>
      </div>
    </div>
  )
}
