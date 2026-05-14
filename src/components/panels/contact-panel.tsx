'use client'

import { CopyIcon, EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useState } from 'react'

interface ContactLink {
  id: string
  label: string
  value: string
  url: string
  icon: typeof EnvelopeIcon
}

const CONTACT_LINKS: ContactLink[] = [
  { id: 'email', label: 'Email', value: 'hello@example.dev', url: 'mailto:hello@example.dev', icon: EnvelopeIcon },
  { id: 'github', label: 'GitHub', value: 'github.com/username', url: 'https://github.com', icon: GithubLogoIcon },
  { id: 'x', label: 'X / Twitter', value: '@username', url: 'https://x.com', icon: XLogoIcon },
  { id: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/username', url: 'https://linkedin.com', icon: LinkedinLogoIcon },
]

export function ContactPanel() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(setCopied, 2000, null)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon size={14} className="text-os-accent" />
            <h1 className="font-heading text-lg font-bold tracking-tight">workspace://contact</h1>
          </div>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">Open to collaboration and interesting conversations.</p>
        </div>

        {/* Contact links */}
        <div className="space-y-2">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">CHANNELS</div>
          {CONTACT_LINKS.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.div key={link.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: i * 0.05 }} className="flex items-center justify-between rounded-sm border border-os-border bg-os-surface p-3 transition-all hover:border-os-accent/30">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 flex-1">
                  <Icon size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-xs font-medium text-foreground">{link.label}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{link.value}</div>
                  </div>
                </a>
                <button onClick={() => handleCopy(link.value, link.id)} className="flex items-center gap-1 rounded-sm px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground hover:bg-os-accent-muted">
                  <CopyIcon size={11} />
                  {copied === link.id ? 'copied!' : 'copy'}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Message box */}
        <div className="space-y-2">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">SEND MESSAGE</div>
          <div className="rounded-sm border border-os-border bg-os-surface p-4 space-y-3">
            <div className="font-mono text-[10px] text-os-terminal-fg bg-os-terminal-bg rounded-sm p-3">
              <div className="text-muted-foreground/60">// compose a message</div>
              <div className="mt-1">
                <span className="text-os-accent">$</span>
                {' '}
                <span className="text-os-terminal-fg">echo &quot;Your message here&quot; | mail -s &quot;Subject&quot; hello@example.dev</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">Feel free to reach out via any channel above. I typically respond within 24 hours.</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
