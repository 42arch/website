export const profile = {
  name: 'Dan',
  site: 'Starllow',
  email: 'rend42@163.com',
  github: 'https://github.com/42arch',
  stack: ['TypeScript', 'React', 'Rust', 'WebGL'],
}

export const projects = [
  {
    title: 'GeoJSON IO',
    subtitle: '把地图，放进编辑器。',
    description: '在 VSCode 中预览、创建与编辑 GeoJSON 文件，让地理数据的处理更直观。',
    category: '开发工具',
    tags: ['TypeScript', 'React', 'Mapbox GL'],
    art: 'map',
    url: 'https://github.com/42arch/geojson.io-for-vscode',
  },
  {
    title: 'HDMap Viewer',
    subtitle: '从数据到道路。',
    description: '基于 JavaScript 的高精地图解析与可视化工具，探索 OpenDRIVE 数据里的道路世界。',
    category: '地图可视化',
    tags: ['TypeScript', 'Three.js', 'OpenDRIVE'],
    art: 'roads',
    url: 'https://github.com/42arch/hdmap-viewer',
  },
  {
    title: 'Island Generator',
    subtitle: '用代码造一座小岛。',
    description: '用程序化生成探索地形、海岸线与颜色，每一次变化都带来一片新的风景。',
    category: '图形实验',
    tags: ['WebGL', 'GLSL', 'Three.js'],
    art: 'island',
    url: 'https://github.com/42arch/procedural-island-generator',
  },
]

// Excerpts adapted from the author's articles in this repository's Git history.
export const notes = [
  {
    title: 'MCAP 文件介绍',
    date: '2026.07.11',
    category: '数据与工具',
    intro: '一份关于消息、时间与数据的阅读笔记。',
    paragraphs: [
      'MCAP（Message Capture）是一种用于记录机器人、自动驾驶等场景下结构化消息数据的日志容器格式。它将数据与消息定义保存在一起，让文件离开原生环境后也能被解析。',
      '理解它，可以先从四个概念入手：Channel 对应消息流；Schema 描述序列化格式；Message 是一条带有时间戳的消息；Chunk 则把一组消息打包成一个数据块。',
      '数据块可以独立压缩。结合索引，读取时可以定位到所需的时间区间，避免扫描整个文件。对需要反复回放、检查的可视化数据来说，这一点很有用。',
    ],
    file: 'mcap-intro.md',
  },
  {
    title: '让 GPU 帮你找到那个物体',
    date: '2025.12.30',
    category: 'WebGL',
    intro: '把一次几何计算，变成一次颜色查找。',
    paragraphs: [
      '在 WebGL 和 3D 可视化开发中，交互是连接用户与虚拟场景的方式。点击屏幕时，如何判断鼠标下方到底是哪一个物体？',
      'GPU Picking 的核心思路是给每个物体分配一个唯一的颜色 ID，再把这些颜色绘制到不可见的离屏缓冲区。用户点击时，读取对应像素的颜色，就能解码出物体的身份。',
      '相较于逐个检查射线与几何体是否相交，这条路径把工作交给渲染管线。实际实现时，需要特别留意颜色管理、坐标换算以及读取像素带来的同步开销。',
    ],
    file: 'gpu-picking.mdx',
  },
  {
    title: '向量：一个有方向的开始',
    date: '2025.08.03',
    category: '图形学基础',
    intro: '重新认识图形世界里最常见的那个箭头。',
    paragraphs: [
      '直观理解，向量就是一个有大小和方向的箭头。大小表示箭头有多长，方向表示箭头指向哪里。二维向量可以写成 (x, y)，三维向量则多一个 z 分量。',
      '点表示空间中的位置，向量表示位移或方向。虽然它们都可以写成相同形式的坐标，参与运算时表达的含义却不同。',
      '例如 (3, 4, 0) 的长度是 5。把各分量除以长度，就得到了保留方向、长度为 1 的单位向量。这是理解相机、光照和物体运动的一个起点。',
    ],
    file: 'mathmatic-knowledge-in-webgl-programming-1.mdx',
  },
]
