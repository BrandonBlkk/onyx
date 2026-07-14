import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/images/logo2.png'
import { useLanguage } from '../../context/LanguageContext'

const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Preview', href: '#preview' },
  { label: 'Templates', href: '#templates' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
]

const Footer = ({ isDark = true }) => {
  const { t } = useLanguage()
  const primaryButtonGlowClass = isDark
    ? 'hover:shadow-[0_0_20px_oklch(0.68_0.174_252_/_0.3),0_0_60px_oklch(0.68_0.174_252_/_0.1)]'
    : 'hover:shadow-[0_18px_40px_rgba(59,130,246,0.18)]'

  return (
    <footer className={`relative border-t transition-colors duration-500 ${
      isDark ? 'border-zinc-800/60' : 'border-slate-200'
    }`} id="footer">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className={`relative mb-16 overflow-hidden border p-8 text-center sm:p-12 ${
          isDark
            ? 'border-zinc-800/80 bg-zinc-900/50'
            : 'border-slate-200 bg-white/80 shadow-sm'
        }`}>
          <div className={`absolute inset-0 pointer-events-none ${
            isDark ? 'bg-accent-500/3' : 'bg-accent-500/6'
          }`} />
          <div className="relative z-10">
            <h3 className={`mb-3 text-2xl font-bold tracking-tight sm:text-3xl ${
              isDark ? 'text-zinc-100' : 'text-slate-900'
            }`}>
              {t('Ready to build your resume?')}
            </h3>
            <p className={`mx-auto mb-6 max-w-md text-sm sm:text-base ${
              isDark ? 'text-zinc-400' : 'text-slate-600'
            }`}>
              {t('Join thousands of employees who have landed their dream roles with Onyx.')}
            </p>
            <Link
              to="/auth/signin"
              className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all duration-300 active:scale-[0.97] select-none ${
                isDark
                  ? `bg-white text-zinc-900 hover:bg-zinc-200 ${primaryButtonGlowClass}`
                  : `bg-slate-900 text-white hover:bg-slate-800 ${primaryButtonGlowClass}`
              }`}
              id="footer-cta"
            >
              {t('Start Building - It is Free')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="/" className="flex items-center gap-2 group" id="nav-logo">
            <div className="flex h-15 w-15 items-center justify-center overflow-hidden rounded-sm shrink-0">
              <img
                src={isDark ? logo : logo2}
                alt={t('Onyx Logo')}
                className="h-full w-full select-none object-cover"
              />
            </div>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs transition-colors ${isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {t(link.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/BrandonBlkk/onyx"
              target="_blank"
              rel="noreferrer"
              className={`p-2 transition-colors ${isDark ? 'text-zinc-600 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-900'}`}
              aria-label="GitHub"
              id="social-github"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className={`mt-8 border-t pt-6 text-center transition-colors duration-500 ${
          isDark ? 'border-zinc-800/40' : 'border-slate-200'
        }`}>
          <p className={`text-xs ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>
            &copy; {new Date().getFullYear()} Onyx. {t('Crafted for job seekers, by developers.')}
          </p>
          <p className={`mt-1 text-xs ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>
            {t('Project by')}{' '}
            <a
              href="https://github.com/BrandonBlkk"
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${isDark ? 'hover:text-zinc-300' : 'hover:text-slate-900'}`}
            >
              Brandon
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
