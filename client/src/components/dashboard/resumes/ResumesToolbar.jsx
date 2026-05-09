import { ChevronDown, LayoutGrid, List, Search } from 'lucide-react'
import { getPanelClass, getSubtleTextClass } from './resumeStyles'

const ResumesToolbar = ({
  isDark,
  sortBy,
  onSortChange,
  sortOptions,
  viewMode,
  onViewModeChange,
}) => (
  <div className={`rounded-md border p-4 backdrop-blur-xl ${getPanelClass(isDark)}`}>
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
        <label
          className={`flex w-full max-w-md items-center gap-3 rounded-md border px-3.5 py-2.5 ${
            isDark
              ? 'border-zinc-800 bg-zinc-950/80'
              : 'border-slate-200 bg-white/85'
          }`}
        >
          <Search className={`h-4 w-4 ${getSubtleTextClass(isDark)}`} />
          <input
            type="text"
            placeholder="Search resumes"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-inherit"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${getSubtleTextClass(isDark)}`}
          >
            Sort
          </span>

          <label className="relative">
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className={`appearance-none rounded-md border px-3.5 py-2.5 pr-9 text-[13px] outline-none transition-colors select-none ${
                isDark
                  ? 'border-zinc-800 bg-zinc-950/80 text-white'
                  : 'border-slate-200 bg-white/85 text-slate-950'
              }`}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${getSubtleTextClass(isDark)}`}
            />
          </label>
        </div>
      </div>

      <div
        className={`inline-flex w-fit rounded-md border p-1 select-none ${
          isDark
            ? 'border-zinc-800 bg-zinc-950/70'
            : 'border-slate-200 bg-white/80'
        }`}
      >
        <button
          type="button"
          onClick={() => onViewModeChange('grid')}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
            viewMode === 'grid'
              ? isDark
                ? 'bg-white text-zinc-900'
                : 'bg-slate-900 text-white'
              : isDark
                ? 'text-zinc-400'
                : 'text-slate-500'
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          Grid
        </button>

        <button
          type="button"
          onClick={() => onViewModeChange('list')}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
            viewMode === 'list'
              ? isDark
                ? 'bg-white text-zinc-900'
                : 'bg-slate-900 text-white'
              : isDark
                ? 'text-zinc-400'
                : 'text-slate-500'
          }`}
        >
          <List className="h-4 w-4" />
          List
        </button>
      </div>
    </div>
  </div>
)

export default ResumesToolbar
