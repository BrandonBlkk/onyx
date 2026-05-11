const PreferencesSection = ({ title, description, children, isDark }) => {
  return (
    <section
      className={`rounded-md border p-4 sm:p-5 ${
        isDark ? 'border-zinc-800 bg-zinc-950/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="mb-4">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        <p className={`mt-1 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
          {description}
        </p>
      </div>

      {children}
    </section>
  )
}

export default PreferencesSection
