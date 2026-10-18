export interface ProjectItem {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'shipped' | 'in-progress' | 'archived'
  stars?: number
  sourceUrl: string
  tech: string[]
  url: string
}

export interface ColorToken {
  name: string
  hex: string
  desc: string
}

export const techStackCategories = [
  {
    title: 'Frontend & Craft',
    color: '#F54E00',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Design Systems'],
  },
  {
    title: 'Backend & Data',
    color: '#6B7280',
    items: ['Rust / Go', 'ClickHouse', 'PostgreSQL', 'Node.js'],
  },
  {
    title: 'AI & Agents',
    color: '#6B7280',
    items: ['LLM Workflows', 'MCP Server', 'RAG Pipeline', 'Evals'],
  },
]

export const projectsData: ProjectItem[] = [
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
    stars: 3,
    sourceUrl: 'https://github.com/42arch/website',
    tech: ['Next.js', 'Fumadocs', 'TailwindCSS', 'Zustand'],
    url: 'https://starllow.com',
  },
  {
    id: 'procedural-island-generator',
    title: 'Procedural Island Generator',
    description: '多种风格的程序化岛屿地形生成器。',
    tags: ['Procedural Generation', 'Experimental'],
    status: 'shipped',
    stars: 4,
    sourceUrl: 'https://github.com/42arch/procedural-island-generator',
    tech: ['WebGL', 'GLSL', 'ThreeJS'],
    url: 'https://procedural-island-generator.netlify.app',
  },
  {
    id: 'game-of-life',
    title: 'Game Of Life',
    description: '一个用 webgl 写的康威生命游戏。',
    tags: ['graphics', 'creative-tools', 'Experimental'],
    status: 'archived',
    stars: 0,
    sourceUrl: 'https://github.com/42arch/game-of-life',
    tech: ['WebGL', 'NextJS', 'ThreeJS'],
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
]

export const colorTokens: ColorToken[] = [
  { name: 'Warm Stone', hex: '#EAE8DF', desc: '桌面与底层背景' },
  { name: 'Paper Surface', hex: '#FAFBF8', desc: '窗口与卡片表面' },
  { name: 'Graphite Ink', hex: '#1D1F27', desc: '主文字与单色图标' },
  { name: 'Accent Orange', hex: '#F54E00', desc: '唯一品牌强调色' },
  { name: 'Signal Green', hex: '#28C840', desc: '在线与实时状态点' },
]
