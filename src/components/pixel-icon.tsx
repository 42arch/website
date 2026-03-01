'use client'

import pixelCollection from '@iconify-json/pixel/icons.json'
import { addCollection, Icon } from '@iconify/react'
import { cn } from '@/lib/utils'

addCollection(pixelCollection)

interface PixelIconProps {
  name: string
  className?: string
  size?: number
}

export function PixelIcon({ name, className, size = 14 }: PixelIconProps) {
  return (
    <Icon
      icon={`pixel:${name}`}
      width={size}
      height={size}
      className={cn('shrink-0', className)}
      aria-hidden
    />
  )
}
