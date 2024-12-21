import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Devices from './pages/Devices'
import Schedule from './pages/Schedule'
import Settings from './pages/Settings'
import Logs from './pages/Logs'
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated)
  }, [isAuthenticated])

  const handleLogin = () => {
    setIsAuthenticated(true)
    window.location.href = '/home'
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          
          {/* Protected routes */}
          <Route
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
