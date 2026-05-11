import { getSubtleTextClass } from './resumeStyles'
import { useLanguage } from '../../../context/LanguageContext'

const SectionHeader = ({ isDark, eyebrow, title }) => {
  const { t } = useLanguage()

  return (
    <div className="mb-3">
      <p className={`text-[10px] uppercase tracking-[0.22em] ${getSubtleTextClass(isDark)}`}>
        {t(eyebrow)}
      </p>
      <h2 className="mt-1 text-sm font-semibold tracking-tight">{t(title)}</h2>
    </div>
  )
}

export default SectionHeader
