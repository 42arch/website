import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { FolderSimpleIcon } from '@phosphor-icons/react/dist/csr/FolderSimple'
import { HouseIcon } from '@phosphor-icons/react/dist/csr/House'
import { ImagesIcon } from '@phosphor-icons/react/dist/csr/Images'
import { NotePencilIcon } from '@phosphor-icons/react/dist/csr/NotePencil'
import { SlidersHorizontalIcon } from '@phosphor-icons/react/dist/csr/SlidersHorizontal'

export type { AppId } from '@/lib/desktop-routes'

export const apps = [
  { id: 'home', name: '关于我', subtitle: '从这里认识 Dan', file: 'Welcome to my space', icon: HouseIcon, color: 'home' },
  { id: 'projects', name: '作品集', subtitle: '代码里的小小世界', file: 'Projects', icon: FolderSimpleIcon, color: 'projects' },
  { id: 'notes', name: '随手记', subtitle: '学习、思考与记录', file: 'Notes', icon: NotePencilIcon, color: 'notes' },
  { id: 'gallery', name: '灵感角落', subtitle: '形状与颜色的练习', file: 'Visual playground', icon: ImagesIcon, color: 'gallery' },
  { id: 'contact', name: '联系我', subtitle: '从一句你好开始', file: 'Say hello', icon: EnvelopeSimpleIcon, color: 'contact' },
  { id: 'settings', name: '桌面设置', subtitle: '换一种桌面的心情', file: 'Personalize', icon: SlidersHorizontalIcon, color: 'settings' },
] as const

export type WallpaperName = 'blue' | 'sage' | 'dusk'
