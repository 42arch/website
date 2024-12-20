import { fetchData } from '@/lib/fetch'
import { Shuoshuo } from '@prisma/client'

export default async function IndexPage() {
  const list = await fetchData<Shuoshuo[]>('/shuoshuo')

  return (
    <div className='p-4'>
      {list.map((item) => (
        <article
          key={item.id}
          className='mb-4 rounded-md bg-accent p-2 text-sm text-accent-foreground'
        >
          {item.content}
        </article>
      ))}
    </div>
  )
}
