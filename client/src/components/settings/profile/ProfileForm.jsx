import ProfileField from './ProfileField'
import { profileFields } from './profileData'

const ProfileForm = ({ isDark }) => {
  return (
    <form className="max-w-2xl space-y-3">
      {profileFields.map((field) => (
        <div key={field.name}>
          <ProfileField {...field} isDark={isDark} />
        </div>
      ))}
    </form>
  )
}

export default ProfileForm
