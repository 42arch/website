import type { AppLocale } from '@/i18n/config'

interface LocalizedBlogPost {
  slug: string
  date: string
  tags: string[]
  title: Record<AppLocale, string>
  excerpt: Record<AppLocale, string>
  readTime: Record<AppLocale, string>
  content: Record<AppLocale, string[]>
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  content: string[]
}

const localizedBlogPosts: LocalizedBlogPost[] = [
  {
    slug: 'starllow-lab-launch-log',
    date: '2026-02-21',
    tags: ['Brand', 'Next.js', 'Pixel'],
    title: {
      'en': 'Starllow Lab Launch Log',
      'zh-CN': 'Starllow Lab 上线日志',
    },
    excerpt: {
      'en': 'How 42arch turned a personal site into an RPG-style laboratory at starllow.com.',
      'zh-CN': '42arch 如何把个人网站改造成 starllow.com 上的 RPG 风实验室。',
    },
    readTime: {
      'en': '5 min',
      'zh-CN': '5 分钟',
    },
    content: {
      'en': [
        'The concept started from a single question: can a portfolio feel like a playable game menu instead of a static resume. Starllow combines "Star" and "Swallow" to represent fast exploration and focused direction.',
        'I mapped core visitor tasks first, then wrapped them with a consistent pixel shell. The visual language follows strict rules: hard edges, high-contrast accents, and compact typography to keep the retro feel coherent.',
        'The final structure keeps content simple but expressive. Home sets context, Blog stores dev logs, Projects show shipped work, and About explains the maker behind the lab.',
      ],
      'zh-CN': [
        '这个概念源于一个问题：作品集能否像可操作的游戏菜单，而不是静态简历。Starllow 由 Star 和 Swallow 组合而成，代表快速探索与聚焦方向。',
        '我先梳理访客核心任务，再用统一像素外壳包装所有页面。视觉语言遵循硬边框、高对比配色与紧凑排版，确保复古感一致。',
        '最终结构简单但有表达力：首页提供定位，博客记录开发日志，项目页展示交付成果，关于页解释实验室背后的创作者。',
      ],
    },
  },
  {
    slug: 'building-a-pixel-nav-system',
    date: '2026-02-09',
    tags: ['UI', 'Navigation', 'Design System'],
    title: {
      'en': 'Building a Pixel Nav System',
      'zh-CN': '构建像素化导航系统',
    },
    excerpt: {
      'en': 'Designing a top navigation that behaves like an RPG menu selector.',
      'zh-CN': '设计一个像 RPG 菜单选择器一样工作的顶部导航。',
    },
    readTime: {
      'en': '4 min',
      'zh-CN': '4 分钟',
    },
    content: {
      'en': [
        'I used one persistent top bar with explicit route states so users always know their location. The active state uses a "▶" cursor to mimic game menu controls.',
        'Spacing and density matter in pixel interfaces. Large paddings make layouts feel too modern, so each nav block uses compact rhythm and hard border silhouettes.',
        'Because the site uses Next.js links, route transitions remain client-side and instant, matching the expected speed of retro game menu navigation.',
      ],
      'zh-CN': [
        '我使用一个持久化顶部栏并明确展示路由状态，让用户随时知道当前位置。激活态使用“▶”光标模拟游戏菜单控制。',
        '像素界面中，间距和密度非常关键。过大的留白会显得过于现代，所以每个导航块都采用紧凑节奏和硬边轮廓。',
        '由于站点使用 Next.js 客户端链接，页面切换保持即时响应，符合复古游戏菜单应有的速度体验。',
      ],
    },
  },
  {
    slug: 'mock-data-first-for-personal-sites',
    date: '2026-01-30',
    tags: ['TypeScript', 'Content', 'Architecture'],
    title: {
      'en': 'Mock Data First for Personal Sites',
      'zh-CN': '个人站点先用 Mock 数据',
    },
    excerpt: {
      'en': 'Why static content models are enough for fast portfolio iteration.',
      'zh-CN': '为什么静态内容模型足以支持作品站的快速迭代。',
    },
    readTime: {
      'en': '6 min',
      'zh-CN': '6 分钟',
    },
    content: {
      'en': [
        'A personal site rarely needs backend complexity at first. Defining typed mock data allows rapid page evolution while preserving data integrity.',
        'In this project, blog posts and projects are represented as local arrays. Pages consume those arrays directly, so presentation and schema evolve together.',
        'If future growth requires a CMS, migration remains straightforward because the content model has already been validated in production-like views.',
      ],
      'zh-CN': [
        '个人站点初期通常不需要复杂后端。先定义带类型的 mock 数据，可以在保持数据一致性的同时快速演进页面。',
        '在这个项目中，博客和项目都由本地数组表示。页面直接消费这些数组，因此展示层和数据结构可以同步迭代。',
        '如果后续需要接入 CMS，迁移会更平滑，因为内容模型已经在接近生产的页面中验证过。',
      ],
    },
  },
  {
    slug: 'pixel-motion-with-lightweight-css',
    date: '2026-01-12',
    tags: ['CSS', 'Animation'],
    title: {
      'en': 'Pixel Motion with Lightweight CSS',
      'zh-CN': '用轻量 CSS 实现像素动效',
    },
    excerpt: {
      'en': 'Using step-based micro animations without heavy runtime dependencies.',
      'zh-CN': '不依赖重型运行时，用步进动画实现细腻像素反馈。',
    },
    readTime: {
      'en': '3 min',
      'zh-CN': '3 分钟',
    },
    content: {
      'en': [
        'Pixel aesthetics benefit from imperfect movement. Instead of smooth easing, step timing functions preserve retro visual character.',
        'I focus on four motion primitives: blink cursor, card lift, tiny hover glow, and fade-in sections. These cues feel playful without distracting from content.',
        'Lightweight CSS animations also improve maintainability and keep performance stable on low-power devices.',
      ],
      'zh-CN': [
        '像素美学通常受益于“不完美”运动。相比平滑缓动，step 时间函数更能保留复古视觉个性。',
        '我主要使用四种动效原语：闪烁光标、卡片抬升、轻微 hover 发光和段落淡入。这些反馈有趣但不喧宾夺主。',
        '轻量 CSS 动画也能提升可维护性，并让低性能设备保持稳定体验。',
      ],
    },
  },
]

function localizePost(post: LocalizedBlogPost, locale: AppLocale): BlogPost {
  return {
    slug: post.slug,
    title: post.title[locale],
    excerpt: post.excerpt[locale],
    date: post.date,
    readTime: post.readTime[locale],
    tags: post.tags,
    content: post.content[locale],
  }
}

export function getBlogPosts(locale: AppLocale): BlogPost[] {
  return localizedBlogPosts.map(post => localizePost(post, locale))
}

export function getBlogPostBySlug(slug: string, locale: AppLocale): BlogPost | undefined {
  const post = localizedBlogPosts.find(item => item.slug === slug)
  if (!post)
    return undefined

  return localizePost(post, locale)
}

export function getBlogSlugs() {
  return localizedBlogPosts.map(post => post.slug)
}
