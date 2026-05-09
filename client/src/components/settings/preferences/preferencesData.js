export const preferenceSelectFields = [
  {
    label: 'Theme',
    name: 'theme',
    description: 'Choose how the workspace looks while you build resumes.',
    defaultValue: 'dark',
    options: [
      { label: 'Dark', value: 'dark' },
      { label: 'Light', value: 'light' },
    ],
  },
  {
    label: 'Language',
    name: 'language',
    description: 'Set the default interface language for the editor.',
    defaultValue: 'english',
    options: [
      { label: 'English', value: 'english' },
      { label: 'Burmese', value: 'burmese' },
    ],
  },
  {
    label: 'Default page size',
    name: 'pageSize',
    description: 'Use this size whenever you start a new resume.',
    defaultValue: 'a4',
    options: [
      { label: 'A4', value: 'a4' },
      { label: 'US Letter', value: 'letter' },
    ],
  },
]

export const preferenceToggleFields = [
  {
    label: 'Auto-save drafts',
    name: 'autoSave',
    description: 'Save your resume changes automatically while you type.',
    defaultChecked: true,
  },
  {
    label: 'Show writing tips',
    name: 'writingTips',
    description: 'Display quick guidance when you are writing resume sections.',
    defaultChecked: true,
  },
]
