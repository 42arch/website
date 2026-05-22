// ── Terminal Line Types ──
import { siteConfig } from '@/config'

const SPACES_REGEX = /\s+/
const LEADING_SLASH_REGEX = /^\//

const { terminal: termCfg, author, site } = siteConfig

export interface TerminalLine {
  id: string
  type: 'system' | 'input' | 'output' | 'error' | 'ascii'
  content: string
}

// ── Command Registry ──
interface CommandContext {
  openTab: (id: string) => void
  setThemePreset: (preset: 'graphite' | 'linen' | 'vesper' | 'nord' | 'catppuccin' | 'tokyo-night' | 'dracula' | 'github-dark') => void
  addLines: (lines: TerminalLine[]) => void
  clearLines: () => void
}

type CommandHandler = (args: string[], ctx: CommandContext) => void

const BOOT_ASCII = siteConfig.overview.asciiArt || site.name

let lineId = 0
export function createLine(type: TerminalLine['type'], content: string): TerminalLine {
  return { id: `line-${lineId++}`, type, content }
}

export function getBootLines(): TerminalLine[] {
  return [
    createLine('ascii', BOOT_ASCII),
    createLine('system', ''),
    createLine('system', termCfg.bootMessage),
    createLine('system', 'System initialized successfully.'),
    createLine('system', ''),
    createLine('system', 'Type "help" to see available commands.'),
    createLine('system', ''),
  ]
}

// ── Available panels ──
const PANELS: { id: string, label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'writing', label: 'Writing' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'notes', label: 'Notes' },
  { id: 'about', label: 'About' },
  { id: 'rss', label: 'RSS Feed' },
  { id: 'contact', label: 'Contact' },
  { id: 'settings', label: 'Settings' },
]

const THEMES = ['graphite', 'linen', 'vesper', 'nord', 'catppuccin', 'tokyo-night', 'dracula', 'github-dark'] as const

// ── Pet State ──
const petState = {
  name: termCfg.petName,
  hunger: 80,
  happiness: 70,
  energy: 90,
  lastFed: Date.now(),
  lastPlayed: Date.now(),
}

function getPetMood(): 'happy' | 'hungry' | 'sleepy' | 'playful' | 'sad' {
  if (petState.energy < 30)
    return 'sleepy'
  if (petState.hunger < 30)
    return 'hungry'
  if (petState.happiness < 30)
    return 'sad'
  if (petState.happiness > 80)
    return 'playful'
  return 'happy'
}

function getPetArt(mood: string): string[] {
  const arts: Record<string, string[]> = {
    happy: [
      '  /\\_/\\  ',
      ' ( o.o ) ',
      '  > ^ <  ',
    ],
    hungry: [
      '  /\\_/\\  ',
      ' ( >.< ) ',
      '  > ~ <  ',
      '    ...hungry',
    ],
    sleepy: [
      '  /\\_/\\  ',
      ' ( -.- ) ',
      '  > ^ <  ',
      '    zzZ',
    ],
    playful: [
      '  /\\_/\\  ',
      ' ( ^w^ ) ',
      '  > ^ <  ',
      '    ♪♪',
    ],
    sad: [
      '  /\\_/\\  ',
      ' ( ;_; ) ',
      '  > ^ <  ',
      '    ...',
    ],
  }
  return arts[mood] || arts.happy
}

