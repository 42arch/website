import { cn } from '@/lib/cn'

function SectionIndicator({ title, className }: { title: string, className?: string }) {
  return (
    <div className={cn('w-full flex flex-col items-center py-4', className)}>
      <div className="flex flex-row items-center gap-2 px-6">
        <div className="flex flex-row items-center">
          <div className="from-muted h-px w-20 bg-gradient-to-l to-transparent sm:w-40"></div>
          <div className="bg-muted/20 h-1.5 w-1.5 border"></div>
        </div>
        <div className="relative flex h-7 flex-row items-center whitespace-nowrap gap-2 rounded-md border px-4 text-xs text-muted-foreground">
          <span>{title}</span>
        </div>
        <div className="flex flex-row items-center">
          <div className="bg-muted/20 h-1.5 w-1.5 border"></div>
          <div className="from-muted h-px w-20 bg-gradient-to-r to-transparent sm:w-40"></div>
        </div>
      </div>
    </div>
  )
}

export default SectionIndicator
