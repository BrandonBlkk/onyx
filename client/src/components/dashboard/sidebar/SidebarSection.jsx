import SidebarLink from './SidebarLink'
import { useLanguage } from '../../../context/LanguageContext'

const SidebarSection = ({ title, items, isDark }) => {
  const { t } = useLanguage()

  return (
    <section>
      <p
        className={`px-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] ${
          isDark ? 'text-zinc-500' : 'text-slate-400'
        }`}
      >
        {t(title)}
      </p>

      <div className="mt-3 space-y-1.5 select-none">
        {items.map((item) => (
          <SidebarLink key={item.label} item={item} isDark={isDark} />
        ))}
      </div>
    </section>
  )
}

export default SidebarSection
