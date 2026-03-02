import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

// Get doctors with optional filters
export async function getDoctors(filters = {}) {
  try {
    const params = new URLSearchParams()
    if (filters.specialization) params.append('specialization', filters.specialization)
    if (filters.date) params.append('date', filters.date)

    const url = `${API_BASE_URL}/doctors${params.toString() ? `?${params.toString()}` : ''}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('getDoctors error:', error.response?.data || error.message)
    throw error
  }
}

// Create appointment (requires patient token)
export async function createAppointment(data, token) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/appointments`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('createAppointment error:', error.response?.data || error.message)
    throw error
  }
}
