import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import Sidebar from '../../components/dashboard/sidebar/Sidebar'
import ActionCard from '../../components/dashboard/resumes/ActionCard'
import ResumeCard from '../../components/dashboard/resumes/ResumeCard'
import ResumeCardSkeleton from '../../components/dashboard/resumes/ResumeCardSkeleton'
import ResumeDetailsDrawer from '../../components/dashboard/resumes/ResumeDetailsDrawer'
import ResumeFormModal from '../../components/dashboard/resumes/ResumeFormModal'
import ResumesToolbar from '../../components/dashboard/resumes/ResumesToolbar'
import SectionHeader from '../../components/dashboard/resumes/SectionHeader'
import PageContentTransition from '../../components/ui/PageContentTransition'
import { actionCards, sortOptions } from '../../components/dashboard/resumes/resumeData'
import { pageNoiseClass } from '../../components/dashboard/resumes/resumeStyles'
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

const resumeSortValues = {
  'Last Updated': 'updated',
  Name: 'name',
  'Recently Created': 'created',
}

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
    created: resume.createdAt,
    updated: formatResumeUpdated(updatedAt),
    candidate: user?.fullname || 'Onyx User',
    tone: resume.tone || '',
    summary: resume.summary || '',
    sourceFileName: resume.file || null,
    locked: Boolean(resume.locked),
  }
}

const resumeSkeletonItems = ['resume-skeleton-1', 'resume-skeleton-2', 'resume-skeleton-3']

