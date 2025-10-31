import { apiInstance } from '@/shared/api/instance'

export default defineNuxtPlugin(() => {
  const { public: { API_ENDPOINT } } = useRuntimeConfig()
  apiInstance.defaults.baseURL = API_ENDPOINT
})


