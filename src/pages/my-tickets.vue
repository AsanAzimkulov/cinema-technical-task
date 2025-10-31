<template>
  <NuxtLayout>
    <template #title>
      <h1 class="text-h1">Мои билеты</h1>
    </template>
    <section class="py-8">
      <div v-if="isLoading" class="text-caption text-[#C1C1C1]">Загрузка...</div>
      <div v-else-if="error" class="text-caption text-[#B76969]">{{ String(error) }}</div>
      <div v-else class="grid grid-cols-3 gap-6">
        <div>
          <div class="text-h2 mb-3">Не оплаченные</div>
          <div class="space-y-3">
            <BookingCard
              v-for="booking in unpaidBookings"
              :key="booking.id"
              :title="booking.title"
              :details="booking.details"
            >
              <template #actions>
                <div class="mt-3">
                  <div v-if="booking.timeLeft && booking.timeLeft > 0" class="text-caption text-[#C1C1C1] mb-2">
                    Осталось: {{ formatTimeLeft(booking.timeLeft) }}
                  </div>
                  <button
                    v-if="booking.timeLeft && booking.timeLeft > 0"
                    class="btn btn-primary"
                    @click="handlePay(booking.id)"
                    :disabled="isPaying"
                  >
                    Оплатить
                  </button>
                </div>
              </template>
            </BookingCard>
            <div v-if="unpaidBookings.length === 0" class="text-caption text-[#C1C1C1]">Нет неоплаченных билетов</div>
          </div>
        </div>
        <div>
          <div class="text-h2 mb-3">Будущие</div>
          <div class="space-y-3">
            <BookingCard
              v-for="booking in upcomingBookings"
              :key="booking.id"
              :title="booking.title"
              :details="booking.details"
            />
            <div v-if="upcomingBookings.length === 0" class="text-caption text-[#C1C1C1]">Нет будущих билетов</div>
          </div>
        </div>
        <div>
          <div class="text-h2 mb-3">Прошедшие</div>
          <div class="space-y-3">
            <BookingCard
              v-for="booking in pastBookings"
              :key="booking.id"
              :title="booking.title"
              :details="booking.details"
            />
            <div v-if="pastBookings.length === 0" class="text-caption text-[#C1C1C1]">Нет прошедших билетов</div>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useUserBookingsQuery, usePayBookingMutation } from '@/shared/api/bookings'
import { useSettingsQuery } from '@/shared/api/settings'
import { useMoviesQuery } from '@/shared/api/movies'
import { useCinemasQuery } from '@/shared/api/cinemas'
import { BookingCard } from '@/entities/booking'
import { useAuthStore } from '~/shared/store/auth'
import { onMounted, onUnmounted } from 'vue'

const authStore = useAuthStore()

// Redirect if not authenticated
if (process.client && !authStore.isAuthenticated) {
  navigateTo('/auth/login')
}

const { data: bookings, isLoading, error } = useUserBookingsQuery()
const { data: settings } = useSettingsQuery()
const { data: movies } = useMoviesQuery()
const { data: cinemas } = useCinemasQuery()
const { mutate: payBooking, isPending: isPaying } = usePayBookingMutation()

let updateInterval: ReturnType<typeof setInterval> | null = null

const formatSeats = (seats: Array<{ rowNumber: number; seatNumber: number }>) => {
  if (seats.length === 0) return ''
  const seatsStr = seats.map(s => `Ряд ${s.rowNumber}, Место ${s.seatNumber}`).join(', ')
  return seatsStr
}

const bookingsWithDetails = computed(() => {
  if (!bookings.value || !movies.value || !cinemas.value) return []
  
  return bookings.value.map(booking => {
    const movie = movies.value?.find(m => m.id === booking.movieSessionId)
    const cinema = cinemas.value?.find(c => c.id === booking.movieSessionId)
    
    const bookedDate = new Date(booking.bookedAt)
    const now = new Date()
    const paymentTimeSeconds = settings.value?.bookingPaymentTimeSeconds || 0
    const timeLeft = !booking.isPaid ? Math.max(0, paymentTimeSeconds - Math.floor((now.getTime() - bookedDate.getTime()) / 1000)) : null
    
    return {
      ...booking,
      title: `${movie?.title || 'Неизвестный фильм'} — ${formatDateTime(booking.bookedAt)}`,
      details: formatSeats(booking.seats),
      timeLeft
    }
  })
})

const unpaidBookings = computed(() => {
  return bookingsWithDetails.value.filter(b => !b.isPaid && b.timeLeft && b.timeLeft > 0)
})

const upcomingBookings = computed(() => {
  return bookingsWithDetails.value.filter(b => {
    if (!b.isPaid) return false
    const bookedDate = new Date(b.bookedAt)
    return bookedDate > new Date()
  })
})

const pastBookings = computed(() => {
  return bookingsWithDetails.value.filter(b => {
    const bookedDate = new Date(b.bookedAt)
    return bookedDate <= new Date()
  })
})

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTimeLeft = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}м ${secs}с`
}

const handlePay = (bookingId: string) => {
  payBooking(bookingId)
}

onMounted(() => {
  // Update timer every second
  updateInterval = setInterval(() => {
    // Force reactivity update by accessing computed
    unpaidBookings.value
  }, 1000)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

 
