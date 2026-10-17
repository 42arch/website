'use client'

import type { FormEvent } from 'react'
import type { GuestbookMessage } from '@/components/apps/contact/store'
import { EnvelopeSimpleIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useContactStore } from '@/components/apps/contact/store'
import { ShellWindow } from '@/components/shell/window'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { profile } from '@/lib/desktop-content'
import { captureTelemetryEvent } from '@/lib/telemetry'
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
  const topics = [t('topicCollab'), t('topicRole'), t('topicChat')]
  const selectedTopic = topics.includes(topic) ? topic : topics[0]

  function copyEmail() {
    navigator.clipboard.writeText(profile.email)
    showToast(`${tCommon('copied')}: ${profile.email}`)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !msg.trim())
      return

    const newMsg: GuestbookMessage = {
      id: `${Date.now()}`,
      name: name.trim(),
      topic: selectedTopic,
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
        <Button
          type="button"
          onClick={copyEmail}
          variant="link"
          size="xs"
          className="h-auto p-0"
        >
          {t('copyEmail')}
        </Button>
      )}
    >
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
          <div className="flex items-center border-b pb-2">
            <span className="text-ph-muted w-16 shrink-0">{t('recipient')}</span>
            <span className="px-2 py-0.5 rounded-[4px] bg-black/[0.05] dark:bg-white/[0.08] font-mono text-[11px] text-ph-ink">
              {profile.email}
            </span>
          </div>

          <div className="flex items-center border-b pb-2">
            <label htmlFor="contact-name" className="text-ph-muted w-16 shrink-0">{t('yourName')}</label>
            <Input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="flex items-center border-b pb-2">
            <label htmlFor="contact-topic" className="text-ph-muted w-16 shrink-0">{t('topic')}</label>
            <Select
              value={selectedTopic}
              onValueChange={setTopic}
            >
              <SelectTrigger id="contact-topic" className="w-full border-0 bg-transparent shadow-none focus-visible:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {topics.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Textarea
            aria-label={t('messagePlaceholder')}
            rows={3}
            required
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder={t('messagePlaceholder')}
            className="resize-none bg-transparent"
          />

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              size="sm"
            >
              <PaperPlaneTiltIcon data-icon="inline-start" weight="bold" />
              <span>{t('submit')}</span>
            </Button>
          </div>
        </form>

        {/* Guestbook Section */}
        <div className="pt-3">
          <Separator className="mb-3" />
          <div className="font-mono text-[10px] uppercase tracking-wider text-ph-muted mb-2 font-semibold">
            {t('guestbook')}
          </div>
          <div className="space-y-2 text-xs">
            {messages.map(item => (
              <div key={item.id} className="rounded-[6px] border bg-white/45 dark:bg-white/[0.035] p-3">
                <div className="flex justify-between font-mono text-[10px] text-ph-muted mb-1">
                  <span className="font-semibold text-ph-orange">
                    {item.name}
                    {' '}
                    ·
                    {' '}
                    {item.topic}
                  </span>
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
