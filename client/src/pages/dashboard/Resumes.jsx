import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from '../../components/dashboard/sidebar/Sidebar'
import ActionCard from '../../components/dashboard/resumes/ActionCard'
import ResumeCard from '../../components/dashboard/resumes/ResumeCard'
import ResumeFormModal from '../../components/dashboard/resumes/ResumeFormModal'
import ResumesToolbar from '../../components/dashboard/resumes/ResumesToolbar'
import SectionHeader from '../../components/dashboard/resumes/SectionHeader'
import PageContentTransition from '../../components/ui/PageContentTransition'
import { actionCards, resumes, sortOptions } from '../../components/dashboard/resumes/resumeData'
import { pageNoiseClass } from '../../components/dashboard/resumes/resumeStyles'
import { useTheme } from '../../context/ThemeContext'

const layoutSwitchTransition = {
  duration: 0.2,
  ease: 'easeOut',
}

const createEmptyForm = () => ({
  title: '',
  summary: '',
  file: null,
})

const formatResumeUpdated = (timestamp) =>
  `Last updated on ${new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(timestamp)}`

const createResumeId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `resume-${Date.now()}-${Math.round(Math.random() * 1_000_000)}`
}

const Resumes = () => {
  const { isDark } = useTheme()
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [viewMode, setViewMode] = useState('grid')
  const [resumeItems, setResumeItems] = useState(resumes)
  const [modalMode, setModalMode] = useState(null)
  const [formValues, setFormValues] = useState(createEmptyForm)
  const [formError, setFormError] = useState('')

  const openResumeModal = (mode) => {
    setModalMode(mode)
    setFormValues(createEmptyForm())
    setFormError('')
  }

  const closeResumeModal = () => {
    setModalMode(null)
    setFormValues(createEmptyForm())
    setFormError('')
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))

    if (formError) {
      setFormError('')
    }
  }

  const handleFileChange = (event) => {
    const nextFile = event.target.files?.[0] ?? null

    setFormValues((current) => ({
      ...current,
      file: nextFile,
      title:
        current.title || !nextFile
          ? current.title
          : nextFile.name.replace(/\.[^/.]+$/, ''),
    }))

    if (formError) {
      setFormError('')
    }
  }

  const handleModalSubmit = (event) => {
    event.preventDefault()

    const nextTitle = formValues.title.trim()

    if (!nextTitle) {
      setFormError('Complete the required fields before continuing.')
      return
    }

    if (modalMode === 'import' && !formValues.file) {
      setFormError('Select a resume file before importing.')
      return
    }

    const now = new Date()

    setResumeItems((current) => [
      {
        id: createResumeId(),
        title: nextTitle,
        updated: formatResumeUpdated(now),
        tone: modalMode === 'import' ? 'Polish' : 'Draft',
        summary: formValues.summary.trim(),
        sourceFileName: formValues.file?.name ?? null,
      },
      ...current,
    ])

    closeResumeModal()
  }

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${pageNoiseClass} ${
        isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-[#f5f7fb] text-slate-950'
      }`}
    >
      <div
        className={`pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full blur-[120px] ${
          isDark ? 'bg-accent-500/10' : 'bg-accent-500/12'
        }`}
      />
      <div
        className={`pointer-events-none absolute right-[8%] top-40 h-56 w-56 rounded-full blur-[110px] ${
          isDark ? 'bg-white/4' : 'bg-white/75'
        }`}
      />
      <div
        className={`pointer-events-none absolute left-[12%] bottom-24 h-64 w-64 rounded-full blur-[120px] ${
          isDark ? 'bg-teal-500/8' : 'bg-teal-500/10'
        }`}
      />

      <div className="relative z-10 min-h-screen">
        <Sidebar isDark={isDark} />

        <PageContentTransition className="overflow-x-hidden lg:ml-65 p-3">
          <div className="mx-auto max-w-420=">
            <ResumesToolbar
              isDark={isDark}
              sortBy={sortBy}
              onSortChange={setSortBy}
              sortOptions={sortOptions}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            <section className="mt-5">
              <SectionHeader
                isDark={isDark}
                eyebrow="Quick start"
                title="Choose how you want to begin your next resume."
              />

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`quick-start-${viewMode}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={layoutSwitchTransition}
                  className={`gap-3 ${
                    viewMode === 'grid' ? 'grid md:grid-cols-2' : 'flex flex-col'
                  }`}
                >
                  {actionCards.map((card) => (
                    <ActionCard
                      key={card.id}
                      title={card.title}
                      description={card.description}
                      icon={card.icon}
                      badge={card.badge}
                      isDark={isDark}
                      viewMode={viewMode}
                      onClick={() => openResumeModal(card.id)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </section>

            <section className="mt-5 pb-6">
              <SectionHeader
                isDark={isDark}
                eyebrow="Saved resumes"
                title="Continue editing the versions already in your library."
              />

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`saved-resumes-${viewMode}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                   transition={layoutSwitchTransition}
                  className={`gap-3 ${
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5'
                      : 'flex flex-col'
                  }`}
                >
                  {resumeItems.map((resume) => (
                    <ResumeCard
                      key={resume.id}
                      item={resume}
                      isDark={isDark}
                      viewMode={viewMode}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </section>
          </div>
        </PageContentTransition>
      </div>

      <AnimatePresence>
        {modalMode ? (
          <ResumeFormModal
            mode={modalMode}
            isDark={isDark}
            formValues={formValues}
            formError={formError}
            onChange={handleFormChange}
            onFileChange={handleFileChange}
            onClose={closeResumeModal}
            onSubmit={handleModalSubmit}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Resumes
