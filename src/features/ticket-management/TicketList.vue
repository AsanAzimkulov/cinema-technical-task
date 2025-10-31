<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Мои билеты</h1>
      <p class="mt-2 text-lg text-gray-600">Управление вашими бронированиями</p>
    </div>
    
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
    
    <div v-else class="space-y-8">
      <!-- Unpaid Bookings -->
      <div v-if="unpaidBookings.length > 0">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Неоплаченные</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BookingCard
            v-for="booking in unpaidBookings"
            :key="booking.id"
            :booking="booking"
            :time-left="getTimeLeft(booking)"
            @pay="handlePayment"
          />
        </div>
      </div>
      
      <!-- Future Bookings -->
      <div v-if="futureBookings.length > 0">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Будущие</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BookingCard
            v-for="booking in futureBookings"
            :key="booking.id"
            :booking="booking"
          />
        </div>
      </div>
      
      <!-- Past Bookings -->
      <div v-if="pastBookings.length > 0">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Прошедшие</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BookingCard
            v-for="booking in pastBookings"
            :key="booking.id"
            :booking="booking"
          />
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="allBookings.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Нет билетов</h3>
        <p class="mt-1 text-sm text-gray-500">У вас пока нет забронированных билетов</p>
        <div class="mt-6">
          <NuxtLink
            to="/movies"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Посмотреть фильмы
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookingWithDetails } from '~/shared/api/types'
import { apiClient } from '~/shared/api/client'
import { useAuthStore } from '~/shared/store/auth'
import Spinner from '~/shared/ui/Spinner/Spinner.vue'
import BookingCard from '~/entities/booking/BookingCard.vue'

const authStore = useAuthStore()

// Redirect if not authenticated
if (!authStore.isAuthenticated) {
  await navigateTo('/?auth=login')
}

// SEO meta
useHead({
  title: 'Мои билеты - Cinema Booking',
  meta: [
    { name: 'description', content: 'Управление вашими бронированиями билетов в кинотеатр' }
  ]
})

// Fetch user bookings
const { data: bookingsData, pending, error, refresh } = await useLazyAsyncData('user-bookings', () => 
  apiClient.getUserBookings()
)

// Fetch settings for payment time
const { data: settingsData } = await useLazyAsyncData('settings', () => 
  apiClient.getSettings()
)

// Fetch movies and cinemas for booking details
const { data: moviesData } = await useLazyAsyncData('movies', () => 
  apiClient.getMovies()
)

const { data: cinemasData } = await useLazyAsyncData('cinemas', () => 
  apiClient.getCinemas()
)

// Process bookings with additional data
const allBookings = computed((): BookingWithDetails[] => {
  if (!bookingsData.value || !moviesData.value || !cinemasData.value) return []
  
  const movieMap = new Map(moviesData.value.map(movie => [movie.id, movie]))
  const cinemaMap = new Map(cinemasData.value.map(cinema => [cinema.id, cinema]))
  
  return bookingsData.value.map(booking => ({
    ...booking,
    movie: movieMap.get(booking.movieSessionId),
    cinema: cinemaMap.get(booking.movieSessionId),
    timeLeft: getTimeLeft(booking)
  }))
})

// Group bookings by status
const unpaidBookings = computed(() => 
  allBookings.value.filter(booking => !booking.isPaid)
)

const futureBookings = computed(() => 
  allBookings.value.filter(booking => 
    booking.isPaid && new Date(booking.bookedAt) > new Date()
  )
)

const pastBookings = computed(() => 
  allBookings.value.filter(booking => 
    booking.isPaid && new Date(booking.bookedAt) <= new Date()
  )
)

const getTimeLeft = (booking: BookingWithDetails) => {
  if (booking.isPaid || !settingsData.value) return 0
  
  const bookedAt = new Date(booking.bookedAt)
  const now = new Date()
  const timeLeft = settingsData.value.bookingPaymentTimeSeconds - Math.floor((now.getTime() - bookedAt.getTime()) / 1000)
  
  return Math.max(0, timeLeft)
}

const handlePayment = async (bookingId: string) => {
  try {
    await apiClient.payBooking(bookingId)
    await refresh()
  } catch (error) {
    console.error('Payment error:', error)
  }
}
</script>
