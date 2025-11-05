import { Code2Icon, GlobeIcon } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface Project {
  name: string
  icon: string
  type: string
  tags: string[]
  description: string
  link: string
  source: string
}

const projects: Project[] = [
  {
    name: 'Playground',
    icon: '🎪',
    type: 'graphic',
    tags: ['WebGL', 'Three.js', 'GLSL'],
    description: 'Our experimental demos and examples',
    link: 'https://playground.starllow.com',
    source: 'https://github.com/42arch/playground',
  },
  {
    name: 'geojson.io for vscode',
    icon: '🌍',
    type: 'extension',
    tags: ['VSCode', 'GeoJSON'],
    description: 'Create, edit, and preview geojson data in VSCode.',
    link: 'https://marketplace.visualstudio.com/items?itemName=swallow.geojson-io-for-vscode',
    source: 'https://github.com/42arch/geojson.io-for-vscode',
  },
  {
    name: '宝可梦中文图鉴',
    icon: '🐱',
    type: 'web',
    tags: ['Next.js', 'Pokemon', 'Game'],
    description: '快速查询，随时了解你的宝可梦伙伴！',
    link: 'https://pokedex.starllow.com',
    source: 'https://github.com/42arch/pokedex-zh',
  },
  {
    name: 'TripSeek',
    icon: '🏞️',
    type: 'web',
    tags: ['Next.js', 'AI', 'Travel'],
    description: 'An AI travel planner powered by DeepSeek.',
    link: 'https://tripseek.starllow.com',
    source: 'https://github.com/42arch/tripseek',
  },
  {
    name: 'Procedural Island Generator',
    icon: '🏝️',
    type: 'graphic',
    tags: ['WebGL', 'GLSL', 'Noise'],
    description: 'A multiple-style random island generator',
    link: 'https://procedural-island-generator.netlify.app',
    source: 'https://github.com/42arch/procedural-island-generator',
  },
]

function ProjectItem({ project }: { project: Project }) {
  return (
    <div
      key={project.name}
      className="group flex flex-col gap-2 py-2 px-4 sm:odd:border-r border-r-0 border-b [&:nth-last-child(-n+1)]:border-b-0 border-main"
    >
      <div className="flex items-center gap-2">
        <div className="text-xl">{project.icon}</div>
        <h3 className="text-base truncate transition-colors">
          {project.name}
        </h3>
      </div>
      <p className="text-sm text-left text-muted-foreground line-clamp-3 mb-1">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs text-muted-foreground">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex gap-3 mt-auto justify-end text-accent-foreground">
        <Link
          href={project.source}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-40 opacity-60 transition-opacity"
        >
          <Code2Icon className="w-4 h-4" />
        </Link>
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-40 opacity-60 transition-opacity"
        >
          <GlobeIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 border-b border-main">
      {projects.map((project, index) => (
        <ProjectItem key={index} project={project} />
      ))}
    </section>
  )
}
