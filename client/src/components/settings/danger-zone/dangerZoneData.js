import { Download, Link2, TriangleAlert } from 'lucide-react'

export const deleteAccountConfig = {
  email: 'kyawzayartun0527@gmail.com',
  confirmationPhrase: 'DELETE',
}

export const beforeDeleteItems = [
  {
    icon: Download,
    title: 'Download important resumes',
    description: 'Make sure you export any resumes or drafts you still want to keep.',
  },
  {
    icon: Link2,
    title: 'Review connected sign-in methods',
    description: 'Google and GitHub connections will no longer work for this account after deletion.',
  },
  {
    icon: TriangleAlert,
    title: 'Deletion is permanent',
    description: 'Once the account is removed, your workspace data cannot be restored.',
  },
]

export const deleteConsequences = [
  'All resumes and drafts in this account will be removed.',
  'Connected sign-in providers will be disconnected from this workspace.',
  'Your profile, preferences, and authentication settings will be erased.',
]
