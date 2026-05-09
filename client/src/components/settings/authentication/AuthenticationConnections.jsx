import AuthenticationPanel from './AuthenticationPanel'
import AuthenticationProviderCard from './AuthenticationProviderCard'
import { authProviders } from './authenticationData'

const AuthenticationConnections = ({ isDark }) => {
  return (
    <AuthenticationPanel
      title="Connected providers"
      description="Link the accounts you want to use for sign up and sign in."
      isDark={isDark}
    >
      <div className="space-y-3">
        {authProviders.map((provider) => (
          <AuthenticationProviderCard key={provider.id} provider={provider} isDark={isDark} />
        ))}
      </div>
    </AuthenticationPanel>
  )
}

export default AuthenticationConnections
