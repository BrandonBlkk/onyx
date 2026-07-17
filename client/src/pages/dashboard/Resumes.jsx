import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import Sidebar from '../../components/dashboard/sidebar/Sidebar'
import ActionCard from '../../components/dashboard/resumes/ActionCard'
import ResumeCard from '../../components/dashboard/resumes/ResumeCard'
import ResumeFormModal from '../../components/dashboard/resumes/ResumeFormModal'
import ResumesToolbar from '../../components/dashboard/resumes/ResumesToolbar'
import SectionHeader from '../../components/dashboard/resumes/SectionHeader'
import PageContentTransition from '../../components/ui/PageContentTransition'
import { actionCards, sortOptions } from '../../components/dashboard/resumes/resumeData'
import { getInteractivePanelClass, pageNoiseClass } from '../../components/dashboard/resumes/resumeStyles'
import { useAuth } from '../../context/AuthContext'
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

const formatResumeCardData = (resume, user) => {
  const updatedAt = new Date(resume.updatedAt || resume.createdAt || Date.now())

  return {
    id: resume._id || resume.id || createResumeId(),
    title: resume.title || 'Untitled Resume',
    updated: formatResumeUpdated(updatedAt),
    candidate: user?.fullname || 'Onyx User',
    role: 'Resume Draft',
    tone: 'Draft',
    summary: resume.summary || '',
    sourceFileName: resume.file || null,
  }
}

const resumeSkeletonItems = ['resume-skeleton-1', 'resume-skeleton-2', 'resume-skeleton-3']

