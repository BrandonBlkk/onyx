import { Check, Link2 } from 'lucide-react'
import GitHubMark from './GitHubMark'
import GoogleMark from './GoogleMark'

const AuthenticationProviderCard = ({ provider, isDark }) => {
  const badgeClass = provider.connected
    ? isDark
      ? 'bg-emerald-500/12 text-emerald-300'
      : 'bg-emerald-50 text-emerald-700'
    : isDark
      ? 'bg-zinc-900 text-zinc-400'
      : 'bg-slate-100 text-slate-600'

  const actionClass = provider.connected
    ? isDark
      ? 'border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-600'
      : 'border-slate-300 bg-slate-100 text-slate-900 hover:border-slate-400'
    : 'border-black bg-black text-white hover:opacity-90'

  return (
    <article
      className={`rounded-xl border p-4 ${
        isDark ? 'border-zinc-800 bg-[#0d0d0e]/60' : 'border-slate-200 bg-[#fcfcfc]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
              isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-slate-200 bg-white text-slate-900'
            }`}
          >
            {provider.id === 'google' ? <GoogleMark className="h-4 w-4" /> : <GitHubMark className="h-4 w-4" />}
          </div>

          <div>
            <p className="text-[13px] font-medium">{provider.name}</p>
            <p className={`mt-1 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
              {provider.description}
            </p>
          </div>
        </div>

        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium select-none ${badgeClass}`}>
          {provider.connected ? 'Connected' : 'Available'}
        </span>
      </div>

      <div className="mt-4 rounded-lg border border-dashed px-3 py-2.5">
        <p className={`text-[11px] uppercase tracking-[0.18em] ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
          Account
        </p>
        <p className="mt-1 text-[13px]">{provider.connectedAs}</p>
      </div>

      <div className="mt-4 space-y-2">
        {provider.highlights.map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs">
            <Check className={`h-3.5 w-3.5 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`} />
            <span className={isDark ? 'text-zinc-400' : 'text-slate-600'}>{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 select-none">
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${actionClass}`}
        >
          {provider.primaryAction}
        </button>

        <button
          type="button"
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
            isDark
              ? 'border-zinc-800 bg-transparent text-zinc-300 hover:border-zinc-700'
              : 'border-slate-200 bg-transparent text-slate-700 hover:border-slate-300'
          }`}
        >
          <Link2 className="h-3.5 w-3.5" />
          {provider.secondaryAction}
        </button>
      </div>
    </article>
  )
}

export default AuthenticationProviderCard
