let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined')
    return null

  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass)
      audioContext = new AudioContextClass()
  }

  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {})
  }

  return audioContext
}

export function playTactileClick(freq = 520, duration = 0.016, enabled = true) {
  if (!enabled)
    return

  try {
    const ctx = getAudioContext()
    if (!ctx)
      return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + duration)

    gain.gain.setValueAtTime(0.035, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.004, ctx.currentTime + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + duration)
  }
  catch {
    // Graceful fallback when Web Audio is unsupported or restricted by browser policies
  }
}
