'use client'

import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Artwork } from '../artwork'
import { AppPage, AppPageHeading, SmallLabel } from './page-primitives'

export function GalleryApp() {
  const [selected, setSelected] = useState('orbit')
  const pieces = [{ id: 'orbit', name: '轨道 / Orbit' }, { id: 'island', name: '岛屿 / Island' }, { id: 'map', name: '漫游 / Wander' }]
  return (
    <AppPage className="mx-auto max-w-[760px]">
      <AppPageHeading>
        <SmallLabel>VISUAL PLAYGROUND</SmallLabel>
        <h2>不必都有答案。</h2>
        <p>为这个桌面画的几张小画。让形状和颜色先说话。</p>
      </AppPageHeading>
      <div className="h-[240px] overflow-hidden rounded-[7px] max-[700px]:h-[200px] [&>div]:h-full [&>div]:[aspect-ratio:auto]"><Artwork variant={selected} /></div>
      <ToggleGroup type="single" value={selected} onValueChange={value => value && setSelected(value)} className="mt-[15px] flex gap-5 max-[700px]:gap-[14px]" aria-label="选择画作">
        {pieces.map(piece => <ToggleGroupItem key={piece.id} className="border-b border-transparent py-[5px] text-[11px] text-[var(--subtle)] data-[state=on]:border-[var(--blue)] data-[state=on]:text-[var(--blue)] max-[700px]:text-[9px]" value={piece.id}>{piece.name}</ToggleGroupItem>)}
      </ToggleGroup>
    </AppPage>
  )
}
