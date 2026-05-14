import { notes as notesCollection, writing as writingCollection } from 'collections/server'
import { loader } from 'fumadocs-core/source'

export const writing = loader({
  baseUrl: '/writing',
  source: writingCollection.toFumadocsSource(),
})

export const notes = loader({
  baseUrl: '/notes',
  source: notesCollection.toFumadocsSource(),
})
