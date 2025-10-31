<template>
  <NuxtLayout>
    <template #title>
      <h1 class="text-h1">Сеанс</h1>
    </template>
    <section class="py-8">
      <div v-if="!authStore.isAuthenticated" class="text-center py-12">
        <p class="text-body mb-4">Для бронирования билетов необходимо войти в систему</p>
        <NuxtLink to="/auth/login" class="btn btn-primary cursor-pointer">Войти</NuxtLink>
      </div>
      <template v-else>
      <div class="text-caption text-[#C1C1C1] mb-6">Зал 1 • 12:45</div>
      <div class="grid grid-cols-[1fr_320px] gap-8">
        <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
          <div class="space-y-2">
            <div class="h-2 bg-[#4A4A4A] rounded-sm"></div>
            <div class="grid grid-cols-12 gap-2">
              <div v-for="i in 72" :key="i" class="h-6 bg-[#4A4A4A] rounded-sm"></div>
            </div>
          </div>
        </div>
        <aside class="space-y-4">
          <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
            <div class="text-h2 mb-3">Легенда</div>
            <div class="flex items-center gap-3 text-caption text-[#C1C1C1]">
              <span class="inline-block w-4 h-4 bg-[#4A4A4A] rounded-sm"></span> Свободно
              <span class="inline-block w-4 h-4 bg-[#6B6B6B] rounded-sm"></span> Занято
              <span class="inline-block w-4 h-4 bg-[#B76969] rounded-sm"></span> Выбрано
            </div>
          </div>
          <button class="btn btn-primary w-full cursor-pointer">Забронировать</button>
        </aside>
      </div>
      </template>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/shared/store/auth'

const authStore = useAuthStore()
</script>

 
