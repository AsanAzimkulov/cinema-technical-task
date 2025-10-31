<template>
  <div class="min-h-screen min-w-screen flex items-stretch content-stretch p-10">
<!--    <NavBar />-->
<!--    -->
<!--    &lt;!&ndash; Main Content &ndash;&gt;-->
<!--    <main class="container py-6">-->
<!--      <slot />-->
<!--    </main>-->
<!--    -->
<!--    &lt;!&ndash; Auth Modal &ndash;&gt;-->
<!--    <AuthModal-->
<!--      :is-open="showAuthModal"-->
<!--      @close="showAuthModal = false"-->
<!--    />-->
  <div class="flex w-full flex-col">
    <div class="pb-3">
      <slot name="title"/>
    </div>
    <div class="w-full h-full border-2 border-white">
      <div class="h-full flex">
        <NavBar />
        <main class="container py-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/shared/store/auth'
import AuthModal from '~/features/auth/AuthModal.vue'
import { NavBar } from 'src/widgets/navBar'

const authStore = useAuthStore()
const showAuthModal = ref(false)

onMounted(() => {
  authStore.initializeAuth()
})

const handleLogout = () => {
  authStore.logout()
  navigateTo('/')
}
</script>
