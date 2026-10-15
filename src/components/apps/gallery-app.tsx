'use client'

import type { ReactNode } from 'react'
import { ImagesIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { ShellWindow } from '@/components/shell/window'
import { useGalleryStore } from '@/stores/apps/gallery-store'
import { useShellStore } from '@/stores/shell-store'

interface ArtworkPiece {
  id: string
  title: string
  subtitle: string
  category: string
  date: string
  desc: string
  palette: { name: string, hex: string }[]
  render: () => ReactNode
}

export function GalleryApp() {
  const t = useTranslations('apps.gallery')
  const tCommon = useTranslations('common')
  const selectedId = useGalleryStore(state => state.selectedId)
  const setSelectedId = useGalleryStore(state => state.setSelectedId)
  const showToast = useShellStore(state => state.showToast)

  const pieces: ArtworkPiece[] = [
    {
      id: 'orbit',
      title: '天体轨道 (Planetary Orbit)',
      subtitle: '天体引力轨迹、极坐标与几何留白',
      category: '生成几何 / 极简',
      date: '2025.10',
      desc: '探索天体在双星引力场中的运行轨迹。通过不同离心率的椭圆叠加与虚线进动，营造出辽阔深邃的空间律动。',
      palette: [
        { name: '暖石底色', hex: '#E9E6D9' },
        { name: '引力蓝', hex: '#3C6582' },
        { name: '微光白', hex: '#EEF2E8' },
        { name: '伴星橙', hex: '#C67C5F' },
      ],
      render: () => (
        <svg viewBox="0 0 600 400" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect width="600" height="400" className="fill-[#DFDACB] dark:fill-[#151922] transition-colors" />
          <circle cx="300" cy="200" r="135" className="fill-[#EDEAE0] dark:fill-[#1B212D]" />
          <circle cx="300" cy="200" r="97" stroke="#547593" strokeWidth="1" strokeDasharray="4 4" className="opacity-70" />
          <ellipse cx="300" cy="200" rx="230" ry="68" transform="rotate(-30 300 200)" stroke="#3C6582" strokeWidth="2.2" />
          <ellipse cx="300" cy="200" rx="230" ry="72" transform="rotate(-30 300 200)" stroke="#EEF2E8" strokeWidth="8" strokeDasharray="360 880" />
          <circle cx="478" cy="99" r="14" fill="#C67C5F" stroke="#1D1F27" strokeWidth="2" />
          <circle cx="160" cy="280" r="7" fill="#F54E00" />
          <circle cx="300" cy="200" r="28" fill="#D98A4E" stroke="#1D1F27" strokeWidth="2.5" />
          <line x1="120" y1="200" x2="480" y2="200" stroke="#547593" strokeWidth="0.8" strokeDasharray="3 6" className="opacity-40" />
        </svg>
      ),
    },
    {
      id: 'island',
      title: '低多边形浮岛 (Low-Poly Island)',
      subtitle: '等高线重构、地形高程与色阶层叠',
      category: '地形渲染 / 3D',
      date: '2025.11',
      desc: '基于八叉树高程采样算法生成的浮空岛屿。用纯粹的矢量多边形切面呈现光影折射与不同海拔植被的色阶递变。',
      palette: [
        { name: '海天微青', hex: '#A4C8CA' },
        { name: '浅滩沙洲', hex: '#E5D9B6' },
        { name: '冷杉林绿', hex: '#647C68' },
        { name: '高山草甸', hex: '#839E76' },
      ],
      render: () => (
        <svg viewBox="0 0 600 400" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect width="600" height="400" className="fill-[#9FBFC1] dark:fill-[#131C24] transition-colors" />
          <path d="M75 263L160 140L260 112L345 65L455 185L525 267L415 327L235 350Z" fill="#B8D9D1" />
          <path d="M100 255L175 150L270 135L345 87L430 191L490 260L405 302L240 325Z" fill="#E5D9B6" />
          <path d="M133 244L210 161L285 155L344 109L408 193L457 250L390 281L245 299Z" fill="#839E76" />
          <path d="M210 161L285 155L344 109L335 238L245 299L133 244Z" fill="#A6B28A" />
          <path d="M344 109L408 193L457 250L335 238Z" fill="#647C68" />
          <path d="M344 109L285 155L335 238Z" fill="#C0C5A3" />
          <circle cx="480" cy="90" r="24" fill="#FEBC2E" className="opacity-80" />
        </svg>
      ),
    },
    {
      id: 'map',
      title: '城市网格漫游 (Urban Wander)',
      subtitle: 'GIS 拓扑切片、等高河道与路径探索',
      category: '地图拓扑 / GIS',
      date: '2026.01',
      desc: '将地图矢量图层抽象为几何色块与等高线网络。蓝灰色主干道串联起河畔公园与居住街区，呈现数字制图的理性之美。',
      palette: [
        { name: '街区暖绿', hex: '#D5DFCB' },
        { name: '河流淡蓝', hex: '#9FBFCE' },
        { name: '主干白道', hex: '#F7F4E8' },
        { name: '地块暖褐', hex: '#E3B773' },
      ],
      render: () => (
        <svg viewBox="0 0 600 400" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect width="600" height="400" className="fill-[#E5E5D6] dark:fill-[#161A22] transition-colors" />
          <path d="M0 110L160 80L250 160L420 90L600 110V400H0Z" fill="#D5DFCB" />
          <path d="M0 310C120 220 200 380 310 230S490 270 600 170" stroke="#9FBFCE" strokeWidth="50" strokeLinecap="round" />
          <path d="M-30 90L640 370M50 430L420 -30M-30 210L630 65M190 440L590 -20" stroke="#F7F4E8" strokeWidth="14" />
          <path d="M-30 90L640 370M50 430L420 -30" stroke="#B7B8A4" strokeWidth="2" />
          <path d="M250 125L390 173L350 280L210 236Z" fill="#E3B773" fillOpacity="0.65" stroke="#B77D3F" strokeWidth="3" strokeDasharray="6 5" />
          <circle cx="300" cy="202" r="12" fill="#31587B" stroke="#FFF" strokeWidth="4" />
        </svg>
      ),
    },
    {
      id: 'roads',
      title: '高架网络 (Highway Grid)',
      subtitle: '深色调立交几何、透视网格与光流',
      category: '暗夜几何 / 交通',
      date: '2026.03',
      desc: '俯瞰夜幕下的高架桥梁网络。深灰蓝基底与细线网格交织，黄色虚线标记着车辆行进轨迹，表达秩序与流动。',
      palette: [
        { name: '夜幕青灰', hex: '#344852' },
        { name: '路面石墨', hex: '#7B9190' },
        { name: '警示金黄', hex: '#E7CA8C' },
        { name: '网格冷灰', hex: '#91A6A4' },
      ],
      render: () => (
        <svg viewBox="0 0 600 400" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect width="600" height="400" fill="#2B3C44" />
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M${i * 55 - 100} 0L${i * 55 + 100} 400M0 ${i * 40}H600`} stroke="#91A6A4" strokeOpacity="0.14" strokeWidth="1" />
          ))}
          <path d="M-30 360C190 320 180 90 340 130S470 290 650 20" stroke="#688080" strokeWidth="44" strokeLinecap="round" />
          <path d="M-30 360C190 320 180 90 340 130S470 290 650 20" stroke="#E7CA8C" strokeWidth="2.5" strokeDasharray="14 12" />
          <path d="M-30 338C190 298 180 68 340 108S470 268 650 -2M-30 382C190 342 180 112 340 152S470 312 650 42" stroke="#C4D6C9" strokeWidth="1.8" />
        </svg>
      ),
    },
  ]

  const activePiece = pieces.find(p => p.id === selectedId) || pieces[0]

  function copyColor(hex: string, name: string) {
    navigator.clipboard.writeText(hex)
    showToast(`${tCommon('copied')} ${name}: ${hex}`)
  }

  return (
    <ShellWindow
      id="gallery"
      title={t('title')}
      defaultWidth="min(760px, 94vw)"
      defaultHeight="min(530px, 78vh)"
      defaultLeft={140}
      defaultTop={45}
      icon={<ImagesIcon size={14} weight="regular" className="text-ph-orange" />}
      headerRight={(
        <span className="hidden sm:inline font-mono text-[11px] text-ph-muted">
          4 Pieces • Pure SVG
        </span>
      )}
    >
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left / Main: Artwork Canvas + Switcher Bar */}
        <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto">
          {/* Main Visual Display */}
          <div className="flex-1 rounded-[6px] border border-ph-border-subtle overflow-hidden bg-black/5 dark:bg-black/20 flex items-center justify-center min-h-[220px] max-h-[340px] shadow-sm relative group">
            <div className="w-full h-full">
              {activePiece.render()}
            </div>
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[4px] bg-black/60 backdrop-blur-md font-mono text-[10px] text-white/90">
              {activePiece.category}
            </div>
          </div>

          {/* Bottom Piece Selector Strip */}
          <div className="mt-3.5 pt-3 border-t border-ph-border-subtle">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {pieces.map(piece => (
                <button
                  key={piece.id}
                  type="button"
                  onClick={() => setSelectedId(piece.id)}
                  className={`px-3 py-1.5 rounded-[5px] text-xs font-medium shrink-0 transition-all cursor-pointer text-left border ${
                    selectedId === piece.id
                      ? 'bg-ph-orange text-white border-ph-orange shadow-sm'
                      : 'bg-white/50 dark:bg-white/5 text-ph-muted hover:text-ph-ink border-ph-border-subtle hover:bg-white/80 dark:hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold">{piece.title.split(' ')[0]}</div>
                  <div className={`text-[9px] font-mono opacity-80 ${selectedId === piece.id ? 'text-white/90' : 'text-ph-muted'}`}>
                    {piece.date}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Info & Palette Sidebar */}
        <aside className="w-full md:w-64 bg-ph-sidebar border-t md:border-t-0 md:border-l border-ph-border-subtle p-4 shrink-0 flex flex-col justify-between space-y-4 select-none">
          <div className="space-y-3.5">
            <div>
              <span className="px-1.5 py-0.5 rounded-[4px] bg-ph-orange/10 text-ph-orange font-mono text-[10px] font-semibold">
                {t('category')}
              </span>
              <h2 className="text-sm font-bold text-ph-ink mt-1.5">{activePiece.title}</h2>
              <p className="text-[11px] text-ph-muted mt-0.5 leading-relaxed">{activePiece.subtitle}</p>
            </div>

            <div className="rounded-[6px] border border-ph-border-subtle bg-white/40 dark:bg-white/[0.03] p-2.5 text-xs text-ph-ink/90 leading-relaxed">
              {activePiece.desc}
            </div>

            {/* Color Palette Inspector */}
            <div>
              <div className="font-mono text-[10px] uppercase font-semibold text-ph-muted mb-1.5">
                COLOR PALETTE ({t('copyColor')})
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {activePiece.palette.map(color => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => copyColor(color.hex, color.name)}
                    className="p-1.5 rounded-[4px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] hover:bg-white/80 dark:hover:bg-white/[0.08] flex items-center gap-2 text-left transition-colors cursor-pointer"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="truncate">
                      <div className="text-[10px] font-medium text-ph-ink truncate">{color.name}</div>
                      <div className="text-[9px] font-mono text-ph-muted">{color.hex}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-ph-border-subtle font-mono text-[10px] text-ph-muted flex justify-between">
            <span>FORMAT: 600×400 SVG</span>
            <span>VECTOR 100%</span>
          </div>
        </aside>
      </div>
    </ShellWindow>
  )
}
