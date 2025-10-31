<template>
  <NuxtLayout>
    <template #title>
      <h1 class="text-h1">{{ movie?.title || 'Загрузка...' }}</h1>
    </template>
    <section class="py-8">
      <div v-if="isLoadingMovie" class="text-caption text-[#C1C1C1]">Загрузка...</div>
      <div v-else-if="errorMovie" class="text-caption text-[#B76969]">{{ String(errorMovie) }}</div>
      <template v-else-if="movie">
        <div v-if="sessionsList.length > 0" class="mb-8 grid grid-cols-6 gap-3">
          <NuxtLink
            v-for="session in sessionsList"
            :key="session.id"
            :to="`/booking/${session.id}`"
            class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border text-center hover:bg-[#4A4A4A]"
          >
            {{ formatTime(session.startTime) }}
          </NuxtLink>
        </div>
        <div class="grid grid-cols-3 gap-8">
          <div class="col-span-2">
            <div v-if="movie.posterImage" class="aspect-video rounded-md bg-[#3B3B3B] border border-border mb-6 overflow-hidden">
              <img :src="getPosterUrl(movie.posterImage)" :alt="movie.title" class="w-full h-full object-cover" />
            </div>
            <h2 class="text-h2 mb-3">Описание</h2>
            <p class="text-body text-[#CFCFCF]">{{ movie.description }}</p>
          </div>
          <aside>
            <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
              <div class="mb-2 text-caption text-[#C1C1C1]">Рейтинг</div>
              <div class="text-body mb-4">{{ movie.rating }}</div>
              <div class="mb-2 text-caption text-[#C1C1C1]">Длительность</div>
              <div class="text-body mb-4">{{ movie.lengthMinutes }} мин</div>
              <div class="mb-2 text-caption text-[#C1C1C1]">Год</div>
              <div class="text-body">{{ movie.year }}</div>
            </div>
          </aside>
        </div>
      </template>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useMoviesQuery } from '@/shared/api/movies'
import { useMovieSessionsQuery } from '@/shared/api/sessions'

const route = useRoute()
const movieId = computed(() => Number(route.params.id))
const { data: movies } = useMoviesQuery()
const { data: sessions, isLoading: isLoadingSessions, error: errorSessions } = useMovieSessionsQuery(movieId)

const movie = computed(() => movies.value?.find(m => m.id === movieId.value))
const isLoadingMovie = computed(() => !movies.value)
const errorMovie = computed(() => errorSessions.value)
const sessionsList = computed(() => sessions.value ?? [])

const { public: { API_ENDPOINT } } = useRuntimeConfig()

const getPosterUrl = (posterImage: string) => {
  if (/^https?:\/\//i.test(posterImage)) return posterImage
  return `${API_ENDPOINT}${posterImage}`
}

const formatTime = (dateTime: string) => {
  const date = new Date(dateTime)
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}
</script>

 
