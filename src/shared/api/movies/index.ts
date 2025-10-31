import { apiInstance } from '@/shared/api/instance'
import { useQuery } from '@tanstack/vue-query'
import type { Movie } from '@/shared/api/types'

export function fetchMovies() {
  return apiInstance.get<Movie[]>('/movies')
    .then(r => r.data ?? [])
    .catch((error) => {
      if (error.response?.status === 404) {
        return []
      }
      throw error
    })
}

export function useMoviesQuery() {
  return useQuery({ 
    queryKey: ['movies'], 
    queryFn: fetchMovies,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false
      return failureCount < 2
    }
  })
}