const ResumeCardSkeleton = ({ isDark, viewMode }) => {
  const skeletonClass = isDark ? 'bg-zinc-800/80' : 'bg-slate-200'
  const previewBorderClass = isDark ? 'border-zinc-800' : 'border-zinc-200'
  const previewBackgroundClass = isDark ? 'bg-zinc-950/60' : 'bg-slate-50/80'

  if (viewMode === 'list') {
    return (
      <article
        aria-hidden="true"
        className={`relative grid overflow-hidden rounded-md border backdrop-blur-xl sm:grid-cols-2 ${getInteractivePanelClass(isDark)}`}
      >
        <div className="relative flex flex-col justify-center p-4 sm:p-5">
          <div className="animate-pulse">
            <div className="flex items-center gap-2">
              <div className={`h-4 w-36 rounded ${skeletonClass}`} />
              <div className={`h-4 w-12 rounded-full ${skeletonClass}`} />
            </div>
            <div className={`mt-3 h-3 w-44 rounded ${skeletonClass}`} />
            <div className="mt-4 flex flex-wrap gap-2">
              <div className={`h-6 w-24 rounded-full ${skeletonClass}`} />
              <div className={`h-6 w-28 rounded-full ${skeletonClass}`} />
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      aria-hidden="true"
      className={`relative overflow-hidden rounded-md border backdrop-blur-xl ${getInteractivePanelClass(isDark)}`}
    >
      <div className={`relative flex h-67.5 items-start justify-center p-4 ${previewBackgroundClass}`}>
        <div className="h-full w-full animate-pulse overflow-hidden">
          <div className={`flex items-center gap-1.5 border-b px-3 py-2 ${previewBorderClass}`}>
            <div className={`h-2 w-2 rounded-full ${skeletonClass}`} />
            <div className={`h-2 w-2 rounded-full ${skeletonClass}`} />
            <div className={`h-2 w-2 rounded-full ${skeletonClass}`} />
            <div className={`ml-auto h-3 w-14 rounded-full ${skeletonClass}`} />
          </div>

          <div className="p-3">
            <div className={`mx-auto h-2.5 w-24 rounded ${skeletonClass}`} />
            <div className={`mx-auto mt-2 h-2 w-20 rounded ${skeletonClass}`} />
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="space-y-3">
                <div className={`h-2 w-16 rounded ${skeletonClass}`} />
                <div className={`h-2 w-full rounded ${skeletonClass}`} />
                <div className={`h-2 w-10/12 rounded ${skeletonClass}`} />
                <div className={`h-2 w-11/12 rounded ${skeletonClass}`} />
              </div>
              <div className="space-y-3">
                <div className={`h-2 w-20 rounded ${skeletonClass}`} />
                <div className={`h-2 w-full rounded ${skeletonClass}`} />
                <div className={`h-2 w-9/12 rounded ${skeletonClass}`} />
                <div className={`h-2 w-10/12 rounded ${skeletonClass}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative space-y-1 border-t p-5 ${
          isDark ? 'border-zinc-800/80 bg-zinc-950/35' : 'border-slate-200 bg-white/60'
        }`}
      >
        <div className="flex animate-pulse items-center justify-between gap-3">
          <div className={`h-4 w-32 rounded ${skeletonClass}`} />
          <div className={`h-4 w-12 rounded-full ${skeletonClass}`} />
        </div>
        <div className={`h-3 w-40 animate-pulse rounded ${skeletonClass}`} />
      </div>
    </article>
  )
}

const Resumes = () => {
  const { isDark } = useTheme()
  const { token, user } = useAuth()
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [viewMode, setViewMode] = useState('grid')
  const [resumeItems, setResumeItems] = useState([])
  const [isLoadingResumes, setIsLoadingResumes] = useState(Boolean(token))
  const [resumeLoadError, setResumeLoadError] = useState('')
  const [modalMode, setModalMode] = useState(null)
  const [formValues, setFormValues] = useState(createEmptyForm)
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!token) {
      setResumeItems([])
      setIsLoadingResumes(false)
      return
    }

    const controller = new AbortController()

    const loadResumes = async () => {
      setIsLoadingResumes(true)
      setResumeLoadError('')

      try {
        const response = await fetch('/onyx/api/resumes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })

        const data = await response.json().catch(() => [])

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load resumes right now.')
        }

        const resumes = Array.isArray(data) ? data : data.resumes

        if (!Array.isArray(resumes)) {
          throw new Error('Unable to load resumes right now.')
        }

        setResumeItems(resumes.map((resume) => formatResumeCardData(resume, user)))
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setResumeLoadError(error.message || 'Unable to load resumes right now.')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingResumes(false)
        }
      }
    }

    loadResumes()

    return () => controller.abort()
  }, [token, user])

  const openResumeModal = (mode) => {
    setModalMode(mode)
    setFormValues(createEmptyForm())
    setFormError('')
  }

  const closeResumeModal = () => {
    setModalMode(null)
    setFormValues(createEmptyForm())
    setFormError('')
    setIsSubmitting(false)
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

  const handleModalSubmit = async (event) => {
    event.preventDefault()

    const nextTitle = formValues.title.trim()
    const nextSummary = formValues.summary.trim()

    if (!nextTitle || (modalMode === 'create' && !nextSummary)) {
      setFormError('Complete the required fields before continuing.')
      return
    }

    if (modalMode === 'import' && !formValues.file) {
      setFormError('Select a resume file before importing.')
      return
    }

    if (modalMode === 'create') {
      if (!token) {
        setFormError('Please sign in before creating a resume.')
        return
      }

      setIsSubmitting(true)

      try {
        const response = await fetch('/onyx/api/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: nextTitle,
            summary: nextSummary,
          }),
        })

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(data.message || 'Unable to create resume right now.')
        }

        const updatedAt = new Date(data.updatedAt || data.createdAt || Date.now())

        setResumeItems((current) => [
          {
            id: data._id || data.id || createResumeId(),
            title: data.title || nextTitle,
            updated: formatResumeUpdated(updatedAt),
            candidate: user?.fullname || 'Onyx User',
            role: 'Resume Draft',
            tone: 'Draft',
            summary: data.summary || nextSummary,
            sourceFileName: data.file || null,
          },
          ...current,
        ])

        toast.success('Resume created successfully.')
        closeResumeModal()
      } catch (error) {
        const message = error.message || 'Unable to create resume right now.'
        setFormError(message)
        toast.error(message)
      } finally {
        setIsSubmitting(false)
      }

      return
    }

    const now = new Date()

    setResumeItems((current) => [
      {
        id: createResumeId(),
        title: nextTitle,
        updated: formatResumeUpdated(now),
        tone: modalMode === 'import' ? 'Polish' : 'Draft',
        summary: nextSummary,
        sourceFileName: formValues.file?.name ?? null,
      },
      ...current,
    ])

    closeResumeModal()
  }

  const resumeListMessage =
    resumeLoadError || (!resumeItems.length ? 'No resumes yet. Create your first resume to see it here.' : '')

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
                  {isLoadingResumes ? (
                    resumeSkeletonItems.map((item) => (
                      <ResumeCardSkeleton key={item} isDark={isDark} viewMode={viewMode} />
                    ))
                  ) : resumeListMessage ? (
                    <div className="flex min-h-67.5 w-full items-center justify-center md:col-span-3 xl:col-span-5">
                      <p  
                        className={`px-4 py-6 text-center text-zinc-400 text-xs`}
                      >
                        {resumeListMessage}
                      </p>
                    </div>
                  ) : (
                    resumeItems.map((resume) => (
                      <ResumeCard
                        key={resume.id}
                        item={resume}
                        isDark={isDark}
                        viewMode={viewMode}
                      />
                    ))
                  )}
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
            isSubmitting={isSubmitting}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Resumes
