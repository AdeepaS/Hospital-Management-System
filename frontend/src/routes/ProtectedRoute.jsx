import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard if user doesn't have access
    if (user?.role === 'patient') return <Navigate to="/patient" replace />
    if (user?.role === 'doctor') return <Navigate to="/doctor" replace />
    if (user?.role === 'admin') return <Navigate to="/admin" replace />
    return <Navigate to="/" replace />
  }
  
  return children
}

export default ProtectedRoute
