import { useEffect, useEffectEvent } from 'react'
import { FileUp, Sparkles, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { getMutedTextClass, getPanelClass, getSubtleTextClass } from './resumeStyles'
import { useLanguage } from '../../../context/LanguageContext'

const getLabelClass = (isDark) =>
  `text-[11px] font-semibold uppercase tracking-[0.18em] ${
    isDark ? 'text-zinc-400' : 'text-slate-500'
  }`

const getFieldClass = (isDark) =>
  `mt-2 w-full rounded-lg border px-3.5 py-2.5 text-[13px] outline-none transition-colors duration-200 ${
    isDark
      ? 'border-zinc-800 bg-[#0d0d0e] text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600'
      : 'border-slate-300 bg-[#fcfcfc] text-slate-950 placeholder:text-slate-400 focus:border-slate-400'
  }`

const getUploadFieldClass = (isDark) =>
  `mt-2 block cursor-pointer rounded-xl border border-dashed px-4 py-3 transition-colors duration-200 ${
    isDark
      ? 'border-zinc-800 bg-[#0d0d0e]/60 hover:border-zinc-700'
      : 'border-slate-200 bg-[#fcfcfc] hover:border-slate-300'
  }`

const getSecondaryButtonClass = (isDark) =>
  `inline-flex items-center justify-center border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
    isDark
      ? 'border-zinc-800 bg-transparent text-zinc-300 hover:border-zinc-700'
      : 'border-slate-200 bg-transparent text-slate-700 hover:border-slate-300'
  }`

const getPrimaryButtonClass = (isDark) =>
  `inline-flex items-center justify-center border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
    isDark
      ? 'bg-white text-zinc-950 hover:bg-zinc-200'
      : 'border-slate-950 bg-slate-950 text-white hover:bg-slate-800 hover:border-slate-800'
  }`

const modalCopy = {
  create: {
    eyebrow: 'Start from scratch',
    title: 'Create a new resume',
    description:
      'Set the basics for this draft now, then keep building from a clean Onyx canvas.',
    noteLabel: 'Career summary',
    notePlaceholder: 'Add a short focus statement for this draft.',
    submitLabel: 'Create resume',
  },
  import: {
    eyebrow: 'Bring in a previous version',
    title: 'Import an existing resume',
    description:
      'Upload a past resume, organize the basics, and keep polishing it inside your workspace.',
    noteLabel: 'Import notes',
    notePlaceholder: 'Share what you want to revise first after the import.',
    submitLabel: 'Import resume',
  },
}

const ResumeFormModal = ({
  mode,
  isDark,
  formValues,
  formError,
  onChange,
  onFileChange,
  onClose,
  onSubmit,
}) => {
  const { t } = useLanguage()
  const copy = modalCopy[mode]
  const isImport = mode === 'import'

  const handleClose = useEffectEvent(() => {
    onClose()
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label={t('Close modal')}
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`resume-form-title-${mode}`}
        aria-describedby={`resume-form-description-${mode}`}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
        className={`relative w-full max-w-2xl overflow-hidden rounded-md border ${getPanelClass(isDark)}`}
      >
        <div className={`relative p-4 sm:p-5 ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] select-none ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-950 text-zinc-400'
                    : 'border-slate-200 bg-white text-slate-500'
                }`}
              >
                {isImport ? (
                  <FileUp className="h-3.5 w-3.5 text-teal-600" strokeWidth={1.8} />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 text-teal-600" strokeWidth={1.8} />
                )}
                {t(copy.eyebrow)}
              </span>

              <h2
                id={`resume-form-title-${mode}`}
                className="mt-3 text-lg font-semibold tracking-tight"
              >
                {t(copy.title)}
              </h2>
              <p
                id={`resume-form-description-${mode}`}
                className={`mt-1.5 max-w-xl text-xs leading-relaxed ${getMutedTextClass(isDark)}`}
              >
                {t(copy.description)}
              </p>
            </div>

            <button
              type="button"
              aria-label={t('Close modal')}
              onClick={onClose}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                isDark
                  ? 'border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
                  : 'border-slate-200 bg-white/90 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <X className="h-4.5 w-4.5" strokeWidth={1.9} />
            </button>
          </div>

          <form
            onSubmit={onSubmit}
            className={`mt-5 border-t pt-5 space-y-4 ${
              isDark ? 'border-zinc-800/80' : 'border-slate-200'
            }`}
          >
            {!isImport ? (
              <label className="block">
                <span className={getLabelClass(isDark)}>{t('Resume title')}</span>
                <input
                  autoFocus
                  required
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={onChange}
                  placeholder={t('Tell us what this resume should be called.')}
                  className={getFieldClass(isDark)}
                />
              </label>
            ) : null}

            {!isImport ? (
              <label className="block">
                <span className={getLabelClass(isDark)}>{t(copy.noteLabel)}</span>
                <textarea
                  rows={4}
                  name="summary"
                  value={formValues.summary}
                  onChange={onChange}
                  placeholder={t(copy.notePlaceholder)}
                  className={`${getFieldClass(isDark)} min-h-26 resize-none`}
                />
              </label>
            ) : null}

            {isImport ? (
              <label className="block">
                <span className={getLabelClass(isDark)}>{t('Upload resume file')}</span>
                <span className={getUploadFieldClass(isDark)}>
                  <input
                    type="file"
                    accept=".json,.pdf,.doc,.docx"
                    onChange={onFileChange}
                    className="sr-only"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium">
                        {formValues.file
                          ? formValues.file.name
                          : t('Choose a JSON, PDF, or DOCX file from your device.')}
                      </p>
                      <p className={`mt-1 text-xs ${getSubtleTextClass(isDark)}`}>
                        {formValues.file
                          ? t('Click here to replace the selected file.')
                          : t('Accepted formats: JSON, PDF, DOC, DOCX.')}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                        isDark
                          ? 'border-zinc-800 bg-zinc-900 text-zinc-300'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {t(formValues.file ? 'Replace file' : 'Choose file')}
                    </span>
                  </div>
                </span>
              </label>
            ) : null}

            {formError ? <p className="text-sm text-rose-500">{t(formError)}</p> : null}

            <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end select-none">
              <button
                type="button"
                onClick={onClose}
                className={getSecondaryButtonClass(isDark)}
              >
                {t('Cancel')}
              </button>
              <button type="submit" className={getPrimaryButtonClass(isDark)}>
                {t(copy.submitLabel)}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ResumeFormModal
