import type { AppLocale } from '@/i18n/config'

interface LocalizedProject {
  icon: string
  type: string
  wip?: boolean
  name: Record<AppLocale, string>
  description: Record<AppLocale, string>
  tags: string[]
  liveUrl: string
  repoUrl: string
}

export interface Project {
  icon: string
  type: string
  wip: boolean
  name: string
  description: string
  tags: string[]
  liveUrl: string
  repoUrl: string
}

const localizedProjects: LocalizedProject[] = [
  {
    icon: '🎪',
    type: 'Graphic',
    name: {
      'en': 'Playground',
      'zh-CN': 'Playground',
    },
    description: {
      'en': 'Our experimental demos and examples',
      'zh-CN': '我们的实验性演示与示例集合。',
    },
    tags: ['WebGL', 'Three.js', 'GLSL'],
    liveUrl: 'https://playground.starllow.com',
    repoUrl: 'https://github.com/42arch/playground',
  },
  {
    icon: '🌍',
    type: 'Extension',
    name: {
      'en': 'geojson.io for vscode',
      'zh-CN': 'geojson.io for vscode',
    },
    description: {
      'en': 'Create, edit, and preview geojson data in VSCode.',
      'zh-CN': '在 VSCode 中创建、编辑并预览 GeoJSON 数据。',
    },
    tags: ['VSCode', 'GeoJSON'],
    liveUrl: 'https://marketplace.visualstudio.com/items?itemName=swallow.geojson-io-for-vscode',
    repoUrl: 'https://github.com/42arch/geojson.io-for-vscode',
  },
  {
    icon: '🐱',
    type: 'WebApp',
    name: {
      'en': 'Pokemon Pokedex (ZH)',
      'zh-CN': '宝可梦中文图鉴',
    },
    description: {
      'en': 'Fast lookup for your Pokemon partners anytime.',
      'zh-CN': '快速查询，随时了解你的宝可梦伙伴！',
    },
    tags: ['Next.js', 'Pokemon', 'Game'],
    liveUrl: 'https://pokedex.starllow.com',
    repoUrl: 'https://github.com/42arch/pokedex-zh',
  },
  {
    icon: '🏝️',
    type: 'Graphic',
    name: {
      'en': 'Procedural Island Generator',
      'zh-CN': 'Procedural Island Generator',
    },
    description: {
      'en': 'A multiple-style random island generator',
      'zh-CN': '支持多种风格的随机岛屿生成器。',
    },
    tags: ['WebGL', 'GLSL', 'Noise'],
    liveUrl: 'https://procedural-island-generator.netlify.app',
    repoUrl: 'https://github.com/42arch/procedural-island-generator',
  },
  {
    icon: '👾',
    type: 'WebApp',
    name: {
      'en': 'Game of Life',
      'zh-CN': '生命游戏',
    },
    description: {
      'en': 'Conway\'s Game of Life built with Three.js and WebGL',
      'zh-CN': '基于 Three.js 和 WebGL 构建的康威生命游戏',
    },
    tags: ['WebGL', 'Three.js'],
    liveUrl: 'https://game-of-life.starllow.com',
    repoUrl: 'https://github.com/42arch/game-of-life',
  },
  {
    icon: '🛣️',
    type: 'Tool',
    name: {
      'en': 'HDMap Viewer',
      'zh-CN': 'HDMap Viewer',
    },
    description: {
      'en': 'JavaScript ported OpenDRIVE parser and viewer',
      'zh-CN': '基于 JavaScript 的 OpenDRIVE 解析与可视化工具。',
    },
    tags: ['OpenDRIVE', 'XODR'],
    liveUrl: 'https://hdmap-viewer.starllow.com',
    repoUrl: 'https://github.com/42arch/hdmap-viewer',
  },
]

export function getProjects(locale: AppLocale): Project[] {
  return localizedProjects.map(project => ({
    icon: project.icon,
    type: project.type,
    wip: Boolean(project.wip),
    name: project.name[locale],
    description: project.description[locale],
    tags: project.tags,
    liveUrl: project.liveUrl,
    repoUrl: project.repoUrl,
  }))
}
