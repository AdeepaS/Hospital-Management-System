// Login page with inline validation and Tailwind styling
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/auth/LoginForm'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async ({ email, password }) => {
    try {
      await login({ email, password })
      navigate('/home')
    } catch {
      // error is handled in AuthContext (error state)
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
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  )
}

export default Login
