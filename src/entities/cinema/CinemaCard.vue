<template>
  <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
    <div class="text-body mb-1">{{ name }}</div>
    <div class="text-caption text-[#C1C1C1] mb-4">{{ address }}</div>
    <slot name="actions">
      <button class="btn btn-primary">Посмотреть сеансы</button>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string; address: string }>()
</script>
