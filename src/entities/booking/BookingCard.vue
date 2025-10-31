<template>
  <div class="rounded-md border border-border p-4 bg-[#3B3B3B]">
    <div class="text-body">{{ title }}</div>
    <div class="text-caption text-[#C1C1C1]">{{ details }}</div>
    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; details: string }>()
</script>
