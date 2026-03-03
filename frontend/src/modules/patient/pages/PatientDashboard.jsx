import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { appointmentAPI } from '../../../services/api'
import AppointmentTable from '../../../components/appointment/AppointmentTable'

function PatientDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

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
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Patient Dashboard</h1>
              <p className="text-sm text-slate-500">Welcome, {user?.name || user?.username}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/appointments')}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Book New Appointment
              </button>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
            {success}
          </div>
        )}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Appointments</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{appointments.length}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Booked</p>
            <p className="mt-1 text-3xl font-semibold text-green-600">
              {appointments.filter((a) => a.status === 'booked').length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Cancelled</p>
            <p className="mt-1 text-3xl font-semibold text-red-600">
              {appointments.filter((a) => a.status === 'cancelled').length}
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">My Appointments</h2>
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
