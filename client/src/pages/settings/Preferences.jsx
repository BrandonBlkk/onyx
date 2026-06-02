import { SlidersHorizontal } from 'lucide-react'
import Sidebar from '../../components/dashboard/sidebar/Sidebar'
import PageContentTransition from '../../components/ui/PageContentTransition'
import PreferencesForm from '../../components/settings/preferences/PreferencesForm'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

const Preferences = () => {
  const { isDark, theme, setTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-[#0b0b0c] text-zinc-100' : 'bg-[#f7f7f8] text-slate-950'
      }`}
    >
      <div className="min-h-screen">
        <Sidebar isDark={isDark} />

        <PageContentTransition className="lg:ml-65 p-3">
          <div className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                    isDark ? 'border-zinc-700 text-zinc-100' : 'border-slate-300 text-slate-900'
                  }`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                </div>
                <h1 className="text-xl font-semibold tracking-tight">{t('Preferences')}</h1>
              </div>

              <p className={isDark ? 'text-xs text-zinc-500' : 'text-xs text-slate-500'}>
                {t('Adjust the workspace defaults you want each time you build a resume.')}
              </p>
            </div>

            <div className={isDark ? 'border-t border-zinc-800' : 'border-t border-slate-200'} />

            <section>
              <PreferencesForm isDark={isDark} theme={theme} setTheme={setTheme} />
            </section>
          </div>
        </PageContentTransition>
      </div>
    </div>
  )
}

export default Preferences
