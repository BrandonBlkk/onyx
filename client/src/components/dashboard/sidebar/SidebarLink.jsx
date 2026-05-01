import { Link, NavLink } from 'react-router-dom'

const SidebarLink = ({ item, isDark }) => {
  const Icon = item.icon
  const baseClass = `flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[13px] font-medium tracking-tight transition-all duration-200 ${
    isDark
      ? 'text-zinc-400 hover:bg-zinc-900/80 hover:text-white'
      : 'text-slate-600 hover:bg-white hover:text-slate-950'
  }`

  if (item.available) {
    return (
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          `${baseClass} ${
            isActive
              ? isDark
                ? 'bg-white text-zinc-900 shadow-[0_16px_32px_rgba(0,0,0,0.28)]'
                : 'bg-slate-900 text-white shadow-[0_16px_32px_rgba(15,23,42,0.12)]'
              : ''
          }`
        }
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span>{item.label}</span>
      </NavLink>
    )
  }

  return (
    <Link
      to={item.href}
      onClick={(event) => event.preventDefault()}
      className={`${baseClass} ${isDark ? 'opacity-90' : 'opacity-80'}`}
      aria-disabled="true"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{item.label}</span>
    </Link>
  )
}

export default SidebarLink
