<template>
  <NuxtLayout>
    <template #title>
      <h1 class="text-h1">Регистрация</h1>
    </template>
    <section class="py-8 max-w-md mx-auto">
      <RegisterForm />
      <div class="text-caption text-[#C1C1C1] text-center mt-4">
        Уже есть аккаунт? <NuxtLink to="/auth/login" class="text-blue-500 hover:text-blue-400 cursor-pointer">Войти</NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import RegisterForm from '~/features/auth/RegisterForm.vue'
</script>


