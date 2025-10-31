<template>
  <button
    :class="[
      'btn inline-flex items-center justify-center rounded-sm px-4 py-2 border text-body cursor-pointer',
      variantClass,
      block ? 'w-full' : ''
    ]"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'ghost' | 'outline'
  block?: boolean
}>(), {
  variant: 'primary',
  block: false
})

const variantClass = computed(() => {
  if (props.variant === 'outline') return 'bg-transparent border-border text-text'
  if (props.variant === 'ghost') return 'bg-transparent border-transparent text-text hover:bg-[#3B3B3B]'
  return 'btn-primary'
})
</script>
