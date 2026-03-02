import { createContext, useContext, useState } from 'react'

// Create a context to share auth state (user + token) across the app
const AuthContext = createContext(null)

// Custom hook to access auth context in any component
export function useAuth() {
  return useContext(AuthContext)
}

const API_BASE_URL = 'http://localhost:5000/api/auth'

// Provider component that wraps the app and manages auth state
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAuthSuccess = (userData, jwtToken) => {
    setUser(userData)
    setToken(jwtToken)
    setError(null)
  }

  // Call backend /login
  const login = async ({ email, password }) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Backend returns { message, token }
      handleAuthSuccess({ email }, data.token)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Call backend /register
  const register = async ({ name, email, password, role }) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      // Treat successful registration as logged-in
      handleAuthSuccess({ name, email, role }, data.token)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setError(null)
  }

  const value = { user, token, loading, error, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
