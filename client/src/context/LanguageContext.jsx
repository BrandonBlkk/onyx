/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import englishTranslations from '../locales/en.json'
import burmeseTranslations from '../locales/my.json'

const STORAGE_KEY = 'app-preferences'
const LanguageContext = createContext(null)

const translationTables = {
  english: englishTranslations,
  burmese: burmeseTranslations,
}

const getStoredPreferences = () => {
  if (typeof window === 'undefined') return {}

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

const getInitialLanguage = () => {
  const stored = getStoredPreferences()
  return stored.language === 'burmese' ? 'burmese' : 'english'
}

const applyDocumentLanguage = (language) => {
  if (typeof document === 'undefined') return

  document.documentElement.lang = language === 'burmese' ? 'my' : 'en'
}

const interpolate = (template, params = {}) =>
  Object.entries(params).reduce(
    (resolved, [key, value]) => resolved.replaceAll(`{${key}}`, value),
    template,
  )

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = getStoredPreferences()
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...stored,
        language,
      }),
    )
    applyDocumentLanguage(language)
  }, [language])

  useEffect(() => {
    const handleStorage = () => {
      setLanguageState(getInitialLanguage())
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const value = useMemo(() => {
    const setLanguage = (nextLanguage) => {
      setLanguageState(nextLanguage === 'burmese' ? 'burmese' : 'english')
    }

    const t = (text, params) => {
      const source = typeof text === 'string' ? text : ''
      const dictionary = translationTables[language] ?? englishTranslations
      const translated = dictionary[source] ?? source

      return interpolate(translated, params)
    }

    return {
      language,
      isBurmese: language === 'burmese',
      setLanguage,
      toggleLanguage: () =>
        setLanguageState((prev) => (prev === 'english' ? 'burmese' : 'english')),
      t,
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
