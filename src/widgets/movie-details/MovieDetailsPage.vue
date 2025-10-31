<template>
  <div v-if="pending" class="flex justify-center py-12">
    <Spinner size="lg" />
  </div>
  
  <div v-else-if="error" class="text-center py-12">
    <div class="text-red-600">
      <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Ошибка загрузки</h3>
      <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
    </div>
  </div>
  
  <div v-else-if="movieData" class="space-y-8">
    <!-- Movie Header -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
          <div class="flex-shrink-0">
            <img
              :src="movieData.posterImage"
              :alt="movieData.title"
              class="h-48 w-32 object-cover rounded-lg sm:h-64 sm:w-44"
            />
          </div>
          <div class="mt-4 sm:mt-0 flex-1">
            <h1 class="text-3xl font-bold text-gray-900">{{ movieData.title }}</h1>
            <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <span>{{ movieData.year }} год</span>
              <span>{{ movieData.lengthMinutes }} мин</span>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="ml-1">{{ movieData.rating }}/10</span>
              </div>
            </div>
            <p class="mt-4 text-gray-700">{{ movieData.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sessions -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Расписание сеансов</h2>
        
        <div v-if="sessionsPending" class="flex justify-center py-8">
          <Spinner />
        </div>
        
        <div v-else-if="sessionsError" class="text-center py-8">
          <p class="text-red-600">{{ sessionsError }}</p>
        </div>
        
        <div v-else-if="sessionsData && sessionsData.length > 0" class="space-y-6">
          <div
            v-for="cinema in groupedSessions"
            :key="cinema.id"
            class="border border-gray-200 rounded-lg p-4"
          >
            <h3 class="text-lg font-medium text-gray-900 mb-3">{{ cinema.name }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ cinema.address }}</p>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button
                v-for="session in cinema.sessions"
                :key="session.id"
                class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                @click="navigateTo(`/booking/${session.id}`)"
              >
                {{ formatTime(session.startTime) }}
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8 text-gray-500">
          <p>Сеансы для этого фильма не найдены</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie, MovieSession, Cinema } from '~/shared/api/types'
import { apiClient } from '~/shared/api/client'
import Spinner from '~/shared/ui/Spinner/Spinner.vue'

const route = useRoute()
const movieId = parseInt(route.params.id as string)

// SEO meta
const { data: movieData } = await useLazyAsyncData(`movie-${movieId}`, () => 
  apiClient.getMovies().then(movies => movies.find(m => m.id === movieId))
)

useHead({
  title: movieData.value ? `${movieData.value.title} - Cinema Booking` : 'Фильм - Cinema Booking',
  meta: [
    { name: 'description', content: movieData.value?.description || 'Информация о фильме и расписание сеансов' }
  ]
})

// Fetch movie sessions
const { data: sessionsData, pending: sessionsPending, error: sessionsError } = await useLazyAsyncData(`movie-sessions-${movieId}`, () => 
  apiClient.getMovieSessions(movieId)
)

// Fetch cinemas for grouping
const { data: cinemasData } = await useLazyAsyncData('cinemas', () => 
  apiClient.getCinemas()
)

// Group sessions by cinema
const groupedSessions = computed(() => {
  if (!sessionsData.value || !cinemasData.value) return []
  
  const cinemaMap = new Map(cinemasData.value.map(cinema => [cinema.id, cinema]))
  
  const grouped = new Map<number, { id: number; name: string; address: string; sessions: MovieSession[] }>()
  
  sessionsData.value.forEach(session => {
    const cinema = cinemaMap.get(session.cinemaId)
    if (cinema) {
      if (!grouped.has(cinema.id)) {
        grouped.set(cinema.id, {
          id: cinema.id,
          name: cinema.name,
          address: cinema.address,
          sessions: []
        })
      }
      grouped.get(cinema.id)!.sessions.push(session)
    }
  })
  
  return Array.from(grouped.values())
})

const formatTime = (dateTime: string) => {
  const date = new Date(dateTime)
  return date.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit'
  })
}
</script>
