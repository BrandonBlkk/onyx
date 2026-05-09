import { useEffect, useState } from 'react'
import {
  preferenceSelectFields,
  preferenceToggleFields,
} from './preferencesData'
import PreferencesSection from './PreferencesSection'
import PreferencesSelectField from './PreferencesSelectField'
import PreferencesToggleField from './PreferencesToggleField'

const STORAGE_KEY = 'app-preferences'

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
  const [preferences, setPreferences] = useState(() => {
    const defaults = buildDefaultPreferences(theme)

    if (typeof window === 'undefined') {
      return defaults
    }

    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
      return {
        ...defaults,
        ...stored,
        theme: stored.theme === 'light' || stored.theme === 'dark' ? stored.theme : theme,
      }
    } catch {
      return defaults
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  }, [preferences])

  useEffect(() => {
    setPreferences((prev) => (prev.theme === theme ? prev : { ...prev, theme }))
  }, [theme])

  const handleSelectChange = (name, value) => {
    setPreferences((prev) => ({ ...prev, [name]: value }))

    if (name === 'theme') {
      setTheme(value)
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
              value={preferences[field.name]}
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
        Preferences are saved on this device and theme changes apply immediately.
      </p>
    </div>
  )
}

export default PreferencesForm
