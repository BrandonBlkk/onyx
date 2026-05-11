import { getInteractivePanelClass, getMutedTextClass } from './resumeStyles'
import { useLanguage } from '../../../context/LanguageContext'

const ActionCard = ({ title, description, icon: Icon, badge, isDark, viewMode }) => {
  const { t } = useLanguage()

  if (viewMode === 'list') {
    return (
      <article
        className={`group relative grid overflow-hidden border backdrop-blur-xl sm:grid-cols-[160px_minmax(0,1fr)] cursor-pointer ${getInteractivePanelClass(isDark)}`}
      >
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            isDark ? 'bg-accent-500/3' : 'bg-accent-500/5'
          }`}
        />

        <div
          className={`relative flex items-center justify-center border-b p-4 sm:border-r sm:border-b-0 ${
            isDark
              ? 'border-zinc-800/70 bg-linear-to-br from-zinc-950 via-zinc-900/80 to-cyan-950/40 text-zinc-100'
              : 'border-slate-200 bg-linear-to-br from-white via-slate-50 to-cyan-50 text-slate-900'
          }`}
        >
          <div
            className='flex h-11 w-11 items-center justify-center'
          >
            <Icon className="h-5 w-5 text-teal-600" strokeWidth={1.7} />
          </div>
        </div>

        <div className="relative flex flex-col justify-center p-4 sm:p-5">
          <span
            className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${
              isDark
                ? 'border-zinc-800 bg-zinc-950/70 text-zinc-400'
                : 'border-slate-200 bg-white/80 text-slate-500'
            }`}
          >
            {t(badge)}
          </span>
          <h3 className="mt-3 text-sm font-semibold tracking-tight sm:text-[15px]">{t(title)}</h3>
          <p className={`mt-1.5 text-xs leading-relaxed ${getMutedTextClass(isDark)}`}>
            {t(description)}
          </p>
        </div>
      </article>
    )
  }

  return (
    <article
      className={`group relative overflow-hidden rounded-md border backdrop-blur-xl cursor-pointer ${getInteractivePanelClass(isDark)}`}
    >
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          isDark ? 'bg-accent-500/3' : 'bg-accent-500/5'
        }`}
      />

      <div className="relative flex items-start justify-between p-5">
        <div>
          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] select-none ${
              isDark
                ? 'border-zinc-800 bg-zinc-950/70 text-zinc-400'
                : 'border-slate-200 bg-white/85 text-slate-500'
            }`}
          >
            {t(badge)}
          </span>
          <h3 className="mt-4 text-sm font-semibold tracking-tight sm:text-[15px]">{t(title)}</h3>
          <p className={`mt-1.5 max-w-56 text-xs leading-relaxed ${getMutedTextClass(isDark)}`}>
            {t(description)}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center">
          <Icon className="h-5 w-5 text-teal-600" strokeWidth={1.7} />
        </div>
      </div>
    </article>
  )
}

export default ActionCard
