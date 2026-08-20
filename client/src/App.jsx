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
import ForgetPassword from './pages/auth/ForgetPassword'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { Toaster } from './components/ui/Sonner'
import ResetPassword from './pages/auth/ResetPassword'

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
        <Route path="/dashboard/resumes" element={<ProtectedRoute><Resumes /></ProtectedRoute>} />
        <Route path="/settings/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />
        <Route path="/settings/authentication" element={<ProtectedRoute><Authentication /></ProtectedRoute>} />
        <Route path="/settings/danger-zone" element={<ProtectedRoute><DangerZone /></ProtectedRoute>} />
        <Route path="/auth/signin" element={<UserSignin />} />
        <Route path="/auth/signup" element={<UserSignup />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
