import { getSubtleTextClass } from './resumeStyles'

const SectionHeader = ({ isDark, eyebrow, title }) => (
  <div className="mb-3">
    <p className={`text-[10px] uppercase tracking-[0.22em] ${getSubtleTextClass(isDark)}`}>
      {eyebrow}
    </p>
    <h2 className="mt-1 text-sm font-semibold tracking-tight">{title}</h2>
  </div>
)

export default SectionHeader
