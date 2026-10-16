'use client'

import type { TelemetryEvent } from '@/lib/telemetry'
import { useEffect, useState } from 'react'
import { getSessionEventCount, getTelemetryHistory, subscribeTelemetry } from '@/lib/telemetry'
import { ShellWindow } from '@/components/shell/window'

export function AnalyticsApp() {
  const [sessionCount, setSessionCount] = useState(getSessionEventCount())
  const [logs, setLogs] = useState<readonly TelemetryEvent[]>(getTelemetryHistory())

  useEffect(() => {
    return subscribeTelemetry((newEvent) => {
      setSessionCount(getSessionEventCount())
      setLogs(prev => [newEvent, ...prev.slice(0, 49)])
    })
  }, [])

  return (
    <ShellWindow
      id="analytics"
      title="Insights.db — 实时遥测事件流"
      defaultWidth="min(740px, 94vw)"
      defaultHeight="min(500px, 74vh)"
      defaultLeft={190}
      defaultTop={76}
      headerRight={(
        <div className="font-mono text-[10px] text-ph-green flex items-center gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-ph-green animate-live-dot" />
          <span>LIVE</span>
        </div>
      )}
    >
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-3.5">
            <div className="text-[10px] font-mono text-ph-muted uppercase">年度 Git Commits</div>
            <div className="text-2xl font-bold text-ph-ink mt-1">1,842</div>
            <div className="text-[11px] font-mono text-ph-green mt-0.5">+24.8% YoY</div>
          </div>
          <div className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-3.5">
            <div className="text-[10px] font-mono text-ph-muted uppercase">手冲咖啡消耗</div>
            <div className="text-2xl font-bold text-ph-ink mt-1">614 杯</div>
            <div className="text-[11px] font-mono text-ph-muted mt-0.5">均值 2.1 杯/日</div>
          </div>
          <div className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-3.5">
            <div className="text-[10px] font-mono text-ph-muted uppercase">开源 PR 响应率</div>
            <div className="text-2xl font-bold text-ph-ink mt-1">94.2%</div>
            <div className="text-[11px] font-mono text-ph-muted mt-0.5">平均 &lt; 4h</div>
          </div>
          <div className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-3.5">
            <div className="text-[10px] font-mono text-ph-muted uppercase">本次会话交互事件</div>
            <div className="text-2xl font-bold text-ph-orange mt-1">{sessionCount}</div>
            <div className="text-[11px] font-mono text-ph-muted mt-0.5">posthog.capture()</div>
          </div>
        </div>

        {/* Live Event Stream Panel */}
        <div className="bg-[#161820] border border-black/20 dark:border-white/10 text-gray-200 p-4 rounded-[6px]">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
            <span className="font-mono text-[11px] font-medium text-gray-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ph-green animate-live-dot" />
              实时事件流 (您在工作台上的操作会被实时捕获)
            </span>
            <span className="font-mono text-[10px] text-gray-500">HogQL Stream</span>
          </div>

          <div className="space-y-1.5 font-mono text-[11px] max-h-48 overflow-y-auto">
            {logs.length > 0
              ? (
                  logs.map(log => (
                    <div key={log.id} className="flex items-center justify-between py-1 border-b border-white/5">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-ph-green shrink-0" />
                        <span className="text-gray-200 font-semibold">{log.name}</span>
                        <span className="text-gray-400 text-[10px] truncate">{JSON.stringify(log.props)}</span>
                      </div>
                      <span className="text-gray-500 text-[10px] shrink-0 ml-2">{log.timestamp}</span>
                    </div>
                  ))
                )
              : (
                  <div className="py-4 text-center text-gray-500 text-xs">
                    正在监听遥测事件...
                  </div>
                )}
          </div>
        </div>
      </div>
    </ShellWindow>
  )
}
