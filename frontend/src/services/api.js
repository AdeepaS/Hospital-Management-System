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

// Appointment APIs
export const appointmentAPI = {
  // Get my appointments (patient or doctor)
  getMyAppointments: async () => {
    const response = await api.get('/appointments/my')
    return response.data
  },

  // Get all appointments with filters (admin only)
  getAllAppointments: async (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.date) params.append('date', filters.date)
    if (filters.doctor) params.append('doctor', filters.doctor)
    if (filters.status) params.append('status', filters.status)

    const response = await api.get(`/appointments?${params.toString()}`)
    return response.data
  },

  // Cancel appointment
  cancelAppointment: async (appointmentId) => {
    const response = await api.put(`/appointments/${appointmentId}/cancel`)
    return response.data
  },

  // Create appointment (from existing service)
  createAppointment: async (data) => {
    const response = await api.post('/appointments', data)
    return response.data
  }
}

// Doctor APIs
export const doctorAPI = {
  getDoctors: async (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.specialization) params.append('specialization', filters.specialization)
    if (filters.date) params.append('date', filters.date)

    const response = await api.get(`/doctors?${params.toString()}`)
    return response.data
  }
}

export default api
