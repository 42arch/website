import Image from 'next/image'
import { cn } from '@/lib/utils'

type StarMascotVariant = 'hero' | 'logo' | 'avatar'

interface StarMascotProps {
  size?: number
  variant?: StarMascotVariant
  className?: string
}

const variantClassMap: Record<StarMascotVariant, string> = {
  hero: 'pixel-fade-in drop-shadow-[0_0_18px_rgba(255,213,51,0.45)]',
  logo: 'drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)]',
  avatar: 'drop-shadow-[0_0_10px_rgba(255,213,51,0.35)]',
}

export function StarMascot({ size = 160, variant = 'hero', className }: StarMascotProps) {
  return (
    <Image
      src="/logo-pixel.svg"
      alt="Smiling pixel yellow star mascot"
      width={size}
      height={size}
      priority={variant === 'hero'}
      className={cn('block [image-rendering:pixelated]', variantClassMap[variant], className)}
      unoptimized
    />
  )
}
