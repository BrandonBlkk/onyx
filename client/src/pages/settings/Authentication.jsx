import { ShieldCheck } from 'lucide-react'
import Sidebar from '../../components/dashboard/sidebar/Sidebar'
import PageContentTransition from '../../components/PageContentTransition'
import AuthenticationConnections from '../../components/settings/authentication/AuthenticationConnections'
import AuthenticationSummary from '../../components/settings/authentication/AuthenticationSummary'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

const Authentication = () => {
  const { isDark } = useTheme()
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
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <h1 className="text-xl font-semibold tracking-tight">{t('Authentication')}</h1>
              </div>

              <p className={isDark ? 'text-xs text-zinc-500' : 'text-xs text-slate-500'}>
                {t('Connect Google or GitHub to give you faster sign up and sign in options.')}
              </p>
            </div>

            <div className={isDark ? 'border-t border-zinc-800' : 'border-t border-slate-200'} />

            <section className="grid gap-3 xl:grid-cols-[1.35fr_0.85fr]">
              <AuthenticationConnections isDark={isDark} />
              <AuthenticationSummary isDark={isDark} />
            </section>
          </div>
        </PageContentTransition>
      </div>
    </div>
  )
}

export default Authentication
