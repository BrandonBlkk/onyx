import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import logo2 from '../../../assets/images/logo2.png'
import SidebarFooter from './SidebarFooter'
import SidebarSection from './SidebarSection'
import { appLinks, settingsLinks } from './sidebarData'

const Sidebar = ({ isDark }) => {
  return (
    <aside
      className={`relative flex w-full flex-col overflow-hidden border-b backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:w-65 lg:border-r lg:border-b-0 ${
        isDark
          ? 'border-zinc-800/80 bg-zinc-950/72'
          : 'border-slate-200/80 bg-white/72'
      }`}
    >
      <div
        className={`pointer-events-none absolute left-6 top-6 h-24 w-24 rounded-full blur-3xl ${
          isDark ? 'bg-accent-500/10' : 'bg-accent-500/12'
        }`}
      />

      <div className="relative flex h-full flex-col">
        <div
          className={`border-b px-5 py-5 ${
            isDark ? 'border-zinc-800/80' : 'border-slate-200/80'
          }`}
        >
          <Link to="/" className="flex items-center gap-3" id="nav-logo">
            <div className="flex w-9 items-center justify-center overflow-hidden rounded-md">
              <img
                src={isDark ? logo : logo2}
                alt="Onyx Logo"
                className="h-full w-full select-none object-cover"
              />
            </div>

            <div>
              <p className="text-base font-semibold tracking-tight">Onyx</p>
              <p className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                Resume workspace
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-1 space-y-7 px-3 py-6">
          <SidebarSection title="App" items={appLinks} isDark={isDark} />
          <SidebarSection title="Settings" items={settingsLinks} isDark={isDark} />
        </div>

        <SidebarFooter isDark={isDark} />
      </div>
    </aside>
  )
}

export default Sidebar
