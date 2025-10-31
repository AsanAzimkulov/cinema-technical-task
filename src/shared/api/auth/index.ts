import { apiInstance } from '@/shared/api/instance'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/shared/api/types'

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiInstance.post<LoginResponse>('/login', data)
  return response.data
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await apiInstance.post<RegisterResponse>('/register', data)
  return response.data
}
