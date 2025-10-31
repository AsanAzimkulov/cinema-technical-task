<template>
  <FormField :label="label" :message="message" :error="error">
    <input
      :type="type"
      :placeholder="placeholder"
      class="w-full rounded-sm bg-[#3B3B3B] border border-border px-3 py-2 text-body placeholder-[#9E9E9E]"
    />
  </FormField>
  
</template>

<script setup lang="ts">
import FormField from './FormField.vue'

defineProps<{
  label?: string
  message?: string
  error?: boolean
  placeholder?: string
  type?: 'text' | 'email' | 'password'
}>()
</script>
 
