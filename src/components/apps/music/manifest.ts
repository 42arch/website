export interface MusicTrack {
  id: string
  title: string
  artist: string
  src: string
  cover?: string
  album?: string
  lyrics?: string
}

function isMusicPath(value: string): boolean {
  return value.startsWith('/music/') && !value.split('/').includes('..')
}

export function parseMusicManifest(value: unknown): MusicTrack[] | null {
  if (!Array.isArray(value))
    return null

  const ids = new Set<string>()
  const tracks: MusicTrack[] = []

  for (const item of value) {
    if (typeof item !== 'object' || item === null)
      return null

    const track = item as Record<string, unknown>
    if (
      typeof track.id !== 'string' || !track.id.trim()
      || typeof track.title !== 'string' || !track.title.trim()
      || typeof track.artist !== 'string' || !track.artist.trim()
      || typeof track.src !== 'string' || !isMusicPath(track.src)
      || (track.cover !== undefined && (typeof track.cover !== 'string' || !isMusicPath(track.cover)))
      || (track.album !== undefined && typeof track.album !== 'string')
      || (track.lyrics !== undefined && (typeof track.lyrics !== 'string' || !isMusicPath(track.lyrics)))
      || ids.has(track.id)
    ) {
      return null
    }

    ids.add(track.id)
    tracks.push({
      id: track.id,
      title: track.title,
      artist: track.artist,
      src: track.src,
      ...(typeof track.cover === 'string' ? { cover: track.cover } : {}),
      ...(typeof track.album === 'string' ? { album: track.album } : {}),
      ...(typeof track.lyrics === 'string' ? { lyrics: track.lyrics } : {}),
    })
  }

  return tracks
}
