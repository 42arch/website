export interface LyricLine {
  time: number
  text: string
}

const timestampPattern = /\[(\d+):(\d{2})(?:\.(\d{1,3}))?\]/g

export function parseLrc(source: string): LyricLine[] {
  const offsetMatch = source.match(/^\[offset:([+-]?\d+)\]\s*$/im)
  const offset = offsetMatch ? Number(offsetMatch[1]) / 1000 : 0
  const lines: LyricLine[] = []

  for (const rawLine of source.split(/\r?\n/)) {
    const matches = [...rawLine.matchAll(timestampPattern)]
    if (matches.length === 0)
      continue

    const text = rawLine.replace(timestampPattern, '').trim()
    for (const match of matches) {
      const minutes = Number(match[1])
      const seconds = Number(match[2])
      const fraction = Number((match[3] ?? '').padEnd(3, '0')) / 1000
      lines.push({
        time: Math.max(0, minutes * 60 + seconds + fraction + offset),
        text,
      })
    }
  }

  return lines.sort((left, right) => left.time - right.time)
}
