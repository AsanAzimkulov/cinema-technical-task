<template>
  <div class="bg-[#3B3B3B] rounded-md p-4 border border-border">
    <div class="aspect-[3/4] rounded-md bg-[#4A4A4A] mb-4"></div>
    <div class="text-body mb-2">{{ title }}</div>
    <div class="text-caption text-[#C1C1C1] mb-4">{{ meta }}</div>
    <slot name="actions">
      <button class="btn btn-primary w-full">Купить билет</button>
    </slot>
  </div>
  
</template>

<script setup lang="ts">
defineProps<{ title: string; meta: string }>()
</script>
