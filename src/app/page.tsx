import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function Index() {
  const t = await getTranslations('Index')

  return (
    <section className='relative overflow-clip bg-gradient-to-t px-4 py-12 sm:px-6 md:mx-auto md:max-w-[1248px]'>
      <section className='flex w-full flex-col items-center '>
        <p>🌟</p>

        <h1 className='mb-8 mt-2 text-center text-4xl font-bold'>
          {t('title')}
        </h1>
        <Image
          src='/starllow.webp'
          alt='starllow'
          width={300}
          height={300}
          className='mt-8 rounded-md object-cover'
        />
      </section>
    </section>
  )
}
