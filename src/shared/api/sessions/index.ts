import { apiInstance } from '@/shared/api/instance'
import { useQuery } from '@tanstack/vue-query'
import { computed, type MaybeRef } from 'vue'
import type { MovieSession, MovieSessionDetails, BookingRequest, BookingResponse } from '@/shared/api/types'

export function fetchMovieSessions(movieId: number) {
  if (!movieId || isNaN(movieId)) {
    throw new Error('Invalid movieId')
  }
  return apiInstance.get<MovieSession[]>(`/movies/${movieId}/sessions`)
    .then(r => r.data ?? [])
    .catch((error) => {
      if (error.response?.status === 404) {
        return []
      }
      throw error
    })
}

export function useMovieSessionsQuery(movieId: MaybeRef<number>) {
  const id = computed(() => {
    const value = typeof movieId === 'function' ? movieId() : movieId
    return Number(value) || 0
  })
  
  return useQuery({
    queryKey: computed(() => ['movies', id.value, 'sessions']),
    queryFn: () => fetchMovieSessions(id.value),
    enabled: computed(() => !!id.value && id.value > 0),
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false
      return failureCount < 2
    }
  })
}

export function fetchMovieSessionDetails(movieSessionId: number) {
  return apiInstance.get<MovieSessionDetails>(`/movieSessions/${movieSessionId}`)
    .then(r => r.data)
    .catch((error) => {
      if (error.response?.status === 404) {
        return null
      }
      throw error
    })
}

export function useMovieSessionDetailsQuery(movieSessionId: number) {
  return useQuery({
    queryKey: ['movieSessions', movieSessionId],
    queryFn: () => fetchMovieSessionDetails(movieSessionId),
    enabled: !!movieSessionId,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false
      return failureCount < 2
    }
  })
}

export async function createBooking(movieSessionId: number, data: BookingRequest): Promise<BookingResponse> {
  const response = await apiInstance.post<BookingResponse>(`/movieSessions/${movieSessionId}/bookings`, data)
  return response.data
}
