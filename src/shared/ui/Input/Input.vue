<template>
  <div>
    <label v-if="label" class="block text-caption text-[#C1C1C1] mb-1">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      class="w-full rounded-sm bg-[#3B3B3B] border border-border px-3 py-2 text-body placeholder-[#9E9E9E]"
    />
    <p v-if="hint" class="mt-1 text-caption text-[#C1C1C1]">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  hint?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
}>()
</script>
