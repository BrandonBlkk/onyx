const ProfileField = ({
  label,
  name,
  type = 'text',
  defaultValue,
  helperText,
  isDark,
}) => {
  const labelClass = `text-[11px] font-semibold uppercase tracking-[0.18em] ${
    isDark ? 'text-zinc-400' : 'text-slate-500'
  }`

  const inputClass = `mt-2 w-full rounded-lg border px-3.5 py-2.5 text-[13px] outline-none transition-colors duration-200 ${
    isDark
      ? 'border-zinc-800 bg-[#0d0d0e] text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600'
      : 'border-slate-300 bg-[#fcfcfc] text-slate-950 placeholder:text-slate-400 focus:border-slate-400'
  }`

  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input name={name} type={type} defaultValue={defaultValue} className={inputClass} />
      {helperText && (
        <p className={`mt-2 inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium select-none ${
          isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
        }`}>
          {helperText}
        </p>
      )}
    </label>
  )
}

export default ProfileField
