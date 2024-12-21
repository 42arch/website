import { fetchData } from '@/lib/fetch'
import { Shuoshuo } from '@prisma/client'
import ContentList from './content-list'

export default async function IndexPage() {
  const list = await fetchData<Shuoshuo[]>('/shuoshuo')

  return (
    <div className='p-4'>
      <h1 className='my-4 text-2xl font-bold text-accent-foreground'>
        Shuoshuo
      </h1>

      <ContentList />
    </div>
  )
}
