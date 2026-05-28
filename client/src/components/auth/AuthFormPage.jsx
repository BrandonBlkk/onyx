import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Languages,
  LockKeyhole,
  Mail,
  Moon,
  Sun,
  UserRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/images/logo2.png'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import GitHubMark from '../settings/authentication/GitHubMark'
import GoogleMark from '../settings/authentication/GoogleMark'

const authContent = {
  signin: {
    title: 'Sign in to Onyx.',
    description: 'Open your saved resumes and jump back into your workspace.',
    socialLabel: 'Continue with',
    divider: 'or sign in with email',
    submitLabel: 'Sign in',
    helperPrompt: 'Do not have an account?',
    helperAction: 'Create one',
    helperHref: '/auth/signup',
  },
  signup: {
    title: 'Create your Onyx account.',
    description: 'Save your resumes and keep your workspace ready on every visit.',
    socialLabel: 'Continue with',
    divider: 'or sign up with email',
    submitLabel: 'Create account',
    helperPrompt: 'Already have an account?',
    helperAction: 'Sign in instead',
    helperHref: '/auth/signin',
  },
}

const inputClass = (isDark) =>
  `mt-1.5 w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors ${
    isDark
      ? 'border-zinc-800 bg-[#0d0d0f] text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600'
      : 'border-slate-300 bg-white text-slate-950 placeholder:text-slate-400 focus:border-slate-400'
  }`

const socialButtonClass = (isDark, emphasis) => {
  if (emphasis === 'github') {
    return isDark
      ? 'border-zinc-700 bg-white text-zinc-950 hover:bg-zinc-200'
      : 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800'
  }

  return isDark
    ? 'border-zinc-800 bg-zinc-950 text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900'
    : 'border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50'
}

const initialFormState = {
  fullname: '',
  email: '',
  password: '',
}

