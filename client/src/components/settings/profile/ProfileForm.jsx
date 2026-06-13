import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import ProfileField from './ProfileField'
import { profileFields } from './profileData'
import { useAuth } from '../../../context/AuthContext'
import { useLanguage } from '../../../context/LanguageContext'

const ProfileForm = ({ isDark }) => {
  const { user, token, login } = useAuth()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: user?.fullname ?? '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasProfileChanges = formData.name.trim() !== (user?.fullname ?? '').trim()

  const profileValues = {
    name: formData.name,
    email: user?.email ?? '',
  }

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting || !hasProfileChanges) {
      return
    }

    const fullname = formData.name.trim()

    if (!fullname) {
      toast.error(t('Fullname is required'))
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/onyx/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullname }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update profile right now.')
      }

      login(token, data.user)
      toast.success(t(data.message || 'Profile updated successfully'))
    } catch (error) {
      toast.error(t(error.message || 'Unable to update profile right now.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      {profileFields.map((field) => (
        <div key={field.name}>
          <ProfileField
            {...field}
            value={profileValues[field.name] ?? ''}
            onChange={handleChange}
            readOnly={field.name === 'email'}
            isDark={isDark}
          />
        </div>
      ))}
      <AnimatePresence>
        {hasProfileChanges && (
          <motion.button
            type="submit"
            disabled={isSubmitting}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors select-none ${
              isDark
                ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            } ${isSubmitting ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
          >
            {isSubmitting ? 
            <>
              <div 
                id="submitSpinner" 
                className="w-5 h-5 border-t-2 border-current rounded-full animate-spin mr-2" 
              />
              {t(isSubmitting ? 'Save profile' : 'Saving profile')}...
            </>
            : 
              t('Save profile')
            }
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  )
}

export default ProfileForm
