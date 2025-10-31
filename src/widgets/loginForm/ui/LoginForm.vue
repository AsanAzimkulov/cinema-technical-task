<template>
  <Card class="w-full max-w-md mx-auto">
    <template #header>
      <h2 class="text-xl font-semibold text-gray-900">Вход в систему</h2>
    </template>

    <form @submit.prevent="onSubmit" class="space-y-6">
      <FormInput
          v-model="formData.username"
          label="Имя пользователя"
          placeholder="Введите имя пользователя"
          :error="errors.username"
          required
      />

      <FormInput
          v-model="formData.password"
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          :error="errors.password"
          required
      />

      <div v-if="errorMessage" class="p-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
        {{ errorMessage }}
      </div>

      <Button
          type="submit"
          :loading="isLoading"
          :disabled="!isFormValid"
          full-width
          class="w-full"
      >
        Войти
      </Button>
    </form>

    <template #footer>
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Нет аккаунта?
          <button
              type="button"
              class="font-medium text-blue-600 hover:text-blue-500"
              @click="$emit('switchToRegister')"
          >
            Зарегистрироваться
          </button>
        </p>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema, type LoginFormData } from '~/shared/lib/validation'
import { useAuthStore } from '~/shared/store/auth'
import Card from '~/shared/ui/Card/Card.vue'
import Button from '~/shared/ui/Button/Button.vue'
import FormInput from '~/shared/ui/Form/FormInput.vue'

const authStore = useAuthStore()
const errorMessage = ref('')

const { handleSubmit, defineField, errors, isValid } = useForm({
  validationSchema: toTypedSchema(loginSchema)
})

const [username] = defineField('username')
const [password] = defineField('password')

const formData = reactive({
  username: username,
  password: password
})

const isLoading = computed(() => authStore.isLoading)
const isFormValid = computed(() => isValid.value && formData.username && formData.password)

const handleFormSubmit = async (values: LoginFormData) => {
  try {
    errorMessage.value = ''
    await authStore.login(values.username, values.password)
    await navigateTo('/my-tickets')
  } catch (error: any) {
    errorMessage.value = 'Неверный логин или пароль. Проверьте введенные данные и попробуйте снова.'
  }
}

const onSubmit = handleSubmit(handleFormSubmit)

defineEmits<{
  switchToRegister: []
}>()
</script>
