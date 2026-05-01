import { ArrowDownToLine, Plus } from 'lucide-react'

export const sortOptions = ['Last Updated', 'Name', 'Recently Created']

export const actionCards = [
  {
    title: 'Create a new resume',
    description: 'Start with a clean, ATS-friendly canvas and shape it for your next role.',
    icon: Plus,
    badge: 'New draft',
  },
  {
    title: 'Import an existing resume',
    description: 'Bring in a past version, then refine it with the same polished Onyx workflow.',
    icon: ArrowDownToLine,
    badge: 'Upload JSON',
  },
]

export const resumes = [
  {
    title: 'Brandon Resume',
    updated: 'Last updated on April 15, 2026 at 1:24 PM',
    candidate: 'Brandon Tun',
    role: 'Web Developer',
    tone: 'Ready',
  },
  {
    title: 'Frontend Resume',
    updated: 'Last updated on April 14, 2026 at 10:42 PM',
    candidate: 'Brandon Tun',
    role: 'Frontend Engineer',
    tone: 'Draft',
  },
  {
    title: 'Product Resume',
    updated: 'Last updated on April 14, 2026 at 8:16 PM',
    candidate: 'Brandon Tun',
    role: 'Product Designer',
    tone: 'Polish',
  },
]

export const previewSections = [
  {
    title: 'Education',
    lines: ['w-11/12', 'w-9/12', 'w-10/12'],
  },
  {
    title: 'Summary',
    lines: ['w-full', 'w-full', 'w-10/12'],
  },
  {
    title: 'Experience',
    lines: ['w-full', 'w-11/12', 'w-full', 'w-9/12'],
  },
  {
    title: 'Projects',
    lines: ['w-10/12', 'w-full', 'w-8/12'],
  },
  {
    title: 'Skills',
    lines: ['w-9/12', 'w-8/12', 'w-10/12'],
  },
]
