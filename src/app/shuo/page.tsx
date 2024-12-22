import ContentList from './content-list'

export default async function IndexPage() {
  return (
    <div className='p-4'>
      <h1 className='my-4 text-2xl font-bold text-accent-foreground'>Shuo</h1>

      <ContentList />
    </div>
  )
}
