import {
  FileText,
  ShieldCheck,
  SlidersHorizontal,
  AlertTriangle,
  UserRound,
} from 'lucide-react'

export const appLinks = [
  {
    label: 'Resumes',
    href: '/dashboard/resumes',
    icon: FileText,
    available: true,
  },
]

export const settingsLinks = [
  {
    label: 'Profile',
    href: '/settings/profile',
    icon: UserRound,
    available: true,
    danger: false,
  },
  {
    label: 'Preferences',
    href: '/settings/preferences',
    icon: SlidersHorizontal,
    available: true,
    danger: false,
  },
  {
    label: 'Authentication',
    href: '/settings/authentication',
    icon: ShieldCheck,
    available: true,
    danger: false,
  },
  {
    label: 'Danger Zone',
    href: '/settings/danger-zone',
    icon: AlertTriangle,
    available: true,
    danger: true,
  },
]
