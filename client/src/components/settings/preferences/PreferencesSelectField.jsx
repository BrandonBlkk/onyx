import { useLanguage } from '../../../context/LanguageContext'

const PreferencesSelectField = ({ label, description, name, value, options, onChange, isDark }) => {
  const { t } = useLanguage()

  return (
    <label
      className={`flex flex-col gap-3 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
        isDark ? 'border-zinc-800 bg-[#0d0d0e]/60' : 'border-slate-200 bg-[#fcfcfc]'
      }`}
    >
      <div className="min-w-0">
        <p className="text-[13px] font-medium">{t(label)}</p>
        <p className={`mt-1 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
          {t(description)}
        </p>
      </div>

      <select
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className={`w-full rounded-lg border px-3 py-2 text-[13px] outline-none transition-colors sm:w-52 select-none cursor-pointer ${
          isDark
            ? 'border-zinc-800 bg-[#0d0d0e] text-zinc-100 focus:border-zinc-600'
            : 'border-slate-300 bg-[#fcfcfc] text-slate-950 focus:border-slate-400'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </label>
  )
}

export default PreferencesSelectField
