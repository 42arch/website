import { ProjectsApp } from '@/components/apps/projects'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('作品集', '已经发布和正在打磨的工具、实验与个人网站。', '/projects')

export default function ProjectsPage() {
  return <ProjectsApp />
}
