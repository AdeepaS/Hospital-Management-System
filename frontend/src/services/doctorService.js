import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      const { token } = JSON.parse(auth)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const doctorAPI = {
  /**
   * Get all doctors with pagination, search, and filters
   */
  getDoctors: async (params = {}) => {
    const queryParams = new URLSearchParams()
    
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.search) queryParams.append('search', params.search)
    if (params.specialization) queryParams.append('specialization', params.specialization)
    if (params.status) queryParams.append('status', params.status)
    if (params.date) queryParams.append('date', params.date)

    const response = await api.get(`/doctors?${queryParams.toString()}`)
    return response.data
  },

  /**
   * Get doctor by ID with detailed information
   */
  getDoctorById: async (doctorId) => {
    const response = await api.get(`/doctors/${doctorId}`)
    return response.data
  },

  /**
   * Create a new doctor (Admin only)
   */
  createDoctor: async (doctorData) => {
    const response = await api.post('/doctors', doctorData)
    return response.data
  },

  /**
   * Update doctor information (Admin only)
   */
  updateDoctor: async (doctorId, doctorData) => {
    const response = await api.put(`/doctors/${doctorId}`, doctorData)
    return response.data
  },

  /**
   * Update doctor status (Admin only)
   */
  updateDoctorStatus: async (doctorId, status) => {
    const response = await api.patch(`/doctors/${doctorId}/status`, { status })
    return response.data
  },

  /**
   * Delete doctor - soft delete (Admin only)
   */
  deleteDoctor: async (doctorId) => {
    const response = await api.delete(`/doctors/${doctorId}`)
    return response.data
  },

  /**
   * Get doctor's appointments (Admin only)
   */
  getDoctorAppointments: async (doctorId, params = {}) => {
    const queryParams = new URLSearchParams()
    
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.status) queryParams.append('status', params.status)
    if (params.startDate) queryParams.append('startDate', params.startDate)
    if (params.endDate) queryParams.append('endDate', params.endDate)

    const response = await api.get(`/doctors/${doctorId}/appointments?${queryParams.toString()}`)
    return response.data
  },

  /**
   * Get all unique specializations
   */
  getSpecializations: async () => {
    const response = await api.get('/doctors/specializations/list')
    return response.data
  }
}

export default doctorAPI
