/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import englishCommon from '../locales/en/common.json'
import englishLanding from '../locales/en/landing.json'
import englishAuth from '../locales/en/auth.json'
import englishDashboard from '../locales/en/dashboard.json'
import englishSettings from '../locales/en/settings.json'
import englishNotFound from '../locales/en/not-found.json'
import burmeseCommon from '../locales/my/common.json'
import burmeseLanding from '../locales/my/landing.json'
import burmeseAuth from '../locales/my/auth.json'
import burmeseDashboard from '../locales/my/dashboard.json'
import burmeseSettings from '../locales/my/settings.json'
import burmeseNotFound from '../locales/my/not-found.json'

const STORAGE_KEY = 'app-preferences'
const LanguageContext = createContext(null)

const englishTranslations = {
  ...englishCommon,
  ...englishLanding,
  ...englishAuth,
  ...englishDashboard,
  ...englishSettings,
  ...englishNotFound,
}

const burmeseTranslations = {
  ...burmeseCommon,
  ...burmeseLanding,
  ...burmeseAuth,
  ...burmeseDashboard,
  ...burmeseSettings,
  ...burmeseNotFound,
}

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
