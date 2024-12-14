import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Devices from './pages/Devices'
import Schedule from './pages/Schedule'
import Settings from './pages/Settings'
import Logs from './pages/Logs'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated)
  }, [isAuthenticated])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            !isAuthenticated ? (
              <Navigate to="/login" />
            ) : (
              <Navigate to="/home" />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/home" />
            )
          } 
        />
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="devices" element={<Devices />} />
          <Route path="schedule*" element={<Schedule />} />
          <Route path="logs" element={<Logs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
