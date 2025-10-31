<template>
  <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
    <div class="space-y-2">
      <div class="h-2 bg-[#4A4A4A] rounded-sm"></div>
      <div class="grid grid-cols-12 gap-2">
        <div v-for="i in seats" :key="i" class="h-6 bg-[#4A4A4A] rounded-sm"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ seats?: number }>(), { seats: 72 })
</script>
