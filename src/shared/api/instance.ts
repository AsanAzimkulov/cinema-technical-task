import axios from 'axios'

export const apiInstance = axios.create()

// Interceptor для добавления токена
apiInstance.interceptors.request.use((config) => {
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})


