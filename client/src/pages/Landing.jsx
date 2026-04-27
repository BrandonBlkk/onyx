import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import FeatureGrid from '../components/landing/FeatureGrid'
import LivePreview from '../components/landing/LivePreview'
import Footer from '../components/landing/Footer'
import MoveUpButton from '../components/MoveUpButton'

const Landing = () => {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      setIsAtBottom(isBottom)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main>
        {/* Top Gradient Overlay */}
        <div className="pointer-events-none fixed top-14 left-0 right-0 h-32 bg-linear-to-b from-zinc-950 to-transparent z-40" />
        
        <Hero />
        <HowItWorks />
        <FeatureGrid />
        <LivePreview />
        <MoveUpButton />
        
        {/* Bottom Gradient Overlay with Transition */}
        <div 
          className={`pointer-events-none fixed bottom-0 left-0 right-0 h-32 bg-linear-to-t from-zinc-950 to-transparent z-40 transition-opacity duration-300 ${
            isAtBottom ? 'opacity-0' : 'opacity-100'
          }`} 
        />
      </main>
      <Footer />
    </div>
  )
}

export default Landing