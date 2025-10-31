<template>
  <NuxtLayout>
    <template #title>
      <h1 class="text-h1">Кинотеатры</h1>
    </template>
    <section class="py-8">
      <div v-if="isLoading" class="text-caption text-[#C1C1C1]">Загрузка…</div>
      <div v-else-if="error" class="text-caption text-[#B76969]">{{ String(error) }}</div>
      <div v-else-if="cinemas && cinemas.length > 0" class="grid grid-cols-3 gap-6">
        <CinemaCard
          v-for="cinema in cinemas"
          :key="cinema?.id"
          :name="cinema?.name || ''"
          :address="cinema?.address || ''"
        >
          <template #actions>
            <NuxtLink :to="`/cinemas/${cinema?.id}`" class="btn btn-primary cursor-pointer">Посмотреть сеансы</NuxtLink>
          </template>
        </CinemaCard>
      </div>
      <div v-else class="text-center py-12">
        <p class="text-caption text-[#C1C1C1]">Нет записей</p>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useCinemasQuery } from '@/shared/api/cinemas'
import { CinemaCard } from '@/entities/cinema'

const { data, isLoading, error } = useCinemasQuery()
const cinemas = computed(() => {
  if (!data.value || !Array.isArray(data.value)) return []
  return data.value.filter(cinema => {
    return cinema && 
           typeof cinema === 'object' &&
           cinema.id !== undefined && 
           cinema.id !== null &&
           cinema.name !== undefined && 
           cinema.name !== null &&
           cinema.address !== undefined && 
           cinema.address !== null
  })
})
</script>

 
