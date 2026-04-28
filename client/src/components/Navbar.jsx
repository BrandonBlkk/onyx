import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Languages, Moon, Sun } from 'lucide-react'
import logo from '../assets/images/logo.png'
import logo2 from '../assets/images/logo2.png'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Preview', href: '#preview' },
]

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = isDark
    ? scrolled
      ? 'bg-zinc-950/80 backdrop-blur-xl'
      : 'bg-transparent'
    : scrolled
      ? 'bg-white/85 backdrop-blur-xl'
      : 'bg-transparent'

  const navClass = isDark
    ? 'text-zinc-400 hover:text-zinc-100'
    : 'text-slate-500 hover:text-slate-900'

  const iconClass = isDark ? 'hover:text-zinc-400' : 'hover:text-slate-700'

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}
    >
      <nav className={`mx-auto flex h-16 items-center justify-between p-6 transition-all duration-500 ease-in-out ${scrolled ? 'max-w-6xl' : 'max-w-full'}`}>
        <a href="/" className="flex items-center gap-2 group" id="nav-logo">
          <div className="flex w-9 items-center justify-center overflow-hidden rounded-sm">
            <img
              src={isDark ? logo : logo2}
              alt="Onyx Logo"
              className="h-full w-full select-none object-cover"
            />
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6 select-none">
          <Languages className={`w-4 cursor-pointer transition-colors ${iconClass} ${isDark ? '' : 'text-zinc-900'}`} />

          <button
            type="button"
            onClick={toggleTheme}
            className={`p-1 transition-colors ${iconClass}`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 cursor-pointer" />
            ) : (
              <Moon className="w-4 text-zinc-900 cursor-pointer" />
            )}
          </button>

          <a
            href="#"
            className={`text-sm transition-colors ${navClass}`}
            id="nav-signin"
          >
            Sign in
          </a>
          <a
            href="#"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
              isDark
                ? 'bg-white text-zinc-900 hover:bg-zinc-200'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
            id="nav-cta"
          >
            Get Started
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 transition-colors ${navClass}`}
          aria-label="Toggle menu"
          id="nav-mobile-toggle"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden border-t backdrop-blur-xl ${
              isDark
                ? 'border-zinc-800/60 bg-zinc-950/95'
                : 'border-slate-200 bg-white/95'
            }`}
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm transition-colors ${navClass}`}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex items-center gap-2 text-sm transition-colors ${navClass}`}
              >
                {isDark ? <Sun className="w-4" /> : <Moon className="w-4" />}
                Toggle theme
              </button>
              <div className={`pt-4 border-t space-y-3 ${isDark ? 'border-zinc-800/60' : 'border-slate-200'}`}>
                <a href="#" className={`block text-sm transition-colors ${navClass}`}>
                  Sign in
                </a>
                <a
                  href="#"
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                    isDark
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
