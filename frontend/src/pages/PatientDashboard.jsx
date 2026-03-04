import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { appointmentAPI } from '../services/api'
import AppointmentTable from '../components/appointment/AppointmentTable'

function PatientDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await appointmentAPI.getMyAppointments()
      setAppointments(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  // Handle cancel
  const handleCancel = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return
    }

    try {
      await appointmentAPI.cancelAppointment(appointmentId)
      setSuccess('Appointment cancelled successfully')
      fetchAppointments()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel appointment')
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome, {user?.name || user?.username}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/appointments')}
                className="rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8] transition-colors"
              >
                Book New Appointment
              </button>
              <button
                onClick={handleLogout}
                className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Messages */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-100 p-4 text-sm text-red-800">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-100 p-4 text-sm text-green-800">
            {success}
          </div>
        )}

        {/* Stats Card */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white border border-gray-100 p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Appointments</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{appointments.length}</p>
          </div>
          <div className="rounded-lg bg-white border border-gray-100 p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Booked</p>
            <p className="mt-1 text-3xl font-semibold text-[#16A34A]">
              {appointments.filter((a) => a.status === 'booked').length}
            </p>
          </div>
          <div className="rounded-lg bg-white border border-gray-100 p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Cancelled</p>
            <p className="mt-1 text-3xl font-semibold text-[#DC2626]">
              {appointments.filter((a) => a.status === 'cancelled').length}
            </p>
          </div>
        </div>

        {/* Appointments Table */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">My Appointments</h2>
          <AppointmentTable
            appointments={appointments}
            onCancel={handleCancel}
            loading={loading}
            role="patient"
          />
        </div>
      </main>
    </div>
  )
}

export default PatientDashboard
