'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem
} from '@/components/ui/accordions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { FormEvent } from 'react'
import { ShuoDto } from '@/types'
import { useToast } from '@/hooks/use-toast'

async function create(params: ShuoDto) {
  const res = await fetch('/api/shuo', {
    method: 'POST',
    body: JSON.stringify(params)
  })

  if (!res.ok) {
    throw new Error('Failed to submit data')
  }
  return res.json()
}

export default function CreateContent() {
  const { toast } = useToast()

  const { mutate } = useMutation({
    mutationFn: (params: ShuoDto) => create(params),
    onSuccess: (res) => {
      console.log('suuuu', res)
      toast({
        title: '新建成功！'
      })
    }
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newEntry = Object.fromEntries(formData) as ShuoDto
    mutate(newEntry)
  }

  return (
    <div className='space-y-4'>
      <Accordion type='single' collapsible className='w-full ' defaultValue='1'>
        <AccordionItem value='1' className='border-b-0 py-2'>
          <AccordionPrimitive.Header className='flex'>
            <AccordionPrimitive.Trigger className='flex flex-1 items-center justify-end py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180'>
              <>
                <span className='text-sm text-muted-foreground'>新建</span>
                <Plus
                  size={16}
                  strokeWidth={2}
                  className='shrink-0 opacity-60 transition-transform duration-200'
                  aria-hidden='true'
                />
              </>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className='pb-2 text-muted-foreground'>
            <form
              className='flex flex-col items-end gap-3'
              onSubmit={handleSubmit}
            >
              <Textarea name='content' placeholder='Leave a message' />
              <Button size='sm' className='w-1/5' type='submit'>
                发送
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { ToastAction } from "@/components/ui/toast";
// import { useToast } from "@/hooks/use-toast";

// export default function NotificationDemo() {
//   const { toast } = useToast();

//   return (
//     <Button
//       variant="outline"
//       onClick={() => {
//         toast({
//           title: "We couldn't complete your request!",
//           description: "There was a problem with your request.",
//           action: <ToastAction altText="Try again">Try again</ToastAction>,
//         });
//       }}
//     >
//       Show toast
//     </Button>
//   );
// }
