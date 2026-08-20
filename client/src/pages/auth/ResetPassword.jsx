import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeClosed, Languages, LockKeyhole, Moon, Sun } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'

const inputClass = (isDark) =>
  `w-full rounded-sm border px-4 py-3 text-sm outline-none transition-colors ${
    isDark
      ? 'border-zinc-800 bg-[#0d0d0f] text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600'
      : 'border-slate-200 bg-white text-slate-950 placeholder:text-slate-400 focus:border-slate-400'
  }`

const getPasswordError = (password) => {
  if (!password.trim()) return 'Please enter a password'
  if ([...password].length < 8) return 'Password must be at least 8 characters long'
  if (new TextEncoder().encode(password).length > 72) return 'Password must be 72 bytes or fewer'
  if (!/[a-z]/.test(password)) return 'Password must include a lowercase letter'
  if (!/[A-Z]/.test(password)) return 'Password must include an uppercase letter'
  if (!/[0-9]/.test(password)) return 'Password must include a number'
  if (!/[^A-Za-z0-9\s]/.test(password)) return 'Password must include a special character'

  return null
}

const ResetPassword = () => {
  const { isDark, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const hasValidToken = /^[a-f0-9]{64}$/i.test(token || '')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting || !hasValidToken) return

    const passwordError = getPasswordError(password)

    if (passwordError) {
      toast.error(t(passwordError))
      return
    }

    if (password !== confirmPassword) {
      toast.error(t('Passwords do not match'))
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/onyx/api/v1/users/reset-password/${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to reset your password right now.')
      }

      setIsComplete(true)
      toast.success(t(data.message || 'Your password has been reset. You can now sign in.'))
    } catch (error) {
      toast.error(t(error.message || 'Unable to reset your password right now.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`relative h-dvh overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#08090b] text-zinc-100' : 'bg-[#f5f7fb] text-slate-950'
      }`}
    >
      <div className="relative z-10 flex h-full flex-col px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-3 py-2 text-[13px] transition-colors ${
              isDark ? 'text-zinc-300 hover:text-zinc-100' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('Back to Home')}
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className={`inline-flex h-9 w-9 items-center justify-center transition-colors cursor-pointer ${
                isDark ? 'text-zinc-300 hover:text-zinc-100' : 'text-slate-600 hover:text-slate-900'
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
                isDark ? 'text-zinc-300 hover:text-zinc-100' : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label={t('Toggle theme')}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className={`w-full max-w-md rounded-md border px-6 py-8 sm:px-8 ${
              isDark ? 'border-zinc-800 bg-zinc-950/85' : 'border-slate-200 bg-white/92'
            }`}
          >
            {isComplete ? (
              <div className="space-y-6 text-center">
                <div className="space-y-3">
                  <h1 className="text-[1.55rem] font-semibold tracking-tight sm:text-[1.7rem]">
                    {t('Password reset complete')}
                  </h1>
                  <p className={`text-sm leading-6 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                    {t('Your password has been updated. Sign in with your new password to continue.')}
                  </p>
                </div>
                <Link
                  to="/auth/signin"
                  className={`inline-flex w-full items-center justify-center rounded-sm px-4 py-3 text-sm font-medium transition-colors ${
                    isDark ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {t('Sign in')}
                </Link>
              </div>
            ) : !hasValidToken ? (
              <div className="space-y-6 text-center">
                <div className="space-y-3">
                  <h1 className="text-[1.55rem] font-semibold tracking-tight sm:text-[1.7rem]">
                    {t('This reset link is invalid')}
                  </h1>
                  <p className={`text-sm leading-6 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                    {t('Request a new password reset link and use it within 15 minutes.')}
                  </p>
                </div>
                <Link
                  to="/auth/forget-password"
                  className={`inline-flex w-full items-center justify-center rounded-sm px-4 py-3 text-sm font-medium transition-colors ${
                    isDark ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {t('Request reset link')}
                </Link>
              </div>
            ) : (
              <div className="space-y-7">
                <div className="space-y-3 text-center">
                  <h1 className="text-[1.55rem] font-semibold tracking-tight sm:text-[1.7rem]">
                    {t('Set a new password')}
                  </h1>
                  <p className={`text-sm leading-6 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                    {t('Choose a strong new password for your Onyx account.')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <label className="block text-left">
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      isDark ? 'text-zinc-400' : 'text-slate-500'
                    }`}>
                      {t('New password')}
                    </span>
                    <div className="relative mt-2">
                      <LockKeyhole
                        className={`pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 ${
                          isDark ? 'text-zinc-500' : 'text-slate-400'
                        }`}
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        className={`${inputClass(isDark)} pl-11 pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className={`absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center cursor-pointer ${
                          isDark ? 'text-zinc-500' : 'text-slate-400'
                        }`}
                        aria-label={t(showPassword ? 'Hide password' : 'Show password')}
                      >
                        {showPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>

                  <label className="block text-left">
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      isDark ? 'text-zinc-400' : 'text-slate-500'
                    }`}>
                      {t('Confirm new password')}
                    </span>
                    <div className="relative mt-2">
                      <LockKeyhole
                        className={`pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 ${
                          isDark ? 'text-zinc-500' : 'text-slate-400'
                        }`}
                      />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        autoComplete="new-password"
                        placeholder="Repeat your new password"
                        value={confirmPassword}
                        onChange={({ target }) => setConfirmPassword(target.value)}
                        className={`${inputClass(isDark)} pl-11 pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((current) => !current)}
                        className={`absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center cursor-pointer ${
                          isDark ? 'text-zinc-500' : 'text-slate-400'
                        }`}
                        aria-label={t(showConfirmPassword ? 'Hide password' : 'Show password')}
                      >
                        {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>

                  <p className={`text-xs leading-5 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                    {t('Use 8–72 characters with uppercase, lowercase, a number, and a special character.')}
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex w-full items-center justify-center rounded-sm px-4 py-3 text-sm font-medium transition-colors select-none cursor-pointer ${
                      isDark ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                    } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div 
                        id="submitSpinner" 
                        className="w-5 h-5 border-t-2 border-current rounded-full animate-spin mr-2" 
                      />
                      {t(isSubmitting ? 'Resetting password' : 'Reset password')}...
                      </>
                    ) : t('Reset password')}
                  </button>
                </form>

                <div className="text-center">
                  <Link
                    to="/auth/signin"
                    className={`text-sm underline underline-offset-4 transition-colors ${
                      isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {t('Back to sign in')}
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
