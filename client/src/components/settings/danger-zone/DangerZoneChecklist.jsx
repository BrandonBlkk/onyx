import { ShieldCheck } from 'lucide-react'
import {
  beforeDeleteItems,
  deleteConsequences,
  deleteAccountConfig,
} from './dangerZoneData'
import DangerZonePanel from './DangerZonePanel'

const DangerZoneChecklist = ({ isDark }) => {
  return (
    <div className="space-y-3">
      <DangerZonePanel
        title="Before you delete"
        description="Please review these items before removing your account."
        isDark={isDark}
      >
        <div className="space-y-3">
          {beforeDeleteItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className={`rounded-xl border px-4 py-3 ${
                  isDark ? 'border-zinc-800 bg-[#0d0d0e]/60' : 'border-slate-200 bg-[#fcfcfc]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950 text-zinc-100'
                        : 'border-slate-200 bg-white text-slate-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[13px] font-medium">{item.title}</p>
                    <p className={`mt-1 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </DangerZonePanel>

      <DangerZonePanel
        title="What gets removed"
        description={`This action applies to ${deleteAccountConfig.email}.`}
        isDark={isDark}
      >
        <div className="space-y-2">
          {deleteConsequences.map((item) => (
            <div key={item} className="flex items-start gap-2 text-xs">
              <ShieldCheck className={`mt-0.5 h-3.5 w-3.5 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`} />
              <span className={isDark ? 'text-zinc-400' : 'text-slate-600'}>{item}</span>
            </div>
          ))}
        </div>
      </DangerZonePanel>
    </div>
  )
}

export default DangerZoneChecklist
