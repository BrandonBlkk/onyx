const DangerZonePanel = ({ title, description, children, isDark, tone = 'default' }) => {
  const toneClass =
    tone === 'danger'
      ? isDark
        ? 'border-red-950 bg-red-950/10'
        : 'border-red-200 bg-red-50/70'
      : isDark
        ? 'border-zinc-800 bg-zinc-950/70'
        : 'border-slate-200 bg-white'

  return (
    <section className={`rounded-md border p-4 sm:p-5 ${toneClass}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-sm font-semibold tracking-tight">{title}</h2>}
          {description && (
            <p className={`mt-1 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  )
}

export default DangerZonePanel
