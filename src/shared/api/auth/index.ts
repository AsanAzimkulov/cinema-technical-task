import { useMutation } from '@tanstack/vue-query'
import { apiInstance } from '@/shared/api/instance'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/shared/api/types'

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (payload: LoginRequest): Promise<LoginResponse> => {
      const { data } = await apiInstance.post<LoginResponse>('/login', payload)
      return data
    }
  })
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (payload: RegisterRequest): Promise<RegisterResponse> => {
      const { data } = await apiInstance.post<RegisterResponse>('/register', payload)
      return data
    }
  })
}


