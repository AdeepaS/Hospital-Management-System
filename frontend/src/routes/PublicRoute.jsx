import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PublicRoute({ children }) {
  const { isAuthenticated, user } = useAuth()
  
  if (isAuthenticated) {
    // Redirect to role-specific dashboard
    if (user?.role === 'patient') return <Navigate to="/patient" replace />
    if (user?.role === 'doctor') return <Navigate to="/doctor" replace />
    if (user?.role === 'admin') return <Navigate to="/admin" replace />
    return <Navigate to="/home" replace />
  }
  
  return children
}

export default PublicRoute
