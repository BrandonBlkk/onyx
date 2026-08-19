import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import {
  preferenceSelectFields,
  preferenceToggleFields,
} from './preferencesData'
import PreferencesSection from './PreferencesSection'
import PreferencesSelectField from './PreferencesSelectField'
import PreferencesToggleField from './PreferencesToggleField'
import { useAuth } from '../../../context/AuthContext'
import { useLanguage } from '../../../context/LanguageContext'

const buildDefaultPreferences = (theme) => ({
  theme,
  ...Object.fromEntries(
    preferenceSelectFields
      .filter((field) => field.name !== 'theme')
      .map((field) => [field.name, field.defaultValue]),
  ),
  ...Object.fromEntries(
    preferenceToggleFields.map((field) => [field.name, field.defaultChecked]),
  ),
})

const PreferencesForm = ({ isDark, theme, setTheme }) => {
  const { token } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const isInitialServerSyncRef = useRef(true)
  const setThemeRef = useRef(setTheme)
  const setLanguageRef = useRef(setLanguage)
  const tRef = useRef(t)
  const [preferences, setPreferences] = useState(() => buildDefaultPreferences(theme))
  const resolvedPreferences = useMemo(
    () => ({
      ...preferences,
      theme,
      language,
    }),
    [preferences, theme, language],
  )

  useEffect(() => {
    setThemeRef.current = setTheme
    setLanguageRef.current = setLanguage
    tRef.current = t
  }, [setTheme, setLanguage, t])

  useEffect(() => {
    if (!token) {
      return
    }

    const controller = new AbortController()

    const loadPreferences = async () => {
      try {
        const response = await fetch('/onyx/api/v1/users/preferences', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load preferences right now.')
        }

        if (!data.preferences || typeof data.preferences !== 'object') {
          throw new Error('Unable to load preferences right now.')
        }

        isInitialServerSyncRef.current = true
        setPreferences((prev) => ({ ...prev, ...data.preferences }))

        if (data.preferences.theme === 'light' || data.preferences.theme === 'dark') {
          setThemeRef.current(data.preferences.theme)
        }

        if (data.preferences.language === 'english' || data.preferences.language === 'burmese') {
          setLanguageRef.current(data.preferences.language)
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        toast.error(tRef.current(error.message || 'Unable to load preferences right now.'))
      }
    }

    loadPreferences()

    return () => controller.abort()
  }, [token])

  useEffect(() => {
    if (isInitialServerSyncRef.current) {
      isInitialServerSyncRef.current = false
      return
    }

    if (!token) {
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch('/onyx/api/v1/users/preferences', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(resolvedPreferences),
          signal: controller.signal,
        })

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.message)
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        toast.error(t(error.message))
      }
    }, 350)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [resolvedPreferences, token, t])

  const handleSelectChange = (name, value) => {
    setPreferences((prev) => ({ ...prev, [name]: value }))

    if (name === 'theme') {
      setTheme(value)
    }

    if (name === 'language') {
      setLanguage(value)
    }
  }

  const handleToggleChange = (name, value) => {
    setPreferences((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-3xl space-y-4">
      <PreferencesSection
        title="Workspace"
        description="Control how Onyx feels when you open the editor."
        isDark={isDark}
      >
        <div className={`space-y-3 ${isDark ? 'text-zinc-100' : 'text-slate-950'}`}>
          {preferenceSelectFields.map((field) => (
            <PreferencesSelectField
              key={field.name}
              {...field}
              value={resolvedPreferences[field.name]}
              onChange={handleSelectChange}
              isDark={isDark}
            />
          ))}
        </div>
      </PreferencesSection>

      <PreferencesSection
        title="Editor"
        description="Choose the small helpers you want while building resumes."
        isDark={isDark}
      >
        <div className={`space-y-3 ${isDark ? 'text-zinc-100' : 'text-slate-950'}`}>
          {preferenceToggleFields.map((field) => (
            <PreferencesToggleField
              key={field.name}
              {...field}
              checked={preferences[field.name]}
              onChange={handleToggleChange}
              isDark={isDark}
            />
          ))}
        </div>
      </PreferencesSection>

      <p className={isDark ? 'text-[11px] text-zinc-500' : 'text-[11px] text-slate-500'}>
        {t('Preferences are saved on this device and theme changes apply immediately.')}
      </p>
    </div>
  )
}

export default PreferencesForm
