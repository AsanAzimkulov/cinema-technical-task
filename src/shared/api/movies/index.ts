import { useQuery } from '@tanstack/vue-query'
import { apiInstance } from '@/shared/api/instance'
import type { Movie, MovieSession } from '@/shared/api/types'

export const moviesKeys = {
  all: ['movies'] as const,
  sessions: (movieId: number) => ['movies', movieId, 'sessions'] as const
}

export function useMoviesQuery() {
  return useQuery({
    queryKey: moviesKeys.all,
    queryFn: async (): Promise<Movie[]> => {
      const { data } = await apiInstance.get<Movie[]>('/movies')
      return data
    }
  })
}

export function useMovieSessionsQuery(movieId: number) {
  return useQuery({
    queryKey: moviesKeys.sessions(movieId),
    queryFn: async (): Promise<MovieSession[]> => {
      const { data } = await apiInstance.get<MovieSession[]>(`/movies/${movieId}/sessions`)
      return data
    },
    enabled: !!movieId
  })
}


