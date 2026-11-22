import type { AppId } from '@/lib/shell-routes'
import {
  ArticleIcon,
  BookmarkSimpleIcon,
  BookOpenIcon,
  ChartLineUpIcon,
  EnvelopeSimpleIcon,
  FileMagnifyingGlassIcon,
  FolderSimpleIcon,
  GameControllerIcon,
  GearIcon,
  ImagesIcon,
  InfoIcon,
  MusicNotesIcon,
  NotePencilIcon,
  SquaresFourIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react'
import { isAppId } from '@/lib/shell-routes'

const appIcons = {
  about: InfoIcon,
  analytics: ChartLineUpIcon,
  blog: ArticleIcon,
  bookmarks: BookmarkSimpleIcon,
  contact: EnvelopeSimpleIcon,
  finder: FileMagnifyingGlassIcon,
  gallery: ImagesIcon,
  game: GameControllerIcon,
  handbook: BookOpenIcon,
  music: MusicNotesIcon,
  notes: NotePencilIcon,
  projects: FolderSimpleIcon,
  settings: GearIcon,
  terminal: TerminalWindowIcon,
} satisfies Record<AppId, typeof ArticleIcon>

export function AppIcon({ className, id, size }: { className?: string, id: string, size: number }) {
  const Icon = isAppId(id) ? appIcons[id] : SquaresFourIcon
  return <Icon className={className} size={size} weight="regular" />
}
