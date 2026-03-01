import type { AppLocale } from '@/i18n/config'

export interface Skill {
  name: Record<AppLocale, string>
  level: number
}

const localizedProfile = {
  name: '42arch',
  title: {
    'en': 'Frontend Engineer // Starllow Lab Owner',
    'zh-CN': '前端工程师 // Starllow Lab 主理人',
  },
  domain: 'starllow.com',
  intro: {
    'en': 'I build immersive product experiences where engineering quality and visual storytelling reinforce each other.',
    'zh-CN': '我专注于沉浸式产品体验，让工程质量与视觉叙事互相增强。',
  },
  story: {
    'en': [
      'I started from game mods and pixel art experiments, then transitioned into production web engineering. That background still shapes how I design interfaces today.',
      'At Starllow Lab, every page is treated like a level: strong hierarchy, clear feedback, and a coherent visual language from entry to exit.',
    ],
    'zh-CN': [
      '我从游戏模组和像素创作起步，随后转向生产级 Web 工程。那段背景依然影响着我今天的界面设计方式。',
      '在 Starllow Lab 中，每个页面都被当作一个关卡：层级清晰、反馈明确、从进入到离开保持统一视觉语言。',
    ],
  },
}

const localizedSkills: Skill[] = [
  {
    name: {
      'en': 'TypeScript',
      'zh-CN': 'TypeScript',
    },
    level: 93,
  },
  {
    name: {
      'en': 'Next.js',
      'zh-CN': 'Next.js',
    },
    level: 90,
  },
  {
    name: {
      'en': 'Design Systems',
      'zh-CN': '设计系统',
    },
    level: 87,
  },
  {
    name: {
      'en': 'Interaction Design',
      'zh-CN': '交互设计',
    },
    level: 84,
  },
  {
    name: {
      'en': 'Performance Tuning',
      'zh-CN': '性能优化',
    },
    level: 81,
  },
]

export function getProfile(locale: AppLocale) {
  return {
    name: localizedProfile.name,
    title: localizedProfile.title[locale],
    domain: localizedProfile.domain,
    intro: localizedProfile.intro[locale],
    story: localizedProfile.story[locale],
  }
}

export function getSkills(locale: AppLocale) {
  return localizedSkills.map(skill => ({
    name: skill.name[locale],
    level: skill.level,
  }))
}
