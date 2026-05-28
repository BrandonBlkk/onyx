import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronUp, Languages, LogOut, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { useLanguage } from '../../../context/LanguageContext'
import { useAuth } from '../../../context/AuthContext'

const PREFERENCES_STORAGE_KEY = 'app-preferences'

const getStoredPreferences = () => {
  if (typeof window === 'undefined') return {}

  try {
    return JSON.parse(window.localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

const persistPreference = (name, value) => {
  if (typeof window === 'undefined') return

  const stored = getStoredPreferences()
  window.localStorage.setItem(
    PREFERENCES_STORAGE_KEY,
    JSON.stringify({
      ...stored,
      [name]: value,
    }),
  )
}

const SidebarFooter = ({ isDark }) => {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleThemeChange = (value) => {
    setTheme(value)
    persistPreference('theme', value)
  }

  const handleLanguageChange = (event) => {
    const value = event.target.value
    setLanguage(value)
  }

  const handleLogout = () => {
    setMenuOpen(false)
    navigate('/', { replace: true })
    setTimeout(() => logout(), 100)
  }

  const displayName = user ? user.fullname : t('Guest')
  const displayEmail = user ? user.email : t('Not signed in')
  const initials = user
    ? user.fullname
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'G'

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev)
  }

  return (
    <div
      className={`border-t pt-5 pb-2 ${
        isDark ? 'border-zinc-800/80' : 'border-slate-200/80'
      }`}
    >
      <div
        className={`rounded-lg p-4 backdrop-blur-md ${
          isDark
            ? 'border-zinc-800 bg-zinc-950/65'
            : 'border-slate-200 bg-white/82'
        }`}
      >
        <div className="relative" ref={containerRef}>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.10, ease: 'easeOut' }}
                className={`absolute inset-x-0 bottom-full z-20 mb-3 rounded-xl border p-3 shadow-2xl ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-950/96 text-zinc-100'
                    : 'border-slate-200 bg-white/96 text-slate-950'
                }`}
              >
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-xs font-medium">
                        {theme === 'dark' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                        {t('Theme')}
                      </span>

                      <div
                        className={`inline-flex rounded-lg border p-1 select-none ${
                          isDark ? 'border-zinc-800 bg-zinc-900/80' : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        {['dark', 'light'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleThemeChange(option)}
                            className={`rounded-md px-2.5 py-1 text-[11px] font-medium capitalize transition-colors cursor-pointer ${
                              theme === option
                                ? isDark
                                  ? 'bg-white text-zinc-900'
                                  : 'bg-slate-900 text-white'
                                : isDark
                                  ? 'text-zinc-400 hover:text-zinc-100'
                                  : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            {t(option === 'dark' ? 'Dark' : 'Light')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-xs font-medium">
                        <Languages className="h-3.5 w-3.5" />
                        {t('Language')}
                      </span>

                      <select
                        value={language}
                        onChange={handleLanguageChange}
                        className={`rounded-lg border px-4 py-1.5 text-[11px] outline-none transition-colors select-none cursor-pointer ${
                          isDark
                            ? 'border-zinc-800 bg-zinc-900/80 text-zinc-100'
                            : 'border-slate-200 bg-slate-50 text-slate-900'
                        }`}
                      >
                        <option value="english">{t('English')}</option>
                        <option value="burmese">{t('Burmese')}</option>
                      </select>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors select-none cursor-pointer ${
                      isDark
                        ? 'border-red-950 bg-red-950/20 text-red-200 hover:bg-red-950/35'
                        : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    {t('Log out')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={handleMenuToggle}
            aria-expanded={menuOpen}
            aria-label={t('Open account menu')}
            className={`flex w-full items-center gap-3 rounded-lg transition-colors p-2 ${
              isDark ? 'hover:bg-zinc-900/70' : 'hover:bg-slate-100/80'
            }`}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold select-none ${user ? 'bg-linear-to-br from-cyan-400 to-blue-500 text-slate-950' : isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-200 text-slate-500'}`}>
              {initials}
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-[13px] font-semibold">{displayName}</p>
              <p className={`truncate text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                {displayEmail}
              </p>
            </div>

            <ChevronUp
              className={`h-4 w-4 transition-transform ${
                menuOpen ? 'rotate-0' : 'rotate-180'
              } ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}
            />
          </button>
        </div>

        <div
          className={`mt-4 space-y-1 text-[11px] leading-4 ${
            isDark ? 'text-zinc-500' : 'text-slate-500'
          }`}
        >
          <p className={`${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>{t('Licensed under')}
            <a
              href="https://github.com/BrandonBlkk/Onyx/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${isDark ? 'hover:text-zinc-300' : 'hover:text-slate-900'}`}
            >
              {' '} <span className="font-semibold text-zinc-500">MIT.</span>
            </a>  
          </p>
          <p className={`${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>{t('Crafted for job seekers, by developers.')}</p>
          <p className={`mt-1 ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>
              {t('Project by')}{' '}
              <a
                href="https://github.com/BrandonBlkk"
                target="_blank"
                rel="noreferrer"
                className={`transition-colors ${isDark ? 'hover:text-zinc-300' : 'hover:text-slate-900'}`}
              >
                <span className="font-semibold text-zinc-500">Brandon.</span>
              </a>
            </p>
          <p className="mt-5">{t('Onyx is a work in progress.')}</p>
        </div>
      </div>
    </div>
  )
}

export default SidebarFooter
