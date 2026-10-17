import { create } from 'zustand'

export interface GuestbookMessage {
  id: string
  name: string
  topic: string
  msg: string
  time: string
}

interface ContactState {
  name: string
  topic: string
  msg: string
  messages: GuestbookMessage[]
  setName: (name: string) => void
  setTopic: (topic: string) => void
  setMsg: (msg: string) => void
  addMessage: (message: GuestbookMessage) => void
  resetForm: () => void
}

export const useContactStore = create<ContactState>(set => ({
  name: '',
  topic: '[合作] 产品顾问 / 全栈研发合作',
  msg: '',
  messages: [
    {
      id: 'init-1',
      name: '@design_lover',
      topic: '视觉反馈',
      msg: '把圆角收紧到 6px~8px、统一图标颜色之后，整个界面的秩序感舒服太多了！',
      time: '10 分钟前',
    },
    {
      id: 'init-2',
      name: 'Sarah @ Linear',
      topic: '产品探讨',
      msg: '很喜欢这种把 macOS 窗口系统与 Web 体验融合的思路，交互非常丝滑。',
      time: '昨天',
    },
  ],
  setName: name => set({ name }),
  setTopic: topic => set({ topic }),
  setMsg: msg => set({ msg }),
  addMessage: message => set(state => ({
    messages: [message, ...state.messages],
    name: '',
    msg: '',
  })),
  resetForm: () => set({ name: '', msg: '' }),
}))
