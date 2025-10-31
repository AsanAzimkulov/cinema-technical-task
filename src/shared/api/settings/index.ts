import { apiInstance } from '@/shared/api/instance'
import { useQuery } from '@tanstack/vue-query'
import type { Settings } from '@/shared/api/types'

export function fetchSettings() {
  return apiInstance.get<Settings>('/settings').then(r => r.data)
}

export function useSettingsQuery() {
  return useQuery({ queryKey: ['settings'], queryFn: fetchSettings })
}
