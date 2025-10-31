<template>
  <section class="py-8">
    <h1 class="text-h1 mb-6">Мои билеты</h1>
    <div class="grid grid-cols-3 gap-6">
      <div>
        <div class="text-h2 mb-3">Не оплаченные</div>
        <div class="space-y-3">
          <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
            <div class="text-body">Мстители — 12:45, Зал 1</div>
            <div class="text-caption text-[#C1C1C1] mb-3">Ряд 5, Места 7–8</div>
            <button class="btn btn-primary">Оплатить</button>
          </div>
        </div>
      </div>
      <div>
        <div class="text-h2 mb-3">Будущие</div>
        <div class="space-y-3">
          <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
            <div class="text-body">Интерстеллар — 19:10, Зал 2</div>
            <div class="text-caption text-[#C1C1C1]">Ряд 3, Места 4–5</div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-h2 mb-3">Прошедшие</div>
        <div class="space-y-3">
          <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
            <div class="text-body">Начало — 15:00, Зал 1</div>
            <div class="text-caption text-[#C1C1C1]">Ряд 8, Места 10–11</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

 
