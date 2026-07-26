import ResumePreview from './ResumePreview'
import { ResumeCardActions } from './ResumeCardActions'
import {
  getInteractivePanelClass,
  getMutedTextClass,
  getStatusBadgeClass,
  getSubtleTextClass,
} from './resumeStyles'
import { useLanguage } from '../../../context/LanguageContext'
import { useState } from 'react'
import { toast } from 'sonner'

const ResumeCard = ({ item, isDark, viewMode, onFavorite, onRename, onDetails, onLock, onDelete, isLocking, isFavoriting }) => {
  const { t } = useLanguage()
  const [isShaking, setIsShaking] = useState(false)
  const handleFavorite = () => onFavorite?.(item)
  const handleRename = () => onRename?.(item)
  const handleDetails = () => onDetails?.(item)
  const handleLock = () => onLock?.(item)
  const handleDelete = () => {
    if (item.locked) {
      setIsShaking(true)
      toast.error('Unlock this resume before deleting it.')
      return
    }

    onDelete?.(item)
  }

  if (viewMode === 'list') {
    return (
      <article
        className={`group relative grid overflow-hidden rounded-md border backdrop-blur-xl sm:grid-cols-2 cursor-pointer ${isShaking ? 'animate-resume-shake' : ''} ${getInteractivePanelClass(isDark)}`}
        onAnimationEnd={() => setIsShaking(false)}
      >
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            isDark ? 'bg-accent-500/3' : 'bg-accent-500/5'
          }`}
        />
        <ResumeCardActions
          isDark={isDark}
          isLocked={item.locked}
          isLocking={isLocking}
          isFavorite={item.favorite}
          isFavoriting={isFavoriting}
          onFavorite={handleFavorite}
          onRename={handleRename}
          onDetails={handleDetails}
          onLock={handleLock}
          onDelete={handleDelete}
        />

        <div className="relative flex flex-col justify-center p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold tracking-tight sm:text-[15px]">{t(item.title)}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusBadgeClass(item.tone, isDark)}`}
            >
              {t(item.tone)}
            </span>
          </div>
          <p className={`mt-2 text-xs ${getMutedTextClass(isDark)}`}>{t(item.updated)}</p>

          <div className={`mt-3 flex flex-wrap gap-2 text-[10px] ${getSubtleTextClass(isDark)}`}>
            <span
              className={`rounded-full px-2.5 py-1 ${
                isDark ? 'bg-zinc-950/90 text-zinc-400' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {item.candidate}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 ${
                isDark ? 'bg-zinc-950/90 text-zinc-400' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {t(item.role)}
            </span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className={`group relative overflow-hidden rounded-md border backdrop-blur-xl hover:-translate-y-0.5 cursor-pointer ${isShaking ? 'animate-resume-shake' : ''} ${getInteractivePanelClass(isDark)}`}
      onAnimationEnd={() => setIsShaking(false)}
    >
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          isDark ? 'bg-accent-500/3' : 'bg-accent-500/5'
        }`}
      />
      <ResumeCardActions
        isDark={isDark}
        isLocked={item.locked}
        isLocking={isLocking}
        isFavorite={item.favorite}
        isFavoriting={isFavoriting}
        onFavorite={handleFavorite}
        onRename={handleRename}
        onDetails={handleDetails}
        onLock={handleLock}
        onDelete={handleDelete}
      />
      <div
        className={`relative flex h-67.5 items-start justify-center p-4 ${
          isDark ? 'bg-zinc-950/60' : 'bg-slate-50/80'
        }`}
      >
        <ResumePreview candidate={item.candidate} role={item.role} />
      </div>

      <div
        className={`relative space-y-1 border-t p-5 ${
          isDark ? 'border-zinc-800/80 bg-zinc-950/35' : 'border-slate-200 bg-white/60'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold tracking-tight sm:text-[15px]">{t(item.title)}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusBadgeClass(item.tone, isDark)}`}
          >
            {t(item.tone)}
          </span>
        </div>
        <p className={`text-xs ${getMutedTextClass(isDark)}`}>{t(item.updated)}</p>
      </div>
    </article>
  )
}

export default ResumeCard