const AuthFormPage = ({ mode = 'signin' }) => {
  const { isDark, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const { login } = useAuth()
  const navigate = useNavigate()
  const content = authContent[mode] ?? authContent.signin
  const isSignup = mode === 'signup'
  const [formData, setFormData] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({
    type: '',
    text: '',
  })
  const fieldProps = (fieldName) => ({
    value: formData[fieldName],
    onChange: handleChange,
  })

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const url = isSignup ? '/onyx/api/users' : '/onyx/api/users/login'
      const payload = isSignup
        ? formData
        : { email: formData.email, password: formData.password }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isSignup
              ? 'Unable to create account right now.'
              : 'Unable to sign in right now.'),
        )
      }

      if (isSignup) {
        setFormData(initialFormState)
        setSubmitMessage({
          type: 'success',
          text: 'Account created successfully. You can sign in now.',
        })
      } else {
        login(data.token, data.user)
        navigate('/dashboard/resumes')
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text:
          error.message ||
          (isSignup
            ? 'Unable to create account right now.'
            : 'Unable to sign in right now.'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#08090b] text-zinc-100' : 'bg-[#f5f7fb] text-slate-950'
      }`}
    >
      <div className="relative z-10 flex h-screen flex-col px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
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

        <div className="flex flex-1 items-center justify-center py-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className={`w-full max-w-108 rounded-md border px-5 py-5 sm:px-6 sm:py-6 ${
              isDark
                ? 'border-zinc-800 bg-zinc-950/85'
                : 'border-slate-200 bg-white/92'
            }`}
          >
            <div className="flex justify-center">
              <Link
                to="/"
                className="flex h-12 w-12 items-center justify-center overflow-hidden select-none"
              >
                <img
                  src={isDark ? logo : logo2}
                  alt={t('Onyx Logo')}
                  className="h-8 w-8 object-cover"
                />
              </Link>
            </div>

            <div className="mt-4 text-center">
              <h1 className="mt-3 text-[1.55rem] font-semibold tracking-tight sm:text-[1.7rem]">
                {t(content.title)}
              </h1>
              <p
                className={`mt-2 text-[13px] leading-5 ${
                  isDark ? 'text-zinc-400' : 'text-slate-600'
                }`}
              >
                {t(content.description)}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`inline-flex w-full items-center justify-center gap-2 border px-3 py-2.5 text-sm font-medium transition-colors select-none cursor-pointer ${socialButtonClass(
                  isDark,
                  'google',
                )}`}
              >
                <GoogleMark className="h-4 w-4" />
                {t('Google')}
              </button>

              <button
                type="button"
                className={`inline-flex w-full items-center justify-center gap-2 border px-3 py-2.5 text-sm font-medium transition-colors select-none cursor-pointer ${socialButtonClass(
                  isDark,
                  'github',
                )}`}
              >
                <GitHubMark className="h-4 w-4" />
                {t('GitHub')}
              </button>
            </div>

            <div className="my-4 flex items-center gap-3">
              <div className={`h-px flex-1 ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />
              <span
                className={`text-[11px] font-medium uppercase tracking-[0.22em] ${
                  isDark ? 'text-zinc-500' : 'text-slate-400'
                }`}
              >
                {t(content.divider)}
              </span>
              <div className={`h-px flex-1 ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              {isSignup ? (
                <label className="block">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      isDark ? 'text-zinc-400' : 'text-slate-500'
                    }`}
                  >
                    {t('Full name')}
                  </span>
                  <div className="relative">
                    <UserRound
                      className={`pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 ${
                        isDark ? 'text-zinc-500' : 'text-slate-400'
                      }`}
                    />
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Enter your full name"
                      className={`${inputClass(isDark)} pl-11`}
                      {...fieldProps('fullname')}
                    />
                  </div>
                </label>
              ) : null}

              <label className="block">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    isDark ? 'text-zinc-400' : 'text-slate-500'
                  }`}
                >
                  {t('Email address')}
                </span>
                <div className="relative">
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
                    {...fieldProps('email')}
                  />
                </div>
              </label>

              <label className="block">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    isDark ? 'text-zinc-400' : 'text-slate-500'
                  }`}
                >
                  {t('Password')}
                </span>
                <div className="relative">
                  <LockKeyhole
                    className={`pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 ${
                      isDark ? 'text-zinc-500' : 'text-slate-400'
                    }`}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder={isSignup ? 'Create a strong password' : 'Enter your password'}
                    className={`${inputClass(isDark)} pl-11`}
                    {...fieldProps('password')}
                  />
                </div>
              </label>

              {isSignup ? null : (
                <div className="flex items-center justify-between gap-3 text-xs">
                  <label
                    className={`inline-flex items-center gap-2 cursor-pointer ${
                      isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}
                  >
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 cursor-pointer" />
                    {t('Remember me')}
                  </label>

                  <Link
                    to={'/auth/forget-password'}
                    className={`transition-colors cursor-pointer ${
                      isDark ? 'text-zinc-300 hover:text-zinc-100' : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    {t('Forgot password?')}
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex w-full items-center justify-center px-4 py-2.5 text-sm font-medium transition-colors select-none cursor-pointer ${
                  isDark
                    ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {isSubmitting
                  ? t(isSignup ? 'Creating account...' : 'Signing in...')
                  : t(content.submitLabel)}
              </button>

              {submitMessage.text ? (
                <p
                  className={`text-xs ${
                    submitMessage.type === 'success'
                      ? isDark
                        ? 'text-emerald-400'
                        : 'text-emerald-700'
                      : isDark
                        ? 'text-rose-400'
                        : 'text-rose-700'
                  }`}
                >
                  {t(submitMessage.text)}
                </p>
              ) : null}
            </form>

            <p
              className={`mt-4 text-center text-xs ${
                isDark ? 'text-zinc-500' : 'text-slate-500'
              }`}
            >
              {t(content.helperPrompt)}{' '}
              <Link
                to={content.helperHref}
                className={isDark ? 'font-medium text-zinc-100' : 'font-medium text-slate-950'}
              >
                {t(content.helperAction)}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AuthFormPage
