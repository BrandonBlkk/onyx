import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const steps = [
  {
    number: '01',
    title: 'Pick a Template',
    description:
      'Choose from our collection of ATS-optimized, developer-focused templates. Each one is battle-tested against real hiring systems.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Fill in the Details',
    description:
      'Add your experience, skills, and projects. Our editor auto-formats everything so you focus on content, not layout.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Export & Apply',
    description:
      'Download as a pixel-perfect PDF in seconds. Share with a link or export to DOCX - ready for any application portal.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
]

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const HowItWorks = ({ isDark = true }) => {
  const { t } = useLanguage()
  const headingGradientClass = isDark
    ? 'bg-[linear-gradient(135deg,#e4e4e7_0%,#a1a1aa_50%,#71717a_100%)] bg-clip-text text-transparent'
    : 'bg-[linear-gradient(135deg,#0f172a_0%,#334155_50%,#64748b_100%)] bg-clip-text text-transparent'

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/3 left-1/2 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] ${
          isDark ? 'bg-accent-500/3' : 'bg-accent-500/8'
        }`} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center rounded-full bg-accent-500/10 px-3 py-1 text-xs font-medium text-teal-600 ring-1 ring-accent-500/20 mb-4 select-none">
            {t('How It Works')}
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
            {t('Three steps to your')}
            <br />
            <span className={headingGradientClass}>{t('perfect resume.')}</span>
          </h2>
          <p className={`mx-auto max-w-md text-sm sm:text-base ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            {t('No sign-ups, no friction. Go from blank page to polished resume in minutes.')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.15 }}
          className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6"
        >
          <div className={`hidden md:block absolute top-7 left-[16.67%] right-[16.67%] h-px bg-linear-to-r ${
            isDark
              ? 'from-zinc-800 via-zinc-700 to-zinc-800'
              : 'from-slate-300 via-slate-200 to-slate-300'
          }`} />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative flex flex-col items-center text-center"
              id={`step-${i}`}
            >
              <div className="relative mb-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-teal-600 transition-colors duration-300 ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80'
                    : 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50'
                }`}>
                  <span className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold ${
                    isDark
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-400'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}>
                    {step.number}
                  </span>
                  {step.icon}
                </div>
              </div>

              <h3 className={`text-lg font-semibold mb-2 tracking-tight ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
                {t(step.title)}
              </h3>
              <p className={`max-w-xs text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                {t(step.description)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
