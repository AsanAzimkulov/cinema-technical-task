import { useQuery } from '@tanstack/vue-query'
import { apiInstance } from '@/shared/api/instance'
import type { MovieSessionDetails } from '@/shared/api/types'

export const sessionsKeys = {
  details: (id: number) => ['sessions', id, 'details'] as const
}

export function useSessionDetailsQuery(id: number) {
  return useQuery({
    queryKey: sessionsKeys.details(id),
    queryFn: async (): Promise<MovieSessionDetails> => {
      const { data } = await apiInstance.get<MovieSessionDetails>(`/movieSessions/${id}`)
      return data
    },
    enabled: !!id
  })
}


