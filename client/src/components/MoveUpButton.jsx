import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MoveUp } from 'lucide-react'

const MoveUpButton = ({ isDark = true }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 320)

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`fixed right-6 bottom-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-200 hover:border-zinc-500 active:scale-[0.97] cursor-pointer ${
            isDark
              ? 'border-zinc-700/80 bg-zinc-900/85 text-zinc-100 shadow-lg shadow-black/30 hover:bg-zinc-800'
              : 'border-slate-200 bg-white/90 text-slate-700 shadow-lg shadow-slate-300/30 hover:bg-slate-100'
          }`}
          id="move-up-button"
        >
          <MoveUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default MoveUpButton
