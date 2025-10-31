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
  
  <div v-else-if="sessionData" class="space-y-8">
    <!-- Session Info -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
          <div class="flex-shrink-0">
            <img
              :src="movieData?.posterImage"
              :alt="movieData?.title"
              class="h-48 w-32 object-cover rounded-lg sm:h-64 sm:w-44"
            />
          </div>
          <div class="mt-4 sm:mt-0 flex-1">
            <h1 class="text-3xl font-bold text-gray-900">{{ movieData?.title }}</h1>
            <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <span>{{ movieData?.year }} год</span>
              <span>{{ movieData?.lengthMinutes }} мин</span>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="ml-1">{{ movieData?.rating }}/10</span>
              </div>
            </div>
            <div class="mt-4">
              <p class="text-lg font-medium text-gray-900">{{ cinemaData?.name }}</p>
              <p class="text-sm text-gray-600">{{ cinemaData?.address }}</p>
              <p class="text-sm text-gray-600">{{ formatDateTime(sessionData.startTime) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Seat Selection -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Выбор мест</h2>
        
        <SeatMap
          :seats="sessionData.seats"
          :booked-seats="sessionData.bookedSeats"
          :selected-seats="selectedSeats"
          @seat-select="handleSeatSelect"
        />
        
        <div class="mt-8 flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <div class="flex items-center">
              <div class="w-4 h-4 bg-gray-300 rounded mr-2"></div>
              <span class="text-sm text-gray-600">Свободно</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span class="text-sm text-gray-600">Занято</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span class="text-sm text-gray-600">Выбрано</span>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <span v-if="selectedSeats.length > 0" class="text-sm text-gray-600">
              Выбрано мест: {{ selectedSeats.length }}
            </span>
            <Button
              :disabled="selectedSeats.length === 0"
              :loading="isBooking"
              @click="handleBooking"
            >
              Забронировать
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieSessionDetails, Movie, Cinema, Seat } from '~/shared/api/types'
import { apiClient } from '~/shared/api/client'
import { useAuthStore } from '~/shared/store/auth'
import Spinner from '~/shared/ui/Spinner/Spinner.vue'
import Button from '~/shared/ui/Button/Button.vue'
import SeatMap from '~/entities/booking/SeatMap.vue'

const route = useRoute()
const authStore = useAuthStore()
const movieSessionId = parseInt(route.params.id as string)

// Redirect if not authenticated
if (!authStore.isAuthenticated) {
  await navigateTo('/?auth=login')
}

// SEO meta
const { data: sessionData } = await useLazyAsyncData(`movie-session-${movieSessionId}`, () => 
  apiClient.getMovieSessionDetails(movieSessionId)
)

// Fetch movie and cinema data
const { data: movieData } = await useLazyAsyncData(`movie-${sessionData.value?.movieId}`, () => 
  sessionData.value ? apiClient.getMovies().then(movies => movies.find(m => m.id === sessionData.value!.movieId)) : null
)

const { data: cinemaData } = await useLazyAsyncData(`cinema-${sessionData.value?.cinemaId}`, () => 
  sessionData.value ? apiClient.getCinemas().then(cinemas => cinemas.find(c => c.id === sessionData.value!.cinemaId)) : null
)

useHead({
  title: movieData.value ? `Бронирование - ${movieData.value.title}` : 'Бронирование билетов - Cinema Booking',
  meta: [
    { name: 'description', content: 'Выберите места и забронируйте билеты в кинотеатр' }
  ]
})

// Seat selection state
const selectedSeats = ref<Seat[]>([])
const isBooking = ref(false)

const handleSeatSelect = (seat: Seat) => {
  const index = selectedSeats.value.findIndex(s => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber)
  
  if (index > -1) {
    selectedSeats.value.splice(index, 1)
  } else {
    selectedSeats.value.push(seat)
  }
}

const handleBooking = async () => {
  if (selectedSeats.value.length === 0) return
  
  isBooking.value = true
  try {
    const response = await apiClient.bookMovieSession(movieSessionId, {
      seats: selectedSeats.value
    })
    
    await navigateTo('/my-tickets')
  } catch (error: any) {
    console.error('Booking error:', error)
    // Handle error
  } finally {
    isBooking.value = false
  }
}

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime)
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
