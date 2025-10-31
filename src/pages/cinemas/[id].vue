<template>
  <NuxtLayout>
    <template #title>
      <h1 class="text-h1">{{ cinema?.name || 'Загрузка...' }}</h1>
    </template>
    <section class="py-8">
      <div v-if="isLoading" class="text-caption text-[#C1C1C1]">Загрузка...</div>
      <div v-else-if="error" class="text-caption text-[#B76969]">{{ String(error) }}</div>
      <template v-else-if="cinema">
        <div class="text-caption text-[#C1C1C1] mb-6">{{ cinema.address }}</div>
        <div v-if="sessionsGroupedByMovie.length > 0" class="space-y-6">
          <div v-for="group in sessionsGroupedByMovie" :key="group.movieId">
            <div class="mb-2 text-h2">{{ group.movieTitle }}</div>
            <div class="grid grid-cols-8 gap-2">
              <NuxtLink
                v-for="session in group.sessions"
                :key="session?.id"
                :to="`/booking/${session?.id}`"
                class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border text-center hover:bg-[#4A4A4A] cursor-pointer"
              >
                {{ formatTime(session.startTime) }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div v-else class="text-caption text-[#C1C1C1]">Нет доступных сеансов</div>
      </template>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useCinemasQuery } from '@/shared/api/cinemas'
import { useCinemaSessionsQuery } from '@/shared/api/cinemas'
import { useMoviesQuery } from '@/shared/api/movies'
import type { MovieSession } from '@/shared/api/types'

const route = useRoute()
const cinemaId = computed(() => Number(route.params.id))
const { data: cinemas, isLoading: isLoadingCinemas } = useCinemasQuery()
const { data: sessions, isLoading: isLoadingSessions, error } = useCinemaSessionsQuery(cinemaId)
const { data: movies } = useMoviesQuery()

const cinema = computed(() => cinemas.value?.find(c => c.id === cinemaId.value))
const isLoading = computed(() => isLoadingCinemas.value || isLoadingSessions.value)

const sessionsGroupedByMovie = computed(() => {
  if (!sessions.value || !Array.isArray(sessions.value) || !movies.value || !Array.isArray(movies.value)) return []
  
  const grouped = new Map<number, { movieId: number; movieTitle: string; sessions: MovieSession[] }>()
  
  for (const session of sessions.value) {
    if (!session || !session.movieId || !session.id) continue
    const movie = movies.value.find(m => m && m.id === session.movieId)
    if (!movie || !movie.title) continue
    
    if (!grouped.has(session.movieId)) {
      grouped.set(session.movieId, {
        movieId: session.movieId,
        movieTitle: movie.title,
        sessions: []
      })
    }
    
    const group = grouped.get(session.movieId)
    if (group) {
      group.sessions.push(session)
    }
  }
  
  return Array.from(grouped.values())
})

const formatTime = (dateTime: string) => {
  const date = new Date(dateTime)
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}
</script>

 
