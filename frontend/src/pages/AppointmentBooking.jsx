import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getDoctors, createAppointment } from '../services/appointmentService'
import DoctorCard from '../components/appointment/DoctorCard'
import TimeSlotPicker from '../components/appointment/TimeSlotPicker'

function AppointmentBooking() {
  const navigate = useNavigate()
  const { user, token } = useAuth()

  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Filters
  const [specialization, setSpecialization] = useState('')
  const [date, setDate] = useState('')

  // Selection
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  // Get unique specializations
  const specializations = [...new Set(doctors.map((d) => d.specialization))].sort()

  // Fetch doctors
  const fetchDoctors = async () => {
    setLoading(true)
    setError(null)
    try {
      const filters = {}
      if (specialization) filters.specialization = specialization
      if (date) filters.date = date

      const data = await getDoctors(filters)
      setDoctors(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch doctors')
    } finally {
      setLoading(false)
    }
  }

  // Load doctors on mount
  useEffect(() => {
    fetchDoctors()
  }, [])

  // Re-fetch when filters change
  useEffect(() => {
    if (specialization || date) {
      fetchDoctors()
      setSelectedDoctor(null)
      setSelectedTime(null)
    }
  }, [specialization, date])

  // Handle doctor selection
  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor)
    setSelectedTime(null)
    setError(null)
    setSuccess(null)
  }

  // Handle booking
  const handleBookAppointment = async () => {
    if (!selectedDoctor || !date || !selectedTime) {
      setError('Please select date, doctor, and time slot')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const appointmentData = {
        doctorId: selectedDoctor._id,
        date,
        time: selectedTime
      }

      await createAppointment(appointmentData, token)
      setSuccess('Appointment booked successfully!')

      // Reset selection
      setTimeout(() => {
        setSelectedDoctor(null)
        setSelectedTime(null)
        setDate('')
        fetchDoctors()
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment')
    } finally {
      setLoading(false)
    }
  }

  // Handle reset filters
  const handleResetFilters = () => {
    setSpecialization('')
    setDate('')
    setSelectedDoctor(null)
    setSelectedTime(null)
    fetchDoctors()
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Book Appointment</h1>
            <button
              onClick={() => navigate('/home')}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Filters</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Specialization
              </label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

        {/* Doctors List */}
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Available Doctors
            {date && ` on ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
          </h2>

          {loading && (
            <p className="text-sm text-slate-500">Loading doctors...</p>
          )}

          {!loading && doctors.length === 0 && (
            <p className="text-sm text-slate-500">
              No doctors available for the selected filters
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                onSelect={() => handleSelectDoctor(doctor)}
                isSelected={selectedDoctor?._id === doctor._id}
              />
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        {selectedDoctor && date && (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              Booking for {selectedDoctor.name}
            </h3>
            <TimeSlotPicker
              doctor={selectedDoctor}
              bookedSlots={selectedDoctor.bookedSlots || []}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />

            {selectedTime && (
              <div className="mt-6 flex items-center justify-between rounded-lg bg-blue-50 p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedDoctor.name} - {selectedDoctor.specialization}
                  </p>
                  <p className="text-sm text-slate-600">
                    {new Date(date).toLocaleDateString()} at {selectedTime}
                  </p>
                  <p className="text-sm font-semibold text-blue-600">
                    Fee: ${selectedDoctor.consultationFee}
                  </p>
                </div>
                <button
                  onClick={handleBookAppointment}
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            )}
          </div>
        )}

        {selectedDoctor && !date && (
          <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
            Please select a date to view available time slots
          </div>
        )}
      </main>
    </div>
  )
}

export default AppointmentBooking