const Resumes = () => {
  const { isDark } = useTheme()
  const { token, user } = useAuth()
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [resumeItems, setResumeItems] = useState([])
  const [isLoadingResumes, setIsLoadingResumes] = useState(Boolean(token))
  const [resumeLoadError, setResumeLoadError] = useState('')
  const [modalMode, setModalMode] = useState(null)
  const [formValues, setFormValues] = useState(createEmptyForm)
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [renamingResume, setRenamingResume] = useState(null)
  const [renameTitle, setRenameTitle] = useState('')
  const [renameError, setRenameError] = useState('')
  const [isRenaming, setIsRenaming] = useState(false)
  const [lockingResumeId, setLockingResumeId] = useState(null)
  const [detailsResume, setDetailsResume] = useState(null)
  const normalizedSearchQuery = searchQuery.trim()

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
        const sortQuery = new URLSearchParams({
          sort: resumeSortValues[sortBy] || resumeSortValues['Last Updated'],
        }).toString()
        const resumesPath = normalizedSearchQuery
          ? `/onyx/api/resumes/search/${encodeURIComponent(normalizedSearchQuery)}`
          : '/onyx/api/resumes'
        const resumesUrl = `${resumesPath}?${sortQuery}`

        const response = await fetch(resumesUrl, {
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
  }, [token, user, normalizedSearchQuery, sortBy])

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

  const closeRenameModal = () => {
    setRenamingResume(null)
    setRenameTitle('')
    setRenameError('')
    setIsRenaming(false)
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
            locked: Boolean(data.locked),
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
        locked: false,
      },
      ...current,
    ])

    closeResumeModal()
  }

  const handleRenameResume = (resume) => {
    if (!token) {
      toast.error('Please sign in before renaming a resume.')
      return
    }

    setRenamingResume(resume)
    setRenameTitle(resume.title)
    setRenameError('')
  }

  const handleDeleteResume = async (resume) => {
    if (!token) {
      toast.error('Please sign in before deleting a resume.')
      return
    }

    try {
      const response = await fetch(`/onyx/api/resumes/${encodeURIComponent(resume.id)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete resume right now.')
      }

       ((current) => current.filter((item) => item.id !== resume.id))
      toast.success('Resume deleted successfully.')
    } catch (error) {
      const message = error.message || 'Unable to delete resume right now.'
      toast.error(message)
    }
  }

  const handleShowResumeDetails = (resume) => {
    setDetailsResume(resume)
  }

  const closeResumeDetails = () => {
    setDetailsResume(null)
  }

  const handleRenameSubmit = async (event) => {
    event.preventDefault()

    if (!renamingResume) {
      return
    }

    const nextTitle = renameTitle.trim()

    if (!nextTitle) {
      setRenameError('Resume title is required.')
      return
    }

    if (nextTitle === renamingResume.title) {
      closeRenameModal()
      return
    }

    try {
      setIsRenaming(true)

      const response = await fetch(`/onyx/api/resumes/${encodeURIComponent(renamingResume.id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: nextTitle }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to rename resume right now.')
      }

      const updatedAt = new Date(data.updatedAt || Date.now())

      setResumeItems((current) =>
        current.map((item) =>
          item.id === renamingResume.id
            ? {
                ...item,
                title: data.title || nextTitle,
                updated: formatResumeUpdated(updatedAt),
                summary: data.summary ?? item.summary,
                sourceFileName: data.file ?? item.sourceFileName,
              }
            : item
        )
      )

      toast.success('Resume renamed successfully.')
      closeRenameModal()
    } catch (error) {
      const message = error.message || 'Unable to rename resume right now.'
      setRenameError(message)
      toast.error(message)
    } finally {
      setIsRenaming(false)
    }
  }
  
  const handleLockResume = async (resume) => {
    if (!token) {
      toast.error('Please sign in before locking a resume.')
      return
    }

    if (!resume || lockingResumeId === resume.id) {
      return
    }

    const nextLocked = !resume.locked

    try {
      setLockingResumeId(resume.id)

      const response = await fetch(`/onyx/api/resumes/${encodeURIComponent(resume.id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ locked: nextLocked }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || `Unable to ${nextLocked ? 'lock' : 'unlock'} resume right now.`)
      }

      setResumeItems((current) =>
        current.map((item) =>
          item.id === resume.id
            ? {
                ...item,
                title: data.title || item.title,
                summary: data.summary ?? item.summary,
                sourceFileName: data.file ?? item.sourceFileName,
                locked: Boolean(data.locked ?? nextLocked),
              }
            : item
        )
      )

      toast.success(nextLocked ? 'Resume locked successfully.' : 'Resume unlocked successfully.')
    } catch (error) {
      const message = error.message || `Unable to ${nextLocked ? 'lock' : 'unlock'} resume right now.`
      toast.error(message)
    } finally {
      setLockingResumeId(null)
    }
  }

  const resumeListMessage =
    resumeLoadError ||
    (!resumeItems.length
      ? normalizedSearchQuery
        ? 'No resumes match your search.'
        : 'No resumes yet. Create your first resume to see it here.'
      : '')

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
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
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
                        onRename={handleRenameResume}
                        onDetails={handleShowResumeDetails}
                        onLock={handleLockResume}
                        isLocking={lockingResumeId === resume.id}
                        onDelete={handleDeleteResume}
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

      <AnimatePresence>
        {detailsResume ? (
          <ResumeDetailsDrawer
            resume={detailsResume}
            isDark={isDark}
            onClose={closeResumeDetails}
          />
        ) : null}
      </AnimatePresence>

      {/* Rename modal */}
      <AnimatePresence>
        {renamingResume ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close rename form"
              className="absolute inset-0 bg-zinc-950/70"
              onClick={closeRenameModal}
            />

            <motion.form
              role="dialog"
              aria-modal="true"
              aria-labelledby="rename-resume-title"
              onSubmit={handleRenameSubmit}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`relative w-full max-w-md rounded-md border p-5 ${
                isDark
                  ? 'border-zinc-800 bg-zinc-950 text-zinc-100 shadow-black/30'
                  : 'border-slate-200 bg-white text-slate-950 shadow-slate-200/70'
              }`}
            >
              <h2 id="rename-resume-title" className="text-base font-semibold tracking-tight">
                Rename resume
              </h2>

              <label className="mt-5 block">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    isDark ? 'text-zinc-400' : 'text-slate-500'
                  }`}
                >
                  Resume title
                </span>
                <input
                  autoFocus
                  type="text"
                  value={renameTitle}
                  onChange={(event) => {
                    setRenameTitle(event.target.value)
                    if (renameError) {
                      setRenameError('')
                    }
                  }}
                  className={`mt-2 w-full rounded-md border px-3.5 py-2.5 text-[13px] outline-none transition-colors ${
                    isDark
                      ? 'border-zinc-800 bg-[#0d0d0e] text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600'
                      : 'border-slate-300 bg-[#fcfcfc] text-slate-950 placeholder:text-slate-400 focus:border-slate-400'
                  }`}
                />
              </label>

              {renameError ? <p className="mt-3 text-xs text-rose-500">{renameError}</p> : null}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeRenameModal}
                  className={`inline-flex items-center justify-center border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                    isDark
                      ? 'border-zinc-800 bg-transparent text-zinc-300 hover:border-zinc-700'
                      : 'border-slate-200 bg-transparent text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRenaming}
                  className={`inline-flex items-center justify-center border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                    isDark
                      ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                      : 'border-slate-950 bg-slate-950 text-white hover:bg-slate-800 hover:border-slate-800'
                  }`}
                >
                  {isRenaming ? 
                  (
                    <>
                      <div 
                        id="submitSpinner" 
                        className="w-5 h-5 border-t-2 border-current rounded-full animate-spin mr-2" 
                      />
                      <span>Renaming...</span>
                    </>
                  ) : 
                  (
                    'Rename resume'
                  )
                  }
                </button>
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Resumes
