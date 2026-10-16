export interface BlogMeta {
  slug: string
  title: string
  date?: string
  category: string
  intro: string
  tags: string[]
}

export const staticBlogList: BlogMeta[] = [
  {
    slug: 'gpu-picking',
    title: '让 GPU 帮你找到那个物体',
    date: '2025.12.30',
    category: 'WebGL',
    intro: '把一次几何计算，变成一次颜色查找。在 WebGL 3D 场景中给每个物体分配独立颜色 ID，利用 FBO 离屏渲染实现精准拾取。',
    tags: ['WebGL', 'GPU Picking', '交互技术'],
  },
  {
    slug: 'mathmatic-knowledge-in-webgl-programming-1',
    title: '向量：一个有方向的开始',
    date: '2025.08.03',
    category: '图形学基础',
    intro: '重新认识图形世界里最常见的那个箭头。深入解析点与向量的区别、坐标平移、点积与叉积的几何意义，以及单位向量归一化运算。',
    tags: ['向量', '线性代数', 'WebGL'],
  },
  {
    slug: 'mcap-intro',
    title: 'MCAP 文件介绍',
    date: '2026.07.11',
    category: '数据与工具',
    intro: '用于记录机器人、自动驾驶场景下结构化消息数据的日志容器格式。解析 Channel、Schema、Message 与 Chunk 核心数据结构。',
    tags: ['MCAP', '数据格式', '自动驾驶'],
  },
  {
    slug: 'macos-storage-clean',
    title: '清理 macOS mediaanalysisd 占用的存储空间',
    category: '系统与工具',
    intro: '认识 mediaanalysisd 的 E5RT 缓存，清理过期临时 bundle，并了解停用服务对照片识别功能的影响。',
    tags: ['macOS', '存储空间', '命令行'],
  },
]

export const blogCategories = ['全部', ...new Set(staticBlogList.map(article => article.category))] as const
