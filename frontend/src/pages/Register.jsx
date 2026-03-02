// Registration page with role selection and inline validation
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { useAuth } from '../context/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleRegister = async ({ name, email, password, role }) => {
    try {
      await register({ name, email, password, role })
      navigate('/home')
    } catch {
      // error is handled in AuthContext (error state)
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
      <RegisterForm onSubmit={handleRegister} />
    </AuthLayout>
  )
}

export default Register
