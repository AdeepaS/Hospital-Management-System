import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import doctorAPI from '../../../../services/doctorService'
import DoctorProfileCard from '../../../../components/doctors/DoctorProfileCard'
import DoctorEditForm from '../../../../components/doctors/DoctorEditForm'
import ConfirmModal from '../../../../components/common/ConfirmModal'
import Loader from '../../../../shared/components/Loader'

function DoctorDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [doctor, setDoctor] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [editMode, setEditMode] = useState(false)
  const [editLoading, setEditLoading] = useState(false)

  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [deactivateLoading, setDeactivateLoading] = useState(false)

  // Fetch doctor details
  const fetchDoctorDetails = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await doctorAPI.getDoctorById(id)
      setDoctor(data.doctor)
      setStats(data.stats)
    } catch (err) {
      console.error('Failed to fetch doctor details:', err)
      setError(err.response?.data?.message || 'Failed to fetch doctor details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctorDetails()
  }, [id])

  // Handle edit save
  const handleSaveEdit = async (formData) => {
    setEditLoading(true)
    try {
      await doctorAPI.updateDoctor(id, formData)
      setSuccess('Doctor updated successfully')
      setEditMode(false)
      fetchDoctorDetails()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Failed to update doctor:', err)
      setError(err.response?.data?.message || 'Failed to update doctor')
      setTimeout(() => setError(null), 3000)
    } finally {
      setEditLoading(false)
    }
  }

  // Handle deactivate
  const handleDeactivate = async () => {
    setDeactivateLoading(true)
    try {
      await doctorAPI.updateDoctorStatus(id, 'inactive')
      setSuccess('Doctor deactivated successfully')
      setShowDeactivateModal(false)
      fetchDoctorDetails()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Failed to deactivate doctor:', err)
      setError(err.response?.data?.message || 'Failed to deactivate doctor')
      setTimeout(() => setError(null), 3000)
    } finally {
      setDeactivateLoading(false)
    }
  }

  // Handle activate
  const handleActivate = async () => {
    try {
      await doctorAPI.updateDoctorStatus(id, 'active')
      setSuccess('Doctor activated successfully')
      fetchDoctorDetails()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Failed to activate doctor:', err)
      setError(err.response?.data?.message || 'Failed to activate doctor')
      setTimeout(() => setError(null), 3000)
    }
  }

  // Handle view appointments
  const handleViewAppointments = () => {
    navigate(`/admin/appointments?doctor=${id}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    )
  }

  if (error && !doctor) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-8 text-center">
        <p className="text-[#DC2626] text-lg">{error}</p>
        <button
          onClick={() => navigate('/admin/users/doctors')}
          className="mt-4 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
        >
          Back to Doctors
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/admin/users/doctors')}
            className="text-[#2563EB] hover:text-[#1D4ED8] mb-2"
          >
            ← Back to Doctors
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Details</h1>
        </div>
        {!editMode && (
          <div className="flex gap-3">
            <button
              onClick={handleViewAppointments}
              className="px-4 py-2 border border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-[#EFF6FF] transition-colors"
            >
              View Appointments
            </button>
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
            >
              Edit Doctor
            </button>
            {doctor?.status === 'active' ? (
              <button
                onClick={() => setShowDeactivateModal(true)}
                className="px-4 py-2 border border-[#DC2626] text-[#DC2626] rounded-lg hover:bg-[#FEE2E2] transition-colors"
              >
                Deactivate
              </button>
            ) : (
              <button
                onClick={handleActivate}
                className="px-4 py-2 border border-[#16A34A] text-[#16A34A] rounded-lg hover:bg-[#DCFCE7] transition-colors"
              >
                Activate
              </button>
            )}
          </div>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 rounded-lg bg-[#FEE2E2] border border-[#FECACA] p-4 text-sm text-[#DC2626]">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] p-4 text-sm text-[#16A34A]">
          {success}
        </div>
      )}

      {/* Edit Mode */}
      {editMode ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Doctor Information</h2>
          <DoctorEditForm
            doctor={doctor}
            onSave={handleSaveEdit}
            onCancel={() => setEditMode(false)}
            loading={editLoading}
          />
        </div>
      ) : (
        <>
          {/* Profile Card */}
          <div className="mb-6">
            <DoctorProfileCard doctor={doctor} />
          </div>

          {/* Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bio Section */}
            <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Biography</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {doctor?.bio || 'No biography available.'}
              </p>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
              <p className="text-gray-700 text-sm">
                {doctor?.education || 'No education information available.'}
              </p>
            </div>
          </div>

          {/* Availability Schedule */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Working Days</p>
                <div className="flex flex-wrap gap-2">
                  {doctor?.workingDays?.map(day => (
                    <span
                      key={day}
                      className="px-3 py-1 bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] rounded-lg text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Working Hours</p>
                <p className="text-gray-900 font-medium">
                  {doctor?.workingHours?.start} - {doctor?.workingHours?.end}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalAppointments || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">Total</p>
              </div>
              <div className="text-center p-4 bg-[#DCFCE7] rounded-lg">
                <p className="text-2xl font-bold text-[#16A34A]">
                  {stats?.completedAppointments || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">Completed</p>
              </div>
              <div className="text-center p-4 bg-[#EFF6FF] rounded-lg">
                <p className="text-2xl font-bold text-[#2563EB]">
                  {stats?.pendingAppointments || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">Pending</p>
              </div>
              <div className="text-center p-4 bg-[#FEE2E2] rounded-lg">
                <p className="text-2xl font-bold text-[#DC2626]">
                  {stats?.cancelledAppointments || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">Cancelled</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Deactivate Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={handleDeactivate}
        title="Deactivate Doctor"
        message={`Are you sure you want to deactivate ${doctor?.name}? They will no longer be able to accept appointments.`}
        confirmText="Deactivate"
        confirmColor="red"
        loading={deactivateLoading}
      />
    </div>
  )
}

export default DoctorDetails
