'use client'

import Spin from '@/components/icon/spin'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { ShuoDto, ShuoResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Github } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const formSchema = z.object({
  content: z.string().nonempty({
    message: 'No message!'
  })
})

export default function ContentList() {
  const t = useTranslations('shuo')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: ''
    }
  })

  const {
    data,
    isLoading,
    isSuccess,
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
    getNextPageParam: (lastPage, _) => {
      return lastPage.nextPage ?? undefined
    }
  })

  const { mutate } = useMutation({
    mutationFn: (params: ShuoDto) => createContent(params),
    onSuccess: (res) => {
      refetch()
      form.reset()
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values)
  }

  return (
    <div className='pb-2 text-muted-foreground'>
      <Form {...form}>
        <form
          // ref={formRef}
          className='flex flex-col items-end gap-3'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Textarea placeholder={t('placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className='flex w-full justify-between'>
            <Button
              size='icon'
              variant='ghost'
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Github />
            </Button>
            <Button size='sm' className='w-1/5' type='submit'>
              {t('send')}
            </Button>
          </div>
        </form>
      </Form>

      {isLoading && (
        <div className='my-4 flex w-full justify-center text-center'>
          <Spin />
        </div>
      )}
      {isError && <p className='my-4 text-center'>Error: {error.message}</p>}
      {isSuccess && (
        <>
          <article className='my-4'>
            {data?.pages.map((page, pageIndex) => {
              return (
                <div key={pageIndex}>
                  {page.data.map((item) => (
                    <section
                      key={item.id}
                      className='mb-6 rounded-md bg-accent p-2 text-sm text-accent-foreground'
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

          <div className='flex w-full justify-center text-sm'>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Spin />
              ) : hasNextPage ? (
                t('load-more')
              ) : (
                t('no-more')
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
