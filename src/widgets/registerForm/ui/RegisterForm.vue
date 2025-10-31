<template>
  <Card class="w-full max-w-md mx-auto">
    <h2 class="text-xl font-semibold text-gray-900">Регистрация</h2>


    <form @submit.prevent="onSubmit" class="space-y-6">
      <FormInput
          v-model="formData.username"
          label="Имя пользователя"
          placeholder="Введите имя пользователя"
          :error="errors.username"
          hint="Минимум 8 символов"
          required
      />

      <FormInput
          v-model="formData.password"
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          :error="errors.password"
          hint="Минимум 8 символов, 1 заглавная буква и 1 цифра"
          required
      />

      <FormInput
          v-model="formData.passwordConfirmation"
          type="password"
          label="Подтверждение пароля"
          placeholder="Подтвердите пароль"
          :error="errors.passwordConfirmation"
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
        Зарегистрироваться
      </Button>
    </form>

    <template #footer>
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Уже есть аккаунт?
          <button
              type="button"
              class="font-medium text-blue-600 hover:text-blue-500"
              @click="$emit('switchToLogin')"
          >
            Войти
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
import { registerSchema, type RegisterFormData } from '~/shared/lib/validation'
import { useAuthStore } from '~/shared/store/auth'
import Card from '~/shared/ui/Card/Card.vue'
import Button from '~/shared/ui/Button/Button.vue'
import FormInput from '~/shared/ui/Form/FormInput.vue'

const authStore = useAuthStore()
const errorMessage = ref('')

const { handleSubmit, defineField, errors, isValid } = useForm({
  validationSchema: toTypedSchema(registerSchema)
})

const [username] = defineField('username')
const [password] = defineField('password')
const [passwordConfirmation] = defineField('passwordConfirmation')

const formData = reactive({
  username: username,
  password: password,
  passwordConfirmation: passwordConfirmation
})

const isLoading = computed(() => authStore.isLoading)
const isFormValid = computed(() => isValid.value && formData.username && formData.password && formData.passwordConfirmation)

const handleFormSubmit = async (values: RegisterFormData) => {
  try {
    errorMessage.value = ''
    await authStore.register(values.username, values.password)
    await navigateTo('/my-tickets')
  } catch (error: any) {
    errorMessage.value = error.message || 'Ошибка при регистрации. Попробуйте еще раз.'
  }
}

const onSubmit = handleSubmit(handleFormSubmit)

defineEmits<{
  switchToLogin: []
}>()
</script>
