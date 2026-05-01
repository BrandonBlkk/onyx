import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const ringColor = isDark ? '255, 255, 255' : '15, 23, 42'

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-zinc-950' : 'bg-[#f5f7fb]'
      }`}
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_256_256%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27noise%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.9%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%2523noise)%27_opacity=%270.02%27/%3E%3C/svg%3E')]"
      />

      {/* Concentric rings */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          '--ring-color': ringColor,
          backgroundImage: `
            radial-gradient(circle at center, transparent 30%, rgba(var(--ring-color), 0.06) 34%, transparent 35%),
            radial-gradient(circle at center, transparent 42%, rgba(var(--ring-color), 0.04) 46%, transparent 47%),
            radial-gradient(circle at center, transparent 55%, rgba(var(--ring-color), 0.02) 64%, transparent 65%)
          `,
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
        }}
      />

      {/* Ambient glow blurs */}
      <div
        className={`absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-accent-500/6' : 'bg-accent-500/10'
        }`}
      />
      <div
        className={`absolute right-[15%] top-[20%] h-48 w-48 rounded-full blur-[100px] pointer-events-none ${
          isDark ? 'bg-accent-500/8' : 'bg-accent-500/12'
        }`}
      />
      <div
        className={`absolute left-[10%] bottom-[25%] h-40 w-40 rounded-full blur-[90px] pointer-events-none ${
          isDark ? 'bg-teal-500/6' : 'bg-teal-500/10'
        }`}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        {/* Animated 404 number with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          }}
          className="relative mb-2 select-none"
        >
          <span
            className={`text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter ${
              isDark
                ? 'bg-[linear-gradient(180deg,rgba(228,228,231,0.15)_0%,rgba(113,113,122,0.05)_100%)]'
                : 'bg-[linear-gradient(180deg,rgba(15,23,42,0.1)_0%,rgba(100,116,139,0.04)_100%)]'
            } bg-clip-text text-transparent`}
          >
            404
          </span>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-sm transition-colors duration-500 ${
            isDark
              ? 'border-zinc-800 bg-zinc-900/80'
              : 'border-slate-200 bg-white/85 shadow-sm'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span
            className={`text-xs font-medium tracking-wide select-none ${
              isDark ? 'text-zinc-400' : 'text-slate-600'
            }`}
          >
            Page Not Found
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mb-4 text-2xl font-bold tracking-tight sm:text-3xl ${
            isDark ? 'text-zinc-100' : 'text-slate-900'
          }`}
        >
          You have wandered off the path.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mx-auto mb-10 max-w-md text-sm leading-relaxed sm:text-base ${
            isDark ? 'text-zinc-400' : 'text-slate-600'
          }`}
        >
          The page you are looking for does not exist or has been moved.
          <br className="hidden sm:block" />
          Let us get you back on track.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 select-none"
        >
          <button
            onClick={() => navigate('/')}
            className={`group relative inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold transition-all duration-300 active:scale-[0.97] ${
              isDark
                ? 'bg-white text-zinc-900 hover:bg-zinc-200 hover:shadow-[0_0_30px_oklch(0.68_0.174_252/0.4),0_0_80px_oklch(0.68_0.174_252/0.15)]'
                : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-[0_18px_40px_rgba(59,130,246,0.18)]'
            }`}
            id="notfound-home-btn"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className={`inline-flex items-center gap-2 border px-7 py-3.5 text-sm font-medium transition-all duration-200 ${
              isDark
                ? 'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800/80 hover:text-zinc-100 hover:border-zinc-700'
                : 'border-slate-200 bg-white/80 text-slate-600 shadow-sm hover:bg-slate-100 hover:text-slate-900'
            }`}
            id="notfound-back-btn"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            Go Back
          </button>
        </motion.div>

        {/* Decorative animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-1.5"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              className={`h-1 w-1 rounded-full ${isDark ? 'bg-zinc-600' : 'bg-slate-400'}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className={`pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t to-transparent transition-colors duration-500 ${
          isDark ? 'from-zinc-950' : 'from-[#f5f7fb]'
        }`}
      />
    </div>
  )
}

export default NotFound
