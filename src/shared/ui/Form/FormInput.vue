<template>
  <FormField :label="label" :message="error" :error="!!error">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full rounded-sm bg-[#3B3B3B] border border-border px-3 py-2 text-body placeholder-[#9E9E9E]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </FormField>
  
</template>

<script setup lang="ts">
import FormField from './FormField.vue'

defineProps<{
  modelValue?: string
  label?: string
  message?: string
  error?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
 
