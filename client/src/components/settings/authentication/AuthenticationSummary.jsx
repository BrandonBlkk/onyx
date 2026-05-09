import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import AuthenticationPanel from './AuthenticationPanel'
import { securityTips, signInMethods } from './authenticationData'

const iconMap = {
  email: Mail,
  password: LockKeyhole,
}

const AuthenticationSummary = ({ isDark }) => {
  return (
    <div className="space-y-4">
      <AuthenticationPanel
        title="Sign-in methods"
        description="Your account can keep email login even after you connect a provider."
        isDark={isDark}
      >
        <div className="space-y-3">
          {signInMethods.map((item) => {
            const Icon = iconMap[item.id]

            return (
              <div
                key={item.id}
                className={`rounded-xl border px-4 py-3 ${
                  isDark ? 'border-zinc-800 bg-[#0d0d0e]/60' : 'border-slate-200 bg-[#fcfcfc]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                      isDark
                        ? 'border-zinc-800 bg-zinc-950 text-zinc-100'
                        : 'border-slate-200 bg-white text-slate-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[13px] font-medium">{item.label}</p>
                    <p className={`mt-0.5 text-xs ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                      {item.value}
                    </p>
                  </div>
                </div>

                <p className={`mt-3 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  {item.note}
                </p>
              </div>
            )
          })}
        </div>
      </AuthenticationPanel>

      <AuthenticationPanel
        title="Security notes"
        description="A few reminders before you connect another sign-in provider."
        isDark={isDark}
      >
        <div className="space-y-2">
          {securityTips.map((tip) => (
            <div key={tip} className="flex items-start gap-2 text-xs">
              <ShieldCheck className={`mt-0.5 h-3.5 w-3.5 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`} />
              <span className={isDark ? 'text-zinc-400' : 'text-slate-600'}>{tip}</span>
            </div>
          ))}
        </div>
      </AuthenticationPanel>
    </div>
  )
}

export default AuthenticationSummary
