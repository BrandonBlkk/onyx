import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import FeatureGrid from '../components/landing/FeatureGrid'
import LivePreview from '../components/landing/LivePreview'
import Footer from '../components/landing/Footer'
import MoveUpButton from '../components/MoveUpButton'
import { useTheme } from '../context/ThemeContext'

const Landing = () => {
  const [isAtBottom, setIsAtBottom] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      setIsAtBottom(isBottom)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-zinc-950' : 'bg-[#f5f7fb]'}`}>
      <Navbar />
      <main>
        <div className="pointer-events-none fixed top-14 left-0 right-0 z-40 h-32">
          <div
            className={`absolute inset-0 bg-linear-to-b from-zinc-950 to-transparent transition-opacity duration-500 ${
              isDark ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`absolute inset-0 bg-linear-to-b from-[#f5f7fb] to-transparent transition-opacity duration-500 ${
              isDark ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>

        <Hero isDark={isDark} />
        <HowItWorks isDark={isDark} />
        <FeatureGrid isDark={isDark} />
        <LivePreview isDark={isDark} />
        <MoveUpButton isDark={isDark} />

        <div
          className={`pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-32 transition-opacity duration-500 ${
            isAtBottom ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div
            className={`absolute inset-0 bg-linear-to-t from-zinc-950 to-transparent transition-opacity duration-500 ${
              isDark ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`absolute inset-0 bg-linear-to-t from-[#f5f7fb] to-transparent transition-opacity duration-500 ${
              isDark ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>
      </main>
      <Footer isDark={isDark} />
    </div>
  )
}

export default Landing
