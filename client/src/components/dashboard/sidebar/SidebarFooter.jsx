const SidebarFooter = ({ isDark }) => (
  <div
    className={`border-t py-5 ${
      isDark ? 'border-zinc-800/80' : 'border-slate-200/80'
    }`}
  >
    <div
      className={`rounded-lg p-4 backdrop-blur-md ${
        isDark
          ? 'border-zinc-800 bg-zinc-950/65'
          : 'border-slate-200 bg-white/82'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500 text-[13px] font-semibold text-slate-950">
          BT
        </div>

        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold">Brandon</p>
          <p className={`truncate text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
            kyawzayartun0527@gmail.com
          </p>
        </div>
      </div>

      <div
        className={`mt-4 space-y-1 text-[11px] leading-4 ${
          isDark ? 'text-zinc-500' : 'text-slate-500'
        }`}
      >
        <p>Landing-inspired workspace polish is now reflected here too.</p>
        <p>More dashboard areas can plug into this same visual system as they are added.</p>
      </div>
    </div>
  </div>
)

export default SidebarFooter
