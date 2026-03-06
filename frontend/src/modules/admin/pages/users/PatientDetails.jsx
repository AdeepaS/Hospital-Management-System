import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import patientAPI from '../../../../services/patientService'
import Loader from '../../../../shared/components/Loader'
import StatusBadge from '../../../../components/appointment/StatusBadge'

function PatientDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [patientData, setPatientData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPatientDetails()
  }, [id])

  const fetchPatientDetails = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await patientAPI.getPatientById(id)
      setPatientData(data)
    } catch (err) {
      console.error('Failed to fetch patient details:', err)
      setError(err.response?.data?.message || 'Failed to fetch patient details')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <button
          onClick={() => navigate('/admin/users/patients')}
          className="mb-4 text-[#2563EB] hover:text-[#1D4ED8] font-medium"
        >
          ← Back to Patients
        </button>
        <div className="rounded-lg bg-[#FEE2E2] border border-[#FECACA] p-4 text-sm text-[#DC2626]">
          {error}
        </div>
      </div>
    )
  }

  if (!patientData) {
    return (
      <div>
        <button
          onClick={() => navigate('/admin/users/patients')}
          className="mb-4 text-[#2563EB] hover:text-[#1D4ED8] font-medium"
        >
          ← Back to Patients
        </button>
        <div className="text-center py-12">
          <p className="text-gray-500">Patient not found</p>
        </div>
      </div>
    )
  }

  const { patient, stats, appointments } = patientData

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/admin/users/patients')}
            className="mb-2 text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors"
          >
            ← Back to Patients
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
          <p className="text-gray-600 mt-1">Patient Details and History</p>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="mt-1 text-base text-gray-900">{patient.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Username</p>
            <p className="mt-1 text-base text-gray-900">{patient.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-1 text-base text-gray-900">{patient.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Role</p>
            <p className="mt-1 text-base text-gray-900 capitalize">{patient.role}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Registered</p>
            <p className="mt-1 text-base text-gray-900">{formatDateTime(patient.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white border border-[#E0F2FE] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-sm font-medium text-gray-500">Total Appointments</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalAppointments}</p>
        </div>
        <div className="rounded-lg bg-white border border-[#E0F2FE] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-sm font-medium text-gray-500">Booked</p>
          <p className="mt-1 text-3xl font-semibold text-[#16A34A]">{stats.bookedAppointments}</p>
        </div>
        <div className="rounded-lg bg-white border border-[#E0F2FE] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-sm font-medium text-gray-500">Cancelled</p>
          <p className="mt-1 text-3xl font-semibold text-[#DC2626]">{stats.cancelledAppointments}</p>
        </div>
      </div>

      {/* Appointments History */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointments History</h2>
        
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0F2FE] bg-[#F8FAFC]">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E0F2FE]">
                {appointments.map((appointment) => (
                  <tr 
                    key={appointment._id}
                    className="hover:bg-[#F8FAFC] transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(appointment.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.doctor?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {appointment.doctor?.specialization || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={appointment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientDetails
