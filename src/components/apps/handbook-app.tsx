'use client'

import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { ShellWindow } from '@/components/shell/window'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useHandbookStore } from '@/stores/apps/handbook-store'

interface ArticleItem {
  slug: string
  title: string
  date: string
  category: string
  intro: string
  tags: string[]
  snippet: string
}

export function HandbookApp() {
  const t = useTranslations('apps.handbook')
  const activeTab = useHandbookStore(state => state.activeTab)
  const selectedNote = useHandbookStore(state => state.selectedNote)
  const setActiveTab = useHandbookStore(state => state.setActiveTab)
  const setSelectedNote = useHandbookStore(state => state.setSelectedNote)

  const principles = [
    {
      num: '01 / SHIPPING',
      title: '小步快跑，真实反馈优先',
      desc: '一个今天就能在用户浏览器里顺滑交互的原型，远胜于在文档里空谈三个月的宏大架构。持续交付真实可感知的价值。',
      highlight: true,
    },
    {
      num: '02 / CRAFT',
      title: '工程与审美合一',
      desc: '优秀的产品工程师既能优化数据库查询与构建耗时，也会在乎 6px~8px 的微圆角曲率、字重对比与按键回弹阻尼。',
      highlight: false,
    },
    {
      num: '03 / TRANSPARENCY',
      title: '默认公开，坦诚沟通',
      desc: '把决策过程与代码一同开源，让每一个架构改动背后都有据可依，建立透明且富有信任的协作氛围。',
      highlight: false,
    },
    {
      num: '04 / SIMPLICITY',
      title: '保持极简，拒绝过度设计',
      desc: '在满足核心体验的前提下，用最克制、最稳健的代码解决根本痛点。代码越精简，系统越可靠。',
      highlight: false,
    },
  ]

  const articles: ArticleItem[] = [
    {
      slug: 'gpu-picking',
      title: '让 GPU 帮你找到那个物体',
      date: '2025.12.30',
      category: 'WebGL / 交互技术',
      intro: '把一次几何计算，变成一次颜色查找。在 WebGL 3D 场景中给每个物体分配独立颜色 ID，利用 FBO 离屏渲染实现精准拾取。',
      tags: ['WebGL', 'GPU Picking', 'FBO'],
      snippet: `// 颜色 ID 映射原理
function idToColor(id: number): [number, number, number] {
  return [
    (id & 0x0000FF) / 255,
    ((id & 0x00FF00) >> 8) / 255,
    ((id & 0xFF0000) >> 16) / 255,
  ]
}`,
    },
    {
      slug: 'mathmatic-knowledge-in-webgl',
      title: '向量：一个有方向的开始',
      date: '2025.08.03',
      category: '图形学基础 / 线性代数',
      intro: '重新认识图形世界里最常见的那个箭头。深入解析点与向量的区别、坐标平移、点积与叉积的几何意义，以及单位向量归一化运算。',
      tags: ['向量', '线性代数', 'WebGL'],
      snippet: `function normalize(v: [number, number, number]): [number, number, number] {
  const length = Math.hypot(v[0], v[1], v[2])
  return length === 0 ? [0, 0, 0] : [v[0] / length, v[1] / length, v[2] / length]
}`,
    },
    {
      slug: 'mcap-intro',
      title: 'MCAP 文件介绍与解析',
      date: '2026.07.11',
      category: '数据与工具 / 自动驾驶',
      intro: '用于记录机器人、自动驾驶场景下结构化消息数据的日志容器格式。解析 Channel、Schema、Message 与 Chunk 核心数据结构。',
      tags: ['MCAP', '数据格式', '自动驾驶'],
      snippet: `interface McapRecord {
  opCode: number
  recordLength: bigint
  payload: Uint8Array
}`,
    },
  ]

  const currentArticle = selectedNote ? articles.find(a => a.slug === selectedNote) : null

  return (
    <ShellWindow
      id="handbook"
      title={t('title')}
      defaultWidth="min(720px, 94vw)"
      defaultHeight="min(510px, 75vh)"
      defaultLeft={180}
      defaultTop={64}
      icon={<BookOpenIcon size={14} weight="regular" className="text-ph-muted" />}
      headerCenter={(
        <ToggleGroup
          type="single"
          value={activeTab}
          onValueChange={(value) => {
            if (value === 'principles') {
              setActiveTab(value)
              setSelectedNote(null)
            }
            else if (value === 'notes') {
              setActiveTab(value)
            }
          }}
          variant="outline"
          size="sm"
          spacing={0}
          aria-label={t('title')}
        >
          <ToggleGroupItem value="principles">01 / {t('tabPrinciples')}</ToggleGroupItem>
          <ToggleGroupItem value="notes">02 / {t('tabArticles')} ({articles.length})</ToggleGroupItem>
        </ToggleGroup>
      )}
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {activeTab === 'principles' && (
          <>
            <div className="border-b pb-4">
              <span className="px-2 py-0.5 bg-ph-orange/10 text-ph-orange font-mono text-[10px] font-semibold rounded-[4px]">
                {t('howIWork')}
              </span>
              <h2 className="text-lg font-bold text-ph-ink mt-2">{t('heading')}</h2>
              <p className="text-xs text-ph-muted mt-1">
                {t('subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {principles.map(p => (
                <div key={p.num} className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-4 flex flex-col justify-between">
                  <div>
                    <div className={`font-mono text-[10px] font-semibold mb-1 ${p.highlight ? 'text-ph-orange' : 'text-ph-muted'}`}>
                      {p.num}
                    </div>
                    <h3 className="font-bold text-sm text-ph-ink mb-1.5">{p.title}</h3>
                    <p className="text-xs text-ph-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 bg-ph-green/10 text-ph-green font-mono text-[10px] font-semibold rounded-[4px]">
                    FUMADOCS CONTENT
                  </span>
                  <h2 className="text-lg font-bold text-ph-ink mt-1.5">{t('notesHeading')}</h2>
                  <p className="text-xs text-ph-muted mt-0.5">
                    {t('notesDesc')}
                  </p>
                </div>
                {selectedNote && (
                  <button
                    type="button"
                    onClick={() => setSelectedNote(null)}
                    className="text-xs font-mono text-ph-orange hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeftIcon size={12} weight="bold" />
                    <span>{t('backToList')}</span>
                  </button>
                )}
              </div>
            </div>

            {currentArticle ? (
              <div className="space-y-3.5">
                <div className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-ph-orange font-semibold">{currentArticle.category}</span>
                    <span className="text-[11px] font-mono text-ph-muted">{currentArticle.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-ph-ink">{currentArticle.title}</h3>
                  <p className="text-xs text-ph-ink/90 leading-relaxed">{currentArticle.intro}</p>
                  <div className="flex gap-1.5 pt-1">
                    {currentArticle.tags.map(t => (
                      <span key={t} className="px-1.5 py-0.5 rounded-[4px] bg-black/[0.04] dark:bg-white/[0.06] text-[10px] font-mono text-ph-muted">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[6px] bg-[#161820] border border-black/20 dark:border-white/10 text-gray-200 p-4 font-mono text-xs overflow-x-auto">
                  <div className="text-[10px] text-gray-500 mb-2 border-b border-white/10 pb-1">CODE IMPLEMENTATION</div>
                  <pre className="text-gray-300 leading-relaxed">{currentArticle.snippet}</pre>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {articles.map(article => (
                  <div
                    key={article.slug}
                    onClick={() => setSelectedNote(article.slug)}
                    className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] hover:bg-white/75 dark:hover:bg-white/[0.06] p-4 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-semibold text-ph-orange">{article.category}</span>
                      <span className="text-[10px] font-mono text-ph-muted">{article.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-ph-ink mb-1">{article.title}</h3>
                    <p className="text-xs text-ph-muted leading-relaxed line-clamp-2">{article.intro}</p>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t">
                      <div className="flex gap-1.5">
                        {article.tags.map(t => (
                          <span key={t} className="px-1.5 py-0.5 rounded-[4px] bg-black/[0.04] dark:bg-white/[0.06] text-[10px] font-mono text-ph-muted">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-ph-orange font-medium flex items-center gap-1">
                        <span>{t('readMore')}</span>
                        <ArrowRightIcon size={11} weight="bold" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ShellWindow>
  )
}
