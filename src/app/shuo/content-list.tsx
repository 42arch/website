'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ShuoDto, ShuoResponse } from '@/types'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { FormEvent, useRef } from 'react'

async function fetchContents({ pageParam = 0 }) {
  const res = await fetch('/api/shuo?page=' + pageParam)
  const data = (await res.json()) as ShuoResponse
  return data
}

async function createContent(params: ShuoDto) {
  const res = await fetch('/api/shuo', {
    method: 'POST',
    body: JSON.stringify(params)
  })

  if (!res.ok) {
    throw new Error('Failed to submit data')
  }
  return res.json()
}

export default function ContentList() {
  const formRef = useRef<HTMLFormElement>(null!)

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['get-shuo'],
    queryFn: fetchContents,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage ?? undefined
    }
  })

  const { mutate } = useMutation({
    mutationFn: (params: ShuoDto) => createContent(params),
    onSuccess: (res) => {
      console.log('suuuu', res)
      refetch()
      formRef.current.reset()
    }
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newEntry = Object.fromEntries(formData) as ShuoDto
    mutate(newEntry)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className='pb-2 text-muted-foreground'>
      <form
        ref={formRef}
        className='flex flex-col items-end gap-3'
        onSubmit={handleSubmit}
      >
        <Textarea name='content' placeholder='Leave a message' />
        <Button size='sm' className='w-1/5' type='submit'>
          发送
        </Button>
      </form>
      <article className='my-4'>
        {data?.pages.map((page, pageIndex) => {
          return (
            <div key={pageIndex}>
              {page.data.map((item) => (
                <section
                  key={item.id}
                  className='mb-4 rounded-md bg-accent p-2 text-sm text-accent-foreground'
                >
                  <p className='text-xs text-muted-foreground'>
                    {format(item.createdAt, 'yyyy-MM-dd HH:mm:ss')}
                  </p>

                  <p className='my-2'>{item.content}</p>
                </section>
              ))}
            </div>
          )
        })}
      </article>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'No More Posts'}
      </button>
    </div>
  )
}
