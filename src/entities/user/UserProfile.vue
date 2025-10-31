<template>
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-full bg-[#4A4A4A]"></div>
    <div class="text-body">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>
