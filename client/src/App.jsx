import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import { Move } from 'lucide-react'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  )
}

export default App
