import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import Resumes from './pages/dashboard/Resumes'
import Profile from './pages/settings/Profile'
import Preferences from './pages/settings/Preferences'
import Authentication from './pages/settings/Authentication'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard/resumes" element={<Resumes />} />
        <Route path="/settings/profile" element={< Profile />} />
        <Route path="/settings/preferences" element={< Preferences />} />
        <Route path="/settings/authentication" element={< Authentication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
