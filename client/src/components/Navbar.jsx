import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Languages, Moon, Sun } from 'lucide-react';
import logo from '../assets/images/logo.png'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className={`mx-auto flex h-16 items-center justify-between p-6 transition-all duration-500 ease-in-out ${scrolled ? 'max-w-6xl' : 'max-w-full'}`}>
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group" id="nav-logo">
          <div
            className="flex w-9 items-center justify-center overflow-hidden rounded-sm"
          >
            <img
              src={logo}
              alt="Onyx Logo"
              className="h-full w-full select-none object-cover"
            />
          </div>
        </a>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6 select-none">
          <Languages className='w-4 cursor-pointer hover:text-zinc-400  transition-colors' />
          
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-1 hover:text-zinc-400 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Moon className='w-4 cursor-pointer' />
            ) : (
              <Sun className='w-4 cursor-pointer' />
            )}
          </button>

          <a
            href="#"
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            id="nav-signin"
          >
            Sign in
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 active:scale-[0.97] transition-all duration-200"
            id="nav-cta"
          >
            Get Started
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 space-y-4">
              {typeof navLinks !== 'undefined' && navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-zinc-800/60 space-y-3">
                <a href="#" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
                  Sign in
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
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
