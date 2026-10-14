'use client'

import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { CopyIcon } from '@phosphor-icons/react/dist/csr/Copy'
import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { GithubLogoIcon } from '@phosphor-icons/react/dist/csr/GithubLogo'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { profile } from '@/lib/desktop-content'
import { AppPage, SmallLabel } from './page-primitives'

export function ContactApp() {
  const [copyState, setCopyState] = useState('')
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('邮箱已复制')
    }
    catch {
      setCopyState('请选中上方邮箱地址进行复制')
    }
  }
  return (
    <AppPage className="relative px-[50px] pb-8 pt-[45px] max-[850px]:px-6 max-[700px]:px-[23px] max-[700px]:py-6">
      <div className="absolute right-[50px] top-[55px] flex h-[135px] w-[110px] rotate-[10deg] flex-col items-center gap-[14px] border-[3px] border-dashed border-[#cbd2c5] px-2 py-5 text-[#8b9f88] max-[850px]:right-[30px] max-[850px]:size-[90px] max-[850px]:h-[110px] max-[700px]:hidden">
        <EnvelopeSimpleIcon size={34} weight="duotone" />
        <span className="text-center font-mono text-[8px] leading-[1.5]">
          HELLO FROM
          <br />
          MY LITTLE SPACE
        </span>
      </div>
      <SmallLabel>LET’S CONNECT</SmallLabel>
      <h2 className="my-[15px] text-[35px] font-normal tracking-[-.04em] max-[700px]:text-[31px]">
        好想法，
        <br />
        从一句你好开始。
      </h2>
      <p className="text-xs leading-[1.9] text-[var(--subtle)]">
        聊聊代码、地图、图形，
        <br />
        或者你正在做的有趣事情。
      </p>
      <a className="mt-3 inline-flex items-center gap-[15px] border-b border-[#b2c3cf] py-3 text-[23px] tracking-[-.03em] text-[var(--blue)] max-[700px]:text-[21px]" href={`mailto:${profile.email}`}>
        {profile.email}
        <ArrowUpRightIcon size={23} />
      </a>
      <div className="mt-5 flex gap-3">
        <Button variant="outline" onClick={copyEmail}>
          {copyState === '邮箱已复制' ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
          复制邮箱
        </Button>
        <Button variant="ghost" asChild>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <GithubLogoIcon data-icon="inline-start" />
            GitHub
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </Button>
      </div>
      <p className="mt-2 min-h-[22px] text-[10px]" role="status">{copyState}</p>
    </AppPage>
  )
}
