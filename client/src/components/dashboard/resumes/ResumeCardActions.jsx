import {
  BadgeInfo,
  CloudDownload,
  Copy,
  CopyPlus,
  Download,
  Heart,
  HeartMinus,
  HeartPlus,
  Info,
  Lock,
  MoreHorizontal,
  Pencil,
  PencilLine,
  TextCursorInput,
  Trash,
  Trash2,
  Type,
  Unlock,
} from 'lucide-react'

const HoverSwapIcon = ({ Icon, HoverIcon }) => (
  <span className="relative h-4 w-4 shrink-0">
    <Icon className="absolute inset-0 h-4 w-4 transition-all duration-150 group-hover/item:scale-75 group-hover/item:opacity-0 group-focus-visible/item:scale-75 group-focus-visible/item:opacity-0" />
    <HoverIcon className="absolute inset-0 h-4 w-4 scale-75 opacity-0 transition-all duration-150 group-hover/item:scale-100 group-hover/item:opacity-100 group-focus-visible/item:scale-100 group-focus-visible/item:opacity-100" />
  </span>
)

const ResumeCardActions = ({
  isDark,
  isLocked = false,
  isLocking = false,
  isFavorite = false,
  isFavoriting = false,
  onFavorite,
  onRename,
  onDetails,
  onLock,
  onDelete
}) => {
  const FavoriteHoverIcon = isFavorite ? HeartMinus : HeartPlus
  const actionButtonClass = `inline-flex h-8 w-8 items-center justify-center rounded-md border backdrop-blur-xl transition-all duration-200 ease-out active:translate-y-0 ${
    isDark
      ? 'border-zinc-800/80 bg-zinc-950/85 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-50'
      : 'border-slate-200 bg-white/90 text-slate-500 hover:border-slate-300 hover:bg-white hover:text-slate-950'
  }`
  const menuClass = `invisible absolute right-0 top-9 z-30 w-36 translate-y-1 rounded-md border p-1 opacity-0 shadow-lg backdrop-blur-xl transition-all duration-200 ease-out group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100 ${
    isDark
      ? 'border-zinc-800 bg-zinc-950/95 shadow-black/30'
      : 'border-slate-200 bg-white/95 shadow-slate-200/70'
  }`
  const menuItemClass = `flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-xs font-medium transition-colors select-none cursor-pointer ${
    isDark
      ? 'text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
  }`

  const menuItems = [
    { icon: <HoverSwapIcon Icon={Pencil} HoverIcon={PencilLine} />, className: `${menuItemClass}`, label: 'Edit' },
    { icon: <HoverSwapIcon Icon={Type} HoverIcon={TextCursorInput} />, className: `${menuItemClass}`, label: 'Rename', onClick: onRename },
    { icon: <HoverSwapIcon Icon={Info} HoverIcon={BadgeInfo} />, className: `${menuItemClass}`, label: 'Details', onClick: onDetails },
    { icon: <HoverSwapIcon Icon={Download} HoverIcon={CloudDownload} />, className: `${menuItemClass}`, label: 'Download' },
    { icon: <HoverSwapIcon Icon={Copy} HoverIcon={CopyPlus} />, className: `${menuItemClass}`, label: 'Make a copy' },
    {
      icon: <HoverSwapIcon Icon={isLocked ? Lock : Unlock} HoverIcon={isLocked ? Unlock : Lock} />,
      className: `${menuItemClass}`,
      label: isLocked ? 'Unlock' : 'Lock',
      onClick: onLock,
      disabled: isLocking,
    },
    { icon: <HoverSwapIcon Icon={Trash} HoverIcon={Trash2} />, className: `${menuItemClass} hover:text-red-500! hover:bg-red-100!`, label: 'Move to trash', onClick: onDelete },
  ]

  return (
    <div className="invisible absolute right-3 top-3 z-20 flex translate-y-1 scale-95 items-start gap-1 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100">
      <button
        type="button"
        aria-label={isFavorite ? 'Remove resume from favorites' : 'Favorite resume'}
        aria-pressed={isFavorite}
        title={isFavorite ? 'Remove from favorites' : 'Favorite resume'}
        disabled={isFavoriting}
        className={`${actionButtonClass} group/favorite hover:text-red-400! disabled:cursor-not-allowed disabled:opacity-60`}
        onClick={(event) => {
          event.stopPropagation()
          onFavorite?.()
        }}
      >
        <span className="relative h-4 w-4">
          <Heart
            className={`absolute inset-0 h-4 w-4 transition-all duration-150 group-hover/favorite:scale-75 group-hover/favorite:opacity-0 group-focus-visible/favorite:scale-75 group-focus-visible/favorite:opacity-0 ${
              isFavorite
                ? 'fill-red-400 text-red-400'
                : ''
            }`}
          />
          <FavoriteHoverIcon className="absolute inset-0 h-4 w-4 scale-75 opacity-0 transition-all duration-150 group-hover/favorite:scale-100 group-hover/favorite:opacity-100 group-focus-visible/favorite:scale-100 group-focus-visible/favorite:opacity-100" />
        </span>
      </button>

      <div className="group/menu relative">
        <button
          type="button"
          aria-label="Resume actions"
          aria-haspopup="menu"
          className={actionButtonClass}
          onClick={(event) => event.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        <div role="menu" className={menuClass}>
          {menuItems.map(({ icon, className, label, onClick, disabled }) => {
            return (
              <button
                key={label}
                type="button"
                role="menuitem"
                disabled={disabled}
                className={`${className} group/item disabled:pointer-events-none disabled:opacity-50`}
                onClick={(event) => {
                  event.stopPropagation()
                  onClick?.()
                }}
              >
                {icon}
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { ResumeCardActions }
export default ResumeCardActions
