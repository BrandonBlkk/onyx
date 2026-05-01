const MiniSection = ({ title, lines }) => (
  <div>
    <div className="mb-1.5 h-1 w-9 rounded-full bg-teal-600/70" />
    <p className="mb-1.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
      {title}
    </p>
    <div className="space-y-1">
      {lines.map((widthClass, index) => (
        <div
          key={`${title}-${index}`}
          className={`h-1 rounded-full bg-zinc-300 ${widthClass}`}
        />
      ))}
    </div>
  </div>
)

export default MiniSection
