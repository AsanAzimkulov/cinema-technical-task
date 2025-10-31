<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-h1">Фильмы</h1>
      <p class="mt-2 text-caption text-[#C1C1C1]">Выберите фильм для просмотра расписания сеансов</p>
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
        <p class="mt-1 text-sm text-gray-500">{{ String(error) }}</p>
      </div>
    </div>
    
    <div v-else-if="moviesList && moviesList.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <MovieCard
        v-for="movie in moviesList"
        :key="movie?.id"
        :title="movie?.title || ''"
        :meta="`${movie?.lengthMinutes || 0} мин • ${movie?.year || ''}`"
        :poster-image="movie?.posterImage"
        :movie-id="movie?.id"
      />
    </div>
    <div v-else class="text-center py-12">
      <p class="text-caption text-[#C1C1C1]">Нет записей</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from '~/entities/movie/MovieCard.vue'
import Spinner from '~/shared/ui/Spinner/Spinner.vue'
import { useMoviesQuery } from '~/shared/api/movies'

useHead({
  title: 'Фильмы - Cinema Booking',
  meta: [
    { name: 'description', content: 'Список всех доступных фильмов для бронирования билетов' }
  ]
})

const { data, isPending: pending, error } = useMoviesQuery()
const moviesList = computed(() => {
  console.log('value: ', JSON.stringify({valust: data.value}))
  if (!data.value || !Array.isArray(data.value)) return []
  return data.value;
})
</script>
