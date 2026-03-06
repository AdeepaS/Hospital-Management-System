import { useState, useEffect } from 'react'
import patientAPI from '../../../../services/patientService'
import PatientSearchBar from '../../../../components/patients/PatientSearchBar'
import PatientTable from '../../../../components/patients/PatientTable'
import PatientEditModal from '../../../../components/patients/PatientEditModal'

function PatientsManagement() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(null)
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [editLoading, setEditLoading] = useState(false)

  // Fetch patients
  const fetchPatients = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {
        page,
        limit: 10
      }
      if (search) params.search = search

      const data = await patientAPI.getPatients(params)
      setPatients(data.patients)
      setPagination(data.pagination)
    } catch (err) {
      console.error('Failed to fetch patients:', err)
      setError(err.response?.data?.message || 'Failed to fetch patients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [page, search])

  // Handle search reset
  const handleResetSearch = () => {
    setSearch('')
    setPage(1)
  }

  // Handle edit
  const handleEdit = (patient) => {
    setSelectedPatient(patient)
    setShowEditModal(true)
  }

  // Handle save edit
  const handleSaveEdit = async (formData) => {
    setEditLoading(true)
    try {
      await patientAPI.updatePatient(selectedPatient._id, formData)
      setSuccess('Patient updated successfully')
      setShowEditModal(false)
      setSelectedPatient(null)
      fetchPatients()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Failed to update patient:', err)
      setError(err.response?.data?.message || 'Failed to update patient')
      setTimeout(() => setError(null), 3000)
    } finally {
      setEditLoading(false)
    }
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patients Management</h1>
        <p className="text-gray-600 mt-1">Manage all patients in the hospital</p>
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

      {/* Stats Card */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white border border-[#E0F2FE] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-sm font-medium text-gray-500">Total Patients</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {pagination?.total || 0}
          </p>
        </div>
        <div className="rounded-lg bg-white border border-[#E0F2FE] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-sm font-medium text-gray-500">Current Page</p>
          <p className="mt-1 text-3xl font-semibold text-[#2563EB]">
            {pagination?.page || 1} / {pagination?.pages || 1}
          </p>
        </div>
        <div className="rounded-lg bg-white border border-[#E0F2FE] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-sm font-medium text-gray-500">Showing</p>
          <p className="mt-1 text-3xl font-semibold text-[#16A34A]">
            {patients.length}
          </p>
        </div>
      </div>

      {/* Search */}
      <PatientSearchBar
        search={search}
        setSearch={setSearch}
        onReset={handleResetSearch}
      />

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-6">
        <PatientTable
          patients={patients}
          loading={loading}
          onEdit={handleEdit}
        />

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-6 flex items-center justify-between border-t border-[#E0F2FE] pt-4">
            <div className="text-sm text-gray-600">
              Showing {((page - 1) * pagination.limit) + 1} to {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} patients
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pagination.pages}
                className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-md hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <PatientEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedPatient(null)
        }}
        patient={selectedPatient}
        onSave={handleSaveEdit}
        loading={editLoading}
      />
    </div>
  )
}

export default PatientsManagement
