<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from '~/shared/store/auth'

// Initialize auth store on app start
const authStore = useAuthStore()

onMounted(() => {
  authStore.initializeAuth()
})
</script>
