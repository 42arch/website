import { Code2Icon, GlobeIcon } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface Project {
  name: string
  icon: string
  tags: string[]
  description: string
  link: string
  source: string
}

const projects: Project[] = [
  {
    name: 'Playground',
    icon: '🎪',
    tags: ['WebGL', 'Three.js', 'GLSL'],
    description: 'Our experimental demos and examples',
    link: 'https://playground.starllow.com',
    source: 'https://github.com/42arch/playground',
  },
  {
    name: 'geojson.io for vscode',
    icon: '🌍',
    tags: ['VSCode', 'GeoJSON'],
    description: 'Create, edit, and preview geojson data in VSCode.',
    link: 'https://marketplace.visualstudio.com/items?itemName=swallow.geojson-io-for-vscode',
    source: 'https://github.com/42arch/geojson.io-for-vscode',
  },
  {
    name: '宝可梦中文图鉴',
    icon: '🐱',
    tags: ['Next.js', 'Pokemon', 'Game'],
    description: '快速查询，随时了解你的宝可梦伙伴！',
    link: 'https://pokedex.starllow.com',
    source: 'https://github.com/42arch/pokedex-zh',
  },
  {
    name: 'TripSeek',
    icon: '🏞️',
    tags: ['Next.js', 'AI', 'Travel'],
    description: 'AI Travel Planner',
    link: 'https://tripseek.starllow.com',
    source: 'https://github.com/42arch/tripseek',
  },
  {
    name: 'Procedural Island Generator',
    icon: '🏝️',
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
      className="group p-4 rounded-xs text-left border bg-background transition-all duration-200 "
    >
      <div className="flex items-start gap-3">
        <div className="text-lg">{project.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base mb-1 transition-colors">
            {project.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex w-full items-end gap-4">
            <Link
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2Icon className="w-4 h-4 opacity-85 hover:opacity-60" />
            </Link>
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlobeIcon className="w-4 h-4 opacity-85 hover:opacity-60" />
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 lg:gap-x-16">
        {projects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </div>
    </section>
  )
}
