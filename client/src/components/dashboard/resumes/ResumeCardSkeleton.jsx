import { getInteractivePanelClass } from './resumeStyles'

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

export default ResumeCardSkeleton
