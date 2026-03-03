import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../../layouts/AuthLayout'
import { useAuth } from '../../../context/AuthContext'
import LoginForm from '../../../components/auth/LoginForm'

function Login() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()

  const handleLogin = async ({ username, password }) => {
    try {
      const data = await login({ username, password })
      console.log('Login page success, user data:', data)
      
      // Redirect based on role
      if (data.role === 'patient') {
        navigate('/patient')
      } else if (data.role === 'doctor') {
        navigate('/doctor')
      } else if (data.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/home')
      }
    } catch (err) {
      console.error('Login page error:', err)
    }
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Access the Hospital Management System"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
    >
      {error && (
        <p className="mb-3 text-sm text-red-600">{error}</p>
      )}
      {loading && (
        <p className="mb-3 text-sm text-slate-500">Signing you in...</p>
      )}
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  )
}

export default Login
