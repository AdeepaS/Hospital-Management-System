import api from './api'

const patientAPI = {
  /**
   * Get all patients with pagination and filters
   * @param {Object} params - Query parameters (page, limit, search, status)
   */
  getPatients: async (params = {}) => {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.search) queryParams.append('search', params.search)
    if (params.status) queryParams.append('status', params.status)

    const response = await api.get(`/patients?${queryParams.toString()}`)
    return response.data
  },

  /**
   * Get patient details with appointment statistics
   * @param {string} patientId - Patient ID
   */
  getPatientById: async (patientId) => {
    const response = await api.get(`/patients/${patientId}`)
    return response.data
  },

  /**
   * Update patient information
   * @param {string} patientId - Patient ID
   * @param {Object} data - Updated patient data
   */
  updatePatient: async (patientId, data) => {
    const response = await api.put(`/patients/${patientId}`, data)
    return response.data
  },

  /**
   * Update patient status (activate/deactivate)
   * @param {string} patientId - Patient ID
   * @param {string} status - 'active' or 'inactive'
   */
  updatePatientStatus: async (patientId, status) => {
    const response = await api.patch(`/patients/${patientId}/status`, { status })
    return response.data
  },

  /**
   * Get patient appointments
   * @param {string} patientId - Patient ID
   * @param {Object} params - Query parameters (status)
   */
  getPatientAppointments: async (patientId, params = {}) => {
    const queryParams = new URLSearchParams()
    if (params.status) queryParams.append('status', params.status)

    const response = await api.get(`/patients/${patientId}/appointments?${queryParams.toString()}`)
    return response.data
  }
}

export default patientAPI
