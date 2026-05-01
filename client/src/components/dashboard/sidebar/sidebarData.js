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
    href: '/dashboard/profile',
    icon: UserRound,
    available: false,
  },
  {
    label: 'Preferences',
    href: '/dashboard/preferences',
    icon: SlidersHorizontal,
    available: false,
  },
  {
    label: 'Authentication',
    href: '/dashboard/authentication',
    icon: ShieldCheck,
    available: false,
  },
]
