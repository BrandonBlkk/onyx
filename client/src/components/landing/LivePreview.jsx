import React from 'react'
import { motion } from 'framer-motion'

const LivePreview = ({ isDark = true }) => {
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
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
            See what you will build.
          </h2>
          <p className={`mx-auto max-w-lg text-sm sm:text-base ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            A pixel-perfect resume that is clean, professional, and ready for any ATS.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto max-w-3xl"
        >
          <div className={`absolute -inset-4 rounded-3xl blur-2xl pointer-events-none ${
            isDark ? 'bg-accent-500/6' : 'bg-accent-500/12'
          }`} />

          <div className={`relative rounded-2xl border p-2 backdrop-blur-md shadow-2xl transition-colors duration-500 ${
            isDark
              ? 'border-zinc-800/80 bg-zinc-900/40'
              : 'border-slate-200 bg-white/75'
          }`}>
            <div className={`flex items-center gap-2 border-b px-4 py-3 ${
              isDark ? 'border-zinc-800/60' : 'border-slate-200'
            }`}>
              <div className="flex gap-1.5">
                <div className={`h-3 w-3 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-slate-300'}`} />
                <div className={`h-3 w-3 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-slate-300'}`} />
                <div className={`h-3 w-3 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-slate-300'}`} />
              </div>
              <div className="flex-1 flex justify-center">
                <div className={`rounded-lg border px-4 py-1 text-xs font-mono ${
                  isDark
                    ? 'bg-zinc-800/80 border-zinc-700/50 text-zinc-500'
                    : 'bg-slate-100 border-slate-200 text-slate-500'
                }`}>
                  onyx.dev/preview
                </div>
              </div>
              <div className="w-12" />
            </div>

            <div className="bg-white rounded-b-xl p-8 sm:p-12">
              <div className="mb-8 border-b border-zinc-200 pb-6">
                <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">Sarah Chen</h3>
                <p className="mt-1 text-sm text-zinc-500">Senior Software Engineer</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
                  <span>san.francisco@email.com</span>
                  <span>github.com/schen</span>
                  <span>linkedin.com/in/schen</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">Experience</h4>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h5 className="text-sm font-semibold text-zinc-800">Senior Engineer - Stripe</h5>
                      <span className="ml-4 shrink-0 text-xs text-zinc-400">2022 - Present</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs leading-relaxed text-zinc-500">
                      <li>Led payments infra migration serving 50M+ daily transactions.</li>
                      <li>Reduced p99 latency by 40% through query optimization.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h5 className="text-sm font-semibold text-zinc-800">Software Engineer - Vercel</h5>
                      <span className="ml-4 shrink-0 text-xs text-zinc-400">2020 - 2022</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs leading-relaxed text-zinc-500">
                      <li>Built edge middleware used by 100K+ deployments.</li>
                      <li>Core contributor to Next.js build pipeline.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['TypeScript', 'React', 'Node.js', 'Go', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'].map((s) => (
                    <span key={s} className="rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`absolute -right-4 top-1/4 hidden rounded-xl border p-4 shadow-2xl backdrop-blur-md md:block sm:-right-12 ${
              isDark
                ? 'border-zinc-700/50 bg-zinc-800/60'
                : 'border-slate-200 bg-white/90'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-slate-700'}`}>ATS Score</p>
                <p className="text-lg font-bold text-green-500">98/100</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`absolute -left-4 bottom-1/4 hidden rounded-xl border p-4 shadow-2xl backdrop-blur-md md:block sm:-left-12 ${
              isDark
                ? 'border-zinc-700/50 bg-zinc-800/60'
                : 'border-slate-200 bg-white/90'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/20">
                <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <div>
                <p className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-slate-700'}`}>Export Speed</p>
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
