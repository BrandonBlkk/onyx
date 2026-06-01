import { Toaster as Sonner } from 'sonner'
import { useTheme } from '../../context/ThemeContext'

const Toaster = ({ ...props }) => {
  const { isDark } = useTheme()

  return (
    <Sonner
      theme={isDark ? 'dark' : 'light'}
      className="toaster group select-none"
      position="bottom-right"
      richColors
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:rounded-md group-[.toaster]:border group-[.toaster]:shadow-lg',
          title: 'group-[.toast]:text-sm group-[.toast]:font-medium',
          description: 'group-[.toast]:text-xs',
          actionButton:
            'group-[.toast]:rounded-sm group-[.toast]:bg-slate-900 group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:rounded-sm group-[.toast]:bg-slate-100 group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs group-[.toast]:text-slate-900',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
