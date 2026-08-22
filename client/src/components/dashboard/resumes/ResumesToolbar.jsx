import { ChevronDown, LayoutGrid, List, Mic, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getPanelClass, getSubtleTextClass } from './resumeStyles'
import { useLanguage } from '../../../context/LanguageContext'
import { toast } from 'sonner'

const ResumesToolbar = ({
  isDark,
  sortBy,
  onSortChange,
  sortOptions,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useLanguage()
  const recognitionRef = useRef(null)
  const listeningSoundRef = useRef(null)
  const [isListening, setIsListening] = useState(false)

  const stopListeningSound = () => {
    const sound = listeningSoundRef.current

    if (!sound) {
      return
    }

    window.clearInterval(sound.intervalId)
    sound.context.close().catch(() => {})
    listeningSoundRef.current = null
  }

  const startListeningSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext

    if (!AudioContext || listeningSoundRef.current) {
      return
    }

    const context = new AudioContext()
    const playNote = (frequency, startAt) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequency, startAt)
      gain.gain.setValueAtTime(0.0001, startAt)
      gain.gain.exponentialRampToValueAtTime(0.2, startAt + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.22)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start(startAt)
      oscillator.stop(startAt + 0.24)
    }

    const playListeningMelody = () => {
      const startAt = context.currentTime + 0.03

      playNote(523.25, startAt)
      playNote(659.25, startAt + 0.28)
    }

    playListeningMelody()
    listeningSoundRef.current = {
      context,
      intervalId: window.setInterval(playListeningMelody, 1800),
    }
    context.resume().catch(() => {})
  }

  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current

      if (!recognition) {
        return
      }

      recognition.onstart = null
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      recognition.abort()
      recognitionRef.current = null
      stopListeningSound()
    }
  }, [])

  const handleSearchChange = (value) => {
    onSearchChange(value)
  }

  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      toast.error('Voice search is not supported by this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = true

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('')

      handleSearchChange(transcript)
    }

    recognition.onerror = (event) => {
      const message =
        event.error === 'not-allowed' || event.error === 'service-not-allowed'
          ? 'Microphone access was denied. Allow it and try again.'
          : event.error === 'no-speech'
            ? 'No speech was detected. Try again.'
            : 'Voice search could not start. Try again.'

      toast.error(message)
      stopListeningSound()
    }

    recognition.onend = () => {
      setIsListening(false)
      recognitionRef.current = null
      stopListeningSound()
    }

    recognitionRef.current = recognition

    try {
      startListeningSound()
      recognition.start()
    } catch {
      toast.error(t('Voice search could not start. Try again.'))
      recognitionRef.current = null
      stopListeningSound()
    }
  }

  return (
    <div className={`rounded-md border p-4 backdrop-blur-xl ${getPanelClass(isDark)}`}>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
          <div className="w-full max-w-md">
            <div
              className={`flex w-full items-center gap-3 rounded-md border px-3.5 py-2.5 ${
                isDark
                  ? 'border-zinc-800 bg-zinc-950/80'
                  : 'border-slate-200 bg-white/85'
              }`}
            >
              <Search className={`h-4 w-4 ${getSubtleTextClass(isDark)}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder={t('Search resumes by title or summary')}
                aria-label={t('Search resumes by title or summary')}
                className={`w-full bg-transparent text-[13px] outline-none ${
                  isDark ? 'placeholder:text-zinc-500' : 'placeholder:text-slate-400'
                }`}
              />
              {
                searchQuery && (
                  <X
                    className={`h-4 w-4 cursor-pointer hover:text-zinc-400 ${getSubtleTextClass(isDark)}`}
                    onClick={() => handleSearchChange('')}
                  />
                )
              }
              <button
                type="button"
                onClick={handleVoiceSearch}
                aria-label={t(isListening ? 'Stop voice search' : 'Start voice search')}
                title={t(isListening ? 'Stop voice search' : 'Start voice search')}
                className={`rounded-full p-1 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/70 ${
                  isListening
                    ? 'bg-rose-500/15 text-rose-500 animate-pulse'
                    : `${getSubtleTextClass(isDark)} ${
                        isDark ? 'hover:text-zinc-300' : 'hover:text-zinc-800'
                      }`
                }`}
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${getSubtleTextClass(isDark)}`}
            >
              {t('Sort')}
            </span>

            <label className="relative">
              <select
                value={sortBy}
                onChange={(event) => onSortChange(event.target.value)}
                className={`appearance-none rounded-md border px-3.5 py-2.5 pr-9 text-[13px] outline-none transition-colors select-none cursor-pointer ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-950/80 text-white'
                    : 'border-slate-200 bg-white/85 text-slate-950'
                }`}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(option)}
                  </option>
                ))}
              </select>
              <ChevronDown
                className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${getSubtleTextClass(isDark)}`}
              />
            </label>
          </div>
        </div>

        <div
          className={`inline-flex w-fit rounded-md border p-1 select-none ${
            isDark
              ? 'border-zinc-800 bg-zinc-950/70'
              : 'border-slate-200 bg-white/80'
          }`}
        >
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? isDark
                  ? 'bg-white text-zinc-900'
                  : 'bg-slate-900 text-white'
                : isDark
                  ? 'text-zinc-400'
                  : 'text-slate-500'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            {t('Grid')}
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
              viewMode === 'list'
                ? isDark
                  ? 'bg-white text-zinc-900'
                  : 'bg-slate-900 text-white'
                : isDark
                  ? 'text-zinc-400'
                  : 'text-slate-500'
            }`}
          >
            <List className="h-4 w-4" />
            {t('List')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumesToolbar
