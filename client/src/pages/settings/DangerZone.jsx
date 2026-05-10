import { AlertTriangle } from 'lucide-react'
import Sidebar from '../../components/dashboard/sidebar/Sidebar'
import DangerZoneChecklist from '../../components/settings/danger-zone/DangerZoneChecklist'
import DeleteAccountCard from '../../components/settings/danger-zone/DeleteAccountCard'
import { useTheme } from '../../context/ThemeContext'

const DangerZone = () => {
  const { isDark } = useTheme()

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-[#0b0b0c] text-zinc-100' : 'bg-[#f7f7f8] text-slate-950'
      }`}
    >
      <div className="min-h-screen">
        <Sidebar isDark={isDark} />

        <main className="lg:ml-65 p-3">
          <div className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                    isDark ? 'border-red-950/60 text-red-300' : 'border-red-300 text-red-600'
                  }`}
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                </div>
                <h1 className="text-xl font-semibold tracking-tight">Danger Zone</h1>
              </div>

              <p className={isDark ? 'text-xs text-zinc-500' : 'text-xs text-slate-500'}>
                Permanent account actions live here. Please review everything carefully before continuing.
              </p>
            </div>

            <div className={isDark ? 'border-t border-zinc-800' : 'border-t border-slate-200'} />

            <section className="grid gap-3 xl:grid-cols-[1.05fr_0.95fr]">
              <DangerZoneChecklist isDark={isDark} />
              <DeleteAccountCard isDark={isDark} />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DangerZone
