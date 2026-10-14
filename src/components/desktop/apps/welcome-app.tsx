'use client'

import type { AppId } from '../app-registry'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { Button } from '@/components/ui/button'
import { apps } from '../app-registry'
import { SmallLabel } from './page-primitives'

export function WelcomeApp({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <div className="flex min-h-full">
      <aside className="flex w-[174px] shrink-0 flex-col items-center border-r border-[var(--line)] bg-[var(--paper-muted)] px-4 pb-[17px] pt-7 max-[1150px]:w-[153px] max-[850px]:w-[130px] max-[850px]:px-[10px] max-[700px]:hidden">
        <div className="relative mb-[10px] grid size-[60px] place-items-center rounded-full border-[5px] border-[#f8f8f0] bg-[#aabfce] outline outline-1 outline-[#d8ddd7]">
          <span className="-ml-[3px] -mt-2 font-serif text-[44px] italic leading-[.8] text-[#f4f4e7]">d.</span>
          <span className="absolute -bottom-0.5 -right-px size-3 rounded-full border-[3px] border-[var(--paper-muted)] bg-[#93a681]" />
        </div>
        <strong className="text-[15px] tracking-[-.03em]">Dan</strong>
        <span className="mt-1.5 font-mono text-[7px] tracking-[.025em] text-[#8b938c] max-[850px]:text-[6px]">DEVELOPER & EXPLORER</span>
        <div className="mb-4 mt-[23px] h-px w-full bg-[var(--line)]" />
        <span className="mb-[9px] ml-[10px] self-start text-[9px] text-[#92998d]">我的空间</span>
        <nav className="flex w-full flex-col gap-[3px]" aria-label="个人空间">
          {apps.slice(0, 5).map(app => (
            <button key={app.id} className={`flex items-center gap-[10px] rounded-[5px] px-[11px] py-[9px] text-left text-[11px] text-[#6f7b76] hover:bg-[#e4e9e2] ${app.id === 'home' ? 'bg-[#dfe7e8] text-[#3f6075]' : ''}`} onClick={() => onOpen(app.id)}>
              <app.icon size={17} />
              {app.name}
              {app.id === 'home' && <span className="ml-auto size-1 rounded-full bg-[#6d8ba0]" />}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex flex-wrap items-center justify-center gap-1.5 pt-[19px] text-[9px] text-[#7c877a]">
          <span className="size-[5px] rounded-full bg-[#839a76]" />
          持续探索中
          <span className="w-full text-center font-mono text-[6px] tracking-[.11em] text-[#a0a79b]">MADE WITH CURIOSITY</span>
        </div>
      </aside>
      <div className="min-w-0 flex-1 px-[37px] pb-[25px] pt-8 min-[1600px]:px-[46px] min-[1600px]:pb-7 min-[1600px]:pt-10 max-[1150px]:px-7 max-[850px]:px-[25px] max-[850px]:pb-[22px] max-[850px]:pt-[30px] max-[700px]:px-[25px] max-[700px]:py-[23px] max-[360px]:px-[18px]">
        <div className="flex items-center gap-[7px] font-mono text-[9px] tracking-[.13em] text-[#79867c] max-[700px]:text-[8px]">
          <span className="text-[17px] text-[#859a79]">✳</span>
          {' '}
          HELLO, WORLD.
          {' '}
          <span className="ml-auto font-sans text-[8px] tracking-[.02em] text-[#949b90] max-[850px]:hidden">个人桌面 / v.01</span>
        </div>
        <h1 className="relative my-[18px] text-[37px] font-semibold leading-[1.6] tracking-[-.055em] min-[1600px]:text-[40px] max-[1150px]:text-[33px] max-[850px]:text-[31px] max-[700px]:my-[14px] max-[700px]:text-[30px] max-[700px]:leading-[1.55]">
          你好，我是 Dan
          <span className="hello-spark absolute right-[21px] top-1 rotate-12 text-[52px] font-normal leading-none text-[#b3bd9c] max-[1150px]:right-[5px] max-[1150px]:text-[40px] max-[850px]:hidden">✳</span>
          <br />
          <span className="text-[30px] font-normal tracking-[-.055em] min-[1600px]:text-[34px] max-[1150px]:text-[27px] max-[850px]:text-[23px] max-[700px]:text-[25px] max-[360px]:text-[22px]">欢迎来到我的</span>
          <em className="font-['Kaiti_SC',STKaiti,KaiTi,Georgia,serif] text-[31px] not-italic tracking-[-.04em] text-[var(--blue)] min-[1600px]:text-[34px] max-[1150px]:text-[27px] max-[850px]:text-[23px] max-[700px]:text-[25px] max-[360px]:text-[22px]">小宇宙。</em>
        </h1>
        <p className="text-xs leading-[1.95] tracking-[.03em] text-[#657267] max-[700px]:text-[11px]">
          一个开发者的数字自留地。
          <br />
          在这里写代码、探索 Web3D 与地图，
          <br className="max-[700px]:hidden" />
          也收集那些值得留下的小想法。
        </p>
        <div className="mt-[23px] flex gap-[10px] max-[700px]:mt-[17px] max-[700px]:gap-[5px] [&_[data-slot=button][data-size=lg]]:h-10 [&_[data-slot=button][data-size=lg]]:px-[17px] max-[700px]:[&_[data-slot=button]]:px-3 max-[700px]:[&_[data-slot=button]]:text-[11px]">
          <Button size="lg" onClick={() => onOpen('projects')}>
            看看我的作品
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
          <Button variant="ghost" size="lg" onClick={() => onOpen('contact')}>
            打个招呼
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
        <div className="mt-[26px] flex items-center justify-between border-t border-[var(--line)] pt-[18px] min-[1600px]:mt-[30px] max-[700px]:mt-6 max-[700px]:pt-4">
          <div>
            <SmallLabel>CURRENTLY EXPLORING</SmallLabel>
            <p className="mt-[7px] flex gap-[9px] text-[10px] text-[#6e7e78] max-[700px]:gap-[7px] max-[700px]:text-[9px] [&>span]:text-[#a1aa9d]">
              Web3D
              <span>·</span>
              地图可视化
              <span>·</span>
              有趣的交互
            </p>
          </div>
          <span className="grid size-[35px] rotate-[-20deg] place-items-center rounded-full border border-[#bdc9b6] text-xl text-[#8a9f7f]" aria-hidden="true">↗</span>
        </div>
      </div>
    </div>
  )
}
