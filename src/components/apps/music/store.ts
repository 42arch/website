import type { MusicTrack } from '@/components/apps/music/manifest'
import { create } from 'zustand'

type MusicError = 'catalog' | 'playback' | null
type MusicLoopMode = 'single' | 'list'
type CatalogStatus = 'loading' | 'ready' | 'error'

interface MusicStore {
  tracks: MusicTrack[]
  catalogStatus: CatalogStatus
  selectedTrackId: string | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  loopMode: MusicLoopMode
  error: MusicError
  setTracks: (tracks: MusicTrack[]) => void
  setCatalogError: () => void
  playTrack: (id: string) => void
  togglePlayback: () => void
  pause: () => void
  next: () => void
  previous: () => void
  cycleLoopMode: () => void
  handleEnded: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  setProgress: (time: number, duration: number) => void
  setPlaying: (playing: boolean) => void
  setPlaybackError: () => void
}

let audioElement: HTMLAudioElement | null = null

export const useMusicStore = create<MusicStore>((set, get) => ({
  tracks: [],
  catalogStatus: 'loading',
  selectedTrackId: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  loopMode: 'list',
  error: null,

  setTracks: (tracks) => {
    audioElement?.pause()
    audioElement?.removeAttribute('src')
    audioElement?.load()
    set({
      tracks,
      catalogStatus: 'ready',
      selectedTrackId: tracks[0]?.id ?? null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      error: null,
    })
  },
  setCatalogError: () => {
    audioElement?.pause()
    set({ tracks: [], catalogStatus: 'error', selectedTrackId: null, isPlaying: false, error: 'catalog' })
  },
  playTrack: (id) => {
    const track = get().tracks.find(item => item.id === id)
    const audio = audioElement
    if (!track || !audio)
      return

    if (audio.getAttribute('src') !== track.src) {
      audio.src = track.src
      audio.load()
      set({ selectedTrackId: id, currentTime: 0, duration: 0, error: null })
    }
    else {
      set({ selectedTrackId: id, error: null })
    }

    void audio.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError')
        return
      if (audioElement === audio && get().selectedTrackId === id)
        set({ isPlaying: false, error: 'playback' })
    })
  },
  togglePlayback: () => {
    const audio = audioElement
    const selectedTrackId = get().selectedTrackId
    if (!audio || !selectedTrackId)
      return

    if (audio.paused) {
      get().playTrack(selectedTrackId)
    }
    else {
      get().pause()
    }
  },
  pause: () => audioElement?.pause(),
  next: () => {
    const { tracks, selectedTrackId, loopMode } = get()
    const currentIndex = tracks.findIndex(track => track.id === selectedTrackId)
    const nextTrack = tracks[currentIndex + 1] ?? (loopMode === 'list' ? tracks[0] : undefined)
    if (nextTrack) {
      get().playTrack(nextTrack.id)
    }
    else {
      audioElement?.pause()
      set({ isPlaying: false })
    }
  },
  previous: () => {
    const { tracks, selectedTrackId, currentTime, loopMode } = get()
    if (currentTime > 3) {
      get().seek(0)
      return
    }

    const currentIndex = tracks.findIndex(track => track.id === selectedTrackId)
    const previousTrack = currentIndex > 0
      ? tracks[currentIndex - 1]
      : loopMode === 'list' ? tracks.at(-1) : undefined
    if (previousTrack)
      get().playTrack(previousTrack.id)
    else
      get().seek(0)
  },
  cycleLoopMode: () => set(state => ({ loopMode: state.loopMode === 'list' ? 'single' : 'list' })),
  handleEnded: () => {
    const { loopMode, selectedTrackId } = get()
    if (loopMode === 'single' && selectedTrackId) {
      if (audioElement)
        audioElement.currentTime = 0
      set({ currentTime: 0 })
      get().playTrack(selectedTrackId)
      return
    }

    get().next()
  },
  seek: (time) => {
    const audio = audioElement
    const duration = get().duration
    if (!audio || !Number.isFinite(time) || duration <= 0)
      return

    const nextTime = Math.max(0, Math.min(duration, time))
    audio.currentTime = nextTime
    set({ currentTime: nextTime })
  },
  setVolume: (volume) => {
    const nextVolume = Math.max(0, Math.min(1, volume))
    if (audioElement)
      audioElement.volume = nextVolume
    set({ volume: nextVolume })
  },
  setProgress: (currentTime, duration) => set({
    currentTime: Number.isFinite(currentTime) ? currentTime : 0,
    duration: Number.isFinite(duration) ? duration : 0,
  }),
  setPlaying: isPlaying => set({ isPlaying }),
  setPlaybackError: () => set({ isPlaying: false, error: 'playback' }),
}))

export function bindMusicAudio(element: HTMLAudioElement) {
  audioElement = element
  element.volume = useMusicStore.getState().volume

  return () => {
    if (audioElement === element)
      audioElement = null
  }
}
