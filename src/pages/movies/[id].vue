<template>
  <section class="py-8">
    <div class="mb-6">
      <h1 class="text-h1">Название фильма</h1>
    </div>

    <div class="mb-6 flex gap-3">
      <button class="px-4 py-2 rounded-sm bg-[#3B3B3B] border border-border">Сегодня</button>
      <button class="px-4 py-2 rounded-sm bg-[#3B3B3B] border border-border">Завтра</button>
      <button class="px-4 py-2 rounded-sm bg-[#3B3B3B] border border-border">Сб, 12 окт</button>
    </div>

    <div class="mb-8 grid grid-cols-6 gap-3">
      <button class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border">10:30</button>
      <button class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border">12:45</button>
      <button class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border">15:00</button>
      <button class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border">17:25</button>
      <button class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border">19:10</button>
      <button class="px-3 py-2 rounded-sm bg-[#3B3B3B] border border-border">21:40</button>
    </div>

    <div class="grid grid-cols-3 gap-8">
      <div class="col-span-2">
        <div class="aspect-video rounded-md bg-[#3B3B3B] border border-border mb-6"></div>
        <h2 class="text-h2 mb-3">Описание</h2>
        <p class="text-body text-[#CFCFCF]">
          Краткий синопсис фильма. Текст-заглушка в несколько строк для проверки типографики
          и межстрочных интервалов по макету.
        </p>
      </div>
      <aside>
        <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
          <div class="mb-2 text-caption text-[#C1C1C1]">Рейтинг</div>
          <div class="text-body mb-4">8.6</div>
          <div class="mb-2 text-caption text-[#C1C1C1]">Длительность</div>
          <div class="text-body mb-4">2 ч 23 мин</div>
          <div class="mb-2 text-caption text-[#C1C1C1]">Жанры</div>
          <div class="text-body">Экшен, Фантастика</div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

 
