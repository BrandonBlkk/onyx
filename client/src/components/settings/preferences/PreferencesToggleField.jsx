const PreferencesToggleField = ({ label, description, name, checked, onChange, isDark }) => {
  const trackClass = checked
    ? 'bg-teal-500'
    : isDark
      ? 'bg-zinc-800'
      : 'bg-slate-300'

  return (
    <div
      className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 ${
        isDark ? 'border-zinc-800 bg-[#0d0d0e]/60' : 'border-slate-200 bg-[#fcfcfc]'
      }`}
    >
      <div className="min-w-0">
        <p className="text-[13px] font-medium">{label}</p>
        <p className={`mt-1 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(name, !checked)}
        className={`relative mt-1 inline-flex h-4.5 w-8 shrink-0 rounded-full transition-colors cursor-pointer ${trackClass}`}
      >
        <span
          className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export default PreferencesToggleField