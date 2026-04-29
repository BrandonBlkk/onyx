import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'ATS Optimized',
    description: 'Every template is tested against major Applicant Tracking Systems. Your resume gets parsed perfectly, every time.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    tag: 'Core',
  },
  {
    title: 'Zinc-Themed Templates',
    description: 'Sleek, modern templates with the Zinc aesthetic - dark, clean, high-contrast. Designed for developers who value design.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
      </svg>
    ),
    tag: 'Design',
  },
  {
    title: 'Lightning Fast Exports',
    description: 'Generate pixel-perfect PDFs in under 2 seconds. One-click export to PDF, DOCX, or shareable link.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    tag: 'Speed',
  },
]

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

const FeatureGrid = ({ isDark = true }) => {
  const headingGradientClass = isDark
    ? 'bg-[linear-gradient(135deg,#e4e4e7_0%,#a1a1aa_50%,#71717a_100%)] bg-clip-text text-transparent'
    : 'bg-[linear-gradient(135deg,#0f172a_0%,#334155_50%,#64748b_100%)] bg-clip-text text-transparent'

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden" id="features">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full bg-accent-500/10 px-3 py-1 text-xs font-medium text-teal-600 ring-1 ring-accent-500/20 mb-4 select-none">
            Features
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
            Everything you need,<br />
            <span className={headingGradientClass}>nothing you do not.</span>
          </h2>
          <p className={`mx-auto max-w-lg text-sm sm:text-base ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Built with developer workflows in mind. Every feature exists for a reason.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`group relative rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
                isDark
                  ? 'border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-700/80 hover:bg-zinc-900/80'
                  : 'border-slate-200 bg-white/75 shadow-sm hover:border-slate-300 hover:bg-white'
              }`}
              id={`feature-card-${i}`}
            >
              <div className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                isDark ? 'bg-accent-500/2' : 'bg-accent-500/5'
              }`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border text-teal-600 transition-colors ${
                    isDark
                      ? 'bg-zinc-800 border-zinc-700/50 group-hover:border-accent-500/30'
                      : 'bg-slate-50 border-slate-200 group-hover:border-accent-500/30'
                  }`}>
                    {feature.icon}
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest ${
                    isDark
                      ? 'bg-zinc-800/60 text-zinc-500'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {feature.tag}
                  </span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 tracking-tight ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureGrid
