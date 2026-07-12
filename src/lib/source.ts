import { notes as notesCollection, posts as postsCollection } from 'collections/server'
import { loader } from 'fumadocs-core/source'

export const posts = loader({
  baseUrl: '/posts',
  source: postsCollection.toFumadocsSource(),
})

export const notes = loader({
  baseUrl: '/notes',
  source: notesCollection.toFumadocsSource(),
})
