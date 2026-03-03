import { useState, useEffect } from 'react'
import { appointmentAPI, doctorAPI } from '../../../../services/api'
import AppointmentTable from '../../../../components/appointment/AppointmentTable'
import ConfirmModal from '../../../../components/common/ConfirmModal'

function AllAppointments() {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [appointmentToCancel, setAppointmentToCancel] = useState(null)

  // Filters
  const [dateFilter, setDateFilter] = useState('')
  const [doctorFilter, setDoctorFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Fetch doctors for filter dropdown
  const fetchDoctors = async () => {
    try {
      const data = await doctorAPI.getDoctors()
      setDoctors(data)
    } catch (err) {
      console.error('Failed to fetch doctors:', err)
    }
  }

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true)
    setError(null)
    try {
      const filters = {}
      if (dateFilter) filters.date = dateFilter
      if (doctorFilter) filters.doctor = doctorFilter
      if (statusFilter) filters.status = statusFilter

      const data = await appointmentAPI.getAllAppointments(filters)
      setAppointments(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
    fetchAppointments()
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [dateFilter, doctorFilter, statusFilter])

  // Handle cancel - opens confirmation modal
  const handleCancel = (appointmentId) => {
    setAppointmentToCancel(appointmentId)
    setShowCancelModal(true)
  }

  // Confirm cancellation
  const confirmCancel = async () => {
    if (!appointmentToCancel) return

    try {
      await appointmentAPI.cancelAppointment(appointmentToCancel)
      setSuccess('Appointment cancelled successfully')
      fetchAppointments()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel appointment')
      setTimeout(() => setError(null), 3000)
    } finally {
      setAppointmentToCancel(null)
    }
  }

  const handleResetFilters = () => {
    setDateFilter('')
    setDoctorFilter('')
    setStatusFilter('')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">All Appointments</h1>
        <p className="text-slate-600 mt-1">Manage and monitor all hospital appointments</p>
      </div>

      {/* Messages */}
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

      {/* Stats Card */}
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

      {/* Filters */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Filters</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Doctor</label>
            <select
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Doctors</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="booked">Booked</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="w-full rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <AppointmentTable
          appointments={appointments}
          onCancel={handleCancel}
          loading={loading}
          role="admin"
        />
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false)
          setAppointmentToCancel(null)
        }}
        onConfirm={confirmCancel}
        title="Cancel Appointment"
        message="Are you sure you want to cancel this appointment? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No, Keep it"
        type="danger"
      />
    </div>
  )
}

export default AllAppointments
