import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api/auth'

export async function loginUser(data) {
  try {
    console.log('loginUser request payload:', data)
    const response = await axios.post(`${API_BASE_URL}/login`, data)
    console.log('loginUser response data:', response.data)
    return response.data
  } catch (error) {
    console.error('loginUser error:', error.response?.data || error.message)
    throw error
  }
}

export async function registerUser(data) {
  try {
    console.log('registerUser request payload:', data)
    const response = await axios.post(`${API_BASE_URL}/register`, data)
    console.log('registerUser response data:', response.data)
    return response.data
  } catch (error) {
    console.error('registerUser error:', error.response?.data || error.message)
    throw error
  }
}
