import { useQuery } from '@tanstack/vue-query'
import { apiInstance } from '@/shared/api/instance'
import type { Cinema, MovieSession } from '@/shared/api/types'

export const cinemasKeys = {
  all: ['cinemas'] as const,
  sessions: (cinemaId: number) => ['cinemas', cinemaId, 'sessions'] as const
}

export function useCinemasQuery() {
  return useQuery({
    queryKey: cinemasKeys.all,
    queryFn: async (): Promise<Cinema[]> => {
      const { data } = await apiInstance.get<Cinema[]>('/cinemas')
      return data
    }
  })
}

export function useCinemaSessionsQuery(cinemaId: number) {
  return useQuery({
    queryKey: cinemasKeys.sessions(cinemaId),
    queryFn: async (): Promise<MovieSession[]> => {
      const { data } = await apiInstance.get<MovieSession[]>(`/cinemas/${cinemaId}/sessions`)
      return data
    },
    enabled: !!cinemaId
  })
}


