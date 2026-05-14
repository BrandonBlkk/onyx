import { Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import Resumes from './pages/dashboard/Resumes'
import Profile from './pages/settings/Profile'
import Preferences from './pages/settings/Preferences'
import Authentication from './pages/settings/Authentication'
import DangerZone from './pages/settings/DangerZone'
import UserSignin from './pages/auth/UserSignin'
import UserSignup from './pages/auth/UserSignup'

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/dashboard/resumes" element={<Resumes />} />
        <Route path="/settings/profile" element={<Profile />} />
        <Route path="/settings/preferences" element={<Preferences />} />
        <Route path="/settings/authentication" element={<Authentication />} />
        <Route path="/settings/danger-zone" element={<DangerZone />} />
        <Route path="/auth/signin" element={<UserSignin />} />
        <Route path="/auth/signup" element={<UserSignup />} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </div>
  )
}

export default App
