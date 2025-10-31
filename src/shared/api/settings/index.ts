import { useQuery } from '@tanstack/vue-query'
import { apiInstance } from '@/shared/api/instance'
import type { Settings } from '@/shared/api/types'

export const settingsKeys = {
  base: ['settings'] as const
}

export function useSettingsQuery() {
  return useQuery({
    queryKey: settingsKeys.base,
    queryFn: async (): Promise<Settings> => {
      const { data } = await apiInstance.get<Settings>('/settings')
      return data
    }
  })
}


