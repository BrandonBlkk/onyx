import SidebarLink from './SidebarLink'

const SidebarSection = ({ title, items, isDark }) => (
  <section>
    <p
      className={`px-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] ${
        isDark ? 'text-zinc-500' : 'text-slate-400'
      }`}
    >
      {title}
    </p>

    <div className="mt-3 space-y-1.5">
      {items.map((item) => (
        <SidebarLink key={item.label} item={item} isDark={isDark} />
      ))}
    </div>
  </section>
)

export default SidebarSection
