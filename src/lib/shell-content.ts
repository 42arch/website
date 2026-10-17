export interface ProjectItem {
  title: string
  category: 'all' | 'ai' | 'oss' | 'saas'
  badge: string
  color: string
  desc: string
  stack: string[]
  metric: string
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
    title: 'HogQL-Studio',
    category: 'oss',
    badge: '5.8k',
    color: '#F54E00',
    desc: '浏览器端轻量级 SQL & ClickHouse 查询工作台，内置高速虚拟滚动与一键图表生成。',
    stack: ['TypeScript', 'React', 'DuckDB-Wasm'],
    metric: '42k+ MAU',
  },
  {
    title: 'AgentReplay.ai',
    category: 'ai',
    badge: '3.9k',
    color: '#007AFF',
    desc: '专为 LLM Agent 打造的会话回放与推理链路追踪器，可视化调试 Prompt 与工具调用。',
    stack: ['Next.js', 'Python', 'OpenTelemetry'],
    metric: '12M+ Traces',
  },
  {
    title: 'MatteUI.kit',
    category: 'oss',
    badge: '2.7k',
    color: '#FEBC2E',
    desc: '融合 macOS 哑光颗粒感与 PostHog 微立体键帽美学的 React 组件库，零外部图标依赖。',
    stack: ['Tailwind', 'Radix UI', 'SVG'],
    metric: '18k dl/wk',
  },
  {
    title: 'Changelogs.sh',
    category: 'saas',
    badge: '$4.2k MRR',
    color: '#28C840',
    desc: '将 Git Commit 记录自动转化为精美产品更新周报的独立 SaaS 工具。',
    stack: ['Go', 'PostgreSQL', 'Stripe'],
    metric: '190+ Teams',
  },
  {
    title: 'MCP-Desktop-Bridge',
    category: 'ai',
    badge: '1.8k',
    color: '#8B5CF6',
    desc: '让本地大模型安全读写个人笔记与终端的工作流桥接器，支持细粒度权限确认。',
    stack: ['Rust', 'Tauri', 'MCP'],
    metric: 'Latency < 8ms',
  },
  {
    title: 'FeatureFlag.mini',
    category: 'saas',
    badge: 'Beta',
    color: '#EC4899',
    desc: '面向独立开发者的极简特性开关与 A/B 实验服务，单文件 SDK 仅 1.8KB。',
    stack: ['Cloudflare Workers', 'Edge KV'],
    metric: '12ms Edge',
  },
]

export const colorTokens: ColorToken[] = [
  { name: 'Warm Stone', hex: '#EAE8DF', desc: '桌面与底层背景' },
  { name: 'Paper Surface', hex: '#FAFBF8', desc: '窗口与卡片表面' },
  { name: 'Graphite Ink', hex: '#1D1F27', desc: '主文字与单色图标' },
  { name: 'Accent Orange', hex: '#F54E00', desc: '唯一品牌强调色' },
  { name: 'Signal Green', hex: '#28C840', desc: '在线与实时状态点' },
]
