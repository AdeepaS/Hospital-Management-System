// Registration page with role selection and inline validation
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { useAuth } from '../context/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'

function Register() {
  const navigate = useNavigate()
  const { register, loading, error } = useAuth()

  const handleRegister = async ({ username, email, password, role }) => {
    try {
      const data = await register({ username, email, password, role })
      console.log('Register page success, user data:', data)
      navigate('/home')
    } catch (err) {
      console.error('Register page error:', err)
      // error message is surfaced from AuthContext state
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register to use the Hospital Management System"
      footerText="Already have an account?"
      footerLink="/"
      footerLinkText="Sign in"
    >
      {error && (
        <p className="mb-3 text-sm text-red-600">{error}</p>
      )}
      {loading && (
        <p className="mb-3 text-sm text-slate-500">Creating your account...</p>
      )}
      <RegisterForm onSubmit={handleRegister} />
    </AuthLayout>
  )
}

export default Register
