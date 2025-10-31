<template>
  <div class="bg-[#3B3B3B] rounded-md p-4 border border-border">
    <div class="aspect-[3/4] rounded-md overflow-hidden mb-4 bg-[#4A4A4A]">
      <img v-if="posterSrc" :src="posterSrc" :alt="title" class="w-full h-full object-cover" />
    </div>
    <div class="text-body mb-2">{{ title }}</div>
    <div class="text-caption text-[#C1C1C1] mb-4">{{ meta }}</div>
    <slot name="actions">
      <NuxtLink :to="`/movies/${movieId}`" class="btn btn-primary w-full block text-center cursor-pointer">Купить билет</NuxtLink>
    </slot>
  </div>
  
  
</template>

<script setup lang="ts">
const props = defineProps<{ 
  title: string
  meta: string
  posterImage?: string
  movieId?: number
}>()

const { public: { API_ENDPOINT } } = useRuntimeConfig()
const posterSrc = computed(() => {
  if (!props.posterImage) return ''
  if (/^https?:\/\//i.test(props.posterImage)) return props.posterImage
  const baseUrl = API_ENDPOINT || 'http://localhost:3022'
  // Убеждаемся, что путь начинается с /
  const imagePath = props.posterImage.startsWith('/') ? props.posterImage : `/${props.posterImage}`
  return `${baseUrl}${imagePath}`
})
</script>
