export interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  category: string
}

export const ARTICLES: Article[] = [
  { id: 'art-1', title: 'Building a Workspace UI: Lessons from IDE Design', excerpt: 'Exploring how IDE paradigms can transform personal portfolio interfaces into interactive workspaces.', date: '2026-05-12', readTime: '8 min', tags: ['design', 'UI'], category: 'Engineering' },
  { id: 'art-2', title: 'Procedural Terrain Generation with Voronoi Diagrams', excerpt: 'A deep dive into using Voronoi-based point relaxation for natural-looking landmass generation.', date: '2026-04-20', readTime: '12 min', tags: ['algorithms', 'graphics'], category: 'Technical' },
  { id: 'art-3', title: 'Real-time Shader Rendering for Map Editing', excerpt: 'How GPU shaders can eliminate frame drops during continuous terrain modification.', date: '2026-04-15', readTime: '10 min', tags: ['WebGL', 'performance'], category: 'Technical' },
  { id: 'art-4', title: 'State Management Patterns for Interactive Apps', excerpt: 'Comparing Zustand, Jotai, and custom stores for complex interactive applications.', date: '2026-03-28', readTime: '6 min', tags: ['React', 'state'], category: 'Engineering' },
  { id: 'art-5', title: 'Designing for Information Density', excerpt: 'Why developer tools get information density right and marketing pages get it wrong.', date: '2026-03-10', readTime: '5 min', tags: ['design', 'UX'], category: 'Design' },
]
