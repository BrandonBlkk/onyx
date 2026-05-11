import { useLanguage } from '../../../context/LanguageContext'

const PreferencesSection = ({ title, description, children, isDark }) => {
  const { t } = useLanguage()

  return (
    <section
      className={`rounded-md border p-4 sm:p-5 ${
        isDark ? 'border-zinc-800 bg-zinc-950/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="mb-4">
        <h2 className="text-sm font-semibold tracking-tight">{t(title)}</h2>
        <p className={`mt-1 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
          {t(description)}
        </p>
      </div>

      {children}
    </section>
  )
}

export default PreferencesSection
