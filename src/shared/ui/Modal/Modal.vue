<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/60" />
    <div class="relative z-10 w-full max-w-md rounded-md border border-border bg-[#3B3B3B] p-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>()
</script>
