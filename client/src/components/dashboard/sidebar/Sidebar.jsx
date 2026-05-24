import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import logo2 from '../../../assets/images/logo2.png'
import SidebarFooter from './SidebarFooter'
import SidebarSection from './SidebarSection'
import { appLinks, settingsLinks } from './sidebarData'
import { useLanguage } from '../../../context/LanguageContext'

const isDesktopViewport = () =>
  typeof window !== 'undefined' && window.innerWidth >= 1024

const Sidebar = ({ isDark }) => {
  const { t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (isDesktopViewport()) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!mobileOpen) {
      return undefined
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
    }
  }, [mobileOpen])

  const closeMobileMenu = () => setMobileOpen(false)
  const toggleMobileMenu = () => setMobileOpen((prev) => !prev)
  const panelClass = isDark
    ? 'border-zinc-800/80 bg-zinc-950/72'
    : 'border-slate-200/80 bg-white'
  const headerBorderClass = isDark ? 'border-zinc-800/80' : 'border-slate-200/80'
  const toggleButtonClass = isDark
    ? 'text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-100'
    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
  const headerContent = (
    <div
      className={`border-b px-5 py-5 ${
        headerBorderClass
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3" id="nav-logo">
          <div className="flex w-9 items-center justify-center overflow-hidden rounded-md">
            <img
              src={isDark ? logo : logo2}
              alt={t('Onyx Logo')}
              className="h-full w-full select-none object-cover"
            />
          </div>

          <div>
            <p className="text-base font-semibold tracking-tight">Onyx</p>
            <p className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
              {t('Resume workspace')}
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={toggleMobileMenu}
          className={`rounded-md p-2 transition-colors lg:hidden ${toggleButtonClass}`}
          aria-expanded={mobileOpen}
          aria-controls="dashboard-sidebar-mobile-panel"
          aria-label={t('Toggle menu')}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
  const sidebarContent = (
    <>
      {headerContent}

      <div className="flex-1 space-y-7 px-4 py-6">
        <SidebarSection title="App" items={appLinks} isDark={isDark} onNavigate={closeMobileMenu} />
        <SidebarSection title="Settings" items={settingsLinks} isDark={isDark} onNavigate={closeMobileMenu} />
      </div>

      <SidebarFooter isDark={isDark} />
    </>
  )

  return (
    <>
      <div className={`relative overflow-hidden border-b backdrop-blur-xl lg:hidden ${panelClass}`}>
        <div
          className={`pointer-events-none absolute left-6 top-6 h-24 w-24 rounded-full blur-3xl ${
            isDark ? 'bg-accent-500/10' : 'bg-accent-500/12'
          }`}
        />

        <div className="relative">{headerContent}</div>
      </div>

      <aside
        className={`relative hidden overflow-hidden border-b backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-65 lg:border-r lg:border-b-0 ${panelClass}`}
      >
        <div
          className={`pointer-events-none absolute left-6 top-6 h-24 w-24 rounded-full blur-3xl ${
            isDark ? 'bg-accent-500/10' : 'bg-accent-500/12'
          }`}
        />

        <div className="relative flex h-full w-full flex-col">
          {sidebarContent}
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              key="dashboard-sidebar-backdrop"
              type="button"
              aria-label={t('Close menu')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-zinc-950/45 lg:hidden"
              onClick={closeMobileMenu}
            />

            <motion.aside
              key="dashboard-sidebar-mobile-panel"
              id="dashboard-sidebar-mobile-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`fixed inset-y-0 left-0 z-50 flex w-[min(22rem,calc(100vw-1rem))] max-w-full flex-col overflow-hidden border-r backdrop-blur-xl lg:hidden ${panelClass}`}
            >
              <div
                className={`pointer-events-none absolute left-6 top-6 h-24 w-24 rounded-full blur-3xl ${
                  isDark ? 'bg-accent-500/10' : 'bg-accent-500/12'
                }`}
              />

              <div className="relative flex h-full flex-col overflow-y-auto">
                {sidebarContent}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
