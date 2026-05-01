import { useState } from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import ActionCard from '../../components/dashboard/resumes/ActionCard'
import ResumeCard from '../../components/dashboard/resumes/ResumeCard'
import ResumesToolbar from '../../components/dashboard/resumes/ResumesToolbar'
import SectionHeader from '../../components/dashboard/resumes/SectionHeader'
import { actionCards, resumes, sortOptions } from '../../components/dashboard/resumes/resumeData'
import { pageNoiseClass } from '../../components/dashboard/resumes/resumeStyles'
import { useTheme } from '../../context/ThemeContext'

const Resumes = () => {
  const { isDark } = useTheme()
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [viewMode, setViewMode] = useState('grid')

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

        <main className="lg:ml-65 p-3">
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

              <div
                className={`gap-3 ${
                  viewMode === 'grid' ? 'grid md:grid-cols-2' : 'flex flex-col'
                }`}
              >
                {actionCards.map((card) => (
                  <ActionCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    badge={card.badge}
                    isDark={isDark}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </section>

            <section className="mt-5 pb-6">
              <SectionHeader
                isDark={isDark}
                eyebrow="Saved resumes"
                title="Continue editing the versions already in your library."
              />

              <div
                className={`gap-3 ${
                  viewMode === 'grid'
                    ? 'grid grid-cols-5'
                    : 'flex flex-col'
                }`}
              >
                {resumes.map((resume) => (
                  <ResumeCard
                    key={resume.title}
                    item={resume}
                    isDark={isDark}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Resumes
