import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const projects = [
  {
    title: '粒子系统可视化',
    description: '基于 WebGL 的实时粒子系统，支持多种物理效果和交互式参数调节',
    image: '/webgl-particle-system-visualization.jpg',
    tags: ['WebGL', 'Three.js', 'GLSL'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Shader 艺术画廊',
    description: '收集和展示各种创意 Shader 效果，包括分形、噪声和程序化纹理',
    image: '/shader-art-gallery-with-colorful-effects.jpg',
    tags: ['GLSL', 'Fragment Shader', 'Creative Coding'],
    github: '#',
    demo: '#',
  },
  {
    title: '程序化地形生成',
    description: '使用噪声函数和高度图实时生成无限地形，支持多种生物群落',
    image: '/procedural-terrain-generation-landscape.jpg',
    tags: ['WebGL', 'Perlin Noise', 'Compute Shader'],
    github: '#',
    demo: '#',
  },
  {
    title: '数据流可视化',
    description: '将复杂数据转化为动态的 3D 可视化，支持实时数据流和交互探索',
    image: '/3d-data-flow-visualization-network.jpg',
    tags: ['D3.js', 'Three.js', 'WebSocket'],
    github: '#',
    demo: '#',
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">创意作品集</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            探索 WebGL、Shader 编程和创意技术的实验性项目
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:shadow-primary/10">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden rounded-t-lg relative">
                  <img
                    src={project.image || '/placeholder.svg'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{project.title}</CardTitle>
                <CardDescription className="mb-4 text-pretty">{project.description}</CardDescription>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github}>
                      <Github className="mr-2 h-4 w-4" />
                      代码
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.demo}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      演示
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
