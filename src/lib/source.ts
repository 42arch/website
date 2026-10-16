import { blog, notes } from '.source/server'
import { loader } from 'fumadocs-core/source'

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
})

export const notesSource = loader({
  baseUrl: '/notes',
  source: notes.toFumadocsSource(),
})
