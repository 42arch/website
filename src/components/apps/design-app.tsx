'use client'

import { ShellWindow } from '@/components/shell/window'
import { colorTokens } from '@/lib/shell-content'
import { useDesignStore } from '@/stores/apps/design-store'
import { useShellStore } from '@/stores/shell-store'

export function DesignApp() {
  const activeTab = useDesignStore(state => state.activeTab)
  const setActiveTab = useDesignStore(state => state.setActiveTab)
  const showToast = useShellStore(state => state.showToast)

  function copyHex(hex: string, name: string) {
    navigator.clipboard.writeText(hex)
    showToast(`已拷贝 ${name}: ${hex}`)
  }

  return (
    <ShellWindow
      id="design"
      title="Design_Spec.fig"
      defaultWidth="min(740px, 94vw)"
      defaultHeight="min(510px, 75vh)"
      defaultLeft={180}
      defaultTop={52}
      headerCenter={(
        <div className="flex items-center p-0.5 rounded-[4px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs select-none">
          <button
            type="button"
            onClick={() => setActiveTab('layout')}
            className={`px-3 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
              activeTab === 'layout'
                ? 'bg-white/70 dark:bg-white/15 text-ph-ink shadow-sm'
                : 'text-ph-muted hover:text-ph-ink'
            }`}
          >
            1. 降噪与圆角指南
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tokens')}
            className={`px-3 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
              activeTab === 'tokens'
                ? 'bg-white/70 dark:bg-white/15 text-ph-ink shadow-sm'
                : 'text-ph-muted hover:text-ph-ink'
            }`}
          >
            2. 暖石与色阶
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ia')}
            className={`px-3 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
              activeTab === 'ia'
                ? 'bg-white/70 dark:bg-white/15 text-ph-ink shadow-sm'
                : 'text-ph-muted hover:text-ph-ink'
            }`}
          >
            3. 模块映射架构
          </button>
        </div>
      )}
      headerRight={(
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-ph-muted">
          <span>Design.fig</span>
        </div>
      )}
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* TAB 1: Layout & Decluttering Rules */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div className="rounded-[6px] border border-ph-border-subtle border-l-2 border-l-ph-orange bg-white/45 dark:bg-white/[0.035] p-4">
              <h3 className="font-bold text-sm text-ph-ink mb-1">
                为什么之前显得「圆角太大、风格杂乱」？我们做了这 3 项核心修正：
              </h3>
              <p className="text-xs text-ph-muted leading-relaxed">
                当界面同时存在插画背景、多窗口、悬浮小组件与彩虹色图标，且全部使用 <code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded-[4px]">16px~24px</code> 大圆角时，界面会显得像臃肿的玩具。收紧圆角曲率并收敛色彩后，立刻恢复了<strong>精密仪器般的工程秩序感</strong>。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-4">
                <div className="font-mono text-[10px] font-bold text-ph-orange mb-1">RULE 01 / 几何收敛</div>
                <h4 className="font-semibold text-xs text-ph-ink mb-1.5">严格的三级微圆角阶梯</h4>
                <ul className="text-[11px] text-ph-muted space-y-1 font-mono">
                  <li>• 窗口外框: <strong className="text-ph-ink">8px</strong> (原 16px)</li>
                  <li>• 内容卡片: <strong className="text-ph-ink">6px</strong> (原 16px)</li>
                  <li>• 按钮/标签: <strong className="text-ph-ink">4px~5px</strong> (原胶囊)</li>
                </ul>
              </div>

              <div className="rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-4">
                <div className="font-mono text-[10px] font-bold text-ph-ink mb-1">RULE 02 / 色彩降噪</div>
                <h4 className="font-semibold text-xs text-ph-ink mb-1.5">告别彩虹色，单色+橙点缀</h4>
                <p className="text-[11px] text-ph-muted leading-relaxed">
                  桌面与 Dock 图标统一收敛为<strong>深石墨灰（#374151）</strong>，仅在悬停或核心强调处使用 <strong>PostHog 橙（#F54E00）</strong>，消除花哨感。
                </p>
              </div>

              <div className="rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-4">
                <div className="font-mono text-[10px] font-bold text-ph-ink mb-1">RULE 03 / 空间留白</div>
                <h4 className="font-semibold text-xs text-ph-ink mb-1.5">清理背景贴纸与冗余悬浮块</h4>
                <p className="text-[11px] text-ph-muted leading-relaxed">
                  移除了插画天空中漂浮的文字徽章，默认收起左上角状态组件，让左侧窗口与右侧插画角色形成清晰的左右呼吸留白。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Color Tokens */}
        {activeTab === 'tokens' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-mono text-[11px] font-semibold uppercase text-ph-muted mb-2.5">
                点击色卡可直接复制色值（85% 中性色 + 10% 石墨墨水色 + 5% 品牌橙）：
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {colorTokens.map(token => (
                  <button
                    key={token.hex}
                    type="button"
                    onClick={() => copyHex(token.hex, token.name)}
                    className="rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] hover:bg-white/70 dark:hover:bg-white/[0.06] p-2.5 text-left transition-colors cursor-pointer"
                  >
                    <div
                      className="h-8 w-full rounded-[4px] border border-black/10 dark:border-white/10 mb-2"
                      style={{ backgroundColor: token.hex }}
                    />
                    <div className="font-semibold text-xs text-ph-ink">{token.name}</div>
                    <div className="font-mono text-[10px] text-ph-muted">{token.hex}</div>
                    <div className="text-[10px] text-ph-muted mt-0.5">{token.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: IA Mapping */}
        {activeTab === 'ia' && (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-[6px] border border-ph-border-subtle">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-black/[0.04] dark:bg-white/[0.05] font-mono text-[11px] text-ph-muted">
                  <tr>
                    <th className="p-2.5">个人网站模块</th>
                    <th className="p-2.5">macOS 应用形态</th>
                    <th className="p-2.5">视觉与交互规范</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
                  <tr>
                    <td className="p-2.5 font-medium text-ph-ink">关于我与履历</td>
                    <td className="p-2.5 font-mono text-ph-orange">README.mdx</td>
                    <td className="p-2.5 text-ph-muted">8px 窗口圆角 + 6px 矩阵卡片 + 4px 方形技术标签</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-ph-ink">作品集展示</td>
                    <td className="p-2.5 font-mono text-ph-ink">Projects.app</td>
                    <td className="p-2.5 text-ph-muted">顶栏内嵌分段控制器过滤项目类别</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-ph-ink">设计规范</td>
                    <td className="p-2.5 font-mono text-ph-ink">Design_Spec.fig</td>
                    <td className="p-2.5 text-ph-muted">暖石与羊皮纸色阶 Token 复制与交互原则</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-ph-ink">个性化与壁纸</td>
                    <td className="p-2.5 font-mono text-ph-ink">Settings.app</td>
                    <td className="p-2.5 text-ph-muted">集中管理卡通壁纸、深浅色与桌面小组件显隐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ShellWindow>
  )
}
