<template>
  <NuxtLayout>
    <template #title>
      <h1 class="text-xl">Фильмы / Главная</h1>
    </template>
    <section class="py-8">
      <h1 class="text-h1 mb-6">Фильмы</h1>
      <div class="grid grid-cols-4 gap-6">
        <div class="bg-[#3B3B3B] rounded-md p-4 border border-border">
          <div class="aspect-[3/4] rounded-md bg-[#4A4A4A] mb-4"></div>
          <div class="text-body mb-2">Мстители</div>
          <div class="text-caption text-[#C1C1C1] mb-4">2 ч 23 мин • 2012</div>
          <button class="btn btn-primary w-full">Купить билет</button>
        </div>
        <div class="bg-[#3B3B3B] rounded-md p-4 border border-border">
          <div class="aspect-[3/4] rounded-md bg-[#4A4A4A] mb-4"></div>
          <div class="text-body mb-2">Темный рыцарь</div>
          <div class="text-caption text-[#C1C1C1] mb-4">2 ч 32 мин • 2008</div>
          <button class="btn btn-primary w-full">Купить билет</button>
        </div>
        <div class="bg-[#3B3B3B] rounded-md p-4 border border-border">
          <div class="aspect-[3/4] rounded-md bg-[#4A4A4A] mb-4"></div>
          <div class="text-body mb-2">Начало</div>
          <div class="text-caption text-[#C1C1C1] mb-4">2 ч 28 мин • 2010</div>
          <button class="btn btn-primary w-full">Купить билет</button>
        </div>
        <div class="bg-[#3B3B3B] rounded-md p-4 border border-border">
          <div class="aspect-[3/4] rounded-md bg-[#4A4A4A] mb-4"></div>
          <div class="text-body mb-2">Интерстеллар</div>
          <div class="text-caption text-[#C1C1C1] mb-4">2 ч 49 мин • 2014</div>
          <button class="btn btn-primary w-full">Купить билет</button>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>
