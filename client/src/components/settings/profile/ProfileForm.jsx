import ProfileField from './ProfileField'
import { profileFields } from './profileData'
import { useAuth } from '../../../context/AuthContext'

const ProfileForm = ({ isDark }) => {
  const { user } = useAuth()
  const profileValues = {
    name: user?.fullname ?? '',
    username: user?.username ?? '',
    email: user?.email ?? '',
  }

  return (
    <form className="max-w-2xl space-y-3">
      {profileFields.map((field) => (
        <div key={`${field.name}-${profileValues[field.name]}`}>
          <ProfileField {...field} defaultValue={profileValues[field.name] ?? ''} isDark={isDark} />
        </div>
      ))}
    </form>
  )
}

export default ProfileForm
