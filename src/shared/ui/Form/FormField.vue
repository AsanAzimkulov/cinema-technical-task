<template>
  <div>
    <label v-if="label" class="block text-caption text-[#C1C1C1] mb-1">{{ label }}</label>
    <slot />
    <p v-if="message" class="mt-1 text-caption" :class="error ? 'text-[#B76969]' : 'text-[#C1C1C1]'">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label?: string; message?: string; error?: boolean }>()
</script>
