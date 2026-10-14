import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function AppPage({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('min-h-full px-[34px] pb-8 pt-7 max-[850px]:px-6 max-[700px]:px-[23px] max-[700px]:py-6', className)} {...props} />
}

export function AppPageHeading({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-[26px] max-[700px]:mb-[22px] [&>h2]:my-2 [&>h2]:mb-[10px] [&>h2]:text-[28px] [&>h2]:font-medium [&>h2]:leading-[1.45] [&>h2]:tracking-[-.04em] [&>p]:text-xs [&>p]:leading-[1.9] [&>p]:text-[var(--subtle)] max-[700px]:[&>h2]:text-[25px] max-[700px]:[&>p]:text-[11px]', className)} {...props}>
      {children}
    </div>
  )
}

export function SmallLabel({ children, className }: { children: ReactNode, className?: string }) {
  return <span className={cn('font-mono text-[9px] tracking-[.11em] text-[#8b9488] max-[700px]:text-[8px]', className)}>{children}</span>
}
