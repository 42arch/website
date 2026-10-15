import { notes } from '.source/server'
import { loader } from 'fumadocs-core/source'

export const notesSource = loader({
  baseUrl: '/notes',
  source: notes.toFumadocsSource(),
})
