import { readFile } from 'node:fs/promises'
import { resolve, sep } from 'node:path'
import { readMusicArtwork } from '@/components/apps/music/artwork'
import { parseMusicManifest } from '@/components/apps/music/manifest'

export const runtime = 'nodejs'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const musicDirectory = resolve(process.cwd(), 'public/music')
    const manifest: unknown = JSON.parse(await readFile(resolve(process.cwd(), 'public/data/music.json'), 'utf8'))
    const { id } = await params
    const track = parseMusicManifest(manifest)?.find(item => item.id === id)
    if (!track)
      return new Response(null, { status: 404 })

    const source = decodeURIComponent(track.src)
    if (!source.startsWith('/music/'))
      return new Response(null, { status: 404 })

    const filePath = resolve(musicDirectory, source.slice('/music/'.length))
    if (!filePath.startsWith(`${musicDirectory}${sep}`))
      return new Response(null, { status: 404 })

    const artwork = await readMusicArtwork(filePath)
    if (!artwork)
      return new Response(null, { status: 404 })

    return new Response(new Uint8Array(artwork.data), {
      headers: {
        'Content-Type': artwork.contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
  catch {
    return new Response(null, { status: 404 })
  }
}
