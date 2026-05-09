import {
  FileText,
  ShieldCheck,
  SlidersHorizontal,
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
  },
  {
    label: 'Preferences',
    href: '/settings/preferences',
    icon: SlidersHorizontal,
    available: true,
  },
  {
    label: 'Authentication',
    href: '/settings/authentication',
    icon: ShieldCheck,
    available: false,
  },
]
