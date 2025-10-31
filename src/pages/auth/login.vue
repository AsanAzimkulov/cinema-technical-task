<template>
  <NuxtLayout>
    <template #title>
      <h1 class="text-h1">Вход</h1>
    </template>
    <section class="py-8 max-w-md mx-auto">
      <LoginForm />
      <div class="text-caption text-[#C1C1C1] text-center mt-4">
        Нет аккаунта? <NuxtLink to="/auth/register" class="text-blue-500 hover:text-blue-400 cursor-pointer">Зарегистрируйтесь</NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoginForm from '~/features/auth/LoginForm.vue'
</script>


