<template>
  <section class="py-8">
    <h1 class="text-h1 mb-2">Skyline Cinema</h1>
    <div class="text-caption text-[#C1C1C1] mb-6">ул. Пушкина, 10</div>

    <div class="mb-4 flex gap-3">
      <button class="px-4 py-2 rounded-sm bg-[#3B3B3B] border border-border">Сегодня</button>
      <button class="px-4 py-2 rounded-sm bg-[#3B3B3B] border border-border">Завтра</button>
      <button class="px-4 py-2 rounded-sm bg-[#3B3B3B] border border-border">Сб, 12 окт</button>
    </div>

    <div class="space-y-6">
      <div>
        <div class="mb-2 text-h2">Мстители</div>
        <div class="grid grid-cols-8 gap-2">
          <NuxtLink to="/booking/1" class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border text-center">10:30</NuxtLink>
          <NuxtLink to="/booking/1" class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border text-center">12:45</NuxtLink>
          <NuxtLink to="/booking/1" class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border text-center">15:00</NuxtLink>
        </div>
      </div>

      <div>
        <div class="mb-2 text-h2">Интерстеллар</div>
        <div class="grid grid-cols-8 gap-2">
          <NuxtLink to="/booking/2" class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border text-center">17:25</NuxtLink>
          <NuxtLink to="/booking/2" class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border text-center">19:10</NuxtLink>
          <NuxtLink to="/booking/2" class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border text-center">21:40</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

 
