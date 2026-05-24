import type { SiteConfig } from './src/config/types'
import pkg from './package.json'

// ═══════════════════════════════════════════════════════════
// 🔧 Folio OS — Site Configuration
//
// This is the ONLY file you need to edit after forking.
// All personal data, project info, and content is defined here.
// ═══════════════════════════════════════════════════════════

const config: SiteConfig = {
  // ─── 🌐 Site Basics ─────────────────────────────────────
  site: {
    name: 'Starllow',
    url: 'https://starllow.com',
    githubRepo: 'https://github.com/42arch/website',
    locale: 'zh-CN',
    description: '欢迎来到 Starllow Lab，这是一个探索前沿技术和创意表达的实验空间。',
    keywords: [
      'developer portfolio',
      'starllow',
      'Starllow Lab',
      '42arch',
      'dan',
      'Ren Dan',
      'Web OS',
      'Fumadocs portfolio',
      'Next.js portfolio',
      'creative developer',
      'interactive cv',
    ],
    themeColor: '#f5f2eb',
    backgroundColor: '#f5f2eb',
    defaultTheme: 'linen',
  },

  // ─── 👤 Author ──────────────────────────────────────────
  author: {
    name: 'Dan',
    location: 'China, Earth',
    stack: 'TypeScript / React / Rust',
    focus: 'Web3D, Map',
    status: 'Open to collaboration',
    role: 'Developer',
  },

  // ─── 🔗 Social / Contact ────────────────────────────────
  social: {
    email: 'rend42@163.com',
    github: 'https://github.com/42arch',
    x: 'https://x.com/42archy',
    bilibili: 'https://space.bilibili.com/22589532',
    stackblitz: 'https://stackblitz.com/@42arch'
  },

  // ─── 🗂️ Projects ────────────────────────────────────────
  projects: [
    {
      id: 'geojsonio-for-vscode',
      title: 'GeoJSON IO for VSCode',
      description: '在 VSCode 中预览，创建和编辑 geojson 文件。',
      tags: ['Extension', 'VSCode', 'GeoJSON'],
      status: 'shipped',
      stars: 29,
      sourceUrl: 'https://github.com/42arch/geojson.io-for-vscode',
      tech: ['TypeScript', 'React', 'VSCode', 'MapboxGL'],
      url: 'https://marketplace.visualstudio.com/items?itemName=swallow.geojson-io-for-vscode',
    },
    {
      id: 'hdmap-viewer',
      title: 'HDMap Viewer',
      description: '基于 JavaScript 的高精地图解析与可视化工具，支持 OpenDRIVE 等格式。',
      tags: ['HDMap', 'OpenDRIVE', 'Experimental'],
      status: 'in-progress',
      stars: 1,
      sourceUrl: 'https://github.com/42arch/hdmap-viewer',
      tech: ['TypeScript', 'Vite', 'ThreeJS'],
      url: 'https://hdmap-viewer.starllow.com',
    },
    {
      id: 'folio-os',
      title: 'Website - Folio OS',
      description: '个人网站，界面设计灵感来源于 IDE 和操作系统。',
      tags: ['Website', 'Portfolio', 'Experimental'],
      status: 'in-progress',
      sourceUrl: 'https://github.com/42arch/website',
      tech: ['Next.js', 'Fumadocs', 'TailwindCSS', 'Zustand'],
      stars: 3,
      url: 'https://starllow.com',
    },
    {
      id: 'procedural-island-generator',
      title: 'Procedural Island Generator',
      description: '多种风格的程序化岛屿地形生成器。',
      tags: ['Procedural Generation', 'Experimental'],
      status: 'shipped',
      sourceUrl: 'https://github.com/42arch/procedural-island-generator',
      tech: ['WebGL', 'GLSL', 'ThreeJS'],
      stars: 4,
      url: 'procedural-island-generator.netlify.app',
    },
    {
      id: 'game-of-life',
      title: 'Game Of Life',
      description: '一个用 webgl 写的康威生命游戏。',
      tags: ['graphics', 'creative-tools', 'Experimental'],
      status: 'archived',
      sourceUrl: 'https://github.com/42arch/game-of-life',
      tech: ['WebGL', 'NextJS', 'ThreeJS'],
      stars: 0,
      url: 'https://game-of-life.starllow.com/zh',
    },
    {
      id: 'pokemon-zh',
      title: '宝可梦中文图鉴',
      description: '快速查询，随时了解你的宝可梦伙伴！',
      tags: ['WebApp', 'Game'],
      status: 'shipped',
      sourceUrl: 'https://github.com/42arch/pokedex-zh',
      tech: ['TypeScript', 'NextJS', 'TailwindCSS'],
      url: 'https://pokedex.starllow.com/',
    },
  ],

  // ─── 🧪 Experiments ─────────────────────────────────────
  experiments: [
    {
      id: 'exp-001',
      title: 'Panel-based Navigation System',
      description: 'Exploring IDE-inspired navigation patterns for personal websites.',
      status: 'running',
      date: '2026-05-14',
      category: 'UI/UX',
      findings: 'Panel-based layouts show 40% higher engagement time compared to traditional scroll layouts.',
    }
  ],

  // ─── 🖼️ Gallery ──────────────────────────────────────────
  gallery: [
    {
      id: 'g3',
      title: 'Shader Experiment #12',
      description: 'Fractal noise distortion with color remapping',
      category: 'Shaders',
      color: 'from-purple-900/80 to-pink-600/40',
      aspect: 'portrait',
    }
  ],

  // ─── ℹ️ About Section ───────────────────────────────────
  about: {
    description: '欢迎来到 Starllow，一个探索前沿技术和创意表达的实验空间。',
    techStackDescription: '',
  },

  // ─── 🏠 Overview Page ───────────────────────────────────
  overview: {
    asciiArt: `
███████╗████████╗ █████╗ ██████╗ ██╗     ██╗      ██████╗ ██╗    ██╗
██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██║     ██║     ██╔═══██╗██║    ██║
███████╗   ██║   ███████║██████╔╝██║     ██║     ██║   ██║██║ █╗ ██║
╚════██║   ██║   ██╔══██║██╔══██╗██║     ██║     ██║   ██║██║███╗██║
███████║   ██║   ██║  ██║██║  ██║███████╗███████╗╚██████╔╝╚███╔███╔╝
╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝  ╚══╝╚══╝ 
    `.trim(),

    subtitle: 'System Executive Environment',
    buildTag: 'Build 0x4F53_2026 // Status: Optimal',

    stats: [
      { label: 'uptime', value: '99.9%', color: 'bg-emerald-400' },
      { label: 'projects', value: '8', color: 'bg-blue-400' },
      { label: 'commits', value: '1,247', color: 'bg-amber-400' },
      { label: 'deployments', value: '42', color: 'bg-purple-400' },
    ],

    currentFocus: {
      title: 'Workspace Interface',
      description: 'Building a developer workspace inspired by IDE and operating system aesthetics. Focusing on panel-based navigation, high information density, and experimental interactions.',
      branch: 'main',
      date: 'Week 20, 2026',
      commits: '+34 commits',
    },
  },

  // ─── ⌨️ Terminal ─────────────────────────────────────────
  terminal: {
    shellName: 'starllow-sh',
    bootMessage: `Starllow OS Kernel v${pkg.version} loaded.`,
    petName: 'Pixel',
    neofetch: {
      osName: `Starllow OS v${pkg.version}`,
      kernel: `Next.js ${pkg.dependencies.next || ''}`,
      shell: 'starllow-sh 1.0',
      runtime: `React ${pkg.dependencies.react || ''}`,
      ui: `Tailwind CSS ${(pkg.devDependencies.tailwindcss || '').replace(/[\^~]/, '')}`,
      stateManager: `Zustand ${(pkg.dependencies.zustand || '').replace(/[\^~]/, '')}`,
    },
  },
}

export default config
