import { apiInstance } from '@/shared/api/instance'
import { useQuery } from '@tanstack/vue-query'

export interface MovieDto {
  id: number
  title: string
  description: string
  year: number
  lengthMinutes: number
  posterImage: string
  rating: number
}

export function fetchMovies() {
  return apiInstance.get<MovieDto[]>('/movies').then(r => r.data)
}

export function useMoviesQuery() {
  return useQuery({ queryKey: ['movies'], queryFn: fetchMovies })
}


