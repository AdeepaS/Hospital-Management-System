import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser } from '../services/authService'

// Create a context to share auth state (user + token) across the app
const AuthContext = createContext(null)

// Custom hook to access auth context in any component
export function useAuth() {
  return useContext(AuthContext)
}

// Provider component that wraps the app and manages auth state
export function AuthProvider({ children }) {
  const storedAuth = (() => {
    try {
      const raw = localStorage.getItem('auth')
      return raw ? JSON.parse(raw) : null
    } catch (e) {
      console.error('Failed to parse stored auth:', e)
      return null
    }
  })()

  const [user, setUser] = useState(storedAuth?.user || null)
  const [token, setToken] = useState(storedAuth?.token || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const persistAuth = (userData, jwtToken) => {
    const payload = { user: userData, token: jwtToken }
    localStorage.setItem('auth', JSON.stringify(payload))
  }

  const clearPersistedAuth = () => {
    localStorage.removeItem('auth')
  }

  const handleAuthSuccess = (userData, jwtToken) => {
    console.log('Auth success with user:', userData)
    setUser(userData)
    setToken(jwtToken)
    setError(null)
    persistAuth(userData, jwtToken)
  }

  // Call backend /login via service
  const login = async ({ username, password }) => {
    setLoading(true)
    setError(null)
    try {
      const data = await loginUser({ username, password })

      // Backend returns {_id, name, username, email, role, token}
      const { token: jwtToken, ...userData } = data
      handleAuthSuccess(userData, jwtToken)
      return data
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed'
      console.error('AuthContext login error:', message)
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Call backend /register via service
  const register = async ({ username, email, password, role }) => {
    setLoading(true)
    setError(null)
    try {
      const data = await registerUser({ username, email, password, role })

      // Backend returns {_id, name, username, email, role, token}
      const { token: jwtToken, ...userData } = data
      handleAuthSuccess(userData, jwtToken)
      return data
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed'
      console.error('AuthContext register error:', message)
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    console.log('Logging out user')
    setUser(null)
    setToken(null)
    setError(null)
    clearPersistedAuth()
  }

  const isAuthenticated = Boolean(user && token)

  const value = { user, token, loading, error, isAuthenticated, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
