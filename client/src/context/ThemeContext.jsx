/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'app-theme'
const THEME_TRANSITION_CLASS = 'theme-transitioning'
const THEME_TRANSITION_DURATION = 180
const ThemeContext = createContext(null)

const applyDocumentTheme = (theme) => {
  if (typeof document === 'undefined') return

  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'

  const storedTheme = window.localStorage.getItem(STORAGE_KEY)
  const theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark'

  applyDocumentTheme(theme)
  return theme
}

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme)
  const isDark = theme === 'dark'
  const transitionTimeoutRef = useRef(null)

  const setTheme = useCallback((nextTheme) => {
    setThemeState((prevTheme) => {
      const resolvedTheme =
        typeof nextTheme === 'function' ? nextTheme(prevTheme) : nextTheme

      if (resolvedTheme === prevTheme) return prevTheme

      if (typeof document !== 'undefined') {
        document.documentElement.classList.add(THEME_TRANSITION_CLASS)

        if (transitionTimeoutRef.current) {
          window.clearTimeout(transitionTimeoutRef.current)
        }

        transitionTimeoutRef.current = window.setTimeout(() => {
          document.documentElement.classList.remove(THEME_TRANSITION_CLASS)
          transitionTimeoutRef.current = null
        }, THEME_TRANSITION_DURATION)
      }

      return resolvedTheme
    })
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
    applyDocumentTheme(theme)
  }, [theme])

  useEffect(
    () => () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }

      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove(THEME_TRANSITION_CLASS)
      }
    },
    [],
  )

  const value = useMemo(
    () => ({
      theme,
      isDark,
      setTheme,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [theme, isDark, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
