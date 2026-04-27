import React from 'react'
import { motion } from 'framer-motion'

const headingGradientClass =
  'bg-[linear-gradient(135deg,#e4e4e7_0%,#a1a1aa_50%,#71717a_100%)] bg-clip-text text-transparent'

const primaryButtonGlowClass =
  'hover:shadow-[0_0_30px_oklch(0.68_0.174_252_/_0.4),0_0_80px_oklch(0.68_0.174_252_/_0.15),0_0_120px_oklch(0.68_0.174_252_/_0.05)]'

const heroFloatCardClass =
  "relative overflow-hidden rounded-3xl border border-zinc-700/50 [background:radial-gradient(circle_at_top_right,oklch(0.68_0.174_252_/_0.14),transparent_34%),linear-gradient(180deg,rgb(24_24_27_/_0.78),rgb(9_9_11_/_0.56))] shadow-[0_28px_80px_rgb(0_0_0_/_0.4),inset_0_1px_0_rgb(255_255_255_/_0.05)] backdrop-blur-[18px] before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.08),transparent_32%,transparent_70%,rgb(20_184_166_/_0.07))] before:opacity-75"

const Hero = () => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:content-[''] before:bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_256_256%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27noise%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.9%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%2523noise)%27_opacity=%270.02%27/%3E%3C/svg%3E')]"
      id="hero"
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          // Define variables for easy tweaking
          '--ring-color': '255, 255, 255',
          backgroundImage: `
            radial-gradient(circle at center, transparent 30%, rgba(var(--ring-color), 0.08) 35%, transparent 36%),
            radial-gradient(circle at center, transparent 38%, rgba(var(--ring-color), 0.05) 43%, transparent 44%),
            radial-gradient(circle at center, transparent 50%, rgba(var(--ring-color), 0.03) 65%, transparent 66%)
          `,
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 85%)",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 85%)"
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-152 w-152 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute left-[12%] top-[16%] h-40 w-40 rounded-full bg-white/4 blur-[90px] pointer-events-none" />
      <div className="absolute right-[10%] top-24 h-72 w-72 rounded-full bg-accent-500/8 blur-[90px] pointer-events-none" />
      <div className="absolute left-[14%] bottom-[18%] h-56 w-56 rounded-full bg-teal-500/6 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-24 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
          </span>
          <span className="text-xs font-medium text-zinc-400 tracking-wide">
            Now in Public Beta
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-zinc-100">Craft a Resume</span>
          <br />
          <span className={headingGradientClass}>that really Stands Out.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto max-w-xl text-base text-zinc-400 leading-relaxed mb-10"
        >
          Built for everyone. Clean, ATS-friendly, and professional.
          <br className="hidden sm:block" />
          Stand out to recruiters with a resume that speaks your language.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 select-none"
        >
          <a
            href="#"
            className={`group relative inline-flex items-center gap-2.5 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-200 active:scale-[0.97] ${primaryButtonGlowClass}`}
            id="hero-cta"
          >
            Build Your Resume
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#preview"
            className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/50 px-7 py-3.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-zinc-800/80 hover:text-zinc-100 hover:border-zinc-700"
            id="hero-preview-link"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            See Preview
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-zinc-500"
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
            </svg>
            ATS Verified
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
            </svg>
            Privacy First
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
            </svg>
            4.9/5 Rating
          </span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  )
}

export default Hero
