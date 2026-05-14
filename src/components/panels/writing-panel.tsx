import { ArticleIcon, BookmarkIcon, CalendarIcon, TagIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { PanelHeader } from '@/components/ui/panel-header'
import { SearchInput } from '@/components/ui/search-input'
import { OsCard } from '@/components/ui/os-card'
import { PanelBadge } from '@/components/ui/panel-badge'

interface Article {
  id: string
  url: string
  title: string
  description?: string
  date: Date
  tags: string[]
  category?: string
}

interface WritingPanelProps {
  articles: Article[]
}

const CATEGORIES = ['All', 'Engineering', 'Technical', 'Design']

export function WritingPanel({ articles }: WritingPanelProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = articles.filter((a) => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || (a.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchCat = activeCategory === 'All' || a.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <PanelHeader 
          path="workspace://writing"
          description="Technical notes, engineering logs, and design observations."
          icon={<ArticleIcon size={14} />}
        />

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <SearchInput 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search articles..."
          />
          <div className="flex items-center gap-1">
            {CATEGORIES.map(c => (
              <button 
                key={c} 
                onClick={() => setActiveCategory(c)} 
                className={cn(
                  'rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors', 
                  activeCategory === c ? 'bg-os-accent-muted text-os-accent font-semibold' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Article List */}
        <div className="space-y-2">
          {filtered.length === 0
            ? (
                <div className="py-20 text-center">
                  <p className="font-mono text-xs text-muted-foreground">No articles found in this category.</p>
                </div>
              )
            : (
                filtered.map((article, i) => (
                  <motion.div key={article.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: i * 0.04 }}>
                    <Link href={article.url}>
                      <OsCard className="p-4 cursor-pointer group">
                        <article className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              {article.category && (
                                <PanelBadge>{article.category}</PanelBadge>
                              )}
                              <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                                <CalendarIcon size={10} />
                                {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <h3 className="text-sm font-medium text-foreground group-hover:text-os-accent transition-colors">{article.title}</h3>
                            {article.description && (
                              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{article.description}</p>
                            )}
                            <div className="flex flex-wrap gap-2 pt-1">
                              {(article.tags || []).map(tag => (
                                <span key={tag} className="flex items-center gap-0.5 font-mono text-[9px] text-muted-foreground">
                                  <TagIcon size={8} />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <BookmarkIcon size={14} className="shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </article>
                      </OsCard>
                    </Link>
                  </motion.div>
                ))
              )}
        </div>
      </div>
    </motion.div>
  )
}
