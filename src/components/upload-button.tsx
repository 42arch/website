'use client'

import { FileUp } from 'lucide-react'
import { Button } from './ui/button'
import { ChangeEvent, useRef } from 'react'
import supabase from '@/lib/supabase'
import { nanoid } from 'nanoid'

interface Props {
  onSuccess: (url: string) => void
}

export default function UploadButton({ onSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null!)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const filename = nanoid()
      const { data, error } = await supabase.storage
        .from('home')
        .upload(`${filename}.${file.name.split('.').pop()}`, file)

      if (error) {
        console.error('Error uploading file:', error.message)
      } else {
        const { data: file } = await supabase.storage
          .from('home')
          .getPublicUrl(data?.path)

        onSuccess(file.publicUrl)
      }
    }
  }

  return (
    <div className='relative inline-block'>
      <Button
        size='icon'
        className='!h-8 !w-8'
        onClick={(e) => {
          e.preventDefault()
          fileInputRef.current.click()
        }}
      >
        <FileUp />
      </Button>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        className='hidden'
        accept='image/*'
        aria-label='Upload image file'
      />
    </div>
  )
}
