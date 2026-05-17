import { motion } from 'framer-motion'
import { ArrowLeft, Languages, Mail, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'

const inputClass = (isDark) =>
  `w-full rounded-sm border px-4 py-3 text-sm outline-none transition-colors ${
    isDark
      ? 'border-zinc-800 bg-[#0d0d0f] text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600'
      : 'border-slate-200 bg-white text-slate-950 placeholder:text-slate-400 focus:border-slate-400'
  }`

const ForgetPassword = () => {
  const { isDark, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#08090b] text-zinc-100' : 'bg-[#f5f7fb] text-slate-950'
      }`}
    >
      <div className="relative z-10 flex min-h-screen flex-col px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-3 py-2 text-[13px] transition-colors ${
              isDark
                ? 'text-zinc-300 hover:text-zinc-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('Back to Home')}
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <p
              className={`hidden text-[13px] sm:block ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              {t('Have an account?')}{' '}
              <Link
                to="/auth/signin"
                className={isDark ? 'text-zinc-100' : 'text-slate-950'}
              >
                {t('Sign in')}
              </Link>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className={`inline-flex h-9 w-9 items-center justify-center transition-colors cursor-pointer ${
                  isDark
                    ? 'text-zinc-300 hover:text-zinc-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label={t('Toggle language')}
                title={`${t('Language')}: ${t(language === 'english' ? 'English' : 'Burmese')}`}
              >
                <Languages className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className={`inline-flex h-9 w-9 items-center justify-center transition-colors cursor-pointer ${
                  isDark
                    ? 'text-zinc-300 hover:text-zinc-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label={t('Toggle theme')}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full max-w-md rounded-[28px] px-6 py-8 sm:px-8 sm:py-1"
          >
            <div className="space-y-7">
              <div className="space-y-3 text-center">
                <h1 className="text-[1.55rem] font-semibold tracking-tight sm:text-[1.7rem]">
                  {t('Did you forget your password?')}
                </h1>
                <p
                  className={`mx-auto max-w-sm text-sm leading-6 ${
                    isDark ? 'text-zinc-400' : 'text-slate-500'
                  }`}
                >
                  {t(
                    'Enter your email address below and we will send you a password reset link.',
                  )}
                </p>
              </div>

              <form onSubmit={(event) => event.preventDefault()} className="space-y-5">
                <label className="block text-left">
                  <span
                    className={`text-[12px] font-semibold ${
                      isDark ? 'text-zinc-300' : 'text-slate-800'
                    }`}
                  >
                    {t('Email address')}
                  </span>
                  <div className="relative mt-2">
                    <Mail
                      className={`pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 ${
                        isDark ? 'text-zinc-500' : 'text-slate-400'
                      }`}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className={`${inputClass(isDark)} pl-11`}
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  className={`inline-flex w-full items-center justify-center rounded-sm px-4 py-3 text-sm font-medium transition-colors select-none cursor-pointer ${isDark ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                >
                  {t('Request reset link')}
                </button>
              </form>

              <div className="text-center">
                <Link
                  to="/auth/signin"
                  className={`text-sm underline underline-offset-4 transition-colors ${
                    isDark
                      ? 'text-zinc-400 hover:text-zinc-100'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t('Back to sign in')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    
    </div>
  )
}

export default ForgetPassword
