import { motion } from 'framer-motion'
import { ChevronDown, FileText, Folder, Lock, Unlock, X } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'
import ResumePreview from './ResumePreview'

const formatResumeDate = (value) => {
  if (!value) return 'Not available'

  const displayedDate =
    typeof value === 'string'
      ? value.match(/[A-Z][a-z]+ \d{1,2}, \d{4}/)?.[0] || value
      : value
  const date = new Date(displayedDate)

  if (Number.isNaN(date.getTime())) return 'Not available'

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'U'

const DetailRow = ({ label, value, icon, isDark }) => (
  <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-4 py-1.5">
    <dt className={`text-[13px] font-semibold ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
      {label}
    </dt>
    <dd
      className={`flex min-w-0 items-center justify-end gap-2 text-right text-[13px] ${
        isDark ? 'text-zinc-400' : 'text-slate-600'
      }`}
    >
      {icon}
      <span className="min-w-0 wrap-break-word">{value}</span>
    </dd>
  </div>
)

const ResumeDetailsDrawer = ({ resume, isDark, onClose }) => {
  const { t } = useLanguage()
  const panelClass = isDark ? 'border-zinc-800 bg-zinc-900/55' : 'border-slate-200 bg-white'
  const accessIconClass = 'h-4 w-4 shrink-0'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <button
        type="button"
        aria-label="Close resume details"
        className="absolute inset-0 bg-zinc-950/45"
        onClick={onClose}
      />

      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-details-title"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className={`relative flex h-full w-full max-w-105 flex-col overflow-hidden border-l shadow-2xl ${
          isDark
            ? 'border-zinc-800 bg-zinc-950 text-zinc-100 shadow-black/30'
            : 'border-slate-200 bg-slate-50 text-slate-950 shadow-slate-300/40'
        }`}
      >
        <header
          className={`flex min-h-16 items-center justify-between gap-4 border-b px-4 ${
            isDark ? 'border-zinc-800 bg-zinc-950' : 'border-slate-200 bg-white'
          }`}
        >
          <h2 id="resume-details-title" className="min-w-0 truncate text-base font-semibold">
            {t(resume.title)}
          </h2>
          <button
            type="button"
            aria-label="Close resume details"
            title="Close"
            onClick={onClose}
            className={`shrink-0 rounded-md p-2 transition-colors cursor-pointer ${
              isDark
                ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <section
            aria-label={t('Resume preview')}
            className={`flex h-55 items-start justify-center overflow-hidden rounded-lg border px-10 pt-4 ${
              isDark ? 'border-zinc-800 bg-zinc-900' : 'border-slate-200 bg-slate-100'
            }`}
          >
            <div className="h-68 w-52 shrink-0 bg-white shadow-sm ring-1 ring-black/5">
              <ResumePreview candidate={resume.candidate} role={resume.role} />
            </div>
          </section>

          <section className={`rounded-lg border p-4 ${panelClass}`}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-semibold">{t('People with access')}</h3>
              <div
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  isDark ? 'text-zinc-400' : 'text-slate-600'
                }`}
              >
                {resume.locked ? (
                  <Lock className={accessIconClass} />
                ) : (
                  <Unlock className={accessIconClass} />
                )}
                <span>{t(resume.locked ? 'Locked' : 'Unlocked')}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div
                title={resume.candidate}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold select-none ${
                  isDark ? 'bg-zinc-800 text-zinc-200' : 'bg-slate-900 text-white'
                }`}
              >
                {getInitials(resume.candidate)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">{resume.candidate}</p>
                <p className={`mt-0.5 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  {t('Owner')}
                </p>
              </div>
            </div>
          </section>

          <div className={`group rounded-lg border ${panelClass}`}>
            <summary className="flex list-none items-center justify-between px-4 py-4">
              <span className="text-sm font-semibold">{t('Details')}</span>
            </summary>

            <div className="px-4 pb-4">
              <DetailRow label={t('Status')} value={t(resume.tone)} isDark={isDark} />
              <DetailRow
                label={t('Page size')}
                value={resume.pageSize === 'letter' ? 'US Letter' : 'A4'}
                isDark={isDark}
              />
              <DetailRow
                label={t('Date modified')}
                value={formatResumeDate(resume.updated)}
                isDark={isDark}
              />
              <DetailRow
                label={t('Date created')}
                value={formatResumeDate(resume.created)}
                isDark={isDark}
              />

              <div className={`mt-3 border-t pt-4 ${isDark ? 'border-zinc-800' : 'border-slate-200'}`}>
                <dt className="text-[13px] font-semibold">{t('Summary')}</dt>
                <dd
                  className={`mt-2 text-[13px] leading-5 ${
                    isDark ? 'text-zinc-400' : 'text-slate-600'
                  }`}
                >
                  {resume.summary || t('No summary added.')}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  )
}

export default ResumeDetailsDrawer
