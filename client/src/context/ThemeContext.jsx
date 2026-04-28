import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'app-theme'
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
  const [theme, setTheme] = useState(getInitialTheme)
  const isDark = theme === 'dark'

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
    applyDocumentTheme(theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDark,
      setTheme,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [theme, isDark],
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
