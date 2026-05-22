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
    name: 'Folio OS',
    url: 'https://folio-os.starllow.com',
    githubRepo: 'https://github.com/42arch/folio-os',
    locale: 'en_US',
    description: 'An experimental workspace interface for exploring projects, experiments, and technical writing. Built as a high-fidelity digital developer operating system.',
    keywords: [
      'developer portfolio',
      'workspace UI',
      'developer workspace',
      'digital operating system',
      'web OS',
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
    location: 'Shanghai, CN',
    stack: 'TypeScript / React / Swift',
    focus: 'Interactive Systems',
    status: 'Open to collaboration',
    role: 'Developer',
  },

  // ─── 🔗 Social / Contact ────────────────────────────────
  social: {
    email: 'hello@example.dev',
    github: 'https://github.com/42arch',
    x: 'https://x.com/dan_dev',
    linkedin: 'https://linkedin.com/in/username',
  },

  // ─── 🗂️ Projects ────────────────────────────────────────
  projects: [
    {
      id: 'fantasy-map',
      title: 'Fantasy Map Generator',
      description: 'A procedural terrain generation engine with real-time elevation editing, river network simulation, climate zones, and Voronoi-based landmass creation. Features GPU-accelerated rendering via custom shaders.',
      tags: ['procedural', 'visualization', 'interactive'],
      status: 'active',
      stars: 128,
      lastUpdated: '2026-05-14',
      tech: ['TypeScript', 'WebGL', 'Zustand', 'Next.js'],
      commits: 847,
      url: '#',
    },
    {
      id: 'folio-os',
      title: 'Folio OS',
      description: 'This website. An experimental workspace interface inspired by IDE, developer tools, and retro operating system aesthetics. Panel-based navigation with command palette, explorer tree, and activity monitoring.',
      tags: ['experimental', 'interface', 'workspace'],
      status: 'in-progress',
      lastUpdated: '2026-05-14',
      tech: ['Next.js', 'Motion', 'Tailwind', 'Zustand'],
      commits: 142,
      url: '#',
    },
    {
      id: 'network-monitor',
      title: 'Network Stats Monitor',
      description: 'A Retina-optimized macOS menu bar application for real-time network throughput monitoring. Features custom pixel-rendered triangle indicators and 2x oversampling for crisp HiDPI rendering.',
      tags: ['macOS', 'native', 'monitoring'],
      status: 'shipped',
      stars: 45,
      lastUpdated: '2026-05-11',
      tech: ['Swift', 'AppKit', 'IOKit'],
      commits: 203,
      url: '#',
    },
    {
      id: 'shader-playground',
      title: 'Shader Playground',
      description: 'Real-time GLSL shader editor and preview tool with hot-reload, uniform inspection, and exportable snippets. Built for rapid prototyping of visual effects and generative art.',
      tags: ['graphics', 'creative-tools', 'real-time'],
      status: 'archived',
      lastUpdated: '2025-12-20',
      tech: ['WebGL', 'GLSL', 'React'],
      commits: 89,
      url: '#',
    },
    {
      id: 'dev-dash',
      title: 'Dev Dashboard',
      description: 'A self-hosted developer dashboard aggregating GitHub activity, CI/CD status, deployment logs, and project metrics into a single modular interface. Configurable widget system.',
      tags: ['dashboard', 'devops', 'monitoring'],
      status: 'shipped',
      stars: 72,
      lastUpdated: '2026-03-15',
      tech: ['Next.js', 'Prisma', 'PostgreSQL'],
      commits: 324,
      url: '#',
    },
    {
      id: 'type-engine',
      title: 'Type Engine',
      description: 'A minimal, opinionated typographic design system for web. Provides fluid type scales, rhythm utilities, and a compact reading experience optimized for technical content.',
      tags: ['design-system', 'typography', 'CSS'],
      status: 'shipped',
      lastUpdated: '2026-01-08',
      tech: ['CSS', 'PostCSS', 'TypeScript'],
      commits: 156,
      url: '#',
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
    },
    {
      id: 'exp-002',
      title: 'GPU-Accelerated Terrain Editing',
      description: 'Migrating CPU-bound terrain modification to WebGL shaders for real-time brush-based editing at 60fps.',
      status: 'completed',
      date: '2026-04-22',
      category: 'Graphics',
      findings: 'Achieved 60fps stable with brush radii up to 200px.',
    },
    {
      id: 'exp-003',
      title: 'Voronoi-based River Networks',
      description: 'Implementing hydrologically accurate river generation using Voronoi diagrams.',
      status: 'completed',
      date: '2026-04-21',
      category: 'Algorithms',
      findings: 'Flux-based width scaling produces natural-looking rivers.',
    },
    {
      id: 'exp-004',
      title: 'Retina Pixel Rendering',
      description: 'Custom 2x oversampling for crisp tray icon rendering on macOS HiDPI displays.',
      status: 'completed',
      date: '2026-05-11',
      category: 'Native',
      findings: 'Manual pixel drawing at 2x eliminates all blurriness on Retina displays.',
    },
    {
      id: 'exp-005',
      title: 'Warm Industrial Color System',
      description: 'Designing a color token system using warm gray/cream backgrounds with amber accents.',
      status: 'running',
      date: '2026-05-14',
      category: 'Design',
    },
    {
      id: 'exp-006',
      title: 'Command Palette with Fuzzy Search',
      description: 'Implementing Raycast/Linear-style command palette for keyboard-first navigation.',
      status: 'planned',
      date: '2026-05-15',
      category: 'UI/UX',
    },
  ],

  // ─── 🖼️ Gallery ──────────────────────────────────────────
  gallery: [
    {
      id: 'g1',
      title: 'Terrain Heightmap',
      description: 'Procedurally generated elevation data visualization',
      category: 'Visualization',
      color: 'from-emerald-900/80 to-emerald-600/40',
      aspect: 'landscape',
    },
    {
      id: 'g2',
      title: 'River Network Graph',
      description: 'Voronoi-based hydrological simulation output',
      category: 'Algorithms',
      color: 'from-blue-900/80 to-cyan-600/40',
      aspect: 'square',
    },
    {
      id: 'g3',
      title: 'Shader Experiment #12',
      description: 'Fractal noise distortion with color remapping',
      category: 'Shaders',
      color: 'from-purple-900/80 to-pink-600/40',
      aspect: 'portrait',
    },
    {
      id: 'g4',
      title: 'UI Component System',
      description: 'Design token reference sheet for workspace UI',
      category: 'Design',
      color: 'from-amber-900/80 to-orange-600/40',
      aspect: 'landscape',
    },
    {
      id: 'g5',
      title: 'Climate Zones Map',
      description: 'Temperature and precipitation distribution',
      category: 'Visualization',
      color: 'from-red-900/80 to-yellow-600/40',
      aspect: 'square',
    },
    {
      id: 'g6',
      title: 'Network Monitor UI',
      description: 'Retina-optimized tray icon rendering at 2x',
      category: 'Native',
      color: 'from-zinc-900/80 to-zinc-600/40',
      aspect: 'landscape',
    },
  ],

  // ─── ℹ️ About Section ───────────────────────────────────
  about: {
    description: 'An experimental, high-fidelity developer workspace and portfolio, designed as a retro-futuristic virtual operating system. It provides an immersive interface to explore technical projects, interactive experiments, and thoughts on software engineering, all unified within a single desktop workspace environment.',
    techStackDescription: 'Folio OS is built on a modern, ultra-fast frontend stack designed for high interactivity, responsive layouts, and smooth animations.',
  },

  // ─── 🏠 Overview Page ───────────────────────────────────
  overview: {
    asciiArt: `
███████╗ ██████╗ ██╗     ██╗ ██████╗      ██████╗ ███████╗
██╔════╝██╔═══██╗██║     ██║██╔═══██╗    ██╔═══██╗██╔════╝
█████╗  ██║   ██║██║     ██║██║   ██║    ██║   ██║███████╗
██╔══╝  ██║   ██║██║     ██║██║   ██║    ██║   ██║╚════██║
██║     ╚██████╔╝███████╗██║╚██████╔╝    ╚██████╔╝███████║
╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝      ╚═════╝ ╚══════╝
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
    shellName: 'folio-sh',
    bootMessage: `Folio OS Kernel v${pkg.version} loaded.`,
    petName: 'Pixel',
    neofetch: {
      osName: `Folio OS v${pkg.version}`,
      kernel: `Next.js ${pkg.dependencies.next || ''}`,
      shell: 'folio-sh 1.0',
      runtime: `React ${pkg.dependencies.react || ''}`,
      ui: `Tailwind CSS ${(pkg.devDependencies.tailwindcss || '').replace(/[\^~]/, '')}`,
      stateManager: `Zustand ${(pkg.dependencies.zustand || '').replace(/[\^~]/, '')}`,
    },
  },
}

export default config
