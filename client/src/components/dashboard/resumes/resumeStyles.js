export const pageNoiseClass = "before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_256_256%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27noise%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.9%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%2523noise)%27_opacity=%270.02%27/%3E%3C/svg%3E')]"

export const getPanelClass = (isDark) =>
  isDark
    ? 'border-zinc-800/80 bg-zinc-900/55 shadow-[0_24px_60px_rgba(0,0,0,0.24)]'
    : 'border-slate-200 bg-white/78 shadow-[0_22px_50px_rgba(148,163,184,0.18)]'

export const getInteractivePanelClass = (isDark) =>
  `${getPanelClass(isDark)} transition-all duration-300 ${
    isDark
      ? 'hover:border-zinc-700/80 hover:bg-zinc-900/78'
      : 'hover:border-slate-300 hover:bg-white'
  }`

export const getMutedTextClass = (isDark) => (isDark ? 'text-zinc-400' : 'text-slate-600')
export const getSubtleTextClass = (isDark) => (isDark ? 'text-zinc-500' : 'text-slate-500')

export const getStatusBadgeClass = (tone, isDark) => {
  if (tone === 'Ready') {
    return isDark ? 'bg-emerald-500/12 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
  }

  if (tone === 'Draft') {
    return isDark ? 'bg-amber-500/12 text-amber-300' : 'bg-amber-50 text-amber-700'
  }

  return isDark ? 'bg-cyan-500/12 text-cyan-300' : 'bg-cyan-50 text-cyan-700'
}
