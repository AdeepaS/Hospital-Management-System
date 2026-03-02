// Simple protected home/dashboard page shown after login
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import StatsCard from '../components/dashboard/StatsCard'

function Home() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  // Handle logout and return to login page
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleBookAppointment = () => {
    navigate('/appointments')
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      {/* Centered dashboard container */}
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Top bar with welcome text and logout button */}
        <header className="flex flex-col gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Welcome, {user.name || 'User'}
            </h1>
            {user.role && <p className="text-sm text-slate-500">Role: {user.role}</p>}
          </div>
          <div className="flex gap-2">
            {user.role === 'patient' && (
              <button
                onClick={handleBookAppointment}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Book Appointment
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Simple dashboard grid */}
        <main className="grid gap-4 md:grid-cols-3">
          <StatsCard title="Patients" value="128" description="Total active patients" />
          <StatsCard title="Appointments" value="32" description="Scheduled today" />
          <StatsCard title="Doctors on duty" value="18" description="Across all departments" />
        </main>
      </div>
    </div>
  )
}

export default Home
