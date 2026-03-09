import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import doctorAPI from '../../../../services/doctorService'
import DoctorCard from '../../../../components/doctors/DoctorCard'
import Loader from '../../../../shared/components/Loader'

function DoctorsManagement() {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [search, setSearch] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(null)
  const [specializations, setSpecializations] = useState([])

  // Fetch specializations for filter
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const data = await doctorAPI.getSpecializations()
        setSpecializations(data)
      } catch (err) {
        console.error('Failed to fetch specializations:', err)
      }
    }
    fetchSpecializations()
  }, [])

  // Fetch doctors
  const fetchDoctors = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {
        page,
        limit: 12
      }
      if (search) params.search = search
      if (specializationFilter) params.specialization = specializationFilter
      if (statusFilter) params.status = statusFilter

      const data = await doctorAPI.getDoctors(params)
      setDoctors(data.doctors)
      setPagination(data.pagination)
    } catch (err) {
      console.error('Failed to fetch doctors:', err)
      setError(err.response?.data?.message || 'Failed to fetch doctors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [page, search, specializationFilter, statusFilter])

  // Handle search
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  // Handle filter change
  const handleSpecializationChange = (e) => {
    setSpecializationFilter(e.target.value)
    setPage(1)
  }

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setPage(1)
  }

  // Handle reset filters
  const handleResetFilters = () => {
    setSearch('')
    setSpecializationFilter('')
    setStatusFilter('')
    setPage(1)
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle add new doctor
  const handleAddDoctor = () => {
    navigate('/admin/users/doctors/new')
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors Management</h1>
          <p className="text-gray-600 mt-1">Manage all doctors in the hospital</p>
        </div>
        <button
          onClick={handleAddDoctor}
          className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
        >
          Add New Doctor
        </button>
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

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white border border-[#E0F2FE] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-sm font-medium text-gray-500">Total Doctors</p>
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
            {doctors.length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={handleSearch}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Specialization Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <select
              value={specializationFilter}
              onChange={handleSpecializationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">All Specializations</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      ) : doctors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-12 text-center">
          <p className="text-gray-500 text-lg">No doctors found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filters or add a new doctor
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {doctors.map(doctor => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-[#E0F2FE] p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {((page - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(page * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} doctors
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pagination.pages}
                    className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DoctorsManagement

