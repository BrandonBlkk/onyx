import React from 'react'
import { motion } from 'framer-motion'

const LivePreview = () => {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden" id="preview">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full bg-accent-500/10 px-3 py-1 text-xs font-medium text-teal-600 ring-1 ring-accent-500/20 mb-4">
            Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
            See what you'll build.
          </h2>
          <p className="mx-auto max-w-lg text-zinc-400 text-sm sm:text-base">
            A pixel-perfect resume that's clean, professional, and ready for any ATS.
          </p>
        </motion.div>

        {/* Resume Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto max-w-3xl"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-accent-500/4rounded-3xl blur-2xl pointer-events-none" />

          {/* Glass Container */}
          <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md p-2 shadow-2xl">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="rounded-lg bg-zinc-800/80 border border-zinc-700/50 px-4 py-1 text-xs text-zinc-500 font-mono">
                  onyx.dev/preview
                </div>
              </div>
              <div className="w-12" />
            </div>

            {/* Resume Content */}
            <div className="bg-white rounded-b-xl p-8 sm:p-12">
              {/* Header */}
              <div className="mb-8 border-b border-zinc-200 pb-6">
                <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">Sarah Chen</h3>
                <p className="text-sm text-zinc-500 mt-1">Senior Software Engineer</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-zinc-400">
                  <span>san.francisco@email.com</span>
                  <span>github.com/schen</span>
                  <span>linkedin.com/in/schen</span>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Experience</h4>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h5 className="text-sm font-semibold text-zinc-800">Senior Engineer — Stripe</h5>
                      <span className="text-xs text-zinc-400 shrink-0 ml-4">2022 – Present</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-zinc-500 leading-relaxed">
                      <li className="flex gap-2"><span className="text-zinc-300 mt-0.5">▸</span> Led payments infra migration serving 50M+ daily transactions</li>
                      <li className="flex gap-2"><span className="text-zinc-300 mt-0.5">▸</span> Reduced p99 latency by 40% through query optimization</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h5 className="text-sm font-semibold text-zinc-800">Software Engineer — Vercel</h5>
                      <span className="text-xs text-zinc-400 shrink-0 ml-4">2020 – 2022</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-zinc-500 leading-relaxed">
                      <li className="flex gap-2"><span className="text-zinc-300 mt-0.5">▸</span> Built edge middleware used by 100K+ deployments</li>
                      <li className="flex gap-2"><span className="text-zinc-300 mt-0.5">▸</span> Core contributor to Next.js build pipeline</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['TypeScript', 'React', 'Node.js', 'Go', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'].map((s) => (
                    <span key={s} className="rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600 border border-zinc-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Glassmorphism Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -right-4 sm:-right-12 top-1/4 rounded-xl border border-zinc-700/50 bg-zinc-800/60 backdrop-blur-md p-4 shadow-2xl hidden md:block"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-200">ATS Score</p>
                <p className="text-lg font-bold text-green-400">98/100</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -left-4 sm:-left-12 bottom-1/4 rounded-xl border border-zinc-700/50 bg-zinc-800/60 backdrop-blur-md p-4 shadow-2xl hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-accent-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-200">Export Speed</p>
                <p className="text-lg font-bold text-teal-600">1.2s</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default LivePreview
