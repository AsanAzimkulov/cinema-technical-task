import { apiInstance } from '@/shared/api/instance'
import { useQuery } from '@tanstack/vue-query'
import { computed, type MaybeRef } from 'vue'
import type { Cinema, MovieSession } from '@/shared/api/types'

export function fetchCinemas() {
  return apiInstance.get<Cinema[]>('/cinemas')
    .then(r => r.data ?? [])
    .catch((error) => {
      if (error.response?.status === 404) {
        return []
      }
      throw error
    })
}

export function useCinemasQuery() {
  return useQuery({ 
    queryKey: ['cinemas'], 
    queryFn: fetchCinemas,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false
      return failureCount < 2
    }
  })
}

export function fetchCinemaSessions(cinemaId: number) {
  if (!cinemaId || isNaN(cinemaId)) {
    throw new Error('Invalid cinemaId')
  }
  return apiInstance.get<MovieSession[]>(`/cinemas/${cinemaId}/sessions`)
    .then(r => r.data ?? [])
    .catch((error) => {
      if (error.response?.status === 404) {
        return []
      }
      throw error
    })
}

export function useCinemaSessionsQuery(cinemaId: MaybeRef<number>) {
  const id = computed(() => {
    const value = typeof cinemaId === 'function' ? cinemaId() : cinemaId
    return Number(value) || 0
  })
  
  return useQuery({
    queryKey: computed(() => ['cinemas', id.value, 'sessions']),
    queryFn: () => fetchCinemaSessions(id.value),
    enabled: computed(() => !!id.value && id.value > 0),
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false
      return failureCount < 2
    }
  })
}
