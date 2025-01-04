import { getTranslations } from 'next-intl/server'
import ContentList from './content-list'

export default async function ShuoPage() {
  const t = await getTranslations('nav')
  return (
    <div className='p-4'>
      <h1 className='my-4 text-2xl font-bold text-accent-foreground'>
        {t('shuo')}
      </h1>

      <ContentList />
    </div>
  )
}
