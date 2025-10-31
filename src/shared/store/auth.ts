import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { User } from '../api/types'
import { apiClient } from '../api/client'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  const setAuth = (userData: User, authToken: string) => {
    user.value = userData
    token.value = authToken
    apiClient.setToken(authToken)
    
    // Store in localStorage for persistence
    if (process.client) {
      localStorage.setItem('auth_token', authToken)
      localStorage.setItem('user_data', JSON.stringify(userData))
    }
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    apiClient.setToken(null)
    
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  }

  const initializeAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('user_data')
      
      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          setAuth(userData, storedToken)
        } catch (error) {
          clearAuth()
        }
      }
    }
  }

  const login = async (username: string, password: string) => {
    isLoading.value = true
    try {
      const response = await apiClient.login({ username, password })
      
      // Create user object from username (API doesn't return full user data)
      const userData: User = {
        id: 0, // Will be updated when we get user data
        name: username,
        password_hash: ''
      }
      
      setAuth(userData, response.token)
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const register = async (username: string, password: string) => {
    isLoading.value = true
    try {
      const response = await apiClient.register({ username, password })
      
      // Create user object from username
      const userData: User = {
        id: 0,
        name: username,
        password_hash: ''
      }
      
      setAuth(userData, response.token)
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    clearAuth()
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    isAuthenticated,
    setAuth,
    clearAuth,
    initializeAuth,
    login,
    register,
    logout
  }
})
