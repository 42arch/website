'use client'

import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={cn("flex flex-1 items-center gap-2 rounded-sm border border-os-border bg-os-surface px-3 py-1.5", className)}>
      <MagnifyingGlassIcon size={13} className="text-muted-foreground" />
      <input 
        type="text" 
        className="flex-1 bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground/50" 
        {...props} 
      />
    </div>
  )
}
