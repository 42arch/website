'use client'

import type { FormEvent } from 'react'
import type { GuestbookMessage } from '@/stores/apps/contact-store'
import { EnvelopeSimpleIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { ShellWindow } from '@/components/shell/window'
import { profileData } from '@/lib/shell-content'
import { captureTelemetryEvent } from '@/lib/telemetry'
import { useContactStore } from '@/stores/apps/contact-store'
import { useShellStore } from '@/stores/shell-store'

export function ContactApp() {
  const t = useTranslations('apps.contact')
  const tCommon = useTranslations('common')
  const showToast = useShellStore(state => state.showToast)
  const name = useContactStore(state => state.name)
  const topic = useContactStore(state => state.topic)
  const msg = useContactStore(state => state.msg)
  const messages = useContactStore(state => state.messages)
  const setName = useContactStore(state => state.setName)
  const setTopic = useContactStore(state => state.setTopic)
  const setMsg = useContactStore(state => state.setMsg)
  const addMessage = useContactStore(state => state.addMessage)

  function copyEmail() {
    navigator.clipboard.writeText(profileData.email)
    showToast(`${tCommon('copied')}: ${profileData.email}`)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !msg.trim())
      return

    const newMsg: GuestbookMessage = {
      id: `${Date.now()}`,
      name: name.trim(),
      topic,
      msg: msg.trim(),
      time: t('justNow'),
    }

    addMessage(newMsg)
    showToast(t('sentToast'))
    captureTelemetryEvent('guestbook_signed', { from: newMsg.name })
  }

  return (
    <ShellWindow
      id="contact"
      title={t('title')}
      defaultWidth="min(540px, 92vw)"
      defaultHeight="min(480px, 75vh)"
      defaultLeft={240}
      defaultTop={78}
      icon={<EnvelopeSimpleIcon size={14} weight="regular" className="text-ph-muted" />}
      headerRight={(
        <button
          type="button"
          onClick={copyEmail}
          className="text-[11px] text-ph-orange font-medium hover:underline cursor-pointer"
        >
          {t('copyEmail')}
        </button>
      )}
    >
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
          <div className="flex items-center border-b border-ph-border-subtle pb-2">
            <span className="text-ph-muted w-16 shrink-0">{t('recipient')}</span>
            <span className="px-2 py-0.5 rounded-[4px] bg-black/[0.05] dark:bg-white/[0.08] font-mono text-[11px] text-ph-ink">
              {profileData.email}
            </span>
          </div>

          <div className="flex items-center border-b border-ph-border-subtle pb-2">
            <span className="text-ph-muted w-16 shrink-0">{t('yourName')}</span>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              className="w-full bg-transparent focus:outline-none text-ph-ink placeholder:text-ph-muted/60 text-xs"
            />
          </div>

          <div className="flex items-center border-b border-ph-border-subtle pb-2">
            <span className="text-ph-muted w-16 shrink-0">{t('topic')}</span>
            <select
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-ph-ink text-xs cursor-pointer"
            >
              <option value={t('topicCollab')} className="bg-ph-surface text-ph-ink">{t('topicCollab')}</option>
              <option value={t('topicRole')} className="bg-ph-surface text-ph-ink">{t('topicRole')}</option>
              <option value={t('topicChat')} className="bg-ph-surface text-ph-ink">{t('topicChat')}</option>
            </select>
          </div>

          <textarea
            rows={3}
            required
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder={t('messagePlaceholder')}
            className="w-full pt-1 bg-transparent focus:outline-none text-ph-ink placeholder:text-ph-muted/60 text-xs resize-none"
          />

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="rounded-[5px] bg-ph-orange hover:bg-ph-orange-hover text-white px-3.5 py-1.5 font-medium text-xs flex items-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              <PaperPlaneTiltIcon size={13} weight="bold" />
              <span>{t('submit')}</span>
            </button>
          </div>
        </form>

        {/* Guestbook Section */}
        <div className="pt-3 border-t border-ph-border-subtle">
          <div className="font-mono text-[10px] uppercase tracking-wider text-ph-muted mb-2 font-semibold">
            {t('guestbook')}
          </div>
          <div className="space-y-2 text-xs">
            {messages.map(item => (
              <div key={item.id} className="rounded-[6px] border border-ph-border-subtle bg-white/45 dark:bg-white/[0.035] p-3">
                <div className="flex justify-between font-mono text-[10px] text-ph-muted mb-1">
                  <span className="font-semibold text-ph-orange">{item.name} · {item.topic}</span>
                  <span>{item.time}</span>
                </div>
                <p className="text-ph-ink leading-relaxed">{item.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ShellWindow>
  )
}
