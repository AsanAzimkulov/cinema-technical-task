import { apiInstance } from '@/shared/api/instance'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Try to get from public config, then fallback
  const apiEndpoint = config.public.API_ENDPOINT || 'http://localhost:3022'
  
  apiInstance.defaults.baseURL = apiEndpoint;
})


