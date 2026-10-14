import type { AppId } from './app-registry'
import { apps } from './app-registry'
import { cn } from '@/lib/utils'

export function AppIcon({ id, small = false, className }: { id: AppId, small?: boolean, className?: string }) {
  const app = apps.find(app => app.id === id)!
  const Icon = app.icon

  const colors: Record<string, string> = {
    home: 'bg-[linear-gradient(145deg,#7397b9,#43668b)]',
    projects: 'bg-[linear-gradient(145deg,#a3bfd2,#688da9)] text-[#eef3ef]',
    notes: 'bg-[linear-gradient(145deg,#f4e8bc,#dcc688)] text-[#807143]',
    gallery: 'bg-[linear-gradient(145deg,#bdd0b4,#8ea385)] text-[#f8fbef]',
    contact: 'bg-[linear-gradient(145deg,#e8b9a2,#ca957e)]',
    settings: 'bg-[linear-gradient(145deg,#dce0de,#b1bdc3)] text-[#576d7c]',
  }

  return (
    <span className={cn('relative inline-flex h-[53px] w-[53px] shrink-0 items-center justify-center rounded-[13px] border border-white/55 text-[#f9fbf4] shadow-[0_3px_4px_#2d40531a,inset_0_1px_1px_#ffffff9f,inset_0_-2px_2px_#0000000c] [&>svg]:h-[31px] [&>svg]:w-[31px] [&>svg]:drop-shadow-[0_1px_1px_#243a5c20]', colors[app.color], small && '!h-[38px] !w-[38px] !rounded-[10px] [&>svg]:!h-[23px] [&>svg]:!w-[23px]', className)}>
      <Icon weight={id === 'projects' ? 'fill' : 'regular'} />
    </span>
  )
}
