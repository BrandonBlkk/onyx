export const authProviders = [
  {
    id: 'google',
    name: 'Google',
    description: 'Use your Google account for faster sign up and quick access on new devices.',
    connected: true,
    connectedAs: 'kyawzayartun0527@gmail.com',
    primaryAction: 'Manage Google',
    secondaryAction: 'Disconnect',
    highlights: [
      'One-click sign in',
      'Uses your verified Google email',
    ],
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect GitHub if you want another sign-in option for your resume workspace.',
    connected: false,
    connectedAs: 'Not connected yet',
    primaryAction: 'Connect GitHub',
    secondaryAction: 'Learn more',
    highlights: [
      'Good for portfolio-focused accounts',
      'Keeps email login available',
    ],
  },
]

export const signInMethods = [
  {
    id: 'email',
    label: 'Email sign in',
    value: 'kyawzayartun0527@gmail.com',
    note: 'Verified and available for recovery.',
  },
  {
    id: 'password',
    label: 'Password',
    value: 'Enabled',
    note: 'Keep a password even if you connect social sign in.',
  },
]

export const securityTips = [
  'Connecting Google or GitHub only changes how you sign in.',
  'Your resumes and account data stay in the same Onyx workspace.',
  'You can disconnect a provider later without deleting your account.',
]