function getMoodBar(value: number): string {
  const filled = Math.round(value / 10)
  const empty = 10 - filled
  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${value}%`
}

// ── Command Handlers ──
const commands: Record<string, CommandHandler> = {
  help: (_args, ctx) => {
    ctx.addLines([
      createLine('output', '┌──────────────────────────────────────────────┐'),
      createLine('output', `│  ${site.name.toUpperCase()} — Command Reference`.padEnd(47) + '│'),
      createLine('output', '├──────────────┬───────────────────────────────┤'),
      createLine('output', '│  help        │  Show this help message       │'),
      createLine('output', '│  ls          │  List available panels        │'),
      createLine('output', '│  open <name> │  Open a panel by name         │'),
      createLine('output', '│  theme       │  List available themes        │'),
      createLine('output', '│  theme <n>   │  Switch to a theme            │'),
      createLine('output', '│  pet         │  Visit your terminal pet      │'),
      createLine('output', '│  whoami      │  Display user profile         │'),
      createLine('output', '│  neofetch    │  System info summary          │'),
      createLine('output', '│  echo <msg>  │  Print a message              │'),
      createLine('output', '│  date        │  Show current date & time     │'),
      createLine('output', '│  clear       │  Clear terminal screen        │'),
      createLine('output', '│  about       │  About Folio OS               │'),
      createLine('output', '└──────────────┴───────────────────────────────┘'),
    ])
  },

  ls: (_args, ctx) => {
    ctx.addLines([
      createLine('output', 'Available panels:'),
      createLine('output', ''),
      ...PANELS.map(p => createLine('output', `  📁 ${p.id.padEnd(16)} ${p.label}`)),
      createLine('output', ''),
      createLine('output', `  ${PANELS.length} items total`),
    ])
  },

  open: (args, ctx) => {
    const target = args[0]?.toLowerCase()
    if (!target) {
      ctx.addLines([createLine('error', 'Usage: open <panel-name>. Try "ls" to see available panels.')])
      return
    }
    const panel = PANELS.find(p => p.id === target)
    if (panel) {
      ctx.addLines([createLine('system', `Opening ${panel.label}...`)])
      ctx.openTab(panel.id)
    }
    else {
      ctx.addLines([createLine('error', `Panel "${target}" not found. Try "ls" to see available panels.`)])
    }
  },

  cd: (args, ctx) => {
    // Alias for 'open'
    commands.open(args, ctx)
  },

  theme: (args, ctx) => {
    const target = args[0]?.toLowerCase()
    if (!target) {
      ctx.addLines([
        createLine('output', 'Available themes:'),
        createLine('output', ''),
        ...THEMES.map(t => createLine('output', `  🎨 ${t}`)),
        createLine('output', ''),
        createLine('output', 'Usage: theme <name>'),
      ])
      return
    }
    if ((THEMES as readonly string[]).includes(target)) {
      ctx.setThemePreset(target as typeof THEMES[number])
      ctx.addLines([createLine('system', `Theme switched to "${target}".`)])
    }
    else {
      ctx.addLines([createLine('error', `Theme "${target}" not found. Try "theme" to list available themes.`)])
    }
  },

  whoami: (_args, ctx) => {
    ctx.addLines([
      createLine('output', '  user:     root'),
      createLine('output', `  role:     ${author.role}`),
      createLine('output', `  location: ${author.location}`),
      createLine('output', `  stack:    ${author.stack}`),
      createLine('output', `  focus:    ${author.focus}`),
      createLine('output', `  status:   ${author.status}`),
    ])
  },

  neofetch: (_args, ctx) => {
    const nf = termCfg.neofetch
    const brandSlug = site.name.toLowerCase().replace(/\s+/g, '-')
    ctx.addLines([
      createLine('output', ''),
      createLine('output', `  ███████╗╔═══╗   root@${brandSlug}`),
      createLine('output', '  ██╔════╝║   ║   ─────────────────'),
      createLine('output', `  █████╗  ║   ║   OS:      ${nf.osName}`),
      createLine('output', `  ██╔══╝  ║   ║   Kernel:  ${nf.kernel}`),
      createLine('output', `  ██║     ╚═══╝   Shell:   ${nf.shell}`),
      createLine('output', `  ╚═╝             Runtime: ${nf.runtime}`),
      createLine('output', `                  UI:      ${nf.ui}`),
      createLine('output', `                  State:   ${nf.stateManager}`),
      createLine('output', '                  Uptime:  99.9%'),
      createLine('output', ''),
    ])
  },

  echo: (args, ctx) => {
    ctx.addLines([createLine('output', args.join(' ') || '')])
  },

  date: (_args, ctx) => {
    const now = new Date()
    ctx.addLines([createLine('output', now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }))])
  },

  clear: (_args, ctx) => {
    ctx.clearLines()
  },

  about: (_args, ctx) => {
    ctx.addLines([
      createLine('output', ''),
      createLine('output', `  ${site.name} — Developer Workspace`),
      createLine('output', '  ────────────────────────────────'),
      createLine('output', `  ${site.description}`),
      createLine('output', ''),
      createLine('output', `  Stack: ${termCfg.neofetch.kernel} • ${termCfg.neofetch.runtime} • ${termCfg.neofetch.ui} • ${termCfg.neofetch.stateManager}`),
      createLine('output', '  License: MIT'),
      createLine('output', ''),
    ])
  },

  pet: (args, ctx) => {
    const sub = args[0]?.toLowerCase()

    // Decay stats slightly over time
    const elapsed = (Date.now() - petState.lastFed) / 60000 // minutes
    petState.hunger = Math.max(0, petState.hunger - Math.floor(elapsed * 0.5))
    petState.happiness = Math.max(0, petState.happiness - Math.floor(elapsed * 0.3))
    petState.energy = Math.min(100, petState.energy + Math.floor(elapsed * 0.1))

    if (sub === 'feed') {
      petState.hunger = Math.min(100, petState.hunger + 25)
      petState.lastFed = Date.now()
      const art = getPetArt('playful')
      ctx.addLines([
        createLine('output', ''),
        ...art.map(l => createLine('output', `  ${l}`)),
        createLine('output', ''),
        createLine('system', `  ${petState.name} munches happily... nom nom nom!`),
        createLine('output', `  Hunger: ${getMoodBar(petState.hunger)}`),
        createLine('output', ''),
      ])
    }
    else if (sub === 'play') {
      petState.happiness = Math.min(100, petState.happiness + 20)
      petState.energy = Math.max(0, petState.energy - 10)
      petState.lastPlayed = Date.now()
      const art = getPetArt('playful')
      ctx.addLines([
        createLine('output', ''),
        ...art.map(l => createLine('output', `  ${l}`)),
        createLine('output', ''),
        createLine('system', `  ${petState.name} chases a pixel around the terminal!`),
        createLine('output', `  Happiness: ${getMoodBar(petState.happiness)}`),
        createLine('output', ''),
      ])
    }
    else if (sub === 'sleep') {
      petState.energy = Math.min(100, petState.energy + 30)
      const art = getPetArt('sleepy')
      ctx.addLines([
        createLine('output', ''),
        ...art.map(l => createLine('output', `  ${l}`)),
        createLine('output', ''),
        createLine('system', `  ${petState.name} curls up and takes a nap...`),
        createLine('output', `  Energy: ${getMoodBar(petState.energy)}`),
        createLine('output', ''),
      ])
    }
    else if (sub === 'name' && args[1]) {
      const oldName = petState.name
      petState.name = args.slice(1).join(' ')
      ctx.addLines([
        createLine('system', `  Renamed pet from "${oldName}" to "${petState.name}".`),
      ])
    }
    else if (sub === 'status') {
      const mood = getPetMood()
      const art = getPetArt(mood)
      ctx.addLines([
        createLine('output', ''),
        ...art.map(l => createLine('output', `  ${l}`)),
        createLine('output', ''),
        createLine('output', `  Name:      ${petState.name}`),
        createLine('output', `  Mood:      ${mood}`),
        createLine('output', `  Hunger:    ${getMoodBar(petState.hunger)}`),
        createLine('output', `  Happiness: ${getMoodBar(petState.happiness)}`),
        createLine('output', `  Energy:    ${getMoodBar(petState.energy)}`),
        createLine('output', ''),
      ])
    }
    else {
      // Default: show pet with help
      const mood = getPetMood()
      const art = getPetArt(mood)
      ctx.addLines([
        createLine('output', ''),
        ...art.map(l => createLine('output', `  ${l}`)),
        createLine('output', ''),
        createLine('output', `  Hi! I'm ${petState.name}, your terminal companion.`),
        createLine('output', ''),
        createLine('output', '  Commands:'),
        createLine('output', '    pet status   — Check my stats'),
        createLine('output', '    pet feed     — Give me some bytes to eat'),
        createLine('output', '    pet play     — Play with me!'),
        createLine('output', '    pet sleep    — Let me rest'),
        createLine('output', '    pet name <n> — Give me a new name'),
        createLine('output', ''),
      ])
    }
  },
}

export function executeCommand(
  input: string,
  ctx: CommandContext,
): void {
  const trimmed = input.trim()
  if (!trimmed)
    return

  // Add the input line itself
  ctx.addLines([createLine('input', trimmed)])

  // Parse command and args
  const parts = trimmed.split(SPACES_REGEX)
  const cmd = parts[0].toLowerCase().replace(LEADING_SLASH_REGEX, '') // strip leading /
  const args = parts.slice(1)

  const handler = commands[cmd]
  if (handler) {
    handler(args, ctx)
  }
  else {
    ctx.addLines([
      createLine('error', `Command not found: ${cmd}`),
      createLine('error', 'Type "help" for a list of available commands.'),
    ])
  }
}
