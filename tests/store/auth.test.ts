import { setActivePinia, createPinia } from 'pinia'
import { vi } from 'vitest'
import { useAuthStore } from '~/shared/store/auth'

// Mock API client
vi.mock('~/shared/api/client', () => ({
  apiClient: {
    login: vi.fn(),
    register: vi.fn(),
    setToken: vi.fn()
  }
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })
  
  it('initializes with empty state', () => {
    const store = useAuthStore()
    
    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })
  
  it('sets auth data correctly', () => {
    const store = useAuthStore()
    const user = { id: 1, name: 'test', password_hash: 'hash' }
    const token = 'test-token'
    
    store.setAuth(user, token)
    
    expect(store.user).toEqual(user)
    expect(store.token).toBe(token)
    expect(store.isAuthenticated).toBe(true)
  })
  
  it('clears auth data', () => {
    const store = useAuthStore()
    const user = { id: 1, name: 'test', password_hash: 'hash' }
    const token = 'test-token'
    
    store.setAuth(user, token)
    store.clearAuth()
    
    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })
  
  it('handles login successfully', async () => {
    const store = useAuthStore()
    const mockResponse = { token: 'test-token' }
    
    const { apiClient } = await import('~/shared/api/client')
    vi.mocked(apiClient.login).mockResolvedValue(mockResponse)
    
    await store.login('testuser', 'password')
    
    expect(apiClient.login).toHaveBeenCalledWith({ username: 'testuser', password: 'password' })
    expect(store.isAuthenticated).toBe(true)
  })
  
  it('handles login error', async () => {
    const store = useAuthStore()
    const error = new Error('Invalid credentials')
    
    const { apiClient } = await import('~/shared/api/client')
    vi.mocked(apiClient.login).mockRejectedValue(error)
    
    await expect(store.login('testuser', 'wrongpassword')).rejects.toThrow('Invalid credentials')
    expect(store.isAuthenticated).toBe(false)
  })
})
