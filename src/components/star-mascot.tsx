export function StarMascot({ size = 160 }: { size?: number }) {
  const pixel = size / 16

  const grid = [
    '......yyyy......',
    '.....yyyyyy.....',
    '....yyymmyyy....',
    'yyyyyymmmmyyyyyy',
    'yccyyymmmmyyyccy',
    '..yyyyyrryyyyy..',
    '...yyyyyyyyyy...',
    '..yyyyyyyyyyyy..',
    '.yyyyyggggyyyyy.',
    'yyyyyggggggyyyyy',
    '..yyyyyyyyyyyy..',
    '...yyyyyyyyyy...',
    '....yyyyyyyy....',
    '.....yyyyyy.....',
    '......yyyy......',
    '.......yy.......',
  ]

  const colorMap: Record<string, string> = {
    'y': '#ffcc00',
    'm': '#ff44cc',
    'c': '#00ccff',
    'g': '#00ff88',
    'r': '#ff7766',
    '.': 'transparent',
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Starllow cartoon star mascot"
      className="pixel-fade-in drop-shadow-[0_0_16px_rgba(255,204,0,0.45)]"
    >
      {grid.map((row, y) =>
        row.split('').map((char, x) => {
          if (char === '.')
            return null

          return (
            <rect
              key={`${x}-${y}`}
              x={x * pixel}
              y={y * pixel}
              width={pixel}
              height={pixel}
              fill={colorMap[char]}
            />
          )
        }),
      )}
    </svg>
  )
}
